---
description: Pin IPFS content to Filecoin using familiar IPFS tools and workflows.
---

# Filecoin Pin

{% hint style="success" %}
**Production-ready on Filecoin Mainnet**

Filecoin Pin is live on Filecoin Mainnet and ready for use. Register for product updates and announcements at [filecoin.cloud](https://filecoin.cloud/).
{% endhint %}

## What is Filecoin Pin?

Filecoin Pin is a fully decentralised persistence layer for IPFS content, backed by the global network of Filecoin storage providers and cryptographic proofs of storage.

When you pin content with Filecoin Pin, your IPFS data gains:

* **Verifiable persistence** - Storage providers must cryptographically prove daily that they continue to store and serve your data.
* **Economic incentives** - You only pay when storage proofs are successfully delivered and verified onchain.
* **Decentralised infrastructure** - Your data is stored across a global network of independent storage providers.
* **Sovereign data** - Choose your providers, audit storage proofs and payments onchain, with no dependency on a single company.
* **Seamless IPFS integration** - Keep using standard [IPFS Mainnet](https://docs.ipfs.tech/concepts/glossary/#mainnet) tooling like Kubo, Helia, and IPFS HTTP Gateways while gaining Filecoin's persistence guarantees.

## Who is Filecoin Pin for?

Filecoin Pin is for anyone who needs reliable, verifiable IPFS pinning:

* **People moving from another pinning service** - If you're coming from Storacha, Pinata, or any other IPFS pinning service, Filecoin Pin gives you a place to keep your IPFS content pinned and accessible.
* **Developers building on IPFS** - If you're building dApps, websites, AI agents, or other applications that rely on IPFS, Filecoin Pin provides the missing persistence layer with cryptographic guarantees.

{% hint style="info" %}
**Already have content pinned elsewhere?** This guide focuses on pinning new content. To move CIDs you already have pinned on Pinata, Storacha, or any public IPFS gateway onto Filecoin - without changing those CIDs - see [Migrating IPFS pins to Filecoin Onchain Cloud](migrate-ipfs-pins/README.md).
{% endhint %}

## How to Get Started

The fastest path to pinning your first file is the **Getting Started** guide below. It walks you through installing the CLI, connecting your wallet, depositing storage credit, and pinning content - end to end.

1. [**Getting Started**](getting-started.md) - Install Filecoin Pin and pin your first file in around 10 minutes. Start here.
2. [**Migrating IPFS pins to Filecoin Onchain Cloud**](migrate-ipfs-pins/README.md) - Bring CIDs you have already pinned on IPFS onto Filecoin Onchain Cloud, unchanged.
3. [Filecoin Pin GitHub Actions](github-action.md) - Automate pinning of websites or build artifacts as part of your CI/CD pipeline.
4. [Filecoin Pin dApp Demo](dapp-demo.md) - Run or fork a demo dApp showing browser-based file uploads to Filecoin.
5. [Filecoin Pin for ERC-8004 Agents](erc-8004-agent-registration.md) - Register a trustless autonomous agent on the ERC-8004 Identity Registry with verifiable persistent storage for agent metadata.

## Learn More

* [**FAQ**](faq.md) - Common questions about Filecoin Pin.
* [**Filecoin Pin GitHub Repository**](https://github.com/filecoin-project/filecoin-pin) - Source code and technical documentation.
* [**Community and Support**](https://github.com/filecoin-project/filecoin-pin?tab=readme-ov-file#community-and-support) - Join the community for real-time developer support and updates.
