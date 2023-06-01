---
title: "Differences to Ethereum"
description: ""
lead: ""
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-filecoin-evm-runtime"
    identifier: "differences-with-ethereum-e2c404b7736d394fbdb9f96395bedbb3"
weight: 220
toc: true
aliases:
    - "/developers/smart-contracts/concepts/ethereum-compatibility/"
---

While Filecoin EVM runtime aims to be compatible with the Ethereum ecosystem, it has some marked differences.

## Gas costs

The Filecoin blockchain charges for gas in its native token FIL. This includes gas that is charged for interacting with the Filecoin EVM runtime. Instead of the Filecoin EVM runtime charging gas according to the Ethereum EVM spec for each EVM opcode executed, the Filecoin Ethereum Virtual Machine (FEVM) charges Filecoin gas for executing the EVM interpreter itself. The [How gas works]({{< relref "how-gas-works" >}}) page goes into this in more detail. Importantly, this means that Filecoin EVM runtime gas costs and calucations will be different from the their functional equivalents on the Ethereum EVM.

1. Ethereum's EVM and Filecoin's EVM denote gas in different units of measurement (i.e., gwei vs. attoFIL) which are not convertable 1:1. That means what may cost 1 gwei of gas on Ethereum's EVM may not cost 1 attoFil of gas on Filecoin's EVM. Purely based on chain throughput (gas/second), the ratio of Ethereum gas to Filecoin gas is about 1:444. As a result, expect Filecoin gas numbers (denominated in FIL or smaller units of FIL) to look _much_ larger than those in Ethereum.
1. Because Filecoin charges Filecoin gas for executing the Filecoin EVM runtime interpreter:
    1. Some instructions may be more expensive and/or cheaper in Filecoin EVM runtime than they are in the EVM running on the Ethereum chain.
    1. The specific Filecoin EVM instruction costs can depend on the exact Filecoin EVM runtime code-paths taken, and caching.

{{< alert >}}
⚠️ Filecoin gas costs are a function of network gas demand and supply, thus subject to change and should never be hard-coded. Future network upgrades will break any smart contracts that depend on gas costs not changing.
{{< /alert >}}

## Gas stipend

Solidity calls to `address.transfer` and `address.send` grant a fixed gas stipend of 2,300 Ethereum gas units to the called contract. The Filecoin EVM runtime automatically detects such calls, and sets the gas limit to 10,000,000 Filecoin gas units. This is a approximately 10x more generous limit than Ethereum's, which makes it more future-proof. You should expect the callee to be able to carry out more work than in Ethereum.

## Self destruct

Filecoin EVM runtime emulates Ethereum's EVM self-destruct behavior but isn't able to entirely duplicate it:

1. There is no gas refund for self-destruct.
2. On self-destruct, the contract is marked as self-destructed, but is not actually deleted from the Filecoin state-tree. Instead, it simply behaves as if it does not exist. It acts like an empty contract.
3. Unlike in the Ethereum EVM, in Filecoin EVM runtime, self-destruct can _fail_ causing the executing contract to revert. Specifically, this can happen if the specified beneficiary address is an embedded [ID address]({{< relref "/smart-contracts/filecoin-evm-runtime/address-types" >}}) and no actor exists with the specified ID.
4. If funds are sent to a self-destructed contract after it self-destructs but before the end of the transaction, those funds remain with the self-destructed contract. On the Ethereum chain, these funds would vanish after the transaction finishes executing.

## CALLCODE

The `CALLCODE` opcode has not been implemented. Use the newer `DELEGATECALL` opcode.

## Bare-value sends

On the Ethereum chain, `SELFDESTRUCT` is the only way to send funds to a smart contract without giving the target smart contract a chance to execute code.

On Filecoin's chain, any actor can use `method 0`, also called a bare-value send, to transfer funds to any other actor without invoking the target actor's code. You can think of this behaviour as having the suggested [`PAY` opcode](https://eips.ethereum.org/EIPS/eip-5920) already implemented in Filecoin.

## Precompiles

The Filecoin EVM runtime, unlike Ethereum, does not usually enforce gas limits when calling precompiles. This means that it isn't possible to prevent a precompile from consuming all remaining gas. The `call actor` and `call actor id` precompiles are the exception. However, they apply the passed gas limit to the actor call, not the entire precompile operation (i.e., the full precompile execution end-to-end can use more gas than specified, it's only the final `send` to the target actor that will be limited).

## Multiple Addresses

In Filecoin, contracts generally have multiple addresses. This is because Filecoin's VM supports multiple runtimes. Today, two of these address types, `f0` and `f410f`, can be converted to 0x-style (Eth-style) addresses which can be used in the `CALL` opcode. See [Converting to a 0x-style address]({{< relref "address-types#converting-to-a-0x-style-address" >}}) for details on how these addresses are derived.

Importantly, this means that any contract can be called by either its "normal" EVM address (corresponding to the contract's `f410f` address) or its "masked ID address" (corresponding to the contract's `f0` address).

However, the addresses returned by the CALLER, ORIGIN, and ADDRESS instructions will always be the same for the same contract.
- The ADDRESS will always be derived from the executing contract's `f410f` address, even if the contract was called via a masked ID address.
- The CALLER/ORIGIN will be derived from the caller/origin's `f410f` address, if the caller/origin is an Ethereum-style account or an EVM smart contract. Otherwise, the caller/origin's "masked ID address" (derived from their `f0` address) will be used.

## Deferred execution model

When calling an Ethereum method that allows the user to ask for the `latest` block, Filecoin will return the `chain head` - `1` block. This behavior was implemented for compatibility with the {{< tooltip "deferred execution" >}} mode that Filecoin uses. In this mode, messages submitted at a given `height` are only processed at `height` + `1`. This means that receipts for a block produced at `height` are only available at `height` + `1`.
