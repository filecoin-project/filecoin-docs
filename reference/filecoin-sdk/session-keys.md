---
description: >-
  Filecoin SDK functions to create, approve, check and remove session keys.
---

# Filecoin SDK session keys

**A session key is a short-lived key your wallet approves once.** After that, it signs storage actions for you, so users don't see a wallet popup each time. It can't move funds.

For the step-by-step guide, see [Delegate access with session keys](../../store-data/warm-storage/delegate-access-with-session-keys.md).

## Example

```ts
import * as SessionKey from "@filoz/synapse-core/session-key"
import { calibration } from "@filoz/synapse-core/chains"
import { generatePrivateKey } from "viem/accounts"

// 1. Make a session key
const sessionKey = SessionKey.fromSecp256k1({
  privateKey: generatePrivateKey(),
  root: rootAccount, // your main wallet
  chain: calibration,
})

// 2. Approve it from your main wallet (1 hour by default)
await SessionKey.loginSync(rootClient, { address: sessionKey.address })
await sessionKey.syncExpirations()

// 3. Use it
const synapse = Synapse.create({ account: rootAccount, chain: calibration, sessionKey })
```

## Permissions

| Constant | Lets the key |
| --- | --- |
| `CreateDataSetPermission` | Create data sets |
| `AddPiecesPermission` | Add pieces to data sets |
| `SchedulePieceRemovalsPermission` | Delete pieces |
| `TerminateServicePermission` | End storage for a data set |

`DefaultFwssPermissions` is all four. You can also pass any `bytes32` value as a custom permission.

## Functions

From `@filoz/synapse-core/session-key`:

| Function | What it does |
| --- | --- |
| `fromSecp256k1({ privateKey, root, chain })` | Make a session key. It does nothing until approved |
| `login(rootClient, { address, permissions?, expiresAt? })` | Approve the key onchain. Returns the transaction hash |
| `loginSync(...)` | Same, and waits for the transaction |
| `revoke(rootClient, { address, permissions? })` | Remove permissions. Returns the transaction hash |
| `revokeSync(...)` | Same, and waits for the transaction |
| `authorizationExpiry(client, { address, sessionKeyAddress, permission })` | When one permission ends. `0n` if never approved |
| `getExpirations(client, { address, sessionKeyAddress, permissions })` | When each permission ends |

On the session key object:

| Method or field | What it does |
| --- | --- |
| `client` | A viem client that signs with the session key. Pass it to Core functions |
| `address`, `rootAddress` | The session key's address and your main wallet's address |
| `syncExpirations()` | Read end times from the chain |
| `hasPermission(p)`, `hasPermissions([...])` | Check end times saved on your machine |
| `watch()`, `unwatch()` | Follow permission changes live |

## Options in `Synapse.create`

| Option | What it does |
| --- | --- |
| `sessionKey` | Sign storage actions with this key |
| `requiredPermissions` | Permissions to check when the SDK starts. Default: all four |

`Synapse.create` fails if a needed permission is missing or has ended. The SDK does not check permissions on each action. If a key lacks a permission, the transaction fails onchain.

## When a key ends

Keys end at the time set in `login()`. The SDK does not renew them. For long sessions, call `syncExpirations()` now and then and run `login()` again before the end time.

The contract is the Session Key Registry. Its addresses are in [Contract addresses](../contracts/addresses.md).

Every function, with its inputs and outputs: [Session key API](https://docs.filecoin.cloud/reference/filoz/synapse-core/session-key/toc/).

## Next steps

* [Filecoin SDK Core](README.md): the functions session keys plug into.
* [Filecoin SDK storage operations](storage-operations.md): the storage methods session keys sign for.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/reference/filecoin-sdk/session-keys)
