---
description: >-
  How Filecoin Cloud storage is paid for: a USDFC deposit in Filecoin Pay, one
  payment rail per data set, a 30-day lockup that guarantees providers are
  paid, and runway, how long the rest of your deposit lasts.
---

# Payments and runway

**You pay for storage from a USDFC deposit in Filecoin Pay. Part of it is locked as a 30-day guarantee to storage providers, and your runway is how long the rest lasts.** Each provider is paid over time, only for the periods it proves it holds your data.

This is a concept page. To deposit funds, see [Fund storage](../store-data/warm-storage/fund-storage.md). For prices, see [Pricing](../store-data/overview/pricing.md).

[USDFC](https://docs.secured.finance/usdfc-stablecoin) is a stablecoin pegged to the US dollar, so storage prices don't move with the FIL price. You also need a little FIL to pay the transaction fees for your own actions, such as depositing.

## How money moves

1. **You deposit** USDFC into your Filecoin Pay account. You can withdraw anything that isn't locked.
2. **You approve the Warm Storage service** to manage payments for you, within limits you set.
3. **A payment rail opens for each data set.** A rail is a payment stream from you to one provider.
4. **Payment accrues every [epoch](../reference/general/glossary.md#epoch) (30 seconds)**, at a rate set by how much the data set stores.
5. **The provider settles**, moving what it's owed from your account to its own. The Warm Storage service checks the proofs first and pays nothing for periods with a missed proof. See [Proof of Data Possession](proof-of-data-possession.md).

For how Filecoin Pay works (accounts, payment rails, operators and validators), see [Filecoin Pay](../store-data/tools/filecoin-pay.md). For this flow as a diagram, see [How Filecoin works](../getting-started/how-filecoin-works.md).

## Lockup

The lockup is the part of your deposit held back so providers are paid even if your account runs empty. It isn't spent while the service runs normally.

Each rail locks 30 days of payment at its current rate, so the lockup grows as you store more.

**Example:** a data set that costs 3 USDFC a month needs 3 USDFC locked. If your deposit is 10 USDFC, 7 USDFC is free to spend on more storage or to withdraw.

The refundable reserve is held separately for each active data set. It pays one-time fees, such as adding or deleting files. See [Pricing](../store-data/overview/pricing.md).

## Runway

Runway is how long your deposit lasts at your current rates. If your balance runs out, new uploads fail, and providers can end your payment rails. A provider whose rail ends is paid from the lockup for up to 30 more days, and then may remove your data.

If an upload costs more than your balance, top up first. See [Fund storage](../store-data/warm-storage/fund-storage.md). To check your runway, see [Monitor balance and proofs](../store-data/warm-storage/monitor-balance-and-proofs.md).

## Common questions

**When is the lockup released?**
When a data set's payment rail ends and is settled, its lockup is released, and you can withdraw it.

## Next steps

* [Fund storage](../store-data/warm-storage/fund-storage.md): deposit and approve the Warm Storage service.
* [Data sets and pieces](data-sets-and-pieces.md): what each rail pays for.
* [Contracts](../reference/contracts.md): Filecoin Pay and Warm Storage contract addresses.
* [FAQ](../store-data/resources/faq.md): short answers to common questions.

*Applies to: Warm Storage contracts 1.4.0 and Filecoin SDK 2.x.*

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/core-concepts/payments-and-runway)
