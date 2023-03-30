---
title: "Storage proving"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-filecoin-economics"
    identifier: "storage-proving-fb90120cfc77a129895e55e7687075aa"
weight: 10
toc: true
---

Storage proving, known as “Proof of Spacetime” (“PoSt”) is the mechanism that the Filecoin blockchain uses to validate that Storage Providers are continuously providing the storage they claim. Storage Providers earn block rewards each time they successfully answer a PoSt challenge.

## Proving deadlines
As a Storage Provider, you must preserve the data for the duration of the [deal](https://docs.filecoin.io/reference/general/glossary/#deal), which are on-chain agreements between a client and a Storage Provider. Currently, deals must have a minimum duration of 180 days, and maximum duration of 540 days <!-- TODO STEF why these values? link-->. Storage Providers must be able to continuously prove the availability and integrity of the data they are storing. Every storage sector of 32GiB or 64GiB gets verified once in each 24 hour period. This period is called a “proving period”. Every proving period of 24 hours is broken down into a series of 30 minute, non-overlapping “deadlines”. This means there are 48 deadlines per day. Storage sectors are grouped in a “partition” and assigned to a proving deadline. All storage sectors in a given partition will always be verified during the same deadline.

## WindowPoSt
The cryptographic challenge for storage proving is called WindowPoSt (Window Proof-of-SpaceTime). Storage Providers have a deadline of 30 minutes to respond to this WindowPoSt challenge (via a message on the blockchain containing a [zk-SNARK](https://en.wikipedia.org/wiki/Zero-knowledge_proof) proof of the verified sector). Failure to submit this proof within the 30 minute deadline, or failure to submit it at all, results in “slashing”. Slashing means a portion of the [collateral]({{< relref "fil-collateral" >}}) will be forfeited <!-- TODO STEF where does it go? who gets my FIL? --> and the “storage power” of the Storage Provider gets reduced. Slashing is a way to penalize Storage Providers who fail to meet the agreed standards of storage.
<!-- TODO STEF a lot of duplication here with committed-capacity.-->