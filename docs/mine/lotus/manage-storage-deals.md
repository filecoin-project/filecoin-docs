---
title: 'Lotus Miner: manage storage deals'
description: 'This guide describes the different workflows and options to effectively manage storage deal conditions requested set by Lotus Miners.'
breadcrumb: 'Manage storage deals'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

::: callout
This page is a _stub_! We are working on expanding these docs. If you have ideas, please contribute to improving this page.
:::

## Exploring deals

While the Lotus Miner is running, the `lotus-miner` application can be used to manage and configure some aspects of the deals like the storage-ask details. The following command shows the self-documented commands around storage deals:

```sh
lotus-miner storage-deals --help
```

For example, `lotus-miner storage-deals set-ask` allows to set the price for storage that your miner uses to respond ask requests from clients.

If deals are ongoing, you can check the data transfers with:

```sh
lotus-miner data-transfers list
```

:::tip
Explore the `lotus-miner` CLI. Every command is self-documented and takes a `--help` flag that offers specific information about it.
:::
