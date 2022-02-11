---
title: Storage provider
description: Storage providers in the Filecoin network are in charge of storing, providing content and issuing new blocks.
---

# Storage provider

{{ $frontmatter.description }} Content in this section will help you to:

:::tip Looking for Lotus?
Lotus documentation has moved to [lotus.filecoin.io](https://lotus.filecoin.io)
:::

- Understand [how providing storage works]({{< relref "how-providing-works.md" >}}) and what different types of providers exist.
- Learn how storage providers get [rewards]({{< relref "storage-provider-rewards.md" >}}) when doing their job properly, but also [slashed](slashing.md) when they are unable to honor deals they have made.
- Learn about different [storage provider architectures]({{< relref "storage-provider-architectures.md" >}}).
- Setup and run a high performant [`lotus-miner`](https://lotus.filecoin.io/docs/storage-providers/overview/).

The documentation you will be reading assumes you are familiar with the documentation in the [Get started]({{< relref "../get-started" >}}) section, have a general grasp of how Filecoin works and are familiar with Filecoin node software and tooling.

Running a successful storage provisioning operation on Filecoin has high [hardware requirements]({{< relref "hardware-requirements.md" >}}) and, apart from a strong familiarity with Filecoin, requires experience in systems deployment and administration.
