---
description: >-
  The Filecoin EVM runtime (FEVM) runs Solidity contracts on Filecoin. What
  Ethereum compatibility covers and where Filecoin differs.
---

# Filecoin EVM runtime

**The Filecoin EVM runtime, often called FEVM, runs the Ethereum Virtual Machine as a runtime on top of the Filecoin Virtual Machine. You can deploy existing Solidity contracts to Filecoin and use the Ethereum tools you already know.**

## What compatibility means

Filecoin nodes offer the Ethereum JSON-RPC API, so Ethereum wallets and tools work with Filecoin: MetaMask, Hardhat, Foundry, Remix and others. You write contracts in Solidity, compile them to EVM bytecode, and deploy them as usual. A deployed contract is an actor, of the EVM smart contract type. See [Actors](../concepts/actors.md).

Filecoin is not Ethereum, though, and the runtime differs from it in the ways below.

## Differences from Ethereum

### Gas costs

Filecoin charges Filecoin gas only. It doesn't charge EVM gas for each opcode. The FVM instead charges gas for running the EVM interpreter itself. See [Gas](gas.md). So:

1. EVM gas and Filecoin gas are different units, not a fixed ratio. Filecoin gas numbers are much larger than Ethereum's.
2. Some instructions cost more or less than on Ethereum. A cost can depend on the code path the interpreter takes and on caching.

{% hint style="danger" %}
Filecoin gas costs aren't fixed, so never hard-code them. A network upgrade can change them and break a contract that depends on them.
{% endhint %}

### Gas stipend

In Solidity, `address.transfer` and `address.send` give the called contract a fixed stipend of 2,300 Ethereum gas. The runtime detects these calls and sets the gas limit to 10 million Filecoin gas. That is more generous than Ethereum's, so the receiving contract can do more work than it could there.

### `SELFDESTRUCT`

The runtime emulates `SELFDESTRUCT` but can't copy it exactly:

1. There is no gas refund.
2. The contract is marked as self-destructed, but it isn't deleted from the state tree. It behaves as if it doesn't exist, like an empty contract.
3. It can fail and revert the calling contract. This happens if the beneficiary is an ID address and no actor has that ID.
4. If funds reach a self-destructed contract after it self-destructs but before the transaction ends, they stay with it. On Ethereum they would vanish.

### `CALLCODE`

`CALLCODE` isn't implemented. Use `DELEGATECALL`.

### `BLOCKHASH`

Ethereum has one block per height. Filecoin can have none, one or several, so it works with [tipsets](../concepts/blocks-and-tipsets.md). `BLOCKHASH` returns the first 32 bytes of the tipset CID's hash for that height. It only works for the 256 most recent epochs before the current one, and returns zero for any other height.

### Bare-value sends

On Ethereum, `SELFDESTRUCT` is the only way to send funds to a contract without running its code. On Filecoin, any actor can use method `0`, a bare-value send, to transfer funds to any other actor without invoking its code. By default, a Solidity contract doesn't accept a bare-value transfer unless it defines a [`receive()` or `fallback()` function](https://docs.soliditylang.org/en/latest/contracts.html#receive-ether-function).

To send to a contract at an `f410f` or `0x` address without risking your funds, call it with the `InvokeEVM` method, number `3844450837`.

### Precompiles

The runtime usually doesn't enforce a gas limit on a precompile, so a precompile can use all the remaining gas. The call-actor precompiles are the exception, but their limit applies only to the final call to the target actor, not to the whole precompile. See [Precompiles](precompiles.md).

### Multiple addresses

A Filecoin contract has several addresses. Two of them, `f0` and `f410f`, convert to `0x` addresses that you can use with `CALL`. So you can call a contract at its ordinary EVM address (from `f410f`) or at its masked ID address (from `f0`). See [Addresses](../concepts/addresses.md).

The `ADDRESS`, `CALLER` and `ORIGIN` instructions are consistent for the same contract:

* `ADDRESS` is always derived from the executing contract's `f410f` address, even if it was called through a masked ID address.
* `CALLER` and `ORIGIN` come from the caller's or origin's `f410f` address if it is an Ethereum-style account or an EVM contract. Otherwise they use the masked ID address.

### Deferred execution

A message sent at one height runs at the next height, so a receipt for a block at height `h` is only available at `h + 1`. When an Ethereum method asks for the `latest` block, Filecoin returns the chain head minus one block.

## Next steps

* [Precompiles](precompiles.md)
* [Gas](gas.md)
* [ERC-20 quickstart](erc-20-quickstart.md)
* [Filecoin.sol](filecoin.sol.md): call built-in actors from Solidity.
* [Contract verification](contract-verification.md): publish and verify your contract source.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/fvm/filecoin-evm-runtime)
