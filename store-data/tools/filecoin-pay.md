---
description: >-
  Filecoin Pay is the onchain payment contract behind Filecoin Cloud: you
  deposit tokens, approve a service, and payment rails stream funds to
  providers only while the service is delivered.
---

# Filecoin Pay

**Filecoin Pay is the onchain payment system behind Filecoin Cloud.** You deposit funds, approve a service such as Warm Storage, and Filecoin Pay pays providers over time, only while they deliver the service.

## Why it matters to you

* **You stay in control.** Your funds sit in your own Filecoin Pay account. You can top up or withdraw what isn't locked.
* **You pay for service delivered.** Payments are tied to proofs, so providers are paid only while they keep proving.
* **Every payment is public.** Deposits, payment streams and payouts are all onchain.
* **Any token.** Filecoin Pay works with FIL and ERC-20 tokens. Filecoin Cloud storage uses USDFC.

## The four parts

| Part | What it is |
| --- | --- |
| Account | Your funds in Filecoin Pay. You control it. |
| Payment rail | A payment stream from you to one provider, for one data set. |
| Operator | A service you approve to manage rails for you, within limits you set. For storage, this is the Warm Storage service. |
| Validator | A contract that checks a provider delivered before payment is released. |

## The lockup

Part of your deposit is locked to guarantee providers get paid, even if your account runs empty. For Warm Storage, the lockup is always 30 days of storage at your current rate. The rest is free to spend or withdraw.

## What you can do

| Use case | Guide |
| --- | --- |
| Deposit funds and approve storage | [Fund storage](../warm-storage/fund-storage.md) |
| Check your balance | [Monitor balance and proofs](../warm-storage/monitor-balance-and-proofs.md) |
| See your payment rails and payments | [Filecoin Pay Explorer](https://pay.filecoin.cloud) |
| Charge your own customers with Filecoin Pay | Charge your customers with Filecoin Pay |

## Learn more

* Payments and runway: how rails, lockup and settlement work.
* Filecoin Pay contract.
* [Source on GitHub](https://github.com/FilOzone/filecoin-pay).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data/tools/filecoin-pay)
