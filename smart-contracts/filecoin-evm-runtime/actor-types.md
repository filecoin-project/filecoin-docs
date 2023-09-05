---
description: >-
  In the Filecoin network, an address is a unique identifier that refers to an
  actor in the Filecoin state. All actors in Filecoin have a corresponding
  address which varies from the different usages.
---

# Actor types

The Filecoin EVM runtime introduces three new actor types:

1. [Placeholder actors](actor-types.md#placeholder).
2. [Ethereum-style accounts](actor-types.md#ethereum-style-account), also called `EthAccount`.
3. [EVM smart contracts](actor-types.md#evm-smart-contract).

## Placeholder

A _placeholder_ is a particular type of pseudo-actor that holds funds until an actual actor is deployed at a specific address. When funds are sent to an address starting with `f410f` that doesn’t belong to any existing actor, a _placeholder_ is created to hold the said funds until either an account or smart contract is deployed to that address.

A placeholder can become a _real_ actor in one of two ways:

1. A message is sent from the account that would exist at that placeholder’s address. If this happens, the placeholder is automatically upgraded into an account.
2. An EVM smart contract is deployed to the address.

## Ethereum-style account

An Ethereum-style account is the Filecoin EVM runtime equivalent of an account with an `f1` or `f3` address, also known as native accounts. However, there are a few key differences:

1. These accounts have `0x`-style addresses and an equivalent `f`-style address starting with `f410f`.
2. Messages from these accounts can be sent with Ethereum wallets like MetaMask by connecting the wallet to a Filecoin client.
3. These accounts can be used to transfer funds to native or Ethereum-style.
4. They can be used to call EVM smart contracts and can be used to deploy EVM smart contracts. However, they cannot be used to call native actors such as multisig or miner actors.

## EVM smart contract

An EVM smart contract actor hosts a single EVM smart contract. Every EVM smart contract will have a `0x`-style address.

### Deploying

An EVM smart contract can be deployed in one of three ways:

1. An existing EVM smart contract can use the EVM’s `CREATE`/`CREATE2` opcode.
2. Ethereum-native tooling can be used in conjunction with an Ethereum-style account such as [Remix](../developing-contracts/remix.md) or [Hardhat](../developing-contracts/hardhat.md).
3. A native account can call method `4` on the Ethereum account manager `f010`, passing the EVM init code as a CBOR-encoded byte-string (major type 2) in the message parameters.

### Calling

An EVM smart contract may be called in one of three ways:

1. An EVM smart contract can use the EVM’s `CALL` opcode.
2. Ethereum-native tooling, like [MetaMask](../../basics/assets/metamask-setup.md), can be used in conjunction with an Ethereum-style account.
3. Finally, a native account can call method `3844450837` (`FRC42(InvokeEVM)`):
   1. The input data should either be empty or encoded as a CBOR byte string.
   2. The return data will either be empty or encoded as a CBOR byte string.
