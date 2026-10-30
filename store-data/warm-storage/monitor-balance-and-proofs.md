---
description: >-
  Check how long your deposit will last and whether providers are proving your
  data; top up before your balance runs out, because a deficit stops uploads
  and lets providers end service.
---

# Monitor balance and proofs

**Watch two things: your balance, which pays for your storage as time passes, and your proofs, which show providers still have your data.** Top up before your balance runs out. If it does, new uploads fail and providers can end your storage.

## Check your balance

### Agent

Ask your agent to check your Filecoin account. It runs `filecoin status` and, if you're low, gives you a link to top up.

### CLI

```sh
filecoin status
```

It shows your USDFC funds and, when the account needs more, a prefilled funding link.

### SDK

```ts
const summary = await synapse.payments.accountSummary()
const daysLeft = epochsToDays(summary.runwayInEpochs)

console.log(`Your balance covers ${daysLeft} more days`)
if (daysLeft < 7n) console.warn("Low balance: top up soon")
```

## What happens if your balance runs out

When your balance runs out, your account is in deficit:

* **New uploads fail** until you top up.
* **Providers can end your storage.** They can end your payment rails and keep up to 30 days of payment from your lockup. Once ended, a rail can't be restarted by topping up, and the provider may remove your data.
* **Your next deposit pays the debt first,** then funds new storage.

## Top up

Top up the same way you funded your account. See [Fund storage](fund-storage.md). In the SDK, add a buffer with `extraRunwayEpochs` when you call `prepare()`.

## Check your proofs

* **In a browser:** search [PDP Explorer](https://pdp.filecoin.cloud) by data set ID, provider ID or PieceCID. It shows each proof a provider has sent.
* **From an agent:** the MCP tool `get_data_set` returns a data set's details.
* **Provider health:** [DealBot](https://dealbot.filoz.org/) tracks how reliable each provider is over time.

To learn what happens when a provider misses a proof, see [Reliability and proofs](../overview/reliability-and-proofs.md).

## Check your payments

Payments to providers settle automatically. To see them, look up your wallet in [Filecoin Pay Explorer](https://pay.filecoin.cloud).

## Get notified

Subscribe to the [Filecoin Cloud status page](https://status.filecoin.cloud) for maintenance, downtime and contract upgrades.

## Next steps

* [Reliability and proofs](../overview/reliability-and-proofs.md).
* Payments and runway: how the lockup works.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data/warm-storage/monitor-balance-and-proofs)
