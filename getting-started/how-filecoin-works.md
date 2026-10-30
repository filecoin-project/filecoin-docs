---
description: >-
  How storing data on Filecoin works: you pay storage providers to keep your
  data, they prove onchain that they still hold it, and payments follow the
  proofs.
---

# How Filecoin works

**On Filecoin, you pay storage providers to keep your data, the providers prove onchain that they still hold it, and your payment only goes to storage that has been proven.**

![How Filecoin works: you upload data to a storage provider and deposit USDFC into Filecoin Pay. The provider submits proofs, the storage service checks the results, and Filecoin Pay pays the provider for proven storage. You retrieve data from the provider, separately from the storage payment.](assets/how-filecoin-works.png)

This page follows one upload through four steps: store, prove, pay, and retrieve. Each step links to the page with more detail.

## Store

Filecoin offers two kinds of storage:

* **Warm storage** is for data you read often, such as app data, AI datasets, and agent memory. Providers keep it ready to serve.
* **Cold storage** is for archives and large datasets you rarely read. Providers seal the data into a unique copy for long-term preservation.

In warm storage, each file you upload becomes a piece, identified by its PieceCID. A provider keeps your pieces in a data set. By default, the Filecoin SDK stores your data with two independent providers, each in its own data set, so it stays available if one provider goes offline. You can choose to add more storage providers. See [Data sets and pieces](../core-concepts/data-sets-and-pieces.md).

Cold storage works with datasets of 1 TiB or more, under deals where you set the duration, price, and service levels. See [Filecoin Cold Storage Service](../store-data/cold-storage/cold-storage-for-archival-data.md).

## Prove

Providers prove they still hold your data on a schedule, and the proofs are recorded onchain, where anyone can check them.

* **Warm storage uses Proof of Data Possession (PDP).** Each proving period, the chain issues a random challenge, and the provider answers it with a small proof built from the challenged part of your data. Nobody has to download the data to check it. See [Proof of Data Possession](../core-concepts/proof-of-data-possession.md).
* **Cold storage uses Proof of Replication (PoRep) and Proof of Spacetime.** The provider proves it sealed a unique copy of your data, then proves every day that it still stores it.

In warm storage, a provider that misses a proof isn't paid for that period, and repeated faults end its service for the data set. In cold storage, a provider is paid according to how well it meets the service levels in the deal.

## Pay

Payments run through [Filecoin Pay](../store-data/tools/filecoin-pay.md), a set of smart contracts that hold your deposit and pay providers.

1. You deposit USDFC into your Filecoin Pay account and approve the storage service to use it.
2. When you store data, a payment rail is set up between your account and the provider.
3. As proofs succeed, the rail pays the provider for the storage it has proven.

Warm storage keeps 30 days of payment locked in your account as a guarantee to the provider. If your balance falls below that, the provider may start removing your data, so keep it topped up. Your wallet also needs a little FIL to pay transaction fees on the Filecoin chain. See [Payments and runway](../core-concepts/payments-and-runway.md).

Storage payments cover keeping and proving your data. Retrieval isn't included; see [Retrieve](#retrieve) below.

## Retrieve

Retrieval is separate from the storage payment.

* **Warm storage.** Download your pieces directly from the provider over HTTP, using your PieceCID. This is the default and has no egress charge.
* **Cold storage.** Providers serve data from an unsealed copy. Each piece is either free or paid per download.

See [Retrieval and CDN](../core-concepts/retrieval-and-cdn.md).

## Who does what

| Role | What it does |
| --- | --- |
| You, the client | Upload data, fund a Filecoin Pay account, and retrieve your data |
| Storage provider | Stores your data, answers proof challenges, and serves downloads |
| Storage service | The smart contract for warm or cold storage. It tracks your data sets and decides what gets paid, based on proof results |
| Proof checks | Contracts on the Filecoin chain that issue challenges and verify each provider's proofs |
| Filecoin Pay | Holds your USDFC and pays providers through payment rails |
| Filecoin chain | Records proofs and payments, so anyone can audit them |

## Next steps

* [Quickstart](quickstart.md): fund an account and store your first file.
* [Choose a storage option](choose-a-storage-option.md): compare warm storage, cold storage, Filecoin Pin, and managed services.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/getting-started/how-filecoin-works)
