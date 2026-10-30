---
description: >-
  Filecoin Pin keeps IPFS content pinned on Filecoin Cloud storage providers
  that prove they hold it, so your CIDs stay the same and keep working with
  IPFS tools and gateways.
---

# Filecoin Pin

**Filecoin Pin keeps your IPFS content stored on Filecoin.** Storage providers prove they still have it, and you pay only while they do. Your CIDs stay the same, so IPFS tools and gateways keep working. Filecoin Pin is live on mainnet.

## Who it's for

* **People moving from another pinning service,** such as Storacha or Pinata, who want their IPFS content kept and reachable.
* **Developers building on IPFS** who need storage that is proven, not just promised.

## What you get

* **Proven storage.** Providers prove they still have your data, and every proof is recorded onchain.
* **Pay for proven storage only.** Providers are paid when their proofs pass.
* **Your choice of providers.** No dependence on one company.
* **Works with IPFS.** Keep using Kubo, Helia and IPFS gateways.

## How it works

1. Filecoin Pin packs your file into an IPFS CAR file and uploads it to storage providers. It stores two copies by default.
2. The providers announce the content to IPFS, so it can be found through gateways.
3. The upload is recorded onchain as a piece in your data set.
4. Providers prove they still have it, and Filecoin Pay pays them as the proofs pass.

For how Filecoin and IPFS fit together, see [Filecoin and IPFS](../../getting-started/how-storage-works/filecoin-and-ipfs.md).

## Ways to use it

| Way | Use it when |
| --- | --- |
| [Filecoin Pin CLI](../../reference/filecoin-pin-cli.md) | You want to pin from a terminal |
| [GitHub Action](../../build/cookbook/filecoin-pin/github-action.md) | You want to pin a website or build output on every release |
| `publish` agent skill | You want an AI agent to pin content for you |
| [Demo app](https://github.com/filecoin-project/filecoin-pin-website) | You want a browser upload example to fork |

## Guides

| Use case | Guide |
| --- | --- |
| Pin your first file from the terminal | [Pin your first file](../../build/cookbook/filecoin-pin/getting-started.md) |
| Move content you already pinned elsewhere | [Migrate pinned data with ipfs2foc](../../build/cookbook/filecoin-pin/migrate-ipfs-pins/README.md) |
| [Host a static website](../../guides/host-a-static-website.md) | Host a static website |
| Pin a website on every release | [Pin a website with GitHub Actions](../../build/cookbook/filecoin-pin/github-action.md) |
| Give an agent memory that persists between sessions | [Give an agent persistent memory](../../guides/give-an-agent-persistent-memory.md) |
| Back an agent's onchain identity with stored metadata | [Register an agent with ERC-8004](../../build/cookbook/filecoin-pin/erc-8004-agent-registration.md) |

## Learn more

* [FAQ](../resources/faq.md)
* [Filecoin Pin on GitHub](https://github.com/filecoin-project/filecoin-pin)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data/tools/filecoin-pin)
