---
description: >-
  Filecoin Cloud runs as onchain service contracts in three layers: a product
  layer you call, a coordination layer that pairs proofs with payments, and the
  Filecoin protocol underneath.
---

# How it works

**Filecoin Cloud is made of small onchain programs, called smart contracts, that each do one job: run the storage rules, check proofs, or move payments.** They work together, so every step is recorded onchain and anyone can check it.

## The three layers

![Filecoin Cloud in three layers. Product layer: the Filecoin SDK, the Filecoin CLI, the agent plugin and Filecoin Pin, which call contracts. Coordination layer: Warm Storage, PDP Verifier, Filecoin Pay and the Provider Registry. Protocol layer: storage providers running Curio, and the Filecoin protocol. Providers send proofs to the coordination layer, which sends them payments.](assets/filecoin-cloud-layers.png)

* **Product layer.** The tools you use: the Filecoin SDK, the Filecoin CLI, the agent plugin and Filecoin Pin. They turn "store this file" into the right contract calls.
* **Coordination layer.** The contracts that keep everyone honest. The Warm Storage service sets the rules: who can store, what it costs, and what happens when a proof is missed. The PDP Verifier checks proofs. Filecoin Pay holds your deposit and pays providers. The Service Provider Registry lists the providers you can use.
* **Protocol layer.** The Filecoin network itself. Storage providers run Curio on the Filecoin protocol: they store your data, serve it over HTTPS, and send their proofs onchain, where the Filecoin chain records them along with every payment.

## What happens when you store a file

1. **You fund your account.** You deposit USDFC into Filecoin Pay and approve the Warm Storage service to spend it.
2. **Your tool picks providers.** It chooses providers from the registry and creates a data set with each one, or reuses one you already have.
3. **You upload.** Each provider stores the file and adds it to your data set onchain. By default the SDK stores two copies, with two providers.
4. **Providers prove it.** In every proving period, the PDP Verifier asks each provider for a proof built from random parts of your data. A provider without the data can't answer.
5. **Providers get paid.** While proofs pass, Filecoin Pay streams your deposit to each provider. Missed proofs cut what the provider is paid.

## Words you'll see

| Term | What it means |
| --- | --- |
| Piece | One file, or one packed folder, as it is stored. It has a PieceCID: an ID made from its content. |
| Data set | A group of your pieces kept by one provider. Each copy of your data lives in its own data set. |
| Proof record | An onchain record that a provider proved it still has a data set. |
| Payment rail | An onchain payment stream from you to one provider. |

To go deeper, read Data sets and pieces and Payments and runway.

## Built on open contracts

The contracts run on the Filecoin Virtual Machine (FVM), so anyone can read them or build on them. A storage platform, for example, can use Filecoin Pay to charge its own customers. To build on them, start with FVM, then find the contract addresses in Reference › Contracts.

## Next steps

* [Pricing](pricing.md): what storage costs.
* [Reliability and proofs](reliability-and-proofs.md): what happens when a provider fails a proof.
* [Upload data](../warm-storage/upload-data.md): store your first file.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data/overview/how-it-works)
