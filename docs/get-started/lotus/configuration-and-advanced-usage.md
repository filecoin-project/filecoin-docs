---
title: 'Lotus: configuration and advanced usage'
description: 'This guides documents environment variables, configuration and other advanced features in the Lotus Node.'
breadcrumb: 'Configuration and advanced usage'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

[[TOC]]

## Configuration

The Lotus daemon stores a configuration file in `~/.lotus/config.toml`. Note that by default all settings are commented. Here is an example configuration:

```toml
[API]
  # Binding address for the Lotus API
  ListenAddress = "/ip4/127.0.0.1/tcp/1234/http"
  # Not used by lotus daemon
  RemoteListenAddress = ""
  # General network timeout value
  Timeout = "30s"

# Libp2p provides connectivity to other Filecoin network nodes
[Libp2p]
  # Binding address for the libp2p host - 0 means random port.
  ListenAddresses = ["/ip4/0.0.0.0/tcp/0", "/ip6/::/tcp/0"]
  # Insert any addresses you want to explicitally
  # announce to other peers here. Otherwise, they are
  # guessed.
  AnnounceAddresses = []
  # Insert any addresses to avoid announcing here.
  NoAnnounceAddresses = []
  # Connection manager settings, decrease if your
  # machine is overwhelmed by connections.
  ConnMgrLow = 150
  ConnMgrHigh = 180
  ConnMgrGrace = "20s"

# Pubsub is used to broadcast information in the network
[Pubsub]
  Bootstrapper = false
  RemoteTracer = "/dns4/pubsub-tracer.filecoin.io/tcp/4001/p2p/QmTd6UvR47vUidRNZ1ZKXHrAFhqTJAD27rKL9XYghEKgKX"

# This section can be used to enable adding and retriving files from IPFS
[Client]
  UseIpfs = false
  IpfsMAddr = ""
  IpfsUseForRetrieval = false

# Metrics configuration
[Metrics]
  Nickname = ""
  HeadNotifs = false

# Wallet configuration
[Wallet]
  EnableLedger = false
```

## Connectivity

Usually your lotus daemon will establish connectivity with others in the network and try to make itself diallable using uPnP. If you wish to manually ensure that your daemon is reachable:

- Set a fixed port of your choice in the `ListenAddresses` in the Libp2p section (i.e. 6665).
- Open a port in your router that is forwarded to this port. This is usually called featured as "Port forwarding" and the instructions differ from router model to model but there are many guides online.
- Add your public IP/port to `AnnounceAddresses`. i.e. `/ip4/<yourIP>/tcp/6665/`.

Note that **it is not a requirement to use Lotus as a client to the network to be fully reachable**, as your node already dials-out to others nodes and miners directly.

## Environment variables

Some aspects of the Lotus Node can be controlled using environment variables.

Variables common to most Lotus binaries:

- `LOTUS_FD_MAX`: Sets the file descriptor limit for the process
- `LOTUS_JAEGER`: Sets the Jaeger URL to send traces. See TODO.
- `LOTUS_DEV`: Any non-empty value will enable more verbose logging, useful only for developers.
- `GOLOG_OUTPUT`: Controls where the program logs. Possible values: `stdout`, `stderr`, `file`. Multiple values can be combined with '+'.
- `GOLOG_FILE`: Path to file to log to.
- `GOLOG_LOG_FMT`: Logging format (json, nocolor).

Variables specific to the _Lotus daemon_:

- `LOTUS_PATH`: Location to store Lotus data (defaults to `~/.lotus`).
- `LOTUS_SKIP_GENESIS_CHECK=_yes_`: Set only if you wish to run a lotus network with a different genesis block.
- `LOTUS_CHAIN_TIPSET_CACHE`: Sets the size for the chainstore tipset cache. Defaults to `8192`. Increase if you perform frequent arbitrary tipset lookups.
- `LOTUS_CHAIN_INDEX_CACHE`: Sets the size for the epoch index cache. Defaults to `32768`. Increase if you perform frequent deep chain lookups for block heights far from the latest height.
- `LOTUS_BSYNC_MSG_WINDOW`: Sets the initial maximum window size for message fetching blocksync request. Set to 10-20 if you have an internet connection with low bandwidth.

## Controlling a remote daemon

The `lotus` application, as a client to the lotus daemon, can talk to a Lotus daemon running on any location (not just the local one), by setting the following environment variable:

```sh
FULLNODE_API_INFO="TOKEN:/ip4/<IP>/tcp/<PORT>/http"
```

On the _Lotus Node_, the full variable string, including a new token, can be produced with:

```sh
lotus auth api-info --perm admin
```

Note that you may need to edit the result to place the right IP for the remote node. See the [docs about API tokens](../../build/lotus/api-tokens.md) for more information about tokens.

## Log level control

```sh
lotus log set-level <level>
```

This command can be used to toggle the logging levels of the different systems of a Lotus node. In decreasing order
of logging detail, the levels are `debug`, `info`, `warn`, and `error`.

As an example, to set the `chain` and `blocksync` to log at the `debug` level, run
`lotus log set-level --system chain --system blocksync debug`.

To see the various logging systems, run:

```sh
lotus log list
```

::: tip
The [Environment variables section](#environment-variables) section above documents some `GOLOG_*` variables that allow to control logging locations and formats.
:::
