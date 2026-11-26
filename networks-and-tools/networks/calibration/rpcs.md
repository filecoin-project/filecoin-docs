---
description: Public RPC endpoints are available for the Calibration testnet.
---

# RPCs

{% hint style="info" %}
[Chainlist](https://chainlist.org/?search=filecoin\&testnets=true) contains a dynamically updated list of available Filecoin RPCs. Select **Include Testnets** to view available test networks. [Find out more at chainlist.org's Filecoin listings](https://chainlist.org/?search=filecoin\&testnets=true).
{% endhint %}

These endpoints are limited to [read-only Filecoin JSON RPC API calls](../../../reference/json-rpc/) and [`MPoolPush`](../../../reference/json-rpc/mpool.md) for sending messages that have already been signed.

## [Ankr](https://www.ankr.com/rpc/filecoin)

* HTTPS: `https://rpc.ankr.com/filecoin_testnet`
* [Ankr documentation](https://www.ankr.com/docs/rpc-service/chains/chains-list/#filecoin)

## [Chain.Love](https://filecoin.chain.love/)

Please note that publicly available hosted endpoints **only guarantee 2000 of the latest blocks** and **60 requests a minute.**

* HTTPS: `https://calibration.filecoin.chain.love/rpc/v1`
* WebSocket: `wss://calibration.filecoin.chain.love/ws/rpc/v1`
* Lotus lite-node command:

```
FULLNODE_API_INFO=wss://calibration.filecoin.chain.love/ws lotus daemon --lite
```

* When using a lite-node, omit `/rpc/v1` from Chain.Love’s WebSocket address.
* [Chain.Love documentation](https://chain-love.gitbook.io/chain-love-docs/blockchains/filecoin)


[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/networks-and-tools/networks/calibration/rpcs)
