# core-ed448 

MODIFIED TO FETCH CORE BLOCKCHAIN! 

NOT THE CLASSICAL ED448! 

PLEASE DO NOT USE OUTSIDE CORE BLOCKCHAIN

 Uses `jssha` for `SHAKE256` hash calculation.

## Installation

Using `npm`:

    npm install ed448-js

or `yarn`:

    yarn add ed448-js

Then include it in your code:

```ts
import createEd448 from "ed448-js";
```

## Usage

```ts
const Ed448 = createEd448();
```

### `getPublicKey(privateKey)`

Calculate public key from a provided private key

```ts
const privateKey = crypto.randomFillSync(new Uint8Array(57));
const publicKey = Ed448.getPublicKey(privateKey);
```

The private key can be any random generated byte-array of length 57

### `sign(privateKey, message, context?): number[]`

Calculate the EdDSA signature.
The result is represented as plain number array (length: 114). It can be converted using `Buffer.from`, or `Uint8Array.from`.

### `verify(publicKey, message, signature, context?): boolean`

Verify the EdDSA signature.
