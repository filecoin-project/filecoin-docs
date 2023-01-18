---
title: "Overview"
description: "Filecoin Boost configuration options, with examples and description"
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "overview-906ed078dddc141352703cc30b1419c5"
weight: 1
toc: true
---

```
# The version of the config file (used for migrations)
#
# type: int
# env var: LOTUS__CONFIGVERSION
ConfigVersion = 1

# The connect string for the sealing RPC API (lotus miner)
#
# type: string
# env var: LOTUS__SEALERAPIINFO
SealerApiInfo = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.nbSvy11-tSUbXqo465hZqzTohGDfSdgh28C4irkmE10:/ip4/0.0.0.0/tcp/2345/http"

# The connect string for the sector index RPC API (lotus miner)
#
# type: string
# env var: LOTUS__SECTORINDEXAPIINFO
SectorIndexApiInfo = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.nbSvy11-tSUbXqo465hZqzTohGDfSdgh28C4irkmE10:/ip4/0.0.0.0/tcp/2345/http"


[API]
  # Binding address for the Lotus API
  #
  # type: string
  # env var: LOTUS_API_LISTENADDRESS
  ListenAddress = "/ip4/127.0.0.1/tcp/8787/http"

  # type: string
  # env var: LOTUS_API_REMOTELISTENADDRESS
  RemoteListenAddress = "127.0.0.1:8787"

  # type: Duration
  # env var: LOTUS_API_TIMEOUT
  #Timeout = "30s"


[Backup]
  # Note that in case of metadata corruption it might be much harder to recover
  # your node if metadata log is disabled
  #
  # type: bool
  # env var: LOTUS_BACKUP_DISABLEMETADATALOG
  #DisableMetadataLog = false


[Libp2p]
  # Binding address for the libp2p host - 0 means random port.
  # Format: multiaddress; see https://multiformats.io/multiaddr/
  #
  # type: []string
  # env var: LOTUS_LIBP2P_LISTENADDRESSES
  ListenAddresses = ["/ip4/0.0.0.0/tcp/24001", "/ip6/::/tcp/24001"]

  # Addresses to explicitally announce to other peers. If not specified,
  # all interface addresses are announced
  # Format: multiaddress
  #
  # type: []string
  # env var: LOTUS_LIBP2P_ANNOUNCEADDRESSES
  AnnounceAddresses = ["/ip4/209.94.92.3/tcp/24001"]

  # Addresses to not announce
  # Format: multiaddress
  #
  # type: []string
  # env var: LOTUS_LIBP2P_NOANNOUNCEADDRESSES
  #NoAnnounceAddresses = []

  # When not disabled (default), lotus asks NAT devices (e.g., routers), to
  # open up an external port and forward it to the port lotus is running on.
  # When this works (i.e., when your router supports NAT port forwarding),
  # it makes the local lotus node accessible from the public internet
  #
  # type: bool
  # env var: LOTUS_LIBP2P_DISABLENATPORTMAP
  #DisableNatPortMap = false

  # ConnMgrLow is the number of connections that the basic connection manager
  # will trim down to.
  #
  # type: uint
  # env var: LOTUS_LIBP2P_CONNMGRLOW
  #ConnMgrLow = 150

  # ConnMgrHigh is the number of connections that, when exceeded, will trigger
  # a connection GC operation. Note: protected/recently formed connections don't
  # count towards this limit.
  #
  # type: uint
  # env var: LOTUS_LIBP2P_CONNMGRHIGH
  #ConnMgrHigh = 180

  # ConnMgrGrace is a time duration that new connections are immune from being
  # closed by the connection manager.
  #
  # type: Duration
  # env var: LOTUS_LIBP2P_CONNMGRGRACE
  #ConnMgrGrace = "20s"


[Pubsub]
  # Run the node in bootstrap-node mode
  #
  # type: bool
  # env var: LOTUS_PUBSUB_BOOTSTRAPPER
  #Bootstrapper = false

  # type: string
  # env var: LOTUS_PUBSUB_REMOTETRACER
  #RemoteTracer = ""


[Storage]
  # The maximum number of concurrent fetch operations to the storage subsystem
  #
  # type: int
  # env var: LOTUS_STORAGE_PARALLELFETCHLIMIT
  #ParallelFetchLimit = 10


[Dealmaking]
  # When enabled, the miner can accept online deals
  #
  # type: bool
  # env var: LOTUS_DEALMAKING_CONSIDERONLINESTORAGEDEALS
  #ConsiderOnlineStorageDeals = true

  # When enabled, the miner can accept offline deals
  #
  # type: bool
  # env var: LOTUS_DEALMAKING_CONSIDEROFFLINESTORAGEDEALS
  #ConsiderOfflineStorageDeals = true

  # When enabled, the miner can accept retrieval deals
  #
  # type: bool
  # env var: LOTUS_DEALMAKING_CONSIDERONLINERETRIEVALDEALS
  #ConsiderOnlineRetrievalDeals = true

  # When enabled, the miner can accept offline retrieval deals
  #
  # type: bool
  # env var: LOTUS_DEALMAKING_CONSIDEROFFLINERETRIEVALDEALS
  #ConsiderOfflineRetrievalDeals = true

  # When enabled, the miner can accept verified deals
  #
  # type: bool
  # env var: LOTUS_DEALMAKING_CONSIDERVERIFIEDSTORAGEDEALS
  #ConsiderVerifiedStorageDeals = true

  # When enabled, the miner can accept unverified deals
  #
  # type: bool
  # env var: LOTUS_DEALMAKING_CONSIDERUNVERIFIEDSTORAGEDEALS
  #ConsiderUnverifiedStorageDeals = true

  # A list of Data CIDs to reject when making deals
  #
  # type: []cid.Cid
  # env var: LOTUS_DEALMAKING_PIECECIDBLOCKLIST
  #PieceCidBlocklist = []

  # Maximum expected amount of time getting the deal into a sealed sector will take
  # This includes the time the deal will need to get transferred and published
  # before being assigned to a sector
  #
  # type: Duration
  # env var: LOTUS_DEALMAKING_EXPECTEDSEALDURATION
  #ExpectedSealDuration = "24h0m0s"

  # Maximum amount of time proposed deal StartEpoch can be in future
  #
  # type: Duration
  # env var: LOTUS_DEALMAKING_MAXDEALSTARTDELAY
  #MaxDealStartDelay = "336h0m0s"

  # When a deal is ready to publish, the amount of time to wait for more
  # deals to be ready to publish before publishing them all as a batch
  #
  # type: Duration
  # env var: LOTUS_DEALMAKING_PUBLISHMSGPERIOD
  #PublishMsgPeriod = "1h0m0s"

  # The maximum number of deals to include in a single PublishStorageDeals
  # message
  #
  # type: uint64
  # env var: LOTUS_DEALMAKING_PUBLISHMSGMAXDEALSPERMSG
  #PublishMsgMaxDealsPerMsg = 8

  # The maximum network fees to pay when sending the PublishStorageDeals message
  #
  # type: types.FIL
  # env var: LOTUS_DEALMAKING_PUBLISHMSGMAXFEE
  #PublishMsgMaxFee = "0.05 FIL"

  # The maximum collateral that the provider will put up against a deal,
  # as a multiplier of the minimum collateral bound
  #
  # type: uint64
  # env var: LOTUS_DEALMAKING_MAXPROVIDERCOLLATERALMULTIPLIER
  #MaxProviderCollateralMultiplier = 2

  # The maximum allowed disk usage size in bytes of staging deals not yet
  # passed to the sealing node by the markets service. 0 is unlimited.
  #
  # type: int64
  # env var: LOTUS_DEALMAKING_MAXSTAGINGDEALSBYTES
  MaxStagingDealsBytes = 50000000000

  # The maximum number of parallel online data transfers for storage deals
  #
  # type: uint64
  # env var: LOTUS_DEALMAKING_SIMULTANEOUSTRANSFERSFORSTORAGE
  #SimultaneousTransfersForStorage = 20

  # The maximum number of parallel online data transfers for retrieval deals
  #
  # type: uint64
  # env var: LOTUS_DEALMAKING_SIMULTANEOUSTRANSFERSFORRETRIEVAL
  #SimultaneousTransfersForRetrieval = 20

  # Minimum start epoch buffer to give time for sealing of sector with deal.
  #
  # type: uint64
  # env var: LOTUS_DEALMAKING_STARTEPOCHSEALINGBUFFER
  #StartEpochSealingBuffer = 480

  # The amount of time to keep deal proposal logs for before cleaning them up.
  #
  # type: Duration
  # env var: LOTUS_DEALMAKING_DEALPROPOSALLOGDURATION
  #DealProposalLogDuration = "24h0m0s"

  # A command used for fine-grained evaluation of storage deals
  # see https://docs.filecoin.io/mine/lotus/miner-configuration/#using-filters-for-fine-grained-storage-and-retrieval-deal-acceptance for more details
  #
  # type: string
  # env var: LOTUS_DEALMAKING_FILTER
  #Filter = ""

  # A command used for fine-grained evaluation of retrieval deals
  # see https://docs.filecoin.io/mine/lotus/miner-configuration/#using-filters-for-fine-grained-storage-and-retrieval-deal-acceptance for more details
  #
  # type: string
  # env var: LOTUS_DEALMAKING_RETRIEVALFILTER
  #RetrievalFilter = ""

  # The maximum amount of time a transfer can take before it fails
  #
  # type: Duration
  # env var: LOTUS_DEALMAKING_MAXTRANSFERDURATION
  #MaxTransferDuration = "24h0m0s"

  [Dealmaking.RetrievalPricing]
    # env var: LOTUS_DEALMAKING_RETRIEVALPRICING_STRATEGY
    #Strategy = "default"

    [Dealmaking.RetrievalPricing.Default]
      # env var: LOTUS_DEALMAKING_RETRIEVALPRICING_DEFAULT_VERIFIEDDEALSFREETRANSFER
      #VerifiedDealsFreeTransfer = true

    [Dealmaking.RetrievalPricing.External]
      # env var: LOTUS_DEALMAKING_RETRIEVALPRICING_EXTERNAL_PATH
      #Path = ""


[Wallets]
  # The "owner" address of the miner
  #
  # type: string
  # env var: LOTUS_WALLETS_MINER
  Miner = "f032187"

  # The wallet used to send PublishStorageDeals messages.
  # Must be a control or worker address of the miner.
  #
  # type: string
  # env var: LOTUS_WALLETS_PUBLISHSTORAGEDEALS
  PublishStorageDeals = "f3syzhufifmnbzcznoquhy4mlxo3byetqlamzbeijk62bjpoohrj3wiphkgxe3yjrlh5dmxlca3zqxp3yvd33a"

  # The wallet used as the source for storage deal collateral
  #
  # type: string
  # env var: LOTUS_WALLETS_DEALCOLLATERAL
  #DealCollateral = ""

  # Deprecated: Renamed to DealCollateral
  #
  # type: string
  # env var: LOTUS_WALLETS_PLEDGECOLLATERAL
  PledgeCollateral = "f3wg5epqx46k6mj2h65arxdelqn7pen6caoydhrmgefxpmn3dmm2ngho5layysqojsoexshs5hbbcin25npofq"


[LotusDealmaking]
  # When enabled, the miner can accept online deals
  #
  # type: bool
  # env var: LOTUS_LOTUSDEALMAKING_CONSIDERONLINESTORAGEDEALS
  #ConsiderOnlineStorageDeals = true

  # When enabled, the miner can accept offline deals
  #
  # type: bool
  # env var: LOTUS_LOTUSDEALMAKING_CONSIDEROFFLINESTORAGEDEALS
  #ConsiderOfflineStorageDeals = true

  # When enabled, the miner can accept retrieval deals
  #
  # type: bool
  # env var: LOTUS_LOTUSDEALMAKING_CONSIDERONLINERETRIEVALDEALS
  #ConsiderOnlineRetrievalDeals = true

  # When enabled, the miner can accept offline retrieval deals
  #
  # type: bool
  # env var: LOTUS_LOTUSDEALMAKING_CONSIDEROFFLINERETRIEVALDEALS
  #ConsiderOfflineRetrievalDeals = true

  # When enabled, the miner can accept verified deals
  #
  # type: bool
  # env var: LOTUS_LOTUSDEALMAKING_CONSIDERVERIFIEDSTORAGEDEALS
  #ConsiderVerifiedStorageDeals = true

  # When enabled, the miner can accept unverified deals
  #
  # type: bool
  # env var: LOTUS_LOTUSDEALMAKING_CONSIDERUNVERIFIEDSTORAGEDEALS
  #ConsiderUnverifiedStorageDeals = true

  # A list of Data CIDs to reject when making deals
  #
  # type: []cid.Cid
  # env var: LOTUS_LOTUSDEALMAKING_PIECECIDBLOCKLIST
  #PieceCidBlocklist = []

  # Maximum expected amount of time getting the deal into a sealed sector will take
  # This includes the time the deal will need to get transferred and published
  # before being assigned to a sector
  #
  # type: Duration
  # env var: LOTUS_LOTUSDEALMAKING_EXPECTEDSEALDURATION
  #ExpectedSealDuration = "24h0m0s"

  # Maximum amount of time proposed deal StartEpoch can be in future
  #
  # type: Duration
  # env var: LOTUS_LOTUSDEALMAKING_MAXDEALSTARTDELAY
  #MaxDealStartDelay = "336h0m0s"

  # When a deal is ready to publish, the amount of time to wait for more
  # deals to be ready to publish before publishing them all as a batch
  #
  # type: Duration
  # env var: LOTUS_LOTUSDEALMAKING_PUBLISHMSGPERIOD
  #PublishMsgPeriod = "1h0m0s"

  # The maximum number of deals to include in a single PublishStorageDeals
  # message
  #
  # type: uint64
  # env var: LOTUS_LOTUSDEALMAKING_MAXDEALSPERPUBLISHMSG
  #MaxDealsPerPublishMsg = 8

  # The maximum collateral that the provider will put up against a deal,
  # as a multiplier of the minimum collateral bound
  #
  # type: uint64
  # env var: LOTUS_LOTUSDEALMAKING_MAXPROVIDERCOLLATERALMULTIPLIER
  #MaxProviderCollateralMultiplier = 2

  # The maximum allowed disk usage size in bytes of staging deals not yet
  # passed to the sealing node by the markets service. 0 is unlimited.
  #
  # type: int64
  # env var: LOTUS_LOTUSDEALMAKING_MAXSTAGINGDEALSBYTES
  #MaxStagingDealsBytes = 0

  # The maximum number of parallel online data transfers for storage deals
  #
  # type: uint64
  # env var: LOTUS_LOTUSDEALMAKING_SIMULTANEOUSTRANSFERSFORSTORAGE
  #SimultaneousTransfersForStorage = 20

  # The maximum number of simultaneous data transfers from any single client
  # for storage deals.
  # Unset by default (0), and values higher than SimultaneousTransfersForStorage
  # will have no effect; i.e. the total number of simultaneous data transfers
  # across all storage clients is bound by SimultaneousTransfersForStorage
  # regardless of this number.
  #
  # type: uint64
  # env var: LOTUS_LOTUSDEALMAKING_SIMULTANEOUSTRANSFERSFORSTORAGEPERCLIENT
  #SimultaneousTransfersForStoragePerClient = 0

  # The maximum number of parallel online data transfers for retrieval deals
  #
  # type: uint64
  # env var: LOTUS_LOTUSDEALMAKING_SIMULTANEOUSTRANSFERSFORRETRIEVAL
  #SimultaneousTransfersForRetrieval = 20

  # Minimum start epoch buffer to give time for sealing of sector with deal.
  #
  # type: uint64
  # env var: LOTUS_LOTUSDEALMAKING_STARTEPOCHSEALINGBUFFER
  #StartEpochSealingBuffer = 480

  # A command used for fine-grained evaluation of storage deals
  # see https://docs.filecoin.io/mine/lotus/miner-configuration/#using-filters-for-fine-grained-storage-and-retrieval-deal-acceptance for more details
  #
  # type: string
  # env var: LOTUS_LOTUSDEALMAKING_FILTER
  #Filter = ""

  # A command used for fine-grained evaluation of retrieval deals
  # see https://docs.filecoin.io/mine/lotus/miner-configuration/#using-filters-for-fine-grained-storage-and-retrieval-deal-acceptance for more details
  #
  # type: string
  # env var: LOTUS_LOTUSDEALMAKING_RETRIEVALFILTER
  #RetrievalFilter = ""

  [LotusDealmaking.RetrievalPricing]
    # env var: LOTUS_LOTUSDEALMAKING_RETRIEVALPRICING_STRATEGY
    #Strategy = "default"

    [LotusDealmaking.RetrievalPricing.Default]
      # env var: LOTUS_LOTUSDEALMAKING_RETRIEVALPRICING_DEFAULT_VERIFIEDDEALSFREETRANSFER
      #VerifiedDealsFreeTransfer = true

    [LotusDealmaking.RetrievalPricing.External]
      # env var: LOTUS_LOTUSDEALMAKING_RETRIEVALPRICING_EXTERNAL_PATH
      #Path = ""


[LotusFees]
  # The maximum fee to pay when sending the PublishStorageDeals message
  #
  # type: types.FIL
  # env var: LOTUS_LOTUSFEES_MAXPUBLISHDEALSFEE
  #MaxPublishDealsFee = "0.05 FIL"

  # The maximum fee to pay when sending the AddBalance message (used by legacy markets)
  #
  # type: types.FIL
  # env var: LOTUS_LOTUSFEES_MAXMARKETBALANCEADDFEE
  #MaxMarketBalanceAddFee = "0.007 FIL"


[DAGStore]
  # Path to the dagstore root directory. This directory contains three
  # subdirectories, which can be symlinked to alternative locations if
  # need be:
  # - ./transients: caches unsealed deals that have been fetched from the
  # storage subsystem for serving retrievals.
  # - ./indices: stores shard indices.
  # - ./datastore: holds the KV store tracking the state of every shard
  # known to the DAG store.
  # Default value: <LOTUS_MARKETS_PATH>/dagstore (split deployment) or
  # <LOTUS_MINER_PATH>/dagstore (monolith deployment)
  #
  # type: string
  # env var: LOTUS_DAGSTORE_ROOTDIR
  #RootDir = ""

  # The maximum amount of indexing jobs that can run simultaneously.
  # 0 means unlimited.
  # Default value: 5.
  #
  # type: int
  # env var: LOTUS_DAGSTORE_MAXCONCURRENTINDEX
  #MaxConcurrentIndex = 5

  # The maximum amount of unsealed deals that can be fetched simultaneously
  # from the storage subsystem. 0 means unlimited.
  # Default value: 0 (unlimited).
  #
  # type: int
  # env var: LOTUS_DAGSTORE_MAXCONCURRENTREADYFETCHES
  #MaxConcurrentReadyFetches = 0

  # The maximum amount of unseals that can be processed simultaneously
  # from the storage subsystem. 0 means unlimited.
  # Default value: 0 (unlimited).
  #
  # type: int
  # env var: LOTUS_DAGSTORE_MAXCONCURRENTUNSEALS
  MaxConcurrentUnseals = 5

  # The maximum number of simultaneous inflight API calls to the storage
  # subsystem.
  # Default value: 100.
  #
  # type: int
  # env var: LOTUS_DAGSTORE_MAXCONCURRENCYSTORAGECALLS
  #MaxConcurrencyStorageCalls = 100

  # The time between calls to periodic dagstore GC, in time.Duration string
  # representation, e.g. 1m, 5m, 1h.
  # Default value: 1 minute.
  #
  # type: Duration
  # env var: LOTUS_DAGSTORE_GCINTERVAL
  #GCInterval = "1m0s"


[IndexProvider]
  # Enable set whether to enable indexing announcement to the network and expose endpoints that
  # allow indexer nodes to process announcements. Disabled by default.
  #
  # type: bool
  # env var: LOTUS_INDEXPROVIDER_ENABLE
  Enable = false

  # EntriesCacheCapacity sets the maximum capacity to use for caching the indexing advertisement
  # entries. Defaults to 1024 if not specified. The cache is evicted using LRU policy. The
  # maximum storage used by the cache is a factor of EntriesCacheCapacity, EntriesChunkSize and
  # the length of multihashes being advertised. For example, advertising 128-bit long multihashes
  # with the default EntriesCacheCapacity, and EntriesChunkSize means the cache size can grow to
  # 256MiB when full.
  #
  # type: int
  # env var: LOTUS_INDEXPROVIDER_ENTRIESCACHECAPACITY
  #EntriesCacheCapacity = 1024

  # EntriesChunkSize sets the maximum number of multihashes to include in a single entries chunk.
  # Defaults to 16384 if not specified. Note that chunks are chained together for indexing
  # advertisements that include more multihashes than the configured EntriesChunkSize.
  #
  # type: int
  # env var: LOTUS_INDEXPROVIDER_ENTRIESCHUNKSIZE
  #EntriesChunkSize = 16384

  # TopicName sets the topic name on which the changes to the advertised content are announced.
  # If not explicitly specified, the topic name is automatically inferred from the network name
  # in following format: '/indexer/ingest/<network-name>'
  # Defaults to empty, which implies the topic name is inferred from network name.
  #
  # type: string
  # env var: LOTUS_INDEXPROVIDER_TOPICNAME
  #TopicName = ""

  # PurgeCacheOnStart sets whether to clear any cached entries chunks when the provider engine
  # starts. By default, the cache is rehydrated from previously cached entries stored in
  # datastore if any is present.
  #
  # type: bool
  # env var: LOTUS_INDEXPROVIDER_PURGECACHEONSTART
  #PurgeCacheOnStart = false

```
{{<alert>}}
This guide covers all the configuration in use by boostd process. Some of the configuration parameters found in the config.toml file are not used in boost and thus are not covered here. These configuration parameters can be ignored
{{</alert>}}

