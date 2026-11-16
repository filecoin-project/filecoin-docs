---
description: >-
  Proof of Data Possession (PDP) is how the Filecoin chain checks, every
  proving period, that a Warm Storage provider still holds your data, without
  anyone downloading it.
---

# Proof of Data Possession

**Proof of Data Possession (PDP) is how the Filecoin chain checks, on a fixed schedule, that a storage provider still holds your data, without anyone downloading it.**

This is a concept page. To check the proofs for your own data, see [Monitor balance and proofs](../store-data/warm-storage/monitor-balance-and-proofs.md). If you run a provider, see [Monitor proofs and faults](../provide-storage/monitor-proofs-and-faults.md).

## What PDP guarantees

* **The data is intact.** A proof can only be built from the exact bytes you stored.
* **The data is still there.** The provider has to answer a new, unpredictable challenge every proving period.
* **Payment follows proof.** A provider is paid for a period only if it proved that period.

## A proving round

Each data set is checked once per proving period:

1. **The chain picks what to check.** The PDP Verifier contract chooses random parts of the data set. The randomness comes from drand, a public randomness service, so the provider can't know in advance which parts will be picked.
2. **The provider builds a proof** from the challenged parts. It can't do this without the data.
3. **The proof is checked onchain** against the PieceCIDs recorded for the data set. Nobody downloads the data.
4. **The Warm Storage service records the result.** A valid proof marks the period as proven.

![A PDP proving round. 1: the PDP Verifier contract sends the storage provider a challenge naming random parts of the data set. 2: the provider sends back a proof built from those parts, and the PDP Verifier checks it. 3: the PDP Verifier tells the Warm Storage service whether the period is proven or a fault. 4: the Warm Storage service tells Filecoin Pay the amount owed. 5: Filecoin Pay pays the provider from your deposit, for proven periods only.](assets/pdp-proving-round.png)

## Proving periods and faults

| Network | Proving period | Time to submit a proof |
| --- | --- | --- |
| Mainnet | 2,880 epochs (1 day) | The last 20 epochs (10 minutes) of each period |
| Calibration | 240 epochs (2 hours) | The last 20 epochs (10 minutes) of each period |

An [epoch](../reference/general/glossary.md#epoch) is 30 seconds. If the provider doesn't submit a valid proof in time, the period is a fault. The fault is recorded onchain, and the provider is paid nothing for that period. What a fault means for your data is covered in [Reliability and proofs](../store-data/overview/reliability-and-proofs.md).

## PDP and PoRep

Filecoin has two kinds of storage proof:

| Compared | PDP | [PoRep](../reference/general/glossary.md#proof-of-replication-porep) |
| --- | --- | --- |
| Used for | Warm storage | Archival storage and consensus mining |
| How the data is kept | As uploaded, ready to download | Encoded into a unique copy first ([sealed](../reference/general/glossary.md#seal)), which takes longer to read back |
| How often it's proven | Every proving period | Every 24 hours |

For how providers earn with each, see [How storage providers earn](../provide-storage/how-storage-providers-earn.md).

## The contracts involved

* **PDP Verifier** keeps the list of pieces in each data set, issues challenges and checks proofs. It has no payment logic.
* **Warm Storage service** ([FWSS](../reference/general/glossary.md#filecoin-warm-storage-service-fwss)) sets the proving schedule, records faults, and tells Filecoin Pay how much to pay for each period.

For addresses, see [Contracts](../reference/contracts.md).

## Common questions

**Who can check the proofs?**
Anyone. To see a data set's proofs and faults, look it up in [PDP Explorer](https://pdp.filecoin.cloud).

**Does a valid proof mean I can download my data?**
It shows the provider still holds the data. Downloading is a separate request, so if one provider doesn't serve it, use another copy. See [Retrieval and CDN](retrieval-and-cdn.md).

## Next steps

* [Reliability and proofs](../store-data/overview/reliability-and-proofs.md): what happens when a provider misses a proof.
* [Payments and runway](payments-and-runway.md): how proofs connect to payment.
* [Data sets and pieces](data-sets-and-pieces.md): what is being proved.

*Applies to: Warm Storage contracts 1.4.0 and PDP Verifier 3.5.0.*

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/core-concepts/proof-of-data-possession)
