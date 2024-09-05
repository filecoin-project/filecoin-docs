---
description: Public RPC endpoints are available for the Filecoin mainnet.
---

# RPCs

{% hint style="info" %}
[Chainlist](https://chainlist.org/?search=filecoin&testnets=true) contains a dynamically updated list of available Filecoin RPCs. [Find out more at chainlist.org's Filecoin listings](https://chainlist.org/?search=filecoin&testnets=true).
{% endhint %}

These endpoints are limited to [read-only Filecoin JSON RPC API calls](../../reference/json-rpc/) and [`MPoolPush`](../../reference/json-rpc/mpool.md) for sending messages that have already been signed.

## [Ankr](https://ankr.com)

* HTTPS: `https://rpc.ankr.com/filecoin`
* [Supported Filecoin API methods](https://www.ankr.com/docs/rpc-service/chains/chains-list/#filecoin)

## [ChainupCloud](https://cloud.chainup.com)

* HTTPS: `https://filecoin.chainup.net/rpc/v1`
* WebSocket: `wss://filecoin.chainup.net/rpc/v1`
* [ChainupCloud documentation](https://docs.chainupcloud.com/blockchain-api/filecoin/public-apis)

## [Glif](https://api.node.glif.io)

Please note that publicly available hosted endpoints **only guarantee 2000 of the latest blocks.**

* HTTPS: `https://api.node.glif.io/rpc/v1`
* WebSocket: `wss://wss.node.glif.io/apigw/lotus/rpc/v1`
*   Lotus lite-node command:

    ```shell
    FULLNODE_API_INFO=wss://wss.node.glif.io/apigw/lotus lotus daemon --lite
    ```

    When using a lite-node, omit `/rpc/v1` from Glif’s WebSocket address.
* [Glif documentation](https://hosting.glif.io/)

* ## [GetBlock](https://getblock.io/nodes/fil/)

GetBlock offers users access to shared and dedicated nodes with a simple pricing model. Developers can try out their services with a free plan, after which paid options are available for continued access.

HTTPS: https://filecoin.getblock.io
[GetBlock documentation](https://getblock.io/docs/getblock-explorer/get-started/)

## [NOWNodes](https://nownodes.io/)

These nodes are available for free to users for the [first month](https://nownodes.io/pricing), after which the user will have to pay to maintain access.

* HTTPS: `https://fil.nownodes.io`
* [NOWNodes documentation](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
