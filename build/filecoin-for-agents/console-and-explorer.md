---
description: >-
  The filecoin-app dashboard, where wallet owners approve agent session keys and
  fund storage, and PDP Explorer, where anyone can look up stored data.
---

# Console and explorer

`filecoin` relies on two web apps:

* **The filecoin-app dashboard** at [poc.filecoin.cloud/dashboard](https://poc.filecoin.cloud/dashboard). The wallet owner connects their wallet there to approve session keys, deposit USDFC, approve the Warm Storage service, and revoke keys. While `filecoin` is a prototype, it uses this app instead of the [Filecoin Pay console](https://pay.filecoin.cloud/console).
* **PDP Explorer** at [pdp.filecoin.cloud](https://pdp.filecoin.cloud). Public pages for storage providers, data sets, and pieces on mainnet and Calibration. Search by data set ID, provider ID, or PieceCID.

## Check balances, messages and contracts

PDP Explorer is for storage providers, data sets and pieces. For general chain activity, choose a block explorer or a read-only JSON-RPC endpoint for the same network as the operation you are investigating.

| Network | EVM chain ID | Native Filecoin explorer | FEVM explorer | JSON-RPC endpoints |
| --- | --- | --- | --- | --- |
| Mainnet | `314` | [Filfox](https://filfox.info/en/) | [Blockscout](https://filecoin.blockscout.com/) | [Mainnet RPCs](../../networks-and-tools/networks/mainnet/rpcs.md) |
| Calibration | `314159` | [Filfox](https://calibration.filfox.info) | [Blockscout](https://filecoin-testnet.blockscout.com) | [Calibration RPCs](../../networks-and-tools/networks/calibration/rpcs.md) |

More options are listed in the [mainnet explorer directory](../../networks-and-tools/networks/mainnet/explorers.md) and [Calibration explorer directory](../../networks-and-tools/networks/calibration/explorers.md). These are third-party services; features, availability and historical coverage vary.

Use the identifier returned by the original operation, not a transaction or address from another network:

* For a native Filecoin address, use a native explorer or the read-only [`Filecoin.WalletBalance`](../../reference/json-rpc/wallet.md#walletbalance) method. Its balance is in attoFIL, not USDFC or another token.
* For a native message CID, use a native explorer or [`Filecoin.ChainGetMessage`](../../reference/json-rpc/chain.md#chaingetmessage). The message contents alone do not establish execution success.
* For an EVM address, use the FEVM explorer or [`Filecoin.EthGetBalance`](../../reference/json-rpc/eth.md#ethgetbalance) for the native FIL balance, and [`Filecoin.EthGetCode`](../../reference/json-rpc/eth.md#ethgetcode) to inspect deployed bytecode at the selected block.
* For an EVM transaction hash, use the FEVM explorer or [`Filecoin.EthGetTransactionReceipt`](../../reference/json-rpc/eth.md#ethgettransactionreceipt). Inspect the receipt status, not just the presence of a transaction hash. An absent receipt is not evidence of success or failure.

Before an automated FEVM lookup, compare [`Filecoin.EthChainId`](../../reference/json-rpc/eth.md#ethchainid) with the expected chain ID above. Public RPC endpoints can have limited historical coverage; an unavailable old result may require an archival provider. No wallet connection, private key, session key or transaction submission is necessary for these public read-only checks.

## Session keys

A session key lets a tool sign storage requests for your wallet. It can create data sets, add pieces, schedule piece removals, and end service, but it can never move funds.

The dashboard's [Session keys page](https://poc.filecoin.cloud/dashboard/session-keys) lists every key your wallet authorized, with when each permission expires. Revoke a key there to stop the tool that holds it. You can also generate a key there, authorize it, and copy its private key with **Export key**, which is how a [cloud agent](connect-an-agent.md#cloud-agents) gets a key.

Keys made by `filecoin login` stay on the agent's machine. The dashboard only approves them.

## Links from the CLI

When `filecoin` needs the wallet owner, it returns a link to the dashboard's setup page with the request filled in. You review it, change anything you need, connect your wallet, and approve each step. Each step is its own wallet transaction, so nothing is signed until you confirm it in your wallet.

| Link | Opens | Sent by |
| --- | --- | --- |
| `/dashboard/setup?network=<network>&signer=<address>&name=<name>&scopes=<scopes>&days=<days>` | The setup page, ready to authorize the session key `<address>` for the listed scopes | `filecoin login` |
| `/dashboard/setup?network=<network>&deposit=<USDFC>` | The setup page, ready to deposit `<USDFC>`, with a step to approve the Warm Storage service when the wallet hasn't yet | `filecoin status` and `filecoin put` when the account needs funds |

`scopes` is a comma-separated list of `createDataSet`, `addPieces`, `schedulePieceRemovals`, and `terminateService`. `network` is `mainnet` or `calibration`. When the connected wallet is on the other network, the page asks you to switch before you can review the request, so an approval for Calibration is never granted on mainnet by mistake.

`filecoin logout` only deletes the key on your machine. To revoke the key on chain, use the [Session keys page](https://poc.filecoin.cloud/dashboard/session-keys).

{% hint style="info" %}
The dashboard is a prototype and interacts directly with the Filecoin Pay and Warm Storage contracts. Check the details in your wallet before you confirm a transaction.
{% endhint %}

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/filecoin-for-agents/console-and-explorer)
