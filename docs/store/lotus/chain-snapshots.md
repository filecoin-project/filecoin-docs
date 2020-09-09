---
title: 'Lotus: chain snapshots'
description: 'This guide explains how to export and import Lotus chain snapshots.'
breadcrumb: 'Chain snapshots'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }} This can be useful to backup an existing Lotus state before [switching networks](switch-networks) or when setting up new Lotus nodes (to reduce chain syncing times).

## Exporting a chain snapshot

To export the chain into a CAR file do:

```sh
lotus chain export <file>
```

## Importing a chain snapshot

To import a chain snapshot on daemon start do:

```sh
lotus daemon --import-snapshot
```

::: tip
The `--halt-after-import` allows to stop the daemon after the import
:::
