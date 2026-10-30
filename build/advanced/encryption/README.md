---
description: >-
  Encrypt private files before storing them on Filecoin. Derive recoverable
  keys, upload encrypted data, and retrieve and decrypt a file.
---

# Encryption

Store private files on Filecoin while keeping control of who can read them. Client-side encryption lets storage providers hold and serve your data without access to its contents.

Your application encrypts each file before upload. Filecoin stores the encrypted bytes, and providers can prove they hold those bytes without decrypting them. A reader downloads the encrypted file and uses the appropriate key to restore its contents. This combines verifiable storage with confidentiality: providers can demonstrate that they are storing your data while the keys remain under your application's control.

Keysmith manages key derivation, recovery, and sharing. It derives file keys from a signature made by the owner's wallet. Public recovery metadata travels with each encrypted file, allowing the owner to regenerate its key using a compatible wallet rather than maintain a separate secret-key backup for every file. Your application can share access to individual files or groups of files without sharing the owner's wallet credentials.

This guide uses Keysmith to derive keys, Filecoin Encryption Envelope to encrypt and decrypt files, and the Synapse SDK to upload and retrieve the encrypted data.

File contents are encrypted; public envelope metadata remains visible. Recovery requires a compatible owner wallet and access to the encrypted files.

Encrypted bytes may be publicly retrievable; reading their contents requires the decryption key.

## Before you start

This example uses **Node.js 24** and a dedicated owner account on **Calibration**. You'll need test FIL for transaction fees and test USDFC for storage. Follow [Get test tokens](../../developing-contracts/get-test-tokens.md) to fund the test account created below with both tokens. An upload session key cannot derive the owner's encryption keys.

Add `@filoz/keysmith` and `filecoin-encryption-envelope` alongside your existing SDK dependencies. The setup below includes the tested versions and a required security override.

Encrypt the file in your application before calling `synapse.storage.upload()`. Synapse uploads the bytes you provide.

The complete example includes SDK initialization. When adapting it to an existing application, reuse your configured Synapse client and owner account. Key derivation and encryption belong before the upload; decryption belongs after the download.

