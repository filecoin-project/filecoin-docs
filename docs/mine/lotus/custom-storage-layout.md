---
title: 'Lotus Miner: custom storage layout'
description: 'This guide describes how to specify custom storage locations for the Lotus Miner, depending on the needs and available hardware.'
breadcrumb: 'Custom storage layout'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

If you used the `--no-local-storage` flag during the [miner initialization](miner-setup.md#miner-initialization), you should specify the disk locations for sealing (fast SSD recommended) and long-term storage.

The Lotus Miner keeps track of defined storage locations in in `~/.lotusminer/storage.json` (or `$LOTUS_MINER_PATH/storage.json`) and uses `~/.lotusminer` path as default.

Upon initialization of a storage location, a `<path-to-storage>/sectorstorage.json` file is created that contains the UUID assigned to this location, along with whether it can be used for sealing or storing.

[[TOC]]

## Custom location for sealing

The _seal_ storage location is used when sealing sectors. It should be a really fast storage medium so that the disk does not become the bottleneck that delays the sealing process. It can be specified with:

```sh
lotus-miner storage attach --init --seal <PATH_FOR_SEALING_STORAGE>
```

## Custom location for storing

Once the _sealing_ process is completed, sealed sectors are moved to the _store_ location, which can be specified as follow:

```sh
lotus-miner storage attach --init --store <PATH_FOR_LONG_TERM_STORAGE>
```

This location can be made of large capacity, albeit slower, spinning-disks.

## Listing storage locations

```sh
lotus-miner storage list
```

## Updating locations

To move data from one location to another, follow the instructions in the [Miner lifecycle guide](miner-lifecycle.md#changing-storage-locations).

To fully remove one location, edit the `storage.json` manually and re-start your miner.
