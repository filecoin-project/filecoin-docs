---
description: >-
  The functions of the Filecoin Warm Storage Service (FWSS) contract, grouped by who calls them.
---

# Filecoin Warm Storage Service contract

**FWSS runs warm storage on Filecoin Cloud.** It keeps the list of approved providers, sets prices, and connects storage proofs to payments:

* In **Filecoin Pay**, it is the operator that creates and manages payment rails for each data set.
* In the **PDP Verifier**, it is the listener. The PDP Verifier calls FWSS when data sets and pieces change and when proofs pass.

Source: [FilOzone/filecoin-services](https://github.com/FilOzone/filecoin-services). Addresses: [Contract addresses](addresses.md).

FWSS is two contracts:

| Contract | Use it to |
| --- | --- |
| FilecoinWarmStorageService (main) | Send transactions, such as ending storage. Other contracts and the owner call it too. |
| FilecoinWarmStorageServiceStateView | Read data: data sets, providers, prices and proof status. |

## Main contract

### Functions a client calls

| Function | What it does |
| --- | --- |
| `terminateService(dataSetId)` | Ends storage for a data set and its payments |
| `topUpCDNPaymentRails(dataSetId, cdnAmountToAdd, cacheMissAmountToAdd)` | Adds funds for FilBeam downloads |
| `terminateCDNService(dataSetId)` | Stops FilBeam downloads for a data set |

### Functions other contracts call

You don't call these. The **PDP Verifier** calls `dataSetCreated`, `piecesAdded`, `piecesScheduledRemove`, `possessionProven`, `nextProvingPeriod` and `dataSetDeleted`. **Filecoin Pay** calls `validatePayment` and `railTerminated`.

### Owner-only functions

`addApprovedProvider`, `removeApprovedProvider`, `configureProvingPeriod`, `announceMigration` and `migrate`. These manage the approved list, proving settings and upgrades.

## StateView contract

Read-only. Use it for all reads.

| Function | Returns |
| --- | --- |
| `getDataSet(dataSetId)` | A data set's details |
| `getClientDataSets(client)` | The data sets a wallet pays for |
| `getDataSetMetadata(dataSetId, key)`, `getAllDataSetMetadata(dataSetId)` | Data set metadata |
| `getDataSetPayerAndRailId(dataSetId)` | The payer and payment rail of a data set |
| `getDataSetStatus(dataSetId)` | Whether a data set is active |
| `getApprovedProviders(offset, limit)` | Approved provider IDs |
| `isProviderApproved(providerId)` | Whether a provider is approved |
| `getCurrentPricingRates()` | Current storage prices |
| `provingDeadline(setId)`, `provenThisPeriod(dataSetId)` | Proving deadline, and whether the current period is proven |
| `railToDataSet(railId)` | The data set behind a payment rail |

## Next steps

* [Pricing](../../store-data/overview/pricing.md): what warm storage costs.
* [PDP Verifier contract](pdp-verifier.md): the contract that checks storage proofs.
* [Filecoin Pay contract](filecoin-pay.md): the contract that pays providers.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/reference/contracts/fwss)
