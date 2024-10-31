---
description: Public RPC endpoints are available for the Calibration testnet.
---

# RPCs

{% hint style="info" %}
[Chainlist](https://chainlist.org/?search=filecoin&testnets=true) provides a dynamically updated list of [available Filecoin - Mainnet RPCs](https://chainlist.org/?search=filecoin&testnets=true). Select Include Testnets to view available test networks.
{% endhint %}

Most of these endpoints are limited to the read-only [Filecoin JSON RPC API](../../reference/json-rpc/) including read-only [Filecoin Eth RPC](../../reference/json-rpc/eth.md) methods and write operation [`MPoolPush`](../../reference/json-rpc/mpool.md#mpoolpush) (or [`EthSendRawTransaction`](../../reference/json-rpc/eth.md#ethsendrawtransaction)) for sending already signed messages.

{% hint style="info" %} Please note that most publicly hosted endpoints <strong>only guarantee recent state, i.e. 2000 of the latest blocks (last 16.67 hours).</strong> To request an archival node you can contact a provider below. {% endhint %}

Provider | HTTPS endpoint | WSS endpoint | Docs | Filecoin API Support | ETH API Support | Archive 
-- | -- | -- | -- | -- | -- | --
[Glif Nodes](https://api.node.glif.io/) | `https://api.calibration.node.glif.io/rpc/v1` | `wss://wss.calibration.node.glif.io/apigw/lotus/rpc/v1` | [Glif Nodes - Docs](https://api.node.glif.io/) | Read-only methods + MPoolPush | All methods | Create a "Dedicated" key with "Archive" functionality
[Ankr](https://ankr.com/) | `https://rpc.ankr.com/filecoin_testnet` | By request at: https://www.ankr.com/rpc/filecoin | [Ankr Docs - Filecoin](https://www.ankr.com/docs/rpc-service/chains/chains-list/#filecoin) | Read-only methods + MPoolPush | See the list of [excluded methods](https://www.ankr.com/docs/rpc-service/chains/chains-list/#unsupported-22) | Contact for more details
[Chainup Cloud](https://cloud.chainup.com/) | `https://filecoin-calibration.chainup.net/rpc/v1` | `wss://filecoin-calibration.chainup.net/rpc/v1` | [Chainup Cloud Docs - Filecoin](https://docs.chainupcloud.com/blockchain-api/filecoin/public-apis) |  [Read-only methods + MPoolPush](https://docs.chainupcloud.com/blockchain-api/filecoin/public-apis#available-filecoin-api-request-methods) | [Yes](https://docs.chainupcloud.com/blockchain-api/filecoin/public-apis#available-filecoin-api-request-methods) | Contact for more details
[DRPC](https://drpc.com) | `https://filecoin-calibration.drpc.org` | `wss://filecoin-calibration.drpc.org` | [DRPC Docs](https://drpc.org/chainlist/filecoin-calibration) | Read-only methods + MPoolPush | Yes | Contact for more details


## Additional Notes:

*  Glif Nodes offers a [Lotus Lite node](https://docs.filecoin.io/nodes/lite-nodes/spin-up-a-lite-node) endpoint with the following command:

    ```shell
    FULLNODE_API_INFO=wss://wss.calibration.node.glif.io/apigw/lotus lotus daemon --lite
    ```

    When using a Lotus Lite node, omit `/rpc/v1` from Glif’s WebSocket address.
    
    A Lotus Lite node is a stripped down version of a Lotus full-node capable of running on lower-end hardware. It also allows for local signing for storage deals without a full Lotus node.


