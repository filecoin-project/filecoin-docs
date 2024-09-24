---
description: Public RPC endpoints are available for the Filecoin mainnet.
---

# RPCs

[Chainlist](https://chainlist.org/?search=filecoin&testnets=true) provides a dynamically updated list of [available Filecoin - Mainnet RPCs](https://chainlist.org/?search=filecoin&testnets=false).

These endpoints are limited to the read-only [Filecoin JSON RPC API](../../reference/json-rpc/) including read-only [Filecoin Eth RPC](../../reference/json-rpc/eth.md) methods, except for the write operations [`MPoolPush`](../../reference/json-rpc/mpool.md#mpoolpush) and [`EthSendRawTransaction`](../../reference/json-rpc/eth.md#ethsendrawtransaction) for sending already signed messages.

{% hint style="info" %} Please note that most publicly hosted endpoints <strong>only guarantee recent state, i.e. 2000 of the latest blocks (last 16.67 hours).</strong> To request an archival node you can contact a provider below. {% endhint %}

### <a href="https://api.node.glif.io/">Glif Nodes</a> 

  - HTTPS: <code>https://api.node.glif.io/rpc/v1</code>
  - WSS: <code>wss://wss.node.glif.io/apigw/lotus/rpc/v1</code>
  - Docs: <a href="https://api.node.glif.io">Glif Nodes - Docs</a>
  - API Support: All Filecoin and Eth JSON RPC methods including write methods described above
  - Contact: <a href='https://filecoinproject.slack.com/archives/C017HM9BJ8Z'>#fil-glif-node-hosting</a> in <a href='https://filecoin.io/slack'>Filecoin Slack</a>

### <a href="https://ankr.com">Ankr</a>
  - HTTPS: <code>https://rpc.ankr.com/filecoin</code>
  - WSS: By request at: https://www.ankr.com/rpc/filecoin
  - Docs: <a href="https://www.ankr.com/docs/rpc-service/chains/chains-list/#filecoin">Ankr Docs - Filecoin</a>
  - API Support: All Filecoin and Eth JSON RPC methods including write methods described above

### <a href="https://cloud.chainup.com/">Chainup Cloud</a>
  - HTTPS: <code>https://filecoin.chainup.net/rpc/v1</code>
  - WSS: <code>wss://filecoin.chainup.net/rpc/v1</code>
  - Docs: <a href="https://docs.chainupcloud.com/blockchain-api/filecoin/public-apis">Chainup Cloud Docs - Filecoin</a>

### <a href="https://nownodes.io/">NOWNodes</a>
  - HTTPS: <code>https://fil.nownodes.io</code>
  - Terms: Free for 1 month with <a href="https://nownodes.io/pricing">signup</a>
  - Docs: <a href="https://documenter.getpostman.com/view/13630829/TVmFkLwy">NOWNodes - Docs</a>

### <a href="https://getblock.io/nodes/fil">GetBlock</a>
  - HTTPS: <code>https://filecoin.getblock.io</code>
  - Terms: Free with <a href="https://getblock.io/nodes/fil/">signup</a>
  - Docs: <a href="https://getblock.io/docs/getblock-explorer/get-started/">GetBlock - Docs</a>


## Additional Notes:

*  Glif Nodes offers a [Lotus Lite node](https://docs.filecoin.io/nodes/lite-nodes/spin-up-a-lite-node) endpoint with the following command:

    ```shell
    FULLNODE_API_INFO=wss://wss.node.glif.io/apigw/lotus lotus daemon --lite
    ```

    When using a Lotus Lite node, omit `/rpc/v1` from Glif’s WebSocket address.
    
    A Lotus Lite node is a stripped down version of a Lotus full-node capable of running on lower-end hardware. It also allows for local signing for storage deals without a full Lotus node.


