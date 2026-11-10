---
description: >-
  Step-by-step guides for storing data on Filecoin: AI agents, websites, IPFS
  content, storage services, and enterprise records.
---

# Guides

**Step-by-step guides for common things you build with Filecoin Cloud.** Each guide lists its requirements, the network and tokens it uses, how to fund your account, the steps, and how to fix common problems.

New to Filecoin Cloud? Start with the [Quickstart](../getting-started/quickstart.md).

## AI and agents

| Guide | What you'll do |
| --- | --- |
| [Give an agent persistent memory](give-an-agent-persistent-memory.md) | Save an agent's memory files to Filecoin at the end of a session and load them at the start of the next, with the Filecoin Pin CLI. |
| [Store datasets and model weights](store-datasets-and-model-weights.md) | Store a training dataset or a set of model weights on Filecoin with the Filecoin CLI, check the cost first, and download a verified copy later. |
| [Keep verifiable agent records](keep-verifiable-agent-records.md) | Have an AI agent publish its reports, logs, and other outputs to Filecoin with the publish skill, so anyone can later check a record is exactly what the agent produced. |
| [Register an agent with ERC-8004](register-an-agent-with-erc-8004.md) | Register an AI agent on the ERC-8004 Identity Registry, with its agent card stored on Filecoin so anyone can fetch it and check it's still stored. |

## Apps and websites

| Guide | What you'll do |
| --- | --- |
| [Host a static website](host-a-static-website.md) | Upload a static site's build folder to Filecoin and open it at an IPFS link, with the Filecoin Pin CLI. |
| [Pin a website with GitHub Actions](pin-a-website-with-github-actions.md) | Upload your website's build output to Filecoin on every push or pull request with the Filecoin Pin Upload Action. |

## Store with IPFS

| Guide | What you'll do |
| --- | --- |
| [Migrate pinned data with ipfs2foc](migrate-pinned-data-with-ipfs2foc.md) | Move content you already pinned on IPFS to Filecoin with ipfs2foc, keeping every CID unchanged. |
| [Store RWAs with IPFS](store-rwas-with-ipfs.md) | Link a tokenized asset to its offchain records, such as deeds and appraisals, by storing them on Filecoin and recording their CIDs onchain. |
| [Keep CIDs and IPNS names resolving](keep-cids-and-ipns-names-resolving.md) | What keeps content stored with Filecoin Pin findable by its CID on IPFS, what can break it, and how to check. |

## Storage platforms

| Guide | What you'll do |
| --- | --- |
| [Build a storage service](build-a-storage-service.md) | What a storage service needs, and how to build its storage backend on Filecoin Cloud with the Filecoin SDK. |
| [Charge your customers with Filecoin Pay](charge-your-customers-with-filecoin-pay.md) | Bill your customers onchain with Filecoin Pay: they deposit and approve your service, your contract opens a payment rail, and you can take a commission. |
| [Select providers by region](select-providers-by-region.md) | Find storage providers by the location they list and store your copies only with them, using the Filecoin Pin CLI or the Filecoin SDK. |

## Enterprise

| Guide | What you'll do |
| --- | --- |
| [Keep immutable, auditable records](keep-immutable-auditable-records.md) | Store company records on Filecoin so you can later prove they haven't changed and are still stored, with an onchain trail of proofs and payments. |
| [Archive large datasets](archive-large-datasets.md) | Archive a dataset of 1 TiB or more with the Filecoin Cold Storage Service: choose your terms, store, monitor, and retrieve. |

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/guides)