<!-- STEF JOHNNY I don't know how to force the tables following this comment to wrap reasonably-->
## Sealer

| Parameter                | Example                                                                                                                                                               | Description                                                                                                                              |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| <p>SealerApiInfo<br></p> | "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZwdyIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.nbSvy11-tSUbXqo465hZqzTohGDfSdgh28C4irkmE10:/ip4/0.0.0.0/tcp/2345/http" | <p>Miner API info passed during boost init. Requires admin permissions.<br>Connect string for the miner/sealer instance API endpoint</p> |
| SectorIndexApiInfo       | "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZwdyIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.nbSvy11-tSUbXqo465hZqzTohGDfSdgh28C4irkmE10:/ip4/0.0.0.0/tcp/2345/http" | <p>Miner API info passed during boost init. Requires admin permissions.<br>Connect string for the miner/sealer instance API endpoint</p> |

## API

| Parameter           | Example                                    | Description                                                                                                                                                         |
| ------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ListenAddress       | <p>"/ip4/127.0.0.1/tcp/1288/http"<br> </p> | <p># Format: multiaddress<br>Address Boost API will be listening on.<br>No need to update unless you are planning to make API calls from outside the boost node</p> |
| RemoteListenAddress | "0.0.0.0:1288"                             | <p>Address boost API can reached at from outside.<br>No need to update unless you are planning to make API calls from outside the boost node</p>                    |
| Timeout             | "30s"                                      | RPC timeout value                                                                                                                                                   |

