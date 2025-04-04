---
description: Public RPC endpoints are available for the Calibration testnet.
---

# RPCs

{% hint style="info" %}
[Chainlist](https://chainlist.org/?search=filecoin\&testnets=true) contains a dynamically updated list of available Filecoin RPCs. Select **Include Testnets** to view available test networks. [Find out more at chainlist.org's Filecoin listings](https://chainlist.org/?search=filecoin\&testnets=true).
{% endhint %}

These endpoints are limited to [read-only Filecoin JSON RPC API calls](../../reference/json-rpc/) and [`MPoolPush`](../../reference/json-rpc/mpool.md) for sending messages that have already been signed.

## [Ankr](https://www.ankr.com/rpc/filecoin)

* HTTPS: `https://rpc.ankr.com/filecoin_testnet`
* [Ankr documentation](https://www.ankr.com/docs/rpc-service/chains/chains-list/#filecoin)

## [ChainupCloud](https://cloud.chainup.com)

* HTTPS: `https://filecoin-calibration.chainup.net/rpc/v1`
* WebSocket: `wss://filecoin-calibration.chainup.net/rpc/v1`
* [ChainupCloud documentation](https://docs.chainupcloud.com/blockchain-api/filecoin/public-apis)

## [dRPC](https://drpc.org/chainlist/filecoin)

* HTTPS: `https://filecoin.drpc.org`
* WebSocket: `wss://filecoin.drpc.org`
* [dRPC documentation](https://docs.drpc.org/)

## [Glif](https://api.calibration.node.glif.io)

Please note that publicly available hosted endpoints **only guarantee 2000 of the latest blocks.**

* HTTPS: `https://api.calibration.node.glif.io/rpc/v1`
* WebSocket: `wss://wss.calibration.node.glif.io/apigw/lotus/rpc/v1`
* Lotus lite-node command:

```
FULLNODE_API_INFO=wss://wss.calibration.node.glif.io/apigw/lotus lotus daemon --lite
```

* When using a lite-node, omit `/rpc/v1` from Glif’s WebSocket address.
* [Glif documentation](https://hosting.glif.io/)


[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/networks/calibration/rpcs)
