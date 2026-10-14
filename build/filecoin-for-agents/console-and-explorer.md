---
description: >-
  The Filecoin Pay console, where wallet owners approve agent session keys and
  fund storage, and PDP Explorer, where anyone can look up stored data.
---

# Console and explorer

`filecoin` relies on two web apps:

* **The Filecoin Pay console** at [pay.filecoin.cloud/console](https://pay.filecoin.cloud/console). The wallet owner connects their wallet there to approve session keys, deposit USDFC, approve the Warm Storage service, and revoke keys.
* **PDP Explorer** at [pdp.filecoin.cloud](https://pdp.filecoin.cloud). Public pages for storage providers, data sets, and pieces on mainnet and Calibration. Search by data set ID, provider ID, or PieceCID.

## Session keys

A session key lets a tool sign storage requests for your wallet. It can create data sets, add pieces, schedule piece removals, and end service, but it can never move funds.

The console's [Session keys page](https://pay.filecoin.cloud/console/session-keys) lists every key your wallet approved, with when each permission expires. Revoke a key there to stop the tool that holds it. You can also create a key there, approve it, and download its credentials, which is how a [cloud agent](connect-an-agent.md#cloud-agents) gets a key.

Keys made by `filecoin login` stay on the agent's machine. The console only approves them.

## Links from the CLI

When `filecoin` needs the wallet owner, it returns a console link with the request filled in. You review it, connect your wallet, and approve it. Nothing is signed until you confirm in your wallet.

| Link | Opens | Sent by |
| --- | --- | --- |
| `/console/session-keys?authorize=<address>&scopes=<scopes>&network=<network>` | The Session keys page, ready to approve the session key `<address>` for the listed scopes | `filecoin login` |
| `/console?deposit=<USDFC>&operator=fwss&network=<network>` | A dialog that deposits `<USDFC>` and approves the Warm Storage service in one transaction | `filecoin status`, `filecoin put`, and `filecoin login` when the account needs funds |
| `/console/session-keys?revoke=<address>&network=<network>` | The revoke dialog for the session key `<address>` | `filecoin logout` |

`scopes` is a comma-separated list of `createDataSet`, `addPieces`, `schedulePieceRemovals`, and `terminateService`. `network` is `mainnet` or `calibration`. The console refuses to fill in a request when the connected wallet is on the other network, so an approval for Calibration is never granted on mainnet by mistake.

{% hint style="info" %}
The console is in beta and interacts directly with the Filecoin Pay contracts. Check the details in your wallet before you confirm a transaction.
{% endhint %}

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/filecoin-for-agents/console-and-explorer)
