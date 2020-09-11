---
title: 'Lotus: node troubleshooting'
description: 'This page offers some troubleshooting advice for Lotus nodes by listing some of the most common errors that users can come accross.'
breadcrumb: 'node troubleshooting'
---

# # {{ $frontmatter.title }}

{{ $frontmatter.description }}

::: callout
**Have you successfully overcome other Lotus Node-related problems?** Please contribute to this page by editing it with the link at the bottom!
:::

[[TOC]]

## Build errors

Please check the build logs closely. If you have a dirty state in your git branch make sure to do something like:

```sh
git checkout <desired_branch>
git reset origin/<desired_branch> --hard
make clean
```

(or directly delete and clone the repository again as shown in the [installation instructions](installation.md).

## Slow builds/start from China

See the [tips when running in China](tips-running-in-china.md) guide.

## Error: initializing node error: cbor input had wrong number of fields

This happens when you are starting Lotus which has been compiled for one network, but it encounters data in the Lotus data folder which is for a different network, or for an older incompatible version.

Solution: follow the instructions for [switching networks](switch-networks.md) closely.

## Error: Failed to connect bootstrap peer

```sh
WARN  peermgr peermgr/peermgr.go:131  failed to connect to bootstrap peer: failed to dial : all dials failed
  * [/ip4/147.75.80.17/tcp/1347] failed to negotiate security protocol: connected to wrong peer
```

Try running the build steps again and make sure that you have the latest code from GitHub.

## Error: other peer has different genesis!

```sh
ERROR hello hello/hello.go:81 other peer has different genesis!
```

Try [reseting the Lotus data folder to a clean state](upgrades.md#nuking-the-lotus-data).

## Error: repo is already locked

You already have another lotus daemon running. Stop it first (`lotus daemon stop`).

## Config: Open files limit

Lotus will attempt to set up the file descriptor (FD) limit automatically. If that does not work, you can still configure your system to allow higher than the default values.

The specific instructions depend on your system and how you are running Lotus (with systemd or not etc). Please use a [search engine to find instructions](https://duckduckgo.com/?q=increase+open+files+limit&t=ffab&ia=web) as there are plenty of very good guides.

## Error: Routing: not found

```
WARN  main  lotus/main.go:72  routing: not found
```

This error means that the miner you are trying to talk to is offline.

## Error: Failed to start deal

```sh
WARN  main  lotus/main.go:72  failed to start deal: computing commP failed: generating CommP: Piece must be at least 127 bytes
```

This error means that there is a minimum file size of 127 bytes.

## Error: 0kb file response during retrieval

This means that the file to be retrieved may have not yet been sealed and is thus, not retrievable yet.

Miners can check sealing progress with this command:

```sh
lotus-miner sectors list
```

When sealing is complete, `pSet: NO` will become `pSet: YES`.
