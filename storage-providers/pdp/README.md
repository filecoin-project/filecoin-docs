---
description: >-
  Canonical conceptual guidance for PDP on Filecoin, including when to use it
  and how it replaces legacy programmatic storage paths.
---

# PDP (Proof of Data Possession)

{% hint style="danger" %}
**ALPHA FEATURE - UNDER DEVELOPMENT**

This documentation covers the PDP (Proof of Data Possession) feature, which is currently in alpha and under active development. This tool is intended for testing and experimental use only.

For production use and submitting real deals with live PDP Storage Providers, please use the [Synapse SDK](https://github.com/FilOzone/synapse-sdk).
{% endhint %}

PDP is the modern model for verifiable data storage workflows on Filecoin. This page is the canonical conceptual landing page for PDP and should be used as the default replacement path for legacy programmatic-storage guidance.

## What PDP is

PDP adds proof-oriented storage semantics so applications can reason about storage outcomes with stronger verification guarantees. It is designed for integrations that need reliable, programmatic assurances around stored data.

## When to use PDP

Use PDP when you need one or more of the following:

* Verifiable storage guarantees as part of your application flow.
* A modern replacement for legacy Deal Client or RaaS-oriented workflows.
* A stable foundation that aligns with current Filecoin storage direction.

## What PDP replaces

PDP replaces older programmatic-storage patterns that centered on direct Deal Client and RaaS-heavy walkthroughs. Those workflows are maintained only as deprecated reference material and are not the default path for new builds.

For migration context, start at [Modern storage patterns](../../reference/general/modern-storage-patterns.md).

## Getting started paths

1. **Understand the modern model** via [Modern storage patterns](../../reference/general/modern-storage-patterns.md).
2. **Run PDP infrastructure in-repo** with [Install & Run PDP](install-and-run-pdp.md).
3. **Use FOC/PDP tooling docs** from official external sources below.
4. **Choose an ingestion path** with the in-repo [Storage onramps overview](../../basics/how-storage-works/storage-onramps.md).

## Official PDP/FOC links

* **FOC docs:** [docs.filecoin.cloud](https://docs.filecoin.cloud/)
* **FWSS overview:** [docs.filecoin.cloud/core-concepts/fwss-overview](https://docs.filecoin.cloud/core-concepts/fwss-overview/)
* **Synapse SDK repo:** [github.com/FilOzone/synapse-sdk](https://github.com/FilOzone/synapse-sdk)