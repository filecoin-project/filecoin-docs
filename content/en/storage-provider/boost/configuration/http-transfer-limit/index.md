---
title: "HTTP transfer limits"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "http-transfer-limit-7d3068b091ac4b1dc49b7ef449b7d6d0"
weight: 20
toc: true
---

Boost provides a capability to limit the number of simultaneous http transfers in progress to download the deal data from the clients.

This new configuration has been introduced in the `ConfigVersion = 3` of the boost configuration file.

### Configuration Variables

#### HTTP variables

```
  # The maximum number of concurrent storage deal HTTP downloads.
  # Note that this is a soft maximum; if some downloads stall,
  # more downloads are allowed to start.
  #
  # type: uint64
  # env var: LOTUS_DEALMAKING_HTTPTRANSFERMAXCONCURRENTDOWNLOADS
  #HttpTransferMaxConcurrentDownloads = 20

  # The period between checking if downloads have stalled.
  #
  # type: Duration
  # env var: LOTUS_DEALMAKING_HTTPTRANSFERSTALLCHECKPERIOD
  #HttpTransferStallCheckPeriod = "30s"

  # The time that can elapse before a download is considered stalled (and
  # another concurrent download is allowed to start).
  #
  # type: Duration
  # env var: LOTUS_DEALMAKING_HTTPTRANSFERSTALLTIMEOUT
  #HttpTransferStallTimeout = "5m0s"
```

#### Storage variables

```
  # The maximum allowed disk usage size in bytes of downloaded deal data
  # that has not yet been passed to the sealing node by boost.
  # When the client makes a new deal proposal to download data from a host,
  # boost checks this config value against the sum of:
  # - the amount of data downloaded in the staging area
  # - the amount of data that is queued for download
  # - the amount of data in the proposed deal
  # If the total amount would exceed the limit, boost rejects the deal.
  # Set this value to 0 to indicate there is no limit.
  #
  # type: int64
  # env var: LOTUS_DEALMAKING_MAXSTAGINGDEALSBYTES
  MaxStagingDealsBytes = 50000000000

  # The percentage of MaxStagingDealsBytes that is allocated to each host.
  # When the client makes a new deal proposal to download data from a host,
  # boost checks this config value against the sum of:
  # - the amount of data downloaded from the host in the staging area
  # - the amount of data that is queued for download from the host
  # - the amount of data in the proposed deal
  # If the total amount would exceed the limit, boost rejects the deal.
  # Set this value to 0 to indicate there is no limit per host.
  #
  # type: uint64
  # env var: LOTUS_DEALMAKING_MAXSTAGINGDEALSPERCENTPERHOST
  #MaxStagingDealsPercentPerHost = 0
```

### How TransferLimiter works

The `transferLimiter` maintains a queue of transfers with a soft upper limit on the number of concurrent transfers.

To prevent slow or stalled transfers from blocking up the queue there are a couple of mitigations: The queue is ordered such that we

* start transferring data for the oldest deal first
* prefer to start transfers with peers that don't have any ongoing transfer
* once the soft limit is reached, don't allow any new transfers with peers that have existing stalled transfers

![HTTP transfer limits](<http-transfer-limit.png>)



Note that peers are distinguished by their host (eg foo.bar:8080) not by libp2p peer ID. For example, if there is

* one active transfer with peer A
* one pending transfer (peer A)
* one pending transfer (peer B)

The algorithm will prefer to start a transfer with peer B than peer A. This helps to ensure that slow peers don't block the transfer queue.

The limit on the number of concurrent transfers is soft. Example: if there is a limit of 5 concurrent transfers and there are

* three active transfers
* two stalled transfers

then two more transfers are permitted to start (as long as they're not with one of the stalled peers)

