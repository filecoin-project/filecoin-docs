---
title: 'Lotus Miner: troubleshooting'
description: 'This page offers some troubleshooting advice for Lotus Miners by listing some of the most common errors that users can come accross.'
breadcrumb: 'Troubleshooting'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

::: callout
**Have you successfully overcome other mining-related problems?** Please contribute to this page by editing it with the link at the bottom!
:::

[[TOC]]

## Error: Can't acquire bellman.lock

The **Bellman** lockfile is created to lock a GPU for a process. This bug can occur when this file isn't properly cleaned up:

```sh
mining block failed: computing election proof: github.com/filecoin-project/lotus/miner.(*Miner).mineOne
```

This bug occurs when the miner can't acquire the `bellman.lock`. To fix it you need to stop the `lotus-miner` and remove `/tmp/bellman.lock`.

## Error: Failed to get api endpoint

```sh
lotus-miner info
# WARN  main  lotus-storage-miner/main.go:73  failed to get api endpoint: (/Users/user/.lotusminer) %!w(*errors.errorString=&{API not running (no endpoint)}):
```

If you see this, that means your **Lotus Miner** isn't ready yet. Your Lotus Node needs to [finish syncing](../../store/lotus/installation.md#chain-sync).

## Error: Your computer may not be fast enough

```sh
CAUTION: block production took longer than the block delay. Your computer may not be fast enough to keep up
```

If you see this, that means [your computer is too slow](../hardware-requirements.md) and your blocks are not included in the chain, and you will not receive any rewards.

## Error: No space left on device

```sh
lotus-miner sectors pledge
# No space left on device (os error 28)
```

If you see this, that means [sector pledging wrote too much data to `$TMPDIR`](sector-pledging.md) which by default is the root partition (This is common for Linux setups). Usually your root partition does not get the largest partition of storage so you will need to change the environment variable to something else.

## Error: GPU unused

If you suspect that your GPU is not being used, first make sure it is one or the supported or set it up as explained in the [custom GPUs guide](gpus.md). You can verify your GPU is being used by running a quick lotus-bench benchmark as explained there on that guide as well.
