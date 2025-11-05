---
description: Pin IPFS content to Filecoin using familiar IPFS tools and workflows.
---

# Filecoin Pin

## Status

Filecoin Pin is currently **alpha software** running on the Filecoin Calibration testnet. As of 2025-10-15, it is undergoing active development and not yet recommended for production use. Please register for updates and GA announcement at [filecoin.cloud](https://filecoin.cloud/).

## What is Filecoin Pin?

Filecoin Pin is a fully decentralized persistence layer for IPFS content using the global network of Filecoin storage providers with cryptographic guarantees.

When you use Filecoin Pin, your IPFS files gain:

- **Verifiable persistence** - Storage providers must cryptographically prove daily that they continue to store and serve your data
- **Economic incentives** - You only pay when storage proofs are successfully delivered and verified onchain
- **Decentralized infrastructure** - Your data can be stored across a global network of independent storage providers
- **Sovereign data** - Choose your providers, audit storage proofs and payments onchain, with no dependency on a single company
- **Seamless IPFS integration** - Continue using standard [IPFS Mainnet](https://docs.ipfs.tech/concepts/glossary/#mainnet) tooling like Kubo, Helia, and IPFS HTTP Gateways while gaining Filecoin's persistence guarantees

## Who is Filecoin Pin for?

Filecoin Pin is designed for developers building on IPFS who need trustless, economically-incentivized persistence for their content. Whether you're building dApps, workflows, websites, AI agents, or other applications, Filecoin Pin provides the missing persistence layer for IPFS.

## How to Get Started

Get started using Filecoin Pin today with:
1. [Filecoin Pin CLI](filecoin-pin-cli.md) - Upload new or existing IPFS files directly to Filecoin via the command line. Perfect for developers who want to integrate Filecoin storage into scripts, workflows, or local development environments.
2. [Filecoin Pin GitHub Actions](github-action.md) - Use GitHub Actions to automatically publish websites or build artifacts to IPFS and Filecoin as part of your CI/CD pipeline. Ideal for static websites, documentation sites, and automated deployment workflows.
3. [Filecoin Pin dApp Demo](dapp-demo.md) - Run or fork a simple demo dApp that demonstrates Filecoin Pin in a browser-based application. Great for understanding how to integrate Filecoin Pin into web applications.
4. [Filecoin Pin for ERC-8004 Agents](erc-8004-agent-registration.md) - Learn how to register a trustless autonomous agent on the ERC-8004 Identity Registry with verifiable persistent storage for agent metadata using Filecoin Pin.


## Learn More

- **[FAQ](faq.md)** - Common questions about Filecoin Pin
- **[Filecoin Pin GitHub Repository](https://github.com/filecoin-project/filecoin-pin)** - Source code and technical documentation
- **[Community and Support](https://github.com/filecoin-project/filecoin-pin?tab=readme-ov-file#community-and-support)** - Join the community for real-time developer support and updates.


