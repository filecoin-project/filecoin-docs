---
title: "Best practices"
description: "This page describes best practices for testing, developing and deploying smart contracts on the Filecoin network."
lead: "This page describes best practices for testing, developing and deploying smart contracts on the Filecoin network."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-developing-contracts"
    identifier: "foundry-c9d70a9bb594275b17454ac6fc9abfaa"
weight: 410
aliases:
    - "/developers/smart-contracts/how-tos/future-proof/"
    - "/smart-contracts/developing-contracts/"
---

## Transactions

Best practices for transactions are described below.

### Consistently generating transaction receipts

Since receipts in Filecoin are generated in the next tipset, depending on when a transaction is submitted to the mempool, the receipt may take between 30 and 90 seconds to return. To consistently return transaction receipts when deploying a transaction or awaiting confirmation, change the default transaction receipt timeout (60000 ms or 1 minute for many toolchains) to 90 seconds or more. An example that sets `timeout` to `180000` (3 minutes) for an Open Zeppelin upgradeable proxy is as follows:

```js
const deployment = await upgrades.deployProxy(contract, preparedArguments, {
    timeout: 180000
});
```

### Unstuck a message from the mempool

When users/devs send messages to the Filecoin network, those messages will first land into mempool of Filecoin nodes. Once a node receives your message, it will verify the gas fee and the signature, and then process the transaction. This may take some time depending on network traffic and other factors. 

If a message is not confirmed on the Filecoin network, it means that the transaction has not been processed and seating in the mempool of Lotus nodes. There could be several reasons why a message may not be confirmed, such as network congestion, insufficient gas fees, or an invalid message signature. 

Therefore,  we highly recommend devs/users try to resubmit the message with a higher gas fee or priority fee so those messages will not block the mempool and potentially impact the block-producing time. It's important to note that gas fees on the Filecoin network can fluctuate depending on network demand, so it's always a good idea to monitor gas prices and adjust your fees accordingly to ensure that your transaction is processed in a timely manner.

+ **MetaMask**: If you are building your project using MetaMask, it would be easier to educate the users to speed up a transaction which stuck in the mempool by increasing the gas fee directly on MetaMask. Please refer to this [tutorial](https://support.metamask.io/hc/en-us/articles/360015489251-How-to-speed-up-or-cancel-a-pending-transaction) from MetaMak.
+ **Lotus**: If you are using Lotus, you can follow this tutorial to [replace message with updated gas fee](https://lotus.filecoin.io/kb/update-msg-gas-fee/).
+ **Creating messages with SDK**: If you are processing messages using SDKs like ether.js or web3.js, you need to replace the message with higher gas fees following the logic down below. 
  + Get the original message using its hash.
  + Create a new message with the same nonce as the original message, also set the `nonce`, `to`, `value` fields same values as the original message.
  + Set a higher `gasLimit` and `gasPrice` for this message.
  + Sign and send the new message.

## Futureproofing

Developers should take the time to thoroughly read through the following summary of possible contract future-proofing updates, as failure to properly future proof smart contracts may result in incompatibility with the [v1.20.0-hyperspace-nv20 release](https://github.com/filecoin-project/testnet-hyperspace/issues/9) and future Filecoin releases.

- **All contracts** must [accept both `DAG_CBOR (0x71)` and `CBOR (0x51)` in inputs and treat them identically, and use `CBOR (0x51)` in outputs](#all-contracts).
- If a contract uses the FRC42 hash of `GranularityExported`, it must be [updated and redeployed](#contracts-using-granularityexported-hash)
- If a contract sends funds to actors that are non-native, Ethereum, or EVM smart contract accounts, it [must use the `call_actor` precompile](#contracts-sending-funds-to-specific-actors).
- If a contract is interacting with built-in actors, it must upgrade to the [latest version of Filecoin Solidity library, currently `v0.8`](#contracts-interacting-with-built-in-actors).

### All contracts 

All contracts must do the following:

#### Accept both `DAG_CBOR (0x71)` and `CBOR (0x51)` in inputs and treat them identically

Smart contracts should accept both `DAG_CBOR (0x71)` and `CBOR (0x51)` in inputs and treat them identically. Specifically:
- Treat `DAG_CBOR` and `CBOR` as equivalent when returned from the `call_actor` precompile.
- Treat `DAG_CBOR` and `CBOR` as equivalent when received as a parameter to `handle_filecoin_method`.

#### Use CBOR (0x51) in outputs

Smart contracts should use `CBOR (0x51)` in outputs. Specifically:
- Always pass `CBOR` to the `call_actor` precompile. `DAG_CBOR` is currently forbidden.
- Always return `CBOR` from `handle_filecoin_method`. `DAG_CBOR` is currently forbidden.

### Contracts using `GranularityExported` hash

The `GranularityExported` method in the Datacap actor was renamed to `Granularity`, so any contracts which use the FRC42 hash of `GranularityExported` (`953701584`) must update the hash to `3936767397` and redeploy.

### Contracts sending funds to specific actors

Any contracts sending funds to actors that are not native accounts (`f1` or `f3` addresses), Ethereum accounts, or EVM smart contracts must now use the `call_actor` precompile. **Solidity's transfer function will no longer work as that will attempt to invoke the target actor as an EVM contract**.

### Contracts interacting with built-in actors

All contracts interacting with built-in actors must upgrade to the [latest version of Filecoin Solidity library, currently `v0.8`](https://github.com/Zondax/filecoin-solidity/tree/master/contracts/v0.8). The IPLD codec used in the `handle_filecoin_method` solidity entrypoint and the `call_actor` should now be `CBOR (0x51)`, not `DAG_CBOR (0x71)`, as previously used. The underlying encoding (i.e. the payload bytes) are the same, but the codec numbers are now different. `DAG_CBOR` support will be re-enabled in the future but the usage of the codec implies additional runtime guarantees that have not yet been implemented.

## Contract Verification

When deploying contracts to mainnet, it is important to verify your contracts to improve transparency, security and trustlessness of the network. The process of verifying your contract involves recompiling your contract's source code to ensure that the produced bytecode matches the bytecode that is already live on the network since it was deployed.

It is highly recommended for all FVM smart contracts to complete the verification process, soon after deployment. 

Developers can easily do so through the following block explorers:
- [Filfox contract verifier](https://filfox.info/en/contract)
- [Beryx contract verifier](https://beryx.zondax.ch/contract_verifier)

You can find this tutorial in the [FEVM ERC-20 Quickstart](https://docs.filecoin.io/smart-contracts/fundamentals/erc-20-quickstart/).
