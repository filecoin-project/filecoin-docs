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

## Storage deal making

### Improve the acceptance rate of your deal proposal

Storage Providers (SPs) are incentivized to accept deal proposals that meet certain parameters such as minimum deal size or [FIL+ datacap verified](https://filplus.info/). If your deal proposal is not well aligned with those parameters, it may take longer for your proposal to be accepted and your data to be stored. To improve rate at which your storage deal proposals are accepted, ensure you have the recommended aount of funds in your contract, and that your deal meets the minimum deal size, based on whether you have datacap (verified deals) or not (unverified deals):

Do you have datacap? | Funds in contract ($ per TiB per year) | Minimum deal size
-- | -- | --
Yes | $0 | 512 MB (4GB preferred)
No | $240 | 512 MB (4GB preferred)

You can apply for datacap verification on the [Filecoin mainnet](https://filplus.info/) and the [Hyperspace testnet](https://hyperspace.yoga/#notary). Select **Automatic Verification** for deal sizes greater than 32GB and **General Verification** for deal sizes less than 32GB.  

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

