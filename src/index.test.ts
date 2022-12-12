import createEd448 from "./";

const Ed448 = createEd448();

function random(length: number): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * 256));
}

// https://tools.ietf.org/html/rfc8032#section-7.4
interface TestVector {
  privateKey: string;
  publicKey: string;
  message: string;
  signature: string;
  context?: string;
}

const VECTORS: Array<[string, TestVector]> = [
  [
    "Blank",
    {
      privateKey:
        "6c82a562cb808d10d632be89c8513ebf6c929f34ddfa8c9f63c9960ef6e348a3528c8a3fcc2f044e39a3fc5b94492f8f032e7549a20098f95b",
      publicKey:
        "5fd7449b59b461fd2ce787ec616ad46a1da1342485a70e1f8a0ea75d80e96778edf124769b46c7061bd6783df1e50f6cd1fa1abeafe8256180",
      message: "",
      signature:
        "533a37f6bbe457251f023c0d88f976ae2dfb504a843e34d2074fd823d41a591f2b233f034f628281f2fd7a22ddd47d7828c59bd0a21bfd3980ff0d2028d4b18a9df63e006c5d1c2d345b925d8dc00b4104852db99ac5c7cdda8530a113a0f4dbb61149f05a7363268c71d95808ff2e652600",
    },
  ],
  [
    "1 octet",
    {
      privateKey:
        "c4eab05d357007c632f3dbb48489924d552b08fe0c353a0d4a1f00acda2c463afbea67c5e8d2877c5e3bc397a659949ef8021e954e0a12274e",
      publicKey:
        "43ba28f430cdff456ae531545f7ecd0ac834a55d9358c0372bfa0c6c6798c0866aea01eb00742802b8438ea4cb82169c235160627b4c3a9480",
      message: "03",
      signature:
        "26b8f91727bd62897af15e41eb43c377efb9c610d48f2335cb0bd0087810f4352541b143c4b981b7e18f62de8ccdf633fc1bf037ab7cd779805e0dbcc0aae1cbcee1afb2e027df36bc04dcecbf154336c19f0af7e0a6472905e799f1953d2a0ff3348ab21aa4adafd1d234441cf807c03a00",
    },
  ],
  [
    "1 octet (with context)",
    {
      privateKey:
        "c4eab05d357007c632f3dbb48489924d552b08fe0c353a0d4a1f00acda2c463afbea67c5e8d2877c5e3bc397a659949ef8021e954e0a12274e",
      publicKey:
        "43ba28f430cdff456ae531545f7ecd0ac834a55d9358c0372bfa0c6c6798c0866aea01eb00742802b8438ea4cb82169c235160627b4c3a9480",
      message: "03",
      context: "666f6f",
      signature:
        "d4f8f6131770dd46f40867d6fd5d5055de43541f8c5e35abbcd001b32a89f7d2151f7647f11d8ca2ae279fb842d607217fce6e042f6815ea000c85741de5c8da1144a6a1aba7f96de42505d7a7298524fda538fccbbb754f578c1cad10d54d0d5428407e85dcbc98a49155c13764e66c3c00",
    },
  ],
  [
    "11 octets",
    {
      privateKey:
        "cd23d24f714274e744343237b93290f511f6425f98e64459ff203e8985083ffdf60500553abc0e05cd02184bdb89c4ccd67e187951267eb328",
      publicKey:
        "dcea9e78f35a1bf3499a831b10b86c90aac01cd84b67a0109b55a36e9328b1e365fce161d71ce7131a543ea4cb5f7e9f1d8b00696447001400",
      message: "0c3e544074ec63b0265e0c",
      signature:
        "1f0a8888ce25e8d458a21130879b840a9089d999aaba039eaf3e3afa090a09d389dba82c4ff2ae8ac5cdfb7c55e94d5d961a29fe0109941e00b8dbdeea6d3b051068df7254c0cdc129cbe62db2dc957dbb47b51fd3f213fb8698f064774250a5028961c9bf8ffd973fe5d5c206492b140e00",
    },
  ],
  [
    "12 octets",
    {
      privateKey:
        "258cdd4ada32ed9c9ff54e63756ae582fb8fab2ac721f2c8e676a72768513d939f63dddb55609133f29adf86ec9929dccb52c1c5fd2ff7e21b",
      publicKey:
        "3ba16da0c6f2cc1f30187740756f5e798d6bc5fc015d7c63cc9510ee3fd44adc24d8e968b6e46e6f94d19b945361726bd75e149ef09817f580",
      message: "64a65f3cdedcdd66811e2915",
      signature:
        "7eeeab7c4e50fb799b418ee5e3197ff6bf15d43a14c34389b59dd1a7b1b85b4ae90438aca634bea45e3a2695f1270f07fdcdf7c62b8efeaf00b45c2c96ba457eb1a8bf075a3db28e5c24f6b923ed4ad747c3c9e03c7079efb87cb110d3a99861e72003cbae6d6b8b827e4e6c143064ff3c00",
    },
  ],
  [
    "13 octets",
    {
      privateKey:
        "7ef4e84544236752fbb56b8f31a23a10e42814f5f55ca037cdcc11c64c9a3b2949c1bb60700314611732a6c2fea98eebc0266a11a93970100e",
      publicKey:
        "b3da079b0aa493a5772029f0467baebee5a8112d9d3a22532361da294f7bb3815c5dc59e176b4d9f381ca0938e13c6c07b174be65dfa578e80",
      message: "64a65f3cdedcdd66811e2915e7",
      signature:
        "6a12066f55331b6c22acd5d5bfc5d71228fbda80ae8dec26bdd306743c5027cb4890810c162c027468675ecf645a83176c0d7323a2ccde2d80efe5a1268e8aca1d6fbc194d3f77c44986eb4ab4177919ad8bec33eb47bbb5fc6e28196fd1caf56b4e7e0ba5519234d047155ac727a1053100",
    },
  ],
  [
    "64 octets",
    {
      privateKey:
        "d65df341ad13e008567688baedda8e9dcdc17dc024974ea5b4227b6530e339bff21f99e68ca6968f3cca6dfe0fb9f4fab4fa135d5542ea3f01",
      publicKey:
        "df9705f58edbab802c7f8363cfe5560ab1c6132c20a9f1dd163483a26f8ac53a39d6808bf4a1dfbd261b099bb03b3fb50906cb28bd8a081f00",
      message:
        "bd0f6a3747cd561bdddf4640a332461a4a30a12a434cd0bf40d766d9c6d458e5512204a30c17d1f50b5079631f64eb3112182da3005835461113718d1a5ef944",
      signature:
        "554bc2480860b49eab8532d2a533b7d578ef473eeb58c98bb2d0e1ce488a98b18dfde9b9b90775e67f47d4a1c3482058efc9f40d2ca033a0801b63d45b3b722ef552bad3b4ccb667da350192b61c508cf7b6b5adadc2c8d9a446ef003fb05cba5f30e88e36ec2703b349ca229c2670833900",
    },
  ],
  [
    "Golang 1",
    {
      privateKey:
        "e959068474bc720bf3a94c7a524750f0d4fe68a4828137e58d48303af1fa929a6c50f87d0cab27fc557aa1a3190cfad0abbca2a2e5d7da272d",
      publicKey:
        "3d4012b96522a8d939d1d60d24c667ba76b73d0921f7b6417a6fded1aa1d6d8c53c60b9236a5939dd241e93cd51ea4a8c8d931dd9b63c13100",
      message:
        "54686520717569636b2062726f776e20666f78206a756d7073206f76657220746865206c617a7920646f67",
      signature:
        "92a7e08f86b25f288eb0308f3fb780950ab77c333d5d1b91b6de40a199fc028fe66a001dc09341905a58f8c3d4a959ee5d416735f59d91640095dd83e70b6bc05fa6a26b32c00be454bfb87285417554183c2da64bbbad77b746bd86299fd4188578bc9aa321a8291c5d2281029ca24e2d00",
    },
  ],
  [
    "Golang 2",
    {
      privateKey:
        "1edc2069350104b5594c602f7967c4b1580f2a757fc9a2745f621868cd333c245ec3c775d730d3c01a2e18f3e5d0b5e767ed3ec77e69732781",
      publicKey:
        "3a7a141eccbb86791845e85708c210c4641711bb19d2754d59c08ba21fc91d436bc82f26aeed03d56d33ae4c56a43a75ba316b0911bc981e80",
      message:
        "54686520717569636b2062726f776e20666f78206a756d7073206f76657220746865206c617a7920646f67",
      signature:
        "789dd9e1a4471c30cfef1da68076542e6918676424593936dbeb282f5929dcfa3437aef85fd890999ea7a1b16a2c8c3a8cf330c58768789b006b183034ec43acab783039d53fe46f6c39ab29f988a43371d07fe7746a2fd45c660f2a8c441446b8f1cdbfc0787e4cfe69280e5cd7b92d0400",
    },
  ],
  [
    "Golang 2",
    {
      privateKey:
        "1edc2069350104b5594c602f7967c4b1580f2a757fc9a2745f621868cd333c245ec3c775d730d3c01a2e18f3e5d0b5e767ed3ec77e69732781",
      publicKey:
        "3a7a141eccbb86791845e85708c210c4641711bb19d2754d59c08ba21fc91d436bc82f26aeed03d56d33ae4c56a43a75ba316b0911bc981e80",
      message:
        "54686520717569636b2062726f776e20666f78206a756d7073206f76657220746865206c617a7920646f67",
      signature:
        "789dd9e1a4471c30cfef1da68076542e6918676424593936dbeb282f5929dcfa3437aef85fd890999ea7a1b16a2c8c3a8cf330c58768789b006b183034ec43acab783039d53fe46f6c39ab29f988a43371d07fe7746a2fd45c660f2a8c441446b8f1cdbfc0787e4cfe69280e5cd7b92d0400",
    },
  ],
];

