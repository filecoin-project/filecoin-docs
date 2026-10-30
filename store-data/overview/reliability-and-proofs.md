---
description: >-
  Every Filecoin Cloud provider proves it still holds your data each proving
  period; a missed proof is recorded onchain, cuts that provider's pay, and
  your second copy keeps the data available.
---

# Reliability and proofs

**Every storage provider must prove, in every proving period, that it still has your data.** If a provider misses a proof, the miss is recorded onchain and the provider is paid less. Your data is stored twice by default, so the other provider still has it.

## How your data is protected

* **Two copies.** The Filecoin SDK stores each file with two different providers by default.
* **Regular proofs.** Each provider proves it has your data in every proving period. It can't fake the proof without the data.
* **Pay only for proven storage.** Payments are tied to proofs, so a provider that stops proving stops earning.
* **A public record.** Every proof is recorded onchain, where anyone can check it.

## What happens when a provider misses a proof

1. **A proving period starts.** The PDP Verifier picks random parts of your data to check. The randomness comes from drand, so the provider can't guess the parts in advance.
2. **The provider must answer in time.** It sends a proof built from those parts before the proving window closes.
3. **No valid proof means a fault.** The fault is recorded onchain against that provider and data set.
4. **The provider is paid less.** The Warm Storage service reduces the payment for that period.
5. **Repeated faults cost more.** The provider gets penalties, and after too many faults its payment rail is ended.
6. **Your other copy is not affected.** You can still download your data from the other provider.

## Proofs for cold storage

Cold storage uses different proofs. Providers seal a unique copy of your data with Proof of Replication (PoRep), then prove every day that they still store it with Proof of Spacetime. They are paid according to how well they meet the service levels in your deal. If a provider stops delivering, a repair moves your dataset to a new provider. See [Cold storage for archival data](../cold-storage/cold-storage-for-archival-data.md).

## What you can do

* **Check proof status.** Look up your data set in [PDP Explorer](https://pdp.filecoin.cloud), or see [Monitor balance and proofs](../warm-storage/monitor-balance-and-proofs.md).
* **Check provider health.** [DealBot](https://dealbot.filoz.org/) tracks how reliable each provider is.
* **Keep enough copies.** If you store only one copy, a provider fault can leave your data with no healthy copy. Keep the default of two, or more for important data.

## What this does not cover

Proofs protect you from providers losing your data. They don't protect you from running out of funds. If your deposit runs out, providers can end the service and remove your data. Keep your account funded: see [Monitor balance and proofs](../warm-storage/monitor-balance-and-proofs.md).

## Learn more

* Proof of Data Possession: how the proofs work.
* [How it works](how-it-works.md): where proofs fit in Filecoin Cloud.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data/overview/reliability-and-proofs)