The example buffers a small file, its encrypted bytes, and the decrypted result in memory. For larger files, use the [streaming encryption API](https://github.com/FilOzone/synapse-sdk/blob/master/packages/filecoin-encryption-envelope/README.md#encrypt-and-decrypt-a-stream).

## Set up a test project and account

The setup commands use a POSIX shell, available on macOS, Linux, and Windows through WSL.

Create an ESM project and install the packages. The override selects a [security-fixed version of Zod](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5), a validation dependency:

```sh
mkdir filecoin-encryption
cd filecoin-encryption
npm init -y
npm pkg set type=module
npm pkg set overrides.zod=4.6.6
npm install @filoz/synapse-sdk@2.0.2 @filoz/keysmith@0.1.0 filecoin-encryption-envelope@0.1.0 viem@2.55.19
printf '.env\nnode_modules/\n' > .gitignore
```

Create the test account and save its private key locally:

```sh
node --input-type=module <<'JS'
import { writeFileSync } from 'node:fs'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'

const key = generatePrivateKey()
writeFileSync('.env', `PRIVATE_KEY=${key}\n`, { flag: 'wx', mode: 0o600 })
console.log(privateKeyToAccount(key).address)
JS
```

Fund the printed address with test FIL and test USDFC using the [Calibration faucets](../../developing-contracts/get-test-tokens.md#calibration-testnet). Keep `.env` local: anyone holding its private key can use the account and derive its encryption keys. The command refuses to overwrite an existing `.env` file.

Create a sample file large enough to meet the storage minimum:

```sh
node --input-type=module -e "import { writeFileSync } from 'node:fs'; writeFileSync('sample.txt', 'A sample file for Filecoin encryption.\n'.repeat(32))"
```

## Encrypt, upload, and decrypt

Save the following as `encrypt-file.ts`. Keysmith creates a keyspace for the encryption keys and uses the `documents` scope within it. A fresh salt derives a unique key for this file.

Keep the generated recovery labels in the envelope and record the keyspace identifier and commitment in the data set metadata. The example does both. No encryption keys are written on-chain.

```ts
import { deepStrictEqual } from 'node:assert'
import { readFile, writeFile } from 'node:fs/promises'
import * as Keysmith from '@filoz/keysmith'
import { Synapse, calibration } from '@filoz/synapse-sdk'
import * as fee from 'filecoin-encryption-envelope'
import { privateKeyToAccount } from 'viem/accounts'

const privateKey = process.env.PRIVATE_KEY
if (!privateKey || !/^0x[0-9a-fA-F]{64}$/.test(privateKey)) {
  throw new Error('Set PRIVATE_KEY to your dedicated test account private key')
}
const account = privateKeyToAccount(privateKey as `0x${string}`)
const synapse = Synapse.create({
  account,
  chain: calibration,
  source: 'encryption-quickstart',
})
const original = new Uint8Array(await readFile('sample.txt'))

// 1. Derive the encryption key and public envelope metadata.
const ref = { owner: account.address, keyspace: Keysmith.newKeyspace() }
const { kk: keyspaceKey, commitment, descriptor } = await Keysmith.keyspaceKeys(account, ref)
const target = Keysmith.writeTarget(descriptor, keyspaceKey, 'documents')
const salt = Keysmith.newSalt()
const key = Keysmith.pieceKey(target.key, salt)
const appMetadata = Keysmith.pieceMetadata(target.ref, { salt, scope: target.scope })

// 2. Finish encryption before preparing storage or uploading bytes.
const encrypted = await through(original, fee.encrypt({
  cek: key,
  appMetadata,
  contentLength: original.byteLength,
}))
const metadata = {
  [Keysmith.KEYSPACE_ID_KEY]: ref.keyspace,
  [Keysmith.COMMITMENT_KEY]: commitment,
}
const contexts = await synapse.storage.createContexts({ metadata })
const preparation = await synapse.storage.prepare({
  context: contexts,
  pieceSizes: [BigInt(encrypted.byteLength)],
})
if (preparation.transaction) await preparation.transaction.execute()

// 3. Upload with the default two copies and check the result.
const result = await synapse.storage.upload(encrypted, { metadata })
console.log('PieceCID:', result.pieceCid.toString())
console.log('Data sets:', result.copies.map(copy => copy.dataSetId.toString()))
if (!result.complete) {
  throw new Error(`Incomplete upload: stored ${result.copies.length} of ${result.requestedCopies} requested copies`)
}

// 4. Download, fully decrypt, and compare before saving the restored file.
const downloaded = await synapse.storage.download({ pieceCid: result.pieceCid })
const restored = await through(downloaded, fee.decrypt(Keysmith.keyResolver(keyspaceKey, descriptor)))
deepStrictEqual(restored, original)
await writeFile('restored.txt', restored)
console.log(`Verified: ${restored.byteLength} bytes match the original file`)

async function through(
  bytes: Uint8Array,
  transform: ReadableWritablePair<Uint8Array, Uint8Array>,
): Promise<Uint8Array> {
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes)
      controller.close()
    },
  })
  const chunks: Uint8Array[] = []
  let length = 0
  const reader = source.pipeThrough(transform).getReader()
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
      length += value.byteLength
    }
  } finally {
    reader.releaseLock()
  }
  const output = new Uint8Array(length)
  let offset = 0
  for (const chunk of chunks) {
    output.set(chunk, offset)
    offset += chunk.byteLength
  }
  return output
}
```

Storage preparation uses the encrypted size, including the envelope and authentication overhead. It may submit a funding and approval transaction from the test account. Uploading creates paid storage copies on Calibration.

The helper consumes the entire stream before returning bytes. If encryption or decryption fails, it throws; an incomplete restored file is never saved.

## Run the example

```sh
node --env-file=.env encrypt-file.ts
```

Success prints a PieceCID, the replica data set IDs, and a verification message. `restored.txt` matches `sample.txt` byte for byte. Keep the PieceCID and data set IDs to retrieve this upload later.

Each run creates a new keyspace and new data sets. In an application, read and reuse existing data set metadata when adding files to that keyspace. Generate a fresh salt and piece key for every encryption attempt.

## If the example fails

- **Funding or approval fails:** check the test account's FIL and USDFC balances and replenish them using the [Calibration faucets](../../developing-contracts/get-test-tokens.md#calibration-testnet).
- **Only some copies succeed:** those copies are already stored and billed. Inspect `result.copies` and `result.failedAttempts` before retrying.
- **Decryption fails:** check that the key and envelope belong to the same keyspace. Modified or truncated encrypted data also fails authentication; do not use partial output.

For recovery, sharing, and storage permissions, see [Keys and sharing](keys-and-sharing.md).
