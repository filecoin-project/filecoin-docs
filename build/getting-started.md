---
description: >-
  Start building on Filecoin. Choose a path based on what you want to build —
  from simple storage integrations to full smart-contract applications.
---

# Getting started

This guide helps you pick the right path based on what you want to build on Filecoin.

## Choose your path

### Store data on Filecoin

Filecoin provides multiple storage paths depending on how much control you need. [Filecoin Onchain Cloud (FOC)](filecoin-onchain-cloud/README.md) is the recommended starting point. It provides a complete on-chain storage stack with warm storage, cryptographic verification, and automated payments through the [Synapse SDK](filecoin-onchain-cloud/synapse-quickstart.md). If you prefer a managed service, [storage onramps](../store-on-filecoin/storage-onramps.md) let you store data through simple APIs or web UIs without managing infrastructure. For operators who want to run their own PDP-enabled storage provider, see the [PDP setup guide](../storage-providers/pdp/README.md).

| Path | Best for | Complexity |
|------|----------|------------|
| [Filecoin Onchain Cloud (FOC)](filecoin-onchain-cloud/README.md) | Verifiable on-chain storage with FWSS, PDP, and Filecoin Pay via the Synapse SDK | Low |
| [Storage onramps](../store-on-filecoin/storage-onramps.md) | Managed services with simple APIs or drag-and-drop UIs | Low |
| [PDP](../storage-providers/pdp/README.md) | Run your own PDP-enabled storage provider (part of the FOC stack) | Medium |

*For a walkthrough of programmable storage options, see [Programmable storage](../store-on-filecoin/programmable-storage.md).*

### Deploy smart contracts

Filecoin runs an EVM-compatible runtime, so you can write Solidity contracts and deploy them using familiar Ethereum tooling. Choose a [development framework](development-frameworks/README.md) (Remix, Hardhat, or Foundry), get [test tokens](developing-contracts/get-test-tokens.md) on Calibration, and deploy your first contract with the [ERC-20 quickstart](developing-contracts/erc-20-quickstart.md). Once deployed, [verify your contract](verification/README.md) through a block explorer.

Filecoin contracts can also interact with the storage network directly. Use [Filecoin.sol](developing-contracts/filecoin.sol.md) to access storage primitives from Solidity, or [call built-in actors](developing-contracts/call-built-in-actors.md) to work with miner, market, and power actors on-chain.

### Integrate advanced features

After you have a working contract, Filecoin supports deeper integrations. [Oracles](advanced/oracles.md) bring off-chain data into your contracts. [Cross-chain bridges](advanced/cross-chain-bridges.md) let you move assets between Filecoin and other networks. [FEVM indexers](advanced/fevm-indexers.md) provide efficient on-chain data queries without running an archival node. [Decentralized databases](advanced/decentralized-databases.md) add structured data storage alongside Filecoin.

*Browse more in the [Advanced](advanced/README.md) section or find solution-focused recipes in the [Cookbook](cookbook/README.md).*

## Key resources

| Resource | Description |
|----------|-------------|
| [Networks](../networks-and-tools/networks/README.md) | Mainnet, Calibration testnet, and local development |
| [Metamask setup](../networks-and-tools/assets/metamask-setup.md) | Connect your wallet to Filecoin |
| [FEVM vs Ethereum](../core-concepts/filecoin-evm-runtime/difference-with-ethereum.md) | Key differences for Ethereum developers |
| [How gas works](../core-concepts/filecoin-evm-runtime/how-gas-works.md) | Filecoin gas model for transaction planning |
| [Support](developing-contracts/support.md) | Where to get help |

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/build/getting-started)
