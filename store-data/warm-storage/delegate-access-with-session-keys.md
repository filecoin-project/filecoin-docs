---
description: >-
  A session key signs storage operations for your wallet without being able to
  move funds; authorize one with limited permissions and an expiry, then
  revoke it when done.
---

# Delegate access with session keys

**A session key lets an app, script or agent store data for your wallet without holding your wallet key.** It can create data sets, add files, delete files and end service, but it can never move your funds. Each permission expires, and you can revoke the key at any time.

## When to use one

* **Apps:** users approve once, instead of a wallet popup for every upload.
* **AI agents:** the agent gets a key it can use, never your wallet key.
* **CI and cloud agents:** a key stored as a secret, which you can revoke when the job is done.

## What a session key can do

| Permission | Lets the key | CLI scope |
| --- | --- | --- |
| Create data sets | Start a new data set with a provider | `createDataSet` |
| Add pieces | Upload files to a data set | `addPieces` |
| Schedule piece removals | Delete files | `schedulePieceRemovals` |
| Terminate service | End a data set | `terminateService` |

No permission lets a session key move funds. You fund your account from your own wallet.

## Create and approve a key

{% tabs %}
{% tab title="Agent" %}
**Local agents** (Claude Code, Codex, Cursor): the first time the agent stores data, it runs `filecoin login`. This makes a key and opens a link on the Filecoin dashboard. Connect your wallet and approve the key there.

**Cloud agents**, whose files are deleted when the session ends:

1. On the dashboard's [Session keys page](https://poc.filecoin.cloud/dashboard/session-keys), create a key with at least `createDataSet` and `addPieces`.
2. In the agent's environment settings, add the key as the secret `FILECOIN_SESSION_KEY`, and your wallet address as `FILECOIN_ROOT_ADDRESS`.

Never paste a session key into a chat. Store it only as a secret.
{% endtab %}

{% tab title="CLI" %}
```sh
filecoin login
```

This makes a key, saves it on your machine, and opens the dashboard so you can approve it. By default it asks for `createDataSet`, `addPieces` and `schedulePieceRemovals`; add others with `--scopes`. `filecoin status` shows when each permission expires.
{% endtab %}

{% tab title="SDK" %}
Create a key, approve it from the main wallet, then pass it to `Synapse`:

```ts
import * as SessionKey from "@filoz/synapse-core/session-key"
import { generatePrivateKey } from "viem/accounts"

const sessionKey = SessionKey.fromSecp256k1({
  privateKey: generatePrivateKey(),
  root: rootAccount,
  chain: calibration,
})

// The main wallet approves the key onchain
await SessionKey.loginSync(rootClient, { address: sessionKey.address })

const synapse = Synapse.create({
  account: rootAccount,
  chain: calibration,
  transport: http(rpcUrl),
  sessionKey,
})
```
{% endtab %}
{% endtabs %}

## Expiry

Permissions expire. In the SDK the default is one hour. When a permission expires, approve the key again: run `filecoin login` again, or call `loginSync` again in the SDK.

## Revoke a key

* **Dashboard:** revoke it on the [Session keys page](https://poc.filecoin.cloud/dashboard/session-keys). This works for keys made by any tool.
* **SDK:** `await SessionKey.revokeSync(rootClient, { address: sessionKey.address })`

`filecoin logout` only deletes the key from your machine. The key stays approved until it expires or you revoke it.

## Next steps

* [Session keys reference](../../reference/filecoin-sdk/session-keys.md): the full API, custom permissions and expiry tracking.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data/warm-storage/delegate-access-with-session-keys)
