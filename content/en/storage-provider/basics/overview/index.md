---
title: "Overview"
description: "Storage providers in the Filecoin network are in charge of storing, providing content and issuing new blocks."
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-basics"
    identifier: "overview-01107340c9c1e03db862dd1475ccd953"
weight: 10
toc: true
aliases:
    - "/storage-provider/"
    - "/storage-provider/overview/"
    - "/mine/"
    - "/mine/spacerace/"
    - "/mine/connectivity"
---

{{< alert  >}}
**Looking for Lotus?**
Lotus documentation has moved to [lotus.filecoin.io](https://lotus.filecoin.io)
{{< /alert >}}

- Understand [how providing storage works]({{< relref "how-providing-storage-works" >}}) and what different types of providers exist.
- Learn how storage providers get [rewards]({{< relref "rewards" >}}) when doing their job properly, but also [slashed]({{< relref "slashing" >}}) when they are unable to honor deals they have made.
- Learn about different [storage provider architectures]({{< relref "architectures" >}}).
- Setup and run a high performant [`lotus-miner`](https://lotus.filecoin.io/docs/storage-providers/overview/).

The documentation you will be reading assumes you are familiar with the documentation in the [Get started]({{< relref "/smart-contracts/fundamentals/the-filecoin-virtual-machine" >}}) section, have a general grasp of how Filecoin works and are familiar with Filecoin node software and tooling.

Running a successful storage provisioning operation on Filecoin has high [hardware requirements]({{< relref "hardware-requirements" >}}) and, apart from a strong familiarity with Filecoin, requires experience in systems deployment and administration.

