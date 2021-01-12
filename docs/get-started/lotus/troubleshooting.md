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

## RPC Error: request bigger than maximum

```
ERROR	rpc	go-jsonrpc/server.go:90	RPC Error: request bigger than maximum 104857600 allowed
```

There is a maximum request size for security reasons in case the RPC server is exposed to external requests. The default is 100 MiB, but that can be adjusted with the `api-max-req-size` CLI argument of the respective CLI command that started the server. In case the command does not have the CLI argument to adjust this, please submit an [issue](https://github.com/filecoin-project/lotus/issues/new?assignees=&labels=area/api&template=bug_report.md&title=Missing api-max-req-size option in Lotus command) requesting it.

## Signal killed

If you get a `signal killed` error, it could indcate that there was an error during the build process.

```bash
/usr/local/go/pkg/tool/linux_amd64/link: signal: killed
make: *** [Makefile:68: lotus] Error 1
```

Double check that your computer meets the [minimum hardware requirements](./installation.md#minimal-requirements) for Lotus.

## Go command not found

You may encounter an error saying that the `go` command was not found:

```bash
sudo make install

> bash: go: command not found
> expr: syntax error: unexpected argument '14'
> install -C ./lotus /usr/local/bin/lotus
> install -C ./lotus-miner /usr/local/bin/lotus-miner
> install -C ./lotus-worker /usr/local/bin/lotus-worker
> ...
```

You can ignore this error during the `sudo make install` step; it does not affect the install.

## chain linked to block marked previously as bad

This may appear if Lotus is following a bad fork. The solution is to:

- unmark all bad blocks
- reset the head to a known good epoch

```sh
lotus sync unmark-bad --all
lotus chain sethead --epoch <epochNumber>
```
