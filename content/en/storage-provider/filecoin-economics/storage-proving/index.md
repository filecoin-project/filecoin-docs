---
title: "Storage proving"
description: "Storage proving, known as “Proof of Spacetime” (“PoSt”) is the mechanism that validate storage providers are storing the data they claim."
lead: ""
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-filecoin-economics"
    identifier: "storage-proving-fb90120cfc77a129895e55e7687075aa"
weight: 210
toc: true
---

Storage proving, known as _Proof-of-Spacetime_ (“PoSt”), is the mechanism that the Filecoin blockchain uses to validate that storage providers are continuously providing the storage they claim. Storage providers earn block rewards each time they successfully answer a PoSt challenge.

## Proving deadlines
As a storage provider, you must preserve the data for the duration of the [deal](https://docs.filecoin.io/reference/general/glossary/#deal), which are on-chain agreements between a client and a storage provider. As of March 2023, deals must have a minimum duration of 180 days, and maximum duration of 540 days. The latter value was chosen to balance long deal length with cryptographic security. Storage providers must be able to continuously prove the availability and integrity of the data they are storing. Every storage sector of 32GiB or 64GiB gets verified once in each 24 hour period. This period is called a _proving period_. Every proving period of 24 hours is broken down into a series of 30 minute, non-overlapping _deadlines_. This means there are 48 deadlines per day. Storage sectors are grouped in a _partition_, and assigned to a proving deadline. All storage sectors in a given partition will always be verified during the same deadline.

## WindowPoSt

The cryptographic challenge for storage proving is called _Window Proof-of-Spacetime_ (WindowPoSt). Storage providers have a deadline of 30 minutes to respond to this WindowPoSt challenge via a message on the blockchain containing a [zk-SNARK](https://en.wikipedia.org/wiki/Zero-knowledge_proof) proof of the verified sector. Failure to submit this proof within the 30 minute deadline, or failure to submit it at all, results in _slashing_. Slashing means a portion of the [collateral]({{< relref "fil-collateral" >}}) will be forfeited <!-- TODO NOBLOCK STEF BOB where does it go? who gets my FIL? it's just burned, right --> and the _storage power_ of the storage provider gets reduced. Slashing is a way to penalize storage providers who fail to meet the agreed upon standards of storage.

<!-- TODO NOBLOCK STEF BOB a lot of duplication here with committed-capacity section -->

{{< sp-calls-to-action >}}
