---
description: >-
  Start building on Filecoin. Choose a path based on what you want to build —
  from simple storage integrations to full smart-contract applications.
---

# Getting started

This guide helps you pick the right path based on what you want to build on Filecoin.

## Choose your path

### Store data on Filecoin

The fastest way to start storing data on the Filecoin network.

| Path | Best for | Complexity |
|------|----------|------------|
| [Filecoin Onchain Cloud (FOC)](advanced/filecoin-onchain-cloud.md) | Programmatic, on-chain storage with minimal infrastructure | Low |
| [Storage onramps](../getting-started/how-storage-works/storage-onramps.md) | Managed services with simple APIs or drag-and-drop UIs | Low |
| [PDP](../storage-providers/pdp/README.md) | Provable data possession for service-level guarantees | Medium |

*For a step-by-step walkthrough, see [Upload to Filecoin](../getting-started/how-storage-works/upload-to-filecoin.md).*

### Deploy smart contracts

Build decentralized applications using Filecoin's EVM-compatible runtime.

1. **Set up your environment** — pick a [development framework](development-frameworks/README.md) (Remix, Hardhat, or Foundry).
2. **Get test tokens** — [request tFIL](developing-contracts/get-test-tokens.md) on the Calibration testnet.
3. **Write and deploy** — follow the [ERC-20 quickstart](developing-contracts/erc-20-quickstart.md) for your first contract.
4. **Verify your contract** — use one of the supported [verification methods](verification/README.md).

*For Filecoin-specific contract patterns, see [Call built-in actors](developing-contracts/call-built-in-actors.md) and [Filecoin.sol](developing-contracts/filecoin.sol.md).*

### Integrate advanced features

Once you have the basics, explore deeper integrations:

- [Oracles](advanced/oracles.md) — off-chain data feeds for your contracts
- [Cross-chain bridges](advanced/cross-chain-bridges.md) — move assets between Filecoin and other chains
- [FEVM Indexers](advanced/fevm-indexers.md) — query on-chain data efficiently
- [Decentralized databases](advanced/decentralized-databases.md) — structured data alongside Filecoin storage

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