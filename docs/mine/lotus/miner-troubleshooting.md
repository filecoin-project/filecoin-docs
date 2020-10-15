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

If you see this, that means your **Lotus Miner** isn't ready yet. Your Lotus Node needs to [finish syncing](../../get-started/lotus/chain.md#checking-sync-status).

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

## Common connectivity errors

| Error                                                                                              | What it means                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | How to fix                                                                                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| N/A                                                                                                | If you see "N/A" for deal success rate, this may be why. Once your miner seals its first sector, the dealbot will start attempting storage deals. From the moment a miner seals its first sector, you should have a storage deal result in max 48 hours (current timeout value for storage deals). For retrieval deals you should see a result in maxim 12 hours after the storage deal is reported successful (current timeout for retrieval deals ). The dashboard currently logs deal **results** only. If you have a storage or retrieval deal in progress you’ll still see “N/A” until it propagates to the chain. | No miner action needed.                                                                                                                                                                                                                                                |
| ClientQueryAsk failed : failed to open stream to miner: dial backoff                               | The connection to the remote host was attempted, but failed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | This may be due to issues with porting, IPs set within the config file, or simply no internet connectivity. To fix, [establish a public IP address](https://docs.filecoin.io/mine/connectivity/#establishing-a-public-ip-address).                                     |
| ClientQueryAsk failed : failed to open stream to miner: failed to dial                             | The deal-bot was unable to open a network socket to the miner.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | This is likely because the miner's IP is not publicly dialable, or a port issue. To fix, [establish a public IP address](https://docs.filecoin.io/mine/connectivity/#establishing-a-public-ip-address).                                                                |
| ClientQueryAsk failed : failed to open stream to miner: routing: not found                         | The deal-bot was unable to locate the miners IP and/or port.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Made sure you [published your miner's multiaddresses on the chain](./miner-setup.md#publishing-the-miner-addresses)                                                                                                                                                    |
| ClientQueryAsk failed : failed to read ask response: stream reset                                  | Connectivity loss, either due to a high packet loss rate or libp2p too aggressively dropping/failing connections.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | [Fix underway.] Lotus team is currently working on a change to use libp2p's connection tagging feature, which will retry connections if dropped. ([go-fil-markets/#361](https://github.com/filecoin-project/go-fil-markets/issues/361)). No action needed from miners. |
| StorageDealError PublishStorageDeals: found message with equal nonce as the one we are looking for | [Under investigation.] We suspect a chain validation error                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | No action needed from miners.                                                                                                                                                                                                                                          |
| ClientMinerQueryOffer - Retrieval query offer errored: get cid info: No state for /bafk2bz...      | [Under investigation.]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | No action needed from miners.                                                                                                                                                                                                                                          |
