---
description: >-
  How direct data onboarding lets storage providers commit data without
  requiring a built-in market deal.
---

# Direct data onboarding

Direct data onboarding is a protocol path introduced by [FIP-0076](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0076.md). It lets storage providers commit data to sectors and claim verified allocations without requiring a built-in storage market actor deal.

This is useful when the storage arrangement does not need an on-chain market payment or when verified data terms are already recorded through Filecoin Plus allocation flows. Existing built-in market onboarding remains supported, but direct onboarding removes that actor from workflows that do not need it.

## What changed

FIP-0076 added new miner actor methods for activating sectors:

* `ProveCommitSectors3` for proving newly committed sectors.
* `ProveReplicaUpdates3` for proving replica updates.

These methods let providers declare the pieces that make up a sector at prove-commit or replica-update time. For each piece, a provider can claim a verified allocation and, where supported, notify another actor about the data commitment.

## How the flow works

For verified data, a client or authorized delegate first creates a verified allocation through the verified registry. The storage provider then:

1. Specifies the sector's unsealed data commitment at pre-commit.
2. Proves the sector or replica update.
3. Declares the piece manifest for the sector.
4. Claims any verified allocation associated with the pieces.
5. Activates the sector without requiring a built-in market deal.

The built-in market actor is still available when an on-chain-settled deal is required. Direct onboarding is the lower-overhead path when the provider and client do not need those market actor features.

## Related docs

* [Filecoin Plus](filecoin-plus.md) explains DataCap and verified data.
* [Programmable storage](programmable-storage.md) compares storage paths.
* [Storage deals](../storage-providers/filecoin-deals/storage-deals.md) explains provider-side deal workflows.
* [FIP-0076](https://github.com/filecoin-project/FIPs/blob/master/FIPS/fip-0076.md) is the protocol specification.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/store-on-filecoin/direct-data-onboarding)
