---
description: >-
  Encrypt private files before storing them on Filecoin. Derive recoverable
  keys, upload encrypted data, and retrieve and decrypt a file.
---

# Encryption

Encrypt files in your application before you upload them, so your data is private from upload. Storage providers hold and serve the encrypted bytes and can prove they hold them, but cannot read them. Only someone with the key can decrypt a file.

The encrypted bytes may be publicly retrievable, but reading your data requires the key. The owner address, keyspace identifier, and scope name stored with each file are visible without a key.

Use this guide if your application stores data that only selected people or services should read, such as user files or agent memory.

This guide uses Keysmith to derive keys, Filecoin Encryption Envelope to encrypt and decrypt files, and the Synapse SDK to upload and retrieve the encrypted data. Keysmith derives the keys from a signature made by the owner's wallet, so the owner can derive them again with the same wallet. For how the keys work, see [Keysmith encryption keys](https://docs.filecoin.cloud/developer-guides/encryption/keysmith-encryption-keys/).

## Before you start

This example uses **Node.js 24** and a dedicated owner account on **Calibration**. You'll need test FIL for transaction fees and test USDFC for storage. Follow [Get test tokens](../../developing-contracts/get-test-tokens.md) to fund the test account created below with both tokens.

Use the owner account, not a session key. A session key [cannot derive the owner's encryption keys](https://docs.filecoin.cloud/developer-guides/encryption/share-encrypted-data/#share-a-keyspace-or-scope-with-a-session-key).

Add `@filoz/keysmith` and `filecoin-encryption-envelope` alongside your existing SDK dependencies. The setup below pins the package versions.

Synapse uploads the bytes you give it, so encrypt the file before calling `synapse.storage.upload()`. In an existing application, reuse your Synapse client and owner account: derive the key and encrypt before the upload, and decrypt after the download.

The example buffers a small file, its encrypted bytes, and the decrypted result in memory. For larger files, use the [streaming encryption API](https://github.com/FilOzone/synapse-sdk/blob/master/packages/filecoin-encryption-envelope/README.md#encrypt-and-decrypt-a-stream).

## Set up a test project and account

The setup commands use a POSIX shell, available on macOS, Linux, and Windows through WSL.

Create an ESM project and install the packages:

```sh
mkdir filecoin-encryption
cd filecoin-encryption
npm init -y
npm pkg set type=module
npm install @filoz/synapse-sdk@3.0.0 @filoz/keysmith@0.1.0 filecoin-encryption-envelope@0.1.1 viem@2.57.20
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

Each run creates a new keyspace and new data sets. In an application, read the keyspace identifier and commitment back from the data set metadata when adding files to that keyspace, as described in [Recovery metadata](https://docs.filecoin.cloud/developer-guides/encryption/keysmith-encryption-keys/#recovery-metadata). Generate a fresh salt and piece key for every encryption attempt.

## If the example fails

- **Funding or approval fails:** check the test account's FIL and USDFC balances and replenish them using the [Calibration faucets](../../developing-contracts/get-test-tokens.md#calibration-testnet).
- **Only some copies succeed:** those copies are already stored and billed. Inspect `result.copies` and `result.failedAttempts` before retrying. See [When upload returns](https://docs.filecoin.cloud/developer-guides/storage/upload-pipeline/#when-upload-returns).
- **Decryption fails:** check that the key and envelope belong to the same keyspace. Modified or truncated encrypted data also fails authentication; do not use partial output.

For recovery, sharing, and storage permissions, see [Keys and sharing](keys-and-sharing.md).

{% hint style="success" %}
**Ready to store encrypted data on mainnet?** Open the [Filecoin Cloud console](https://pay.filecoin.cloud/console?utm_source=docs&utm_medium=encryption&utm_campaign=relaunch&foc_ref=docs-encryption) to fund your account and add the storage service. Encryption works the same way on mainnet: derive the key and encrypt each file before you upload it.
{% endhint %}
