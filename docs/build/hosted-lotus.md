---
title: 'Glif Nodes'
description: 'Glif provides a number of synced Lotus node endpoints on the Filecoin testnets and mainnet.'
breadcrumb: 'Hosted nodes'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

#### Mainnet endpoint
Developers can interact directly with load-balanced, synced mainnet nodes using the [JSON RPC API](../reference/lotus-api.md) on the `https://api.node.glif.io` endpoint (or `https://api.node.glif.io/rpc/v0`).

Unlike bare Lotus, the endpoint above is hardened and limited:

- Only read calls and `MPoolPush()` are supported.
- Only POST requests are supported.
- The [Filecoin signing tools](signing-libraries.md) can be used to sign messages before submission when needed.

#### Testnet endpoint
For synced testnet node endpoints using the [JSON RPC API](../reference/lotus-api.md), `https://calibration.node.glif.io` is available.

#### Custom endpoints

Custom endpoints can be requested, including advanced permission settings. Let us know your use case.

::: tip
For support, questions and current status, visit the [#fil-glif-node-hosting](https://filecoinproject.slack.com/archives/C017HM9BJ8Z) channel in [Filecoin Community Slack](https://filecoin.io/slack).
:::

Here are some steps to get started on Glif Nodes:

1. **(Optional) Fill-in the [request form](https://forms.gle/rfXx2yKbhgrwUv837) for a Glif Node**:

   This is an optional step if you need a custom node with special features. You will need to provide some details about your expected usage and your needs. When your application is approved, you will receive:

   - A JWT token
   - A custom endpoint

1. **(Optional) Install Lotus and use it as a client**:

   We can use `lotus` to talk to the Glif node API (as a client). This is useful for two things:

   - It allows us to verify that the endpoint works and that credentials are correct when using a custom endpoint.
   - It makes debugging easier was we can try and quickly check things using the `lotus` CLI directly.

   To use `lotus`, download and extract the appropiate lotus release from the [releases page](https://github.com/filecoin-project/lotus/releases/). **The lotus version needs to match that of the running node**. We will not be running the Lotus daemon or syncing the chain, we will use it only as a client.

   ::: tip
   Check the running version of the Glif node instance with:

   ```sh
   curl -X POST 'https://api.node.glif.io' -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","id":1,"method":"Filecoin.Version","params":[]}'
   ```

   :::

   Once downloaded, in order to let the Lotus binary talk to the Lotus remote endpoint, export the following environment variable:

   ```sh
   export FULLNODE_API_INFO=<token>:<endpoint>
   # For example, with the default URL (no token needed)
   export FULLNODE_API_INFO=https://api.node.glif.io
   ```

   You can test that it works with:

   ```sh
   ./lotus net id
   12D3KooWBF8cpp65hp2u9LK5mh19x67ftAam84z9LsfaquTDSBpt
   ```

   If the above does not work, verify that you are using the right token and multiaddress.

   By default, all read operations are enabled, along with the MPoolPush method. This means that you will need to [sign messages yourself](signing-libraries.md) using your own externally-managed wallets, unless you are given a full node under your full control. We can however, use the CLI to send any read commands. The following are just examples:

   ```sh
   ./lotus net id
   ./lotus net peers
   ./lotus sync status
   ./lotus chain head
   ...
   ```

   Get familiar with the capabilities of your node and verify that the endpoints. The CLI interactions will be useful when debugging things in a quick way. Note that the default Glif endpoint is load-balanced accross several Lotus nodes!

1. **Start integrating directly on the JSON-RPC API**:

   Your application will very probably interact with the Lotus JSON-RPC API directly. Here are the first steps to gain operative knowledge on this API:

   - Read the instructions in the [Lotus API reference](../reference/lotus-api.md). Understand how calls are performed, how authentication works and how parameters and responses are encoded in JSON-RPC. Try out some `curl` examples.
   - From the above, learn how to obtain the parameters and expected format for every endpoint from the Lotus Go documentation. This will be the first place to check if something does not work or the format of some parameter is not understood.
   - You can also use this [Lotus API documentation](https://documenter.getpostman.com/view/4872192/SWLh5mUd?version=latest) which covers the Glif Node-supported methods in a more readable form, with additional tips.
   - If you are planning to send transactions, you will need to manage wallets and create signatures for your messages. See the [signing libraries](signing-libraries.md) page for different solutions.
