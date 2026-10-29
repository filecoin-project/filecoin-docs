---
description: >-
  Recover encryption keys, share access to encrypted files, and manage
  permissions for data stored on Filecoin.
---

# Keys and sharing

Keysmith manages recoverable keys for encrypted files. The Filecoin Encryption Envelope library uses those keys to encrypt and decrypt file contents. Both run in your application before upload and after retrieval.

Start with [Encryption](README.md) for the complete storage example.

## Keyspaces and scopes

A **keyspace** is an application-chosen identifier for a tree of encryption keys. Keysmith derives its root key from the owner's wallet signature. Its identifier is independent of data set and provider identifiers, so copying an encrypted piece to another provider does not change its key.

An **encryption scope** groups pieces within a keyspace. Scopes can contain other scopes: a holder of `app-data` can derive keys for `app-data/notes`, but a holder of `app-data/notes` cannot derive keys for its parent or sibling scopes.

Each **piece** gets its own key, derived from its scope key and a random salt. Generate a fresh salt and key for every new encrypted object, including a replacement for an existing file. A piece can also belong directly to the keyspace without a scope.

Scope paths affect key derivation. Keep identifiers stable, use `/` for nesting, and remember that case matters. Renaming or moving a scope changes its keys. Use opaque identifiers when descriptive names would expose sensitive information.

## Recovery metadata

Encryption keys stay off chain. The application supplies two kinds of public metadata:

| Location | What it records | Purpose |
| --- | --- | --- |
| Each piece's envelope | Owner, keyspace, scope, and salt | Identify the key needed to decrypt that piece. |
| Data set metadata | Keyspace identifier and a public commitment | Select keys for new writes and check a recovered key. |

Generate the envelope entries with [`pieceMetadata()`](https://github.com/FilOzone/synapse-sdk/blob/master/packages/keysmith/README.md#api). Pass the data set entries explicitly through the SDK's `metadata` option; Synapse does not derive or add them automatically.

The envelope travels with the encrypted piece and identifies its keyspace. Scope names, owner addresses, and salts are visible without a key. Do not put secrets in these fields.

## Recover keys

Recovery requires the owner's wallet, a compatible signer that produces the same signature for the same message, and access to the encrypted bytes and their envelopes. It cannot recover a lost wallet or missing stored data.

A compatible externally owned account (EOA) wallet can sign without exposing its private key. Keysmith requires ECDSA owner signatures; smart-contract accounts cannot initialize a keyspace.

Approve key-derivation requests only in applications you trust; anyone who obtains that signature can derive the keyspace's keys.

Read the keyspace from the piece's envelope and check that its owner matches the account you expect. Call [`keyspaceKeys()`](https://github.com/FilOzone/synapse-sdk/blob/master/packages/keysmith/README.md#api) with that keyspace and owner. Use a data set's commitment only when its keyspace matches the one in the envelope.

With a commitment, Keysmith signs once and checks the derived key against it. Without one, it signs twice to check deterministic signing.

Pass the recovered key to [`keyResolver()`](https://github.com/FilOzone/synapse-sdk/blob/master/packages/keysmith/README.md#api) when decrypting. Keysmith derives the piece key from that piece's metadata, even if its copy has moved to another data set.

## Share access

A **grant** wraps a key for a recipient. Your application delivers and stores the grant; issuing one does not require rewriting the encrypted piece or storing a key on chain.

| Key shared | What the recipient can decrypt |
| --- | --- |
| Keyspace key | Every piece in the keyspace. |
| Scope key | Pieces in that scope and its descendants, including future pieces. |
| Piece key | One piece. Keysmith refuses piece grants for writing new objects. |

Recipients need a local private key to unwrap grants. A browser wallet that keeps its private key inaccessible cannot unwrap one directly. Keep the complete grant alongside its key so Keysmith can check what the key covers. A bare grant does not prove who issued it; verify a received key's origin before using it for new uploads.

## Permissions and access changes

Holding a keyspace or scope key enables both encryption and decryption beneath it. Storage write permission is separate. When delegating uploads, align the session key's permissions with the encryption keys it receives.

Revoking a session key does not erase encryption keys already shared. Creating a child scope also leaves an ancestor-key holder with access. To exclude that holder from new versions, create a new keyspace and re-encrypt the content with new keys. Previously shared keys and copies remain usable.

For API details, see [Keysmith](https://github.com/FilOzone/synapse-sdk/blob/master/packages/keysmith/README.md#api) and the [encryption envelope](https://github.com/FilOzone/synapse-sdk/blob/master/packages/filecoin-encryption-envelope/README.md).
