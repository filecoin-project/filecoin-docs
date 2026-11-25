---
description: >-
  Filecoin actors explained: built-in actors that run the network, user actors
  (smart contracts), how they hold state and balance, and how they send
  messages.
---

# Actors

**An actor is a program with its own balance and state on the Filecoin chain. The network's core functions run as built-in actors, and anyone can deploy their own actors as smart contracts.**

For each built-in actor and its methods, see [Built-in actors](../../reference/built-in-actors/README.md). To call one from a contract, see [Filecoin.sol](../fvm/filecoin.sol.md).

## What an actor holds

Every actor has:

* A FIL balance.
* A pointer to its state.
* A code that says what type of actor it is.
* A nonce, which counts the messages the actor has sent.

An actor changes the chain by sending a _message_. A message names the actor it is sent to, the method to call with its parameters, and the amount of FIL to transfer, and it carries a signature. The sender pays a gas fee in FIL for the network resources the message uses.

Actor code is split into methods. While a method runs, it reads network information, such as the current epoch, from a _runtime_ object that also verifies signatures and proofs.

The chain's _state tree_ maps each actor to its state. Each block holds a pointer to the current state tree and to the messages that produced it. See [Blocks and tipsets](blocks-and-tipsets.md).

## Built-in actors

_Built-in actors_ are programs that network engineers wrote ahead of time. They run the network's core systems, such as accounts, storage power, proofs, and rewards.

For example, when a storage provider proves its storage:

1. The miner actor checks the proof, and the provider gains storage power.
2. The power actor keeps track of each provider's storage power.
3. During block production, providers with more power are more likely to win blocks. See [Consensus](consensus.md).
4. The reward actor pays the block reward to the provider that wins a block. See [Block rewards](../economics/block-rewards.md).

The [Built-in actors](../../reference/built-in-actors/README.md) reference lists every built-in actor.

## Actor types on the Filecoin EVM runtime

The [Filecoin EVM runtime](../fvm/filecoin-evm-runtime.md) adds three actor types:

| Type | What it is |
| --- | --- |
| Placeholder | Holds FIL sent to an `f410f` address that has no actor yet, until an account or contract is deployed there. |
| Ethereum-style account (`EthAccount`) | The EVM equivalent of an `f1` or `f3` account. It has a `0x` address and a matching `f410f` address. |
| EVM smart contract | Hosts a single EVM smart contract and has a `0x` address. |

A placeholder becomes a real actor in one of two ways. A message is sent from the account that would exist at that address, which upgrades the placeholder into an account. Or an EVM smart contract is deployed to the address.

An Ethereum-style account can send messages from Ethereum wallets like [MetaMask](../fil/wallets.md), transfer FIL to native or Ethereum-style accounts, and deploy and call EVM smart contracts. It cannot call native actors such as multisig or miner actors.

### Deploy an EVM smart contract

* From another EVM smart contract, with the `CREATE` or `CREATE2` opcode.
* With Ethereum tooling such as Remix or Hardhat, through an Ethereum-style account.
* From a native account, by calling method `4` on the Ethereum Address Manager (`f010`). Pass the EVM init code in the message parameters as a CBOR-encoded byte string (major type 2).

### Call an EVM smart contract

* From another EVM smart contract, with the `CALL` opcode.
* With Ethereum tooling such as MetaMask, through an Ethereum-style account.
* From a native account, by calling method `3844450837` (`FRC42(InvokeEVM)`). The input and return data are either empty or a CBOR-encoded byte string.

## User actors

A _user actor_ is code that any developer deploys. It is the same thing as a smart contract, and this documentation uses _smart contract_ for the ones you write. You write them in Solidity.

## Next steps

* [Addresses](addresses.md): how actors are identified.
* [Filecoin Virtual Machine](../fvm/README.md): where actor code runs.
* [Manual storage deals](../manual-storage-deals.md): negotiate and record a deal directly with a provider.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/concepts/actors)
