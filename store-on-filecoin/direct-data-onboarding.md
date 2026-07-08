---
description: >-
  How direct data onboarding lets storage providers commit data without
  requiring a built-in market deal.
---

# Direct data onboarding

Direct data onboarding is a Filecoin protocol path introduced by [FIP-0076](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0076.md). It lets storage providers commit data to sectors and claim verified allocations without requiring a built-in storage market actor deal.

Use direct data onboarding when the storage arrangement does not need an on-chain market payment, or when verified data terms are already recorded through Filecoin Plus allocation flows. Existing built-in market onboarding remains supported, but direct onboarding removes that actor from workflows that do not need it.

{% hint style="info" %}
Direct data onboarding is a low-level provider workflow, not a managed upload service. If you want a simple developer upload API, start with [Programmable storage](programmable-storage.md) or [Storage onramps](storage-onramps.md).
{% endhint %}

## Who it is for

Direct data onboarding is mainly for:

* Storage providers onboarding data into their own sectors.
* Data preparers coordinating large datasets with known providers.
* Verified clients and allocators using Filecoin Plus allocations outside a built-in market deal.
* Teams building custom markets or settlement flows that do not rely on the built-in storage market actor.

For most application developers, direct data onboarding is not the first integration point. Use a managed storage path when you want the platform to handle provider selection, payments, retries, and retrieval routing.

## When to use it

Use direct data onboarding when:

* A provider and client already have a storage arrangement.
* Payments are handled off-chain, prepaid, subsidized, or not needed.
* The data is verified through a Filecoin Plus allocation.
* The provider wants to commit data without publishing a built-in market deal.
* The workflow needs lower protocol overhead than built-in market deal publication.

Use another path when:

* You need a simple upload API for an application. See [Programmable storage](programmable-storage.md).
* You want a managed service or S3-style workflow. See [Storage onramps](storage-onramps.md).
* You need an on-chain market deal with built-in deal payment semantics. See [Storage deals](../storage-providers/filecoin-deals/storage-deals.md).
* You need an end-to-end dataset preparation and deal pipeline. See [Singularity](https://data-programs.gitbook.io/singularity).

## How it works

In the direct data onboarding flow:

1. The client, allocator, or authorized delegate creates a verified allocation through the verified registry when the data should use Filecoin Plus DataCap.
2. The storage provider prepares the data pieces and sector data commitment.
3. At pre-commit, the provider specifies the sector's unsealed data commitment.
4. At prove-commit or replica-update time, the provider declares the piece manifest for the sector.
5. For each piece, the provider can claim a verified allocation and, where supported, notify another actor about the commitment.
6. The miner actor verifies that the declared pieces match the proven sector data, claims valid allocations, computes power and pledge, and activates the sector.

The built-in storage market actor is still available when an on-chain-settled deal is required. Direct data onboarding is the lower-overhead path when the provider and client do not need those market actor features.

## Protocol changes

FIP-0076 added two miner actor methods for sector activation:

* `ProveCommitSectors3` for newly committed sectors.
* `ProveReplicaUpdates3` for replica updates.

These methods let providers declare the pieces that make up a sector at prove-commit or replica-update time. For each piece, a provider can claim a verified allocation. The activation manifest can also include data commitment notifications.

For built-in market flows, the storage market actor can still be involved. For direct onboarding flows, the provider can commit the data and claim the allocation without first publishing a built-in market deal.

## Operational notes

Direct data onboarding does not remove the need for storage-provider operations. The provider still needs to:

* Prepare or receive the data pieces.
* Coordinate piece CIDs, piece sizes, provider IDs, client IDs, and allocation IDs.
* Move data into the provider's sealing or replica-update pipeline.
* Keep retrieval expectations clear with the client.
* Monitor allocation expiration, proof deadlines, sector activation, and retrieval availability.

Sector activation can fail if the declared pieces do not match the sector data commitment, the proof is invalid, or a verified allocation cannot be claimed. Providers should test the full flow on Calibration before relying on it for production onboarding.

## How it relates to Filecoin Plus

Filecoin Plus allocators grant DataCap to verified clients. Direct data onboarding lets providers claim those verified allocations during sector activation, without requiring a duplicate built-in market deal just to record the verified data terms.

This makes direct data onboarding useful for verified datasets where the client, provider, piece commitment, and duration are already represented by the verified allocation.

## Summary

| Question | Answer |
| --- | --- |
| What is it? | A protocol path for committing data to Filecoin sectors without requiring a built-in market deal. |
| Who uses it? | Storage providers, data preparers, verified clients, allocators, and custom storage-market builders. |
| What does it replace? | Built-in market deal publication for workflows that do not need built-in market actor features. |
| What does it still require? | Provider infrastructure, data preparation, sector activation, verified allocation coordination, and retrieval planning. |
| What should app developers use first? | [Programmable storage](programmable-storage.md) or [Storage onramps](storage-onramps.md). |

## Related docs

* [Filecoin Plus](filecoin-plus.md) explains DataCap and verified data.
* [Programmable storage](programmable-storage.md) compares storage paths.
* [Storage deals](../storage-providers/filecoin-deals/storage-deals.md) explains provider-side deal workflows.
* [FIP-0076](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0076.md) is the protocol specification.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/store-on-filecoin/direct-data-onboarding)
