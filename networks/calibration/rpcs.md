---
description: Public RPC endpoints are available for the Calibration testnet.
---

# RPCs

To check the blockheight, health and availability of Filecoin RPC endpoints, visit the [Beryx.io explorer's Filecoin RPC Provider status page](https://beryx.io/rpc-providers). Use the Filecoin logo dropdown at top to switch networks to Calibration testnet.

Chainlist also provides a dynamically updated list of [available Filecoin - Mainnet RPCs](https://chainlist.org/?search=filecoin\&testnets=false).

{% hint style="info" %} Please note that most publicly hosted endpoints only guarantee recent state, i.e. 2000 of the latest blocks (last 16.67 hours). To request an archival node you can contact a provider below. {% endhint %}

These endpoints are limited to the read-only [Filecoin JSON RPC API](../../reference/json-rpc/) including read-only [Filecoin Eth RPC](../../reference/json-rpc/eth.md) methods, except for the write operations [`MPoolPush`](../../reference/json-rpc/mpool.md#mpoolpush) and [`EthSendRawTransaction`](../../reference/json-rpc/eth.md#ethsendrawtransaction) for sending already signed messages.

## [Glif](https://api.calibration.node.glif.io)

* HTTPS: `https://api.calibration.node.glif.io/rpc/v1`
* WebSocket: `wss://wss.calibration.node.glif.io/apigw/lotus/rpc/v1`
* Lotus lite-node command:

```
FULLNODE_API_INFO=wss://wss.calibration.node.glif.io/apigw/lotus lotus daemon --lite
```

* When using a lite-node, omit `/rpc/v1` from Glif’s WebSocket address.
* [Glif documentation](https://hosting.glif.io/)

## [Ankr](https://www.ankr.com/rpc/filecoin)

* HTTPS: `https://rpc.ankr.com/filecoin_testnet`
* [Ankr documentation](https://www.ankr.com/docs/rpc-service/chains/chains-list/#filecoin)

## [ChainupCloud](https://cloud.chainup.com)

* HTTPS: `https://filecoin-calibration.chainup.net/rpc/v1`
* [ChainupCloud documentation](https://docs.chainupcloud.com/blockchain-api/filecoin/public-apis)


[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/networks/calibration/rpcs)
