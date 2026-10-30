---
description: >-
  Store agent memory, datasets, model weights, and records on Filecoin, where
  they outlast the session, the tool, and the vendor.
---

# AI developers

**Filecoin gives your agents and AI applications a place to keep memory, artifacts, and records that outlasts the session, the tool, and the vendor.** The data stays portable across agents and frameworks, and storage providers prove on chain that they still hold it.

## What you can do

| Use case | Guide |
| --- | --- |
| Give an agent memory that persists between sessions | [Give an agent persistent memory](../../guides/give-an-agent-persistent-memory.md) |
| Store training datasets and model weights | [Store datasets and model weights](../../guides/store-datasets-and-model-weights.md) |
| Keep a verifiable record of what an agent did | [Keep verifiable agent records](../../guides/keep-verifiable-agent-records.md) |
| Back an agent's onchain identity with stored metadata | [Register an agent with ERC-8004](../../build/cookbook/filecoin-pin/erc-8004-agent-registration.md) |

## Common questions

**What are a data set and a PieceCID?**
Each file you upload becomes a piece, identified by its PieceCID, and a provider keeps your pieces in a data set. See [Data sets and pieces](../../core-concepts/data-sets-and-pieces.md).

**Why are there two copies?**
By default, the Filecoin SDK stores your data with two independent providers, so it stays available if one goes offline. You can store more copies by setting the number of copies or choosing providers. Each copy is paid for separately.

**How fast can I read data back?**
Warm storage serves data directly from the provider over HTTP, with latency in the range of seconds and no egress charge. See [Retrieval and CDN](../../core-concepts/retrieval-and-cdn.md).

**What does it cost?**
Warm storage has a fixed price per TiB per month, paid in USDFC. See [Pricing](../../store-data/overview/pricing.md).

**Can my agent get its memory back reliably?**
Providers prove every proving period that they still hold your data, and the second copy keeps it available if one provider goes offline. See [Reliability and proofs](../../store-data/overview/reliability-and-proofs.md).

## Start here

* [Quickstart](../quickstart.md): set up an account and store your first file.
* [Filecoin for Agents](../../core-concepts/filecoin-for-agents.md): connect an agent with the `publish` skill or the `filecoin` CLI and its agent plugin.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/getting-started/paths/ai-developers)
