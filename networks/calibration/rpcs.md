---
description: Public RPC endpoints are available for the Calibration testnet.
---

# RPCs

These endpoints are limited to [read-only Filecoin JSON RPC API calls](../../reference/json-rpc/) and [`MPoolPush`](../../reference/json-rpc/mpool.md) for sending messages that have already been signed.

{% hint style="info" %}
[ChainID.network](https://chainid.network) contains a dynamically updated list of available RPCs along with stats like current block-height and latency. [Find out more at chainid.network](https://chainid.network). Select the filter icon and click **Show Testnets** to view available test networks.
{% endhint %}

## [Ankr](https://www.ankr.com/rpc/filecoin)

* HTTPS: `https://rpc.ankr.com/filecoin_testnet`
* [Ankr documentation](https://www.ankr.com/docs/rpc-service/chains/chains-list/#filecoin)

## [ChainupCloud](https://cloud.chainup.com)

* HTTPS: `https://filecoin-calibration.chainup.net/rpc/v1`
* WebSocket: `wss://filecoin-calibration.chainup.net/rpc/v1`
* [ChainupCloud documentation](https://docs.chainupcloud.com/blockchain-api/filecoin/public-apis)

## [ChainStack](https://chainstacklabs.com)

* HTTPS: `https://filecoin-calibration.chainstacklabs.com/rpc/v1`
* WebSocket: `wss://ws-filecoin-calibration.chainstacklabs.com/rpc/v1`
* [Chainstack documentation](https://chainstack.com/labs/#filecoin)

## [Glif](https://glif.io)

Please note that publicly available hosted endpoints **only guarantee 2000 of the latest blocks.**

* HTTPS: `https://api.calibration.node.glif.io/rpc/v1`
* WebSocket: `wss://wss.calibration.node.glif.io/apigw/lotus/rpc/v1`
* Lotus lite-node command:

```
FULLNODE_API_INFO=wss://wss.calibration.node.glif.io/apigw/lotus lotus daemon --lite
```

* When using a lite-node, omit `/rpc/v1` from Glif’s WebSocket address.
* [Glif documentation](https://hosting.glif.io/)