## Libp2p

| Parameter                  | Example                                                                | Description                                                                                                                                                                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <p>ListenAddresses<br></p> | <p># Format: multiaddress<br>["/ip4/209.94.92.3/tcp/24001"]</p>        | Binding address for the libp2p host - 0 means random port.                                                                                                                                                                                                         |
| AnnounceAddresses          | <p># Format: multiaddress<br>["/ip4/209.94.92.3/tcp/24001"]</p>        | <p>Addresses to explicitly announce to other peers. If not specified, all interface addresses are announced.<br>On chain address need to be updated when this address is changed<br># lotus-miner actor set-addrs /ip4/&#x3C;YOUR_PUBLIC_IP_ADDRESS>/tcp/24001</p> |
| NoAnnounceAddresses        | <p></p><p># Format: multiaddress<br>["/ip4/209.94.92.3/tcp/24001"]</p> | Addresses to not announce. Can be used if you want to announce addresses with exceptions                                                                                                                                                                           |
| ConnMgrLow                 | 150                                                                    | <p>ConnMgrLow is the number of connections that the basic connection manager will trim down to.<br>Too low number can cause frequent connectivity issues</p>                                                                                                       |
| ConnMgrHigh                | 200                                                                    | <p>ConnMgrHigh is the number of connections that, when exceeded, will trigger a connection GC operation<br>Note: protected/recently formed connections don't count towards this limit.<br><br>A high limit can cause very high resource utilization</p>            |
| ConnMgrGrace               | "20s"                                                                  | ConnMgrGrace is a time duration that new connections are immune from being closed by the connection manager.                                                                                                                                                       |

