---
title: "Future-proof a contract"
description: "Learn how to future-proof an existing smart contract for compatibility with the v1.20.0-hyperspace-nv20 release."
lead: "Learn how to future-proof an existing smart contract for compatibility with the `v1.20.0-hyperspace-nv20` release and future network upgrades."
draft: false
type: docs
weight: 70
menu:
  developers:
    parent: "developers-how-tos"
toc: true
images: []
aliases:
    - "/fvm/how-tos/future-proof-a-contract/"
---

{{< beta-warning >}}

**Developers should take the time to thoroughly read through the following summary of possible contract future-proofing updates, as failure to properly future proof smart contracts may result in incompatibility with the [v1.20.0-hyperspace-nv20 release](https://github.com/filecoin-project/testnet-hyperspace/issues/9) and future Filecoin releases.**

- **All contracts** must [accept both `DAG_CBOR (0x71)` and `CBOR (0x51)` in inputs and treat them identically, and use `CBOR (0x51)` in outputs](#all-contracts).
- If a contract uses the FRC42 hash of `GranularityExported`, it must be [updated and redeployed](#contracts-using-granularityexported-hash)
- If a contract sends funds to actors that are non-native, Ethereum, or EVM smart contract accounts, it [must use the `call_actor` precompile](#contracts-sending-funds-to-specific-actors).
- If a contract is interacting with built-in actors, it must upgrade to the [latest version of Filecoin Solidity library, currently `v0.8`](#contracts-interacting-with-built-in-actors).

## All contracts 

All contracts must do the following:

### Accept both `DAG_CBOR (0x71)` and `CBOR (0x51)` in inputs and treat them identically

Smart contracts should accept both `DAG_CBOR (0x71)` and `CBOR (0x51)` in inputs and treat them identically. Specifically:
- Treat `DAG_CBOR` and `CBOR` as equivalent when returned from the `call_actor` precompile.
- Treat `DAG_CBOR` and `CBOR` as equivalent when received as a parameter to `handle_filecoin_method`.

### Use CBOR (0x51) in outputs

Smart contracts should use `CBOR (0x51)` in outputs. Specifically:
- Always pass `CBOR` to the `call_actor` precompile. `DAG_CBOR` is currently forbidden.
- Always return `CBOR` from `handle_filecoin_method`. `DAG_CBOR` is currently forbidden.

## Contracts using `GranularityExported` hash

The `GranularityExported` method in the Datacap actor was renamed to `Granularity`, so any contracts which use the FRC42 hash of `GranularityExported` (`953701584`) must update the hash to `3936767397` and redeploy.

## Contracts sending funds to specific actors

Any contracts sending funds to actors that are not native accounts (`f1` or `f3` addresses), Ethereum accounts, or EVM smart contracts must now use the `call_actor` precompile. **Solidity's transfer function will no longer work as that will attempt to invoke the target actor as an EVM contract**.

## Contracts interacting with built-in actors

All contracts interacting with built-in actors must upgrade to the [latest version of Filecoin Solidity library, currently `v0.8`](https://github.com/Zondax/filecoin-solidity/tree/master/contracts/v0.8). The IPLD codec used in the `handle_filecoin_method` solidity entrypoint and the call_actor should now be `CBOR (0x51)`, not `DAG_CBOR (0x71)`, as previously used. The underlying encoding (i.e. the payload bytes) are the same, but the codec numbers are now different. `DAG_CBOR` support will be re-enabled in the future but the usage of the codec implies additional runtime guarantees that have not yet been implemented.

