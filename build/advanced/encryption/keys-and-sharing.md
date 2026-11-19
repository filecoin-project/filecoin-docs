---
description: >-
  Recover encryption keys, share access to encrypted files, and manage
  permissions for data stored on Filecoin.
---

# Keys and sharing

Keysmith derives every encryption key from one signature made by the owner's wallet.

Start with [Encryption](README.md) for a working example.

## Keyspaces and scopes

* A **keyspace** is an identifier your application chooses for one tree of keys. Its root key comes from the owner's wallet signature. The identifier does not depend on a data set or provider, so every copy of a piece opens with the same key.
* A **scope** groups pieces within a keyspace. Scopes nest with `/`: a holder of the `app-data` key can derive the key for `app-data/notes`, but not for a parent or sibling scope.
* Each **piece** gets its own key, derived from a random salt. Generate a fresh salt for every encrypted object, including a replacement for an existing file.

Settle your scope names before you write data:

* The scope path is part of the key. Names are case-sensitive, and renaming or moving a scope changes the keys beneath it.
* Scope names are stored unencrypted with each piece. Use opaque identifiers when a descriptive name would reveal something sensitive.

For the full model and examples, see [A tree of keys](https://docs.filecoin.cloud/developer-guides/encryption/keysmith-encryption-keys/#a-tree-of-keys) and [Fine-tuning access to encryption keys](https://docs.filecoin.cloud/developer-guides/encryption/keysmith-encryption-keys/#fine-tuning-access-to-encryption-keys).

## Recovery metadata

Encryption keys stay off chain. Two public records let the owner find the right key again:

* Each piece's envelope records the owner, keyspace, scope, and salt. It travels with the encrypted bytes.
* Data set metadata records the keyspace identifier and a public commitment used to check a recovered key.

Synapse does not add the data set entries for you. Pass them through the SDK's `metadata` option, as the [example](README.md#encrypt-upload-and-decrypt) does. Anyone can read both records, so do not put secrets in them.

For the fields and the code that writes them, see [Recovery metadata](https://docs.filecoin.cloud/developer-guides/encryption/keysmith-encryption-keys/#recovery-metadata).

## Recover keys

Recovery needs the owner's wallet and the encrypted bytes. It cannot recover a lost wallet or deleted data.

* The wallet must be an externally owned account (EOA) that produces the same signature every time it signs the same message. Smart-contract accounts cannot create a keyspace.
* Approve key-derivation requests only in applications you trust. Anyone who obtains that signature can derive every key in the keyspace.
* Pass the commitment from the data set metadata when you have it. The wallet then signs once, and Keysmith rejects a key that does not match. Without a commitment, the wallet signs twice.

For the steps and code, see [Recover keys](https://docs.filecoin.cloud/developer-guides/encryption/keysmith-encryption-keys/#recover-keys).

## Share access

To share encrypted data, give the recipient a key wrapped in a **grant**. Your application delivers and stores the grant. Nothing is written on chain, and the encrypted piece does not change.

| Key shared | What the recipient can decrypt |
| --- | --- |
| Keyspace key | Every piece in the keyspace. |
| Scope key | Pieces in that scope and its descendants, including future pieces. |
| Piece key | One piece. Keysmith refuses piece grants for writing new objects. |

* A shared key cannot be taken back and does not expire. Share the narrowest key that does the job.
* The recipient needs a local private key to open a grant. A browser wallet that keeps its private key inaccessible cannot open one directly.
* Keep the complete grant with its key. Keysmith uses the grant to check what the key covers.
* A grant does not prove who issued it. Check that it names the owner and keyspace you expect before you encrypt new data with its key.

For the code, see [Share a keyspace or scope with a session key](https://docs.filecoin.cloud/developer-guides/encryption/share-encrypted-data/#share-a-keyspace-or-scope-with-a-session-key), [Encrypt and decrypt with a received grant](https://docs.filecoin.cloud/developer-guides/encryption/share-encrypted-data/#encrypt-and-decrypt-with-a-received-grant), and [Share one piece](https://docs.filecoin.cloud/developer-guides/encryption/share-encrypted-data/#share-one-piece).

## Permissions and access changes

A keyspace or scope key lets its holder both encrypt and decrypt beneath it. Permission to store data is separate: a session key that uploads encrypted data needs [storage permissions](https://docs.filecoin.cloud/developer-guides/session-keys/#permissions) as well as a grant. Keep the two aligned.

Revoking a session key does not remove encryption keys already shared, and creating a child scope leaves an ancestor-key holder with access. To exclude a key holder from new versions of your data, create a new keyspace and encrypt the new versions with its keys. Keys and copies shared earlier remain usable. See [Limits](https://docs.filecoin.cloud/developer-guides/encryption/share-encrypted-data/#limits).

For API details, see the [Keysmith reference](https://docs.filecoin.cloud/reference/filoz/keysmith/toc/) and the [encryption envelope](https://github.com/FilOzone/synapse-sdk/blob/master/packages/filecoin-encryption-envelope/README.md).