## Storage

| Parameter          | Example | Description                                                                                |
| ------------------ | ------- | ------------------------------------------------------------------------------------------ |
| ParallelFetchLimit | 10      | Upper bound on how many sectors can be fetched in parallel by the storage system at a time |

## Dealmaking

`Dealmaking` section handles deal making configuration explicitly for boost deal that uses the new `/fil/storage/mk/1.2.0` protocol.

## LotusDealmaking

`LotusDealmaking` section handles deal making configuration explicitly for the deal that uses the older `/fil/storage/mk/1.1.0` protocol.

## Wallets

| Parameter           | Example                                                                                                                  | Description                                                                                                                                                                                                                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <p>Miner<br></p>    | f032187                                                                                                                  | Miner ID                                                                                                                                                                                                                                                                                                                       |
| PublishStorageDeals | <p>f3syzhufifmnbzcznoquhy4mlxo3byetqlamzbeijk62bjpoohrj3wiphkgxe3yjrlh5dmxlca3zqxp3yvd33a<br><br>#BLS wallet address</p> | <p>This value is taken during init with <code>--wallet-publish-storage-deals.</code><br><code></code>This wallet is used to send PublishDeal messages. It can be hosted on the remote daemon node and does not require to be present locally.</p>                                                                              |
| DealCollateral      | <p>f3syzhufifmnbzcznoquhy4mlxo3byetqlamzbeijk62bjpoohrj3wiphkgxe3yjrlh5dmxlca3zqxp3yvd33a<br><br>#BLS wallet address</p> | <p>This value is taken during init with <code>--wallet-deal-collateral</code>.<br>This wallet is used to  provide collateral for the deal. Funds from this wallet are moved to market actor and locked during the deal duration.<br>It can be hosted on the remote daemon node and does not require to be present locally.</p> |