function toArray(hexString: string) {
  return Array.from(Buffer.from(hexString, "hex"));
}

describe("Ed448", () => {
  it("signature matches for generated keys", () => {
    const privateKey = random(57);
    const publicKey = Ed448.getPublicKey(privateKey);
    expect(publicKey).toHaveLength(57);

    const message = Array.from(Buffer.from("testing content"));

    const signature = Ed448.sign(privateKey, message);
    expect(signature).toHaveLength(114);

    expect(Ed448.verify(publicKey, message, signature)).toBe(true);
  });

  it("changed signature doesn't validate", () => {
    const privateKey = random(57);
    const publicKey = Ed448.getPublicKey(privateKey);
    const message = Array.from(Buffer.from("testing content"));
    const signature = Ed448.sign(privateKey, message);
    signature[1] = signature[1] ? 0x00 : 0x01;

    expect(Ed448.verify(publicKey, message, signature)).toBe(false);
  });

  it.each(VECTORS)("matches test vector from RFC: '%s'", (_, vector) => {
    const privateKey = toArray(vector.privateKey);
    const publicKey = Ed448.getPublicKey(privateKey);
    expect(publicKey).toEqual(toArray(vector.publicKey));

    const message = toArray(vector.message);
    const context = vector.context ? toArray(vector.context) : null;
    const signature = Ed448.sign(privateKey, message, context);
    expect(signature).toEqual(toArray(vector.signature));

    expect(Ed448.verify(publicKey, message, signature, context)).toBe(true);
  });

  it("fails with missing input", () => {
    const missing = (null as unknown) as number[];
    expect(() => Ed448.getPublicKey(missing)).toThrow();

    expect(() => Ed448.sign(missing, [])).toThrow();
    expect(() => Ed448.sign(random(57), missing)).toThrow();
  });

  it("fails with invalid size of input", () => {
    expect(() => Ed448.getPublicKey(random(58))).toThrow();
    expect(() => Ed448.getPublicKey(random(56))).toThrow();
  });
});
