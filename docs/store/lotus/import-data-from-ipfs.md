---
title: 'Lotus: import data from IPFS'
description: 'This guide will show you how to use Lotus to directly add IPFS-hosted data to the Filecoin network.'
breadcrumb: 'Import data from IPFS'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

Lotus supports making deals with data stored in [IPFS](https://ipfs.io), without having to re-import it into lotus.

To enable this integration, you need to have an [IPFS daemon running in the background](https://docs.ipfs.io/how-to/command-line-quick-start/#take-your-node-online).

Then, open up `~/.lotus/config.toml` (or if you manually set `$LOTUS_PATH`, look under that directory) and look for the Client field, and set UseIpfs to true.

```bash
[Client]
UseIpfs = true
```

After restarting the lotus daemon, you should be able to [make deals](store-data.md) with data in your IPFS node:

```bash
$ ipfs add -r SomeData
QmSomeData
$ ./lotus client deal QmSomeData t01000 0.0000000001 80000
```
