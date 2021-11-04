---
title: Exchange Integration Guide
description: 'Lorem ipsum.'
---

## Filecoin Integration Guide

Use this guide to help you list Filecoin (**FIL**) on your exchange platform.

## Useful Links

Before you start, here are some useful links:

- [Filecoin website](https://filecoin.io)
- [Filecoin Specs](https://spec.filecoin.io)(you can find everything here!)
- [Filecoin Documentation](/)
- [Filecoin Networks](https://network.filecoin.io)
- [Lotus(Implementation of the Filecoin network)](https://github.com/filecoin-project/lotus)
- [Block Explorers](/get-started/explore-the-network.md#block-explorers)

### Need help? Join the Filecoin Slack

If you have any questions, join the [Filecoin Slack](https://join.slack.com/t/filecoinproject/shared_invite/zt-mapdjgpy-AzltjeUC9Y0UQOLGjInZuQ).

## Running the Filecoin (Lotus) Node

### Setup and installation of the node

Follow the[ Lotus: install and setup guide](/get-started/lotus/installation.md) to install the Lotus applications and launch node, basically you need to:

- Prepare the hardware, see the minimal requirements [here](/get-started/lotus/installation.md#minimal-requirements)
- Install dependencies
  1. [Linux](/get-started/lotus/installation.md#linux)
  2. [macOS](/get-started/lotus/installation.md#macos)
- [Start the Lotus daemon and sync the chain](/get-started/lotus/installation.md#start-the-lotus-daemon-and-sync-the-chain) 3. Sync from scratch: in your lotus directory run `lotus daemon` 4. [Sync from a full snapshot](/get-started/lotus/chain.md#syncing) 5. [Sync from minimal snapshot](/get-started/lotus/chain.md#compacting-the-chain-data)

        🚨 A snapshot only has the state trees from recent tipset(2000 epochs) onward and nothing before that tipset, which means it does not have all historical states of the network. In addition, only a full snapshot has full state trees from a certain tipset.

### Check sync status

You can check the sync status by running lotus sync status, you are fully synced when the `Height` diff is 0. Any sync error will be printed out in this command output too.

You can run `lotus sync wait` to wait for the sync to be complete, `Done!` indicates that your node is fully synced.

## Basic Network Technology Info

Filecoin network uses a Proof of Storage([PoRep](https://spec.filecoin.io.md#section-glossary.proof-of-replication-porep) + [PoSt](https://spec.filecoin.io.md#section-glossary.proof-of-spacetime-post)) consensus algorithm. Time in the Filecoin network is discretized into [epochs](https://spec.filecoin.io.md#section-glossary.epoch) that are currently set to 30 seconds. For every epoch, a new set of blocks(can be null) are produced for a [tipset](https://spec.filecoin.io.md#section-glossary.tipset). The hard finality of the Filecoin network is 900 epochs.

## Accounts/Wallets, Signatures and Messages

Filecoin uses an account based model. There are 4 types of account prefixes. f0 for ID address, f1 for Secp256k1 wallets, f2 for [actor](https://spec.filecoin.io.md#section-glossary.actor) accounts and f3 for BLS wallets.

f1, f2 and f3 prefixed addresses are called account addresses, an account address is activated/registered when it first receives a transaction. f0 prefixed addresses are mapped to each active account address.

Note: During the testnet phase, the address prefix is `t`, within Lotus, `t` vs `f` is purely cosmetic. In short: `f<address> === t<address>`. Please make sure if you get a `t` address, it is simply rendered/processed as an `f` address.

Filecoin currently uses two types of signatures, ECDSA signatures over the Secp256k1 elliptic curve and BLS signatures over the BLS12-381 group of curves. Details and reference implementations can be found [here](https://spec.filecoin.io.md#section-algorithms.crypto.signatures.signature-types).

There are two message types, [signed messages](https://github.com/filecoin-project/lotus/blob/9deda06ec632da3f7a035cc63b9408de72c96f79/chain/types/signedmessage.go#L44) and [unsigned messages](https://github.com/filecoin-project/lotus/blob/9deda06ec632da3f7a035cc63b9408de72c96f79/chain/types/message.go#L28). Messages are fully irreversible at 900 epochs, and 200 epochs for message confirmation is acceptable.

There are multiple gas fees associated with each message, please refer to the `a practical guide to Gas` section of this [blog](https://filecoin.io/blog/filecoin-features-gas-fees/) for more details.

If the `ExitCode` in the message receipt is 0, that indicates the message is sent successfully.

## Integration

You can interact with the network by using Lotus CLI or via[ JSON-RPC APIs](/reference/lotus-api.md#endpoints). Following this [guide](/build/lotus/api-tokens.md) to set up API tokens to your node and grant necessary permissions. To find all CLI usage run `lotus -h` in your lotus folder. You can also find all JSON RPC API endpoints [here](https://github.com/filecoin-project/lotus/blob/master/api/api_full.go).

You can also find some other API client libraries developed by the Filecoin community [here](/build/lotus/api-client-libraries.md).

Some curl examples for APIs you may use:

### [ChainHead](/reference/lotus-api.md#chainhead)

```shell
curl -X POST  -H "Content-Type: application/json"  -H "Authorization: Bearer $(cat ~/.lotus/token)"  --data '{
   "jsonrpc":"2.0",
   "method":"Filecoin.ChainHead",
   "params":[

   ],
   "id":0
}' http://127.0.0.1:1234/rpc/v0
```

### [ChainGetTipSetByHeight](/reference/lotus-api.md#chaingettipsetbyheight)

```shell
curl -X POST -H "Content-Type: application/json"
  -H "Authorization: Bearer $(cat ~/.lotus/token)"
  --data '{
   "jsonrpc":"2.0",
   "method":"Filecoin.ChainGetTipSetByHeight",
   "params":[
      100000,
      [
         {
            "/":"bafy2bzacecxm6lhhzem3wshktatwzrcqbvc3k3jepzz7a6wqyc7w3fvav256i"
         }
      ]
   ],
   "id":0
}' http://127.0.0.1:1234/rpc/v0
```

`bafy2bzacecxm6lhhzem3wshktatwzrcqbvc3k3jepzz7a6wqyc7w3fvav256i` is the block CID, this field is nullable.

### [ChainGetParentMessages](/reference/lotus-api.md#chaingetparentmessages)

```shell
curl -X POST -H "Content-Type: application/json"
  -H "Authorization: Bearer $(cat ~/.lotus/token)"
  --data '{
   "jsonrpc":"2.0",
   "method":"Filecoin.ChainGetParentMessages",
   "params":[
      {
         "/":"bafy2bzacedplsg3tqrv7e3v5rssvq3qwbd3c6g3en55zpqnyrymexhynz6ixu"
      }
   ],
   "id":0
}' http://127.0.0.1:1234/rpc/v0
```

`bafy2bzacedplsg3tqrv7e3v5rssvq3qwbd3c6g3en55zpqnyrymexhynz6ixu` is the block CID, you can pass in any one of the block CIDs included in the desired tipset.

### [WalletNew](/reference/lotus-api.md#walletnew)

```shell
curl -X POST -H "Content-Type: application/json"
  -H "Authorization: Bearer $(cat ~/.lotus/token)"
  --data '{
   "jsonrpc":"2.0",
   "method":"Filecoin.WalletNew",
   "params":[
      1
   ],
   "id":1
}' http://127.0.0.1:1234/rpc/v0
```

`1` for Secp2561K account and `2` for BLS account.

### [WalletBalance](/reference/lotus-api.md#walletbalance)

```shell
curl -X POST -H "Content-Type: application/json"
  -H "Authorization: Bearer $(cat ~/.lotus/token)"
  --data '{
   "jsonrpc":"2.0",
   "method":"Filecoin.WalletBalance",
   "params":[
      “f1d7x4euqwtlk2bqzhclr6gubkufezgddkqftsnky”
   ],
   "id":1
}' http://127.0.0.1:1234/rpc/v0
```

`f1d7x4euqwtlk2bqzhclr6gubkufezgddkqftsnky` is the account address.

### [MpoolPushMessage](/reference/lotus-api.md#mpoolpushmessage)

```shell
curl -X POST -H 'Content-Type: application/json'
  -H "Authorization: Bearer $(cat ~/.lotus/token)"
  --data '{
   "jsonrpc":"2.0",
   "method":"Filecoin.MpoolPushMessage",
   "params":[
      {
         "To":"t14pu4ogatxvok5727bd7ikp52mnnpxxxqicwyx7i",
         "From":"t3w5afgpwisxkryfb676h7xyku57uupigdh3zdoxj3kyep53hmo5njykfatqx5rga75ra5oucbyczr7lbjaezq",
         "Value":"1000000000000000000001",
         "Method":0,
         "Params":null,
         "GasLimit":20000000,
         "GasFeeCap":"0",
         "GasPremium":"0",
         "Nonce":0
      },
      {
         "MaxFee":"0"
      }
   ],
   "id":0
}' http://127.0.0.1:1234/rpc/v0
```

`Method` ID of `0` with null `Params` is a balance transfer transaction. When the `GasFeeCap`, `GasPremium` and `MaxFee` is `0`, Lotus will do the gas estimation for the message with 25% over estimation for the gas limit based on the current network condition. You can change this value via the `GasLimitOverestimation` field.

## FAQ

### How do I sign a message?

Use [WalletSign](/reference/lotus-api.md#walletsign) to sign the message and send the signed message using [MpoolPush](/reference/lotus-api.md#mpoolpush).

You may also use this [Filecoin signing tool library](https://github.com/Zondax/filecoin-signing-tools), written by Zondax.

### How do I retrieve the gas fees of a message?

Call [StateReplay](/reference/lotus-api.md#statereplay) and look up the `GasCost` in the response.

### How to get the gas estimation of a message?

You can estimate the gas cost of a message by calling [GasEstimateMessageGas](/reference/lotus-api.md#gasestimatemessagegas), note that this API estimates the gas limit with 25% over estimation based on the network condition under the given tipset key. You can change this value via the `GasLimitOverestimation` field.

### How do I ensure that all balances transfer in any kind of messages (including msig transfers) are captured?

Call [StateCompute](/reference/lotus-api.md#statecompute) or [StateReplay](/reference/lotus-api.md#statereplay) and go through all the transactions in the execution trace, whenever the value `!=0 && exit code == 0`, it indicates a balance transfer has occurred.