## LotusFees

| Parameter              | Example     | Description                                                                         |
| ---------------------- | ----------- | ----------------------------------------------------------------------------------- |
| MaxPublishDealsFee     | "0.05 FIL"  | Maximum fee user is willing to pay for a PublishDeal message                        |
| MaxMarketBalanceAddFee | "0.007 FIL" | The maximum fee to pay when sending the AddBalance message (used by legacy markets) |

## DAGStore

| Parameter                  | Example | Description                                                                                                             |
| -------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| <p>RootDir<br></p>         | Empty   | If a custom value is specified, boost instance will refuse to start. This will be deprecated and removed in the future. |
| MaxConcurrentIndex         | 5       | The maximum amount of indexing jobs that can run simultaneously. 0 means unlimited.                                     |
| MaxConcurrentReadyFetches  | 0       | The maximum amount of unsealed deals that can be fetched simultaneously from the storage subsystem. 0 means unlimited.  |
| MaxConcurrentUnseals       | 0       | The maximum amount of unseals that can be processed simultaneously from the storage subsystem. 0 means unlimited.       |
| MaxConcurrencyStorageCalls | 100     | The maximum number of simultaneous inflight API calls to the storage subsystem.                                         |
| GCInterval                 | "1m0s"  | The time between calls to periodic dagstore GC, in time.Duration string representation, e.g. 1m, 5m, 1h.                |

