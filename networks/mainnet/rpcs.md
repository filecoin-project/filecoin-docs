---
description: Public RPC endpoints are available for the Filecoin mainnet.
---

# RPCs

[Chainlist](https://chainlist.org/?search=filecoin\&testnets=true) provides a dynamically updated list of [available Filecoin - Mainnet RPCs](https://chainlist.org/?search=filecoin\&testnets=false).

These endpoints are limited to the read-only [Filecoin JSON RPC API](../../reference/json-rpc/) including read-only [Filecoin Eth RPC](../../reference/json-rpc/eth.md) methods, except for the write operations [`MPoolPush`](../../reference/json-rpc/mpool.md#mpoolpush) and [`EthSendRawTransaction`](../../reference/json-rpc/eth.md#ethsendrawtransaction) for sending already signed messages.

{% hint style="info" %}
Please note that most publicly hosted endpoints **only guarantee recent state, i.e. 2000 of the latest blocks (last 16.67 hours).** To request an archival node you can contact a provider below.
{% endhint %}

In order to check the current benchmarked performance of each of the below endpoints, please see the [Filecoin ETH RPC Benchmark app](https://benchmark-rpc.vercel.app/).

| Provider                                    | HTTPS endpoint                                           | WSS endpoint                                     | Docs                                                                                               | API Support                                               |
| ------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [Chain.Love](https://filecoin.chain.love)     | `https://filecoin.chain.love/rpc/v1`                        | `wss://calibration.filecoin.chain.love/ws/rpc/v1`      | [Chain.Love - Docs](https://chain-love.gitbook.io/chain-love-docs/blockchains/filecoin)                                                     | All Filecoin and Eth JSON RPC methods including MPoolPush |
| [Ankr](https://ankr.com/)                   | `https://rpc.ankr.com/filecoin`                          | By request at: https://www.ankr.com/rpc/filecoin | [Ankr Docs - Filecoin](https://www.ankr.com/docs/rpc-service/chains/chains-list/#filecoin)         | All Filecoin and Eth JSON RPC methods including MPoolPush |
| [Chainup Cloud](https://cloud.chainup.com/) | `https://filecoin.chainup.net/rpc/v1`                    | `wss://filecoin.chainup.net/rpc/v1`              | [Chainup Cloud Docs - Filecoin](https://docs.chainupcloud.com/blockchain-api/filecoin/public-apis) |                                                           |
| [NOWNodes](https://nownodes.io/)            | `https://fil.nownodes.io` (Free for 1 month with signup) |                                                  | [NOWNodes - Docs](https://nownodes.gitbook.io/documentation)                        |                                                           |
| [Lava](https://www.lavanet.xyz/)            | `https://filecoin.lava.build`                            |                                                  | [Lava - Docs](https://docs.lavanet.xyz/iprpc#filecoin)                        | All Filecoin and Eth JSON RPC methods including MPoolPush                  |


## Additional Notes:

*   Chain.Love offers a [Lotus Lite node](https://docs.filecoin.io/nodes/lite-nodes/spin-up-a-lite-node) endpoint with the following command:

    ```shell
    FULLNODE_API_INFO=wss://filecoin.chain.love/ws lotus daemon --lite
    ```

    When using a Lotus Lite node, omit `/rpc/v1` from Chain.Love’s WebSocket address.

    A Lotus Lite node is a stripped down version of a Lotus full-node capable of running on lower-end hardware. It also allows for local signing for storage deals without a full Lotus node.



[Was this page helpful?](https://docs.filecoin.io/networks/mainnet/rpcs)
