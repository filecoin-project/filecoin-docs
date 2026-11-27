---
description: >-
  How you get paid for warm storage and archival storage on Filecoin, how block
  rewards work for sealed storage, and what each one costs.
---

# How storage providers earn

**You can earn in two ways. Clients pay you to store their data. The network also pays FIL block rewards to providers who seal storage.**

## Warm storage (PDP)

Clients pay in USDFC, a US dollar stablecoin on Filecoin. The money streams to you through Filecoin Pay while you prove you still hold their data. Filecoin Pay uses your proof results to adjust payments, so missed proofs cost you income.

The price is set by the contract and is the same for every provider:

* 2.5 USDFC per TiB per month
* 0.12 USDFC per data set per month
* A 0.5% network fee, taken when payments settle

You don't lock up any FIL. You only keep a small FIL balance to pay for proof messages: about 8 FIL on Mainnet.

## Archival storage (FCSS)

A client publishes a deal on the PoRep Market with its terms: how long, the price, and how fast and reliably the data must be ready to download. The market matches the deal to an offer you publish. You download the data and seal it. While the deal runs, Filecoin Pay pays you in USDFC based on how well you meet its terms. You can also charge for downloads.

The data is sealed into your sectors, so it also counts toward your storage power and block rewards.

## Block rewards for sealed storage

Archival storage seals client data into 32 GiB sectors and proves each one every 24 hours. Sealed sectors give you **storage power**. The network picks who makes each block in proportion to power, and each block pays a FIL reward.

* You need at least 10 TiB of power to win blocks.
* 25% of each reward is yours right away. The other 75% unlocks over about 180 days.
* Since the Solstice network upgrade (October 2026), Filecoin Plus is gone: every new sector gets the same power, with or without client data. Part of each block reward now goes to services that bring paying clients, and the share for consensus mining steps down over time.

## What sealing costs

* **Initial pledge:** FIL locked for each sector for its whole life. Rough guide: pledge for X TiB = pledge per 32 GiB sector × 32 × X. At 0.20 FIL per sector, 100 TiB needs about 640 FIL. Chain explorers show the current pledge.
* **Pre-commit deposit:** a smaller deposit when you start sealing a sector. You lose it if the sector never finishes.
* **Gas:** paid for every message you send, including daily proofs.
* **Daily sector fee (FIP-0100):** taken from your rewards first, then from your miner's balance. Unpaid fees become **fee debt**. While you have fee debt, you can't win blocks.

If something goes wrong:

* **Fault fee:** for each day a sector misses its proof.
* **Sector penalty:** for a missed proof you didn't report in time.
* **Termination fee:** when a sector ends early.

Before your first reward arrives, you pay all of this yourself. Keep a FIL buffer in your miner, and don't withdraw it all.

## Next steps

* [Requirements](requirements.md)
* [Provide warm storage](provide-warm-storage.md)
* [Build a sealing cluster](build-a-sealing-cluster.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/provide-storage/how-storage-providers-earn)
