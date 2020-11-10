---
title: 'Lotus Miner: configuration reference'
description: 'This guide covers the Lotus Miner configuration files, detailing the meaning of the options contained in them.'
breadcrumb: 'Configuration reference'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

The Lotus Miner configutation is created after the [initialization step](miner-setup.md) during setup and placed in `~/.lotusminer/config.toml` or `$LOTUS_MINER_PATH/config.toml` when defined.

The _default configuration_ has all the items commented, so in order to customize one of the items the leading `# ` need to be removed.

::: tip
For any configuration changes to take effect, the miner must be [restarted](miner-lifecycle.md).
:::

[[TOC]]

## API section

The API section controls the settings of the [miner API](../../reference/lotus-api.md):

```toml
[API]
  # Binding address for the miner API
  ListenAddress = "/ip4/127.0.0.1/tcp/2345/http"
  # This should be set to the miner API address as seen externally
  RemoteListenAddress = "127.0.0.1:2345"
  # General network timeout value
  Timeout = "30s"
```

As you see, the listen address is bound to the local loopback interface by default. If you need to open access to the miner API to other machines, you will need to set this to the IP address of the network interface you want to use, or to `0.0.0.0` (which means "all interfaces"). Note that API access is still protected by [JWT tokens](../../build/lotus/api-tokens.md) even when exposed.

Configure `RemoteListenAddress` to the value that a different node would have to use to reach this API. Usually it is the miner's IP address and API port, but depending on your setup (proxies, public IPs etc.), it might be a different IP.

## Libp2p section

This section configures the miner's embedded Libp2p node. As noted in the [setup instructions](miner-setup.md#connectivity-to-the-miner), it is very important to adjust this section with the miner's public IP and a fixed port:

```toml
# Binding address for the libp2p host. 0 means random port.
[Libp2p]
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
```

The connection manager will start to prune the existing connections if the number of established crosses the value set for `ConnMgrHigh` until it hits the value set for `ConnMgrLow`. Connections younger than `ConnMgrGrace` will be kept.

## Pubsub section

This section controls some Pubsub settings. Pubsub is used to distribute messages in the network:

```toml
[Pubsub]
  # Usually you will not run a pubsub bootstrapping node, so leave this as false
  Bootstrapper = false
  # FIXME
  RemoteTracer = ""
```

## Dealmaking section

This section controls parameters for making storage and retrieval deals:

```toml
[Dealmaking]
  # When enabled, the miner can accept online deals
  ConsiderOnlineStorageDeals = true
  # When enabled, the miner can accept offline deals
  ConsiderOfflineStorageDeals = true
  # When enabled, the miner can accept retrieval deals
  ConsiderOnlineRetrievalDeals = true
  # When enabled, the miner can accept offline retrieval deals
  ConsiderOfflineRetrievalDeals = true
  # A list made of Data CIDs to reject when making deals
  PieceCidBlocklist = []
  # How long the sealing process for a sector should take (see below)
  ExpectedSealDuration = "12h0m0s"

  # A command used for fine-grained evaluation of storage deals (see below)
  Filter = "/absolute/path/to/storage_filter_program"

  # A command used for fine-grained evaluation of retrieval deals (see below)
  RetrievalFilter = "/absolute/path/to/retrieval_filter_program"
```

`ExpectedSealDuration` is an estimate of how long sealing will take, and is used to reject deals whose start epoch might be earlier than the expected completion of sealing. It can be estimated by [benchmarking](benchmarks.md) or by [pledging a sector](sector-pledging.md).

:::warning
The final value of `ExpectedSealDuration` should equal `(TIME_TO_SEAL_A_SECTOR + WaitDealsDelay) * 1.5`. This equation ensures that the miner does not commit to having the sector sealed too soon.
:::

## Using filters for fine-grained storage and retrieval deal acceptance

In certain situations it is desirable to have more precise and dynamic control over a combination of deal parameters like for example:
- cryptographic identity of client
- time of day / resource utilization
- content
- etc.

Lotus provides two IPC hooks allowing you to name a command to execute for every deal before the miner accepts it: 

- `Filter` for storage deals.
- `RetrievalFilter` for retrieval deals. 

The executed command receives a JSON representation of the deal parameters on standard input, and upon completion its exit code is interpreted as: 

- `0`: success, proceed with the deal. 
- `non-0`: failure, reject the deal.

The most trivial filter rejecting any retrieval deal would be something like:
`RetrievalFilter = "/bin/false"`. `/bin/false` is binary that immediately exits with a code of `1`.

[This Perl script](https://gist.github.com/ribasushi/53b7383aeb6e6f9b030210f4d64351d5/9bd6e898f94d20b50e7c7586dc8b8f3a45dab07c#file-dealfilter-pl) lets the miner deny specific clients and only accept deals that are set to start relatively soon.

You can also use a third party content policy framework like `bitscreen` by Murmuration Labs:

```sh
# grab filter program
go get -u -v github.com/Murmuration-Labs/bitscreen

# add it to both filters
Filter = "/path/to/go/bin/bitscreen"
RetrievalFilter = "/path/to/go/bin/bitscreen"


## Sealing section

This section controls some of the behaviour around sector sealing:

```toml
[Sealing]
  # Upper bound on how many sectors can be waiting for more deals to be packed in it before it begins sealing at any given time.
  MaxWaitDealsSectors = 2
  # Upper bound on how many sectors can be sealing at the same time (including pledges)
  MaxSealingSectors = 0
  # Same, but for deal-related sealing (pledge sectors not included)
  MaxSealingSectorsForDeals = 0
  # Period of time that a newly created sector will wait for more deals to be packed in to before it starts to seal.
  WaitDealsDelay = "1h0m0s"
```

## Storage section

The storage sector controls whether the miner can perform certain sealing actions. Depending on the setup and the use of additional [seal workers](seal-workers.md), you may want to modify some of the options.

```toml
[Storage]
  # Upper bound on how many sectors can fetch sector data at the same time
  ParallelFetchLimit = 10
  # Sealing steps that the miner can perform itself. Sometimes we have a dedicated seal worker to do them and do not want the miner to commit any resources for this.
  AllowPreCommit1 = true
  AllowPreCommit2 = true
  AllowCommit = true
  AllowUnseal = true
```

## Fees section

The fees section allows to set limits to the gas consumption for the different messages that are submitted to the chain by the miner:

```toml
[Fees]
  # Maximum fees to pay
  MaxPreCommitGasFee = "0.05 FIL"
  MaxCommitGasFee = "0.05 FIL"
  # This is a high-value operation, so the default fee is higher.
  MaxWindowPoStGasFee = "50 FIL"
```

Depending on the network congestion the base fee for a transaction may grow or decrease. Your gas limits will have to be at any case larger than the base fee for the messages to be included. A very large max fee can however result in the quick burning of funds when the base fees are very high, as the miner automatically submits messages during normal operation, so be careful about this.