## IndexProvider

| Parameter            | Example    | Description                                                                                                                                                                                                                                                                                                                 |
| -------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p>Enable<br></p>    | True/False | Enabled or disable the index-provider subsystem                                                                                                                                                                                                                                                                             |
| EntriesCacheCapacity | 5          | EntriesCacheCapacity sets the maximum capacity to use for caching the indexing advertisement entries. Defaults to 1024 if not specified. The cache is evicted using LRU policy. The maximum storage used by the cache is a factor of EntriesCacheCapacity, EntriesChunkSize and the length of multihashes being advertised. |
| EntriesChunkSize     | 0          | EntriesChunkSize sets the maximum number of multihashes to include in a single entries chunk. Defaults to 16384 if not specified. Note that chunks are chained together for indexing advertisements that include more multihashes than the configured EntriesChunkSize.                                                     |
| TopicName            | ""         | TopicName sets the topic name on which the changes to the advertised content are announced. If not explicitly specified, the topic name is automatically inferred from the network name in following format: '/indexer/ingest/'                                                                                             |
| PurgeCacheOnStart    | 100        | PurgeCacheOnStart sets whether to clear any cached entries chunks when the provider engine starts. By default, the cache is rehydrated from previously cached entries stored in datastore if any is present.                                                                                                                |
| GCInterval           | "1m0s"     | The time between calls to periodic dagstore GC, in time.Duration string representation, e.g. 1m, 5m, 1h.                                                                                                                                                                                                                    |

Advertising 128-bit long multihashes with the default EntriesCacheCapacity, and EntriesChunkSize means the cache size can grow to 256MiB when full.

