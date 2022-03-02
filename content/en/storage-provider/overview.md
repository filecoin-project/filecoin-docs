---
title: "Overview"
description: "Storage providers in the Filecoin network are in charge of storing, providing content and issuing new blocks."
menu:
    storageprovider:
        parent: "storage-provider-basics"
weight: 1
aliases:
    - /storage-provider/
---

{{< alert icon="tip" >}}
**Looking for Lotus?**
Lotus documentation has moved to [lotus.filecoin.io](https://lotus.filecoin.io)
{{< /alert >}}

- Understand [how providing storage works]({{< relref "how-providing-works.md" >}}) and what different types of providers exist.
- Learn how storage providers get [rewards]({{< relref "rewards.md" >}}) when doing their job properly, but also [slashed](slashing.md) when they are unable to honor deals they have made.
- Learn about different [storage provider architectures]({{< relref "architectures.md" >}}).
- Setup and run a high performant [`lotus-miner`](https://lotus.filecoin.io/docs/storage-providers/overview/).

The documentation you will be reading assumes you are familiar with the documentation in the [Get started]({{< relref "../get-started" >}}) section, have a general grasp of how Filecoin works and are familiar with Filecoin node software and tooling.

Running a successful storage provisioning operation on Filecoin has high [hardware requirements]({{< relref "hardware-requirements.md" >}}) and, apart from a strong familiarity with Filecoin, requires experience in systems deployment and administration.
