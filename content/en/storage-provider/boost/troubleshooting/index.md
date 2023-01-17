---
title: "Troubleshooting"
description: "Troubleshooting tips for Filecoin Boost"
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "troubleshooting-04dae13e569fc69125200e5ef2496f3f"
weight: 130
toc: true
---

## Boost IP Inspect page

The new _inspect_ page <!-- STEF We give example localhost URLs in other places should we do so here? --> in the Boost UI helps with debugging retrieval problems. It allows the user to check the following items using a payload CID or piece CID:

* Verify if the piece has been correctly added to the Piece Store
* Validate if the piece is indexed in the DAG store
* Check for an unsealed copy of the piece
* Verify that the payload CID -> piece CID index has been created correctly

{{< youtube "KLH2_LzfTtw" >}}

## Failed to connect to peer

If the client cannot connect to Filecoin Boost running on a storage provider, with an error similar to the following:

```
failed to connect to peer <peer id>: failed to dial <peer id>:
  * <multi-address> failed to negotiate security protocol:
    peer id mismatch: expected <peer id>,
    but remote key matches <different peer id>
```

The probable cause is that: <!-- Stef is it one of any of the following bullets? this section could do with some clarification-->

* The storage provider registered their peer id and address on chain.

e.g. "Register the peer id `123abcd` at address `ip4/123.456.12.345/tcp/1234`"

```
lotus-miner actor set-peer-id 123abcd
lotus-miner actor set-addrs ip4/123.456.12.345/tcp/1234
```

* The storage provider has changed their peer id locally but didn't update the peer id on chain.
* The client wants to make a storage deal with peer `123abcd`. The client looks on chain for the address of peer `123abcd` and sees peer `123abcd` has registered an address `ip4/123.456.12.345/tcp/1234`.
* The client sends a deal proposal for peer `123abcd` to the SP at address `ip4/123.456.12.345/tcp/1234`.
* The SP has changed their peer ID, so the SP responds to the deal proposal request with an error: `peer id mismatch`

To fix the problem, the SP should register the new peer id on chain:

```
lotus-miner actor set-peer-id <new peer id>
```

## Update storage provider's on chain address

Clients would not be able to connect to Boost running on a Storage provider after an IP address change. This happens as clients lookup the registered peer id and address on chain for a storage provider. When a storage provider changes their IP address or miner address locally, they must update the same on chain.

The SP should register the new peer id on chain using the following lotus-miner command


```
lotus-miner actor set-addrs /ip4/<YOUR_PUBLIC_IP_ADDRESS_OF_BOOST_NODE>/tcp/<Boostd Port>
```


{{< alert >}}
Please make sure to use the public IP and port of the Boost node and not `lotus-miner` node if your miner and `boostd` runs on a separate machine.
{{< /alert >}}

The on chain address change requires access to the worker key and thus the command lives in `lotus-miner` instead of Boost.&#x20;

## Error in _lotus-miner info_ output

After migrating to Boost, the following error is seen when running `lotus-miner info` :

```
ERROR: fatal error calling 'Filecoin.MarketListIncompleteDeals': panic in rpc method 'Filecoin.MarketListIncompleteDeals': runtime error: invalid memory address or nil pointer dereference
```
This occurs because `lotus-miner` is making a call on the legacy `lotus-market` process which has been replaced by Filecoin Boost, but `lotus-miner` is not aware of the new market process.


This is resolved by exporting the MARKETS\_API\_INFO variable on your lotus-miner node.

```
export MARKETS_API_INFO=<Boost token:api>
```
 <!-- STEF does this require a restart-->

## Error "failed to lookup index for mh...err: datastore: key not found" when attempting a data retrieval

The following error shows up when trying to retrieve data from a storage provider.


```
ERROR: offer error: retrieval query offer errored: failed to fetch piece to retrieve from: getting pieces for cid Qmf1ykhUo63qB5dJ8KRyeths9MZfyxpVdT5xwnmoLKefz7: getting pieces containing block Qmf1ykhUo63qB5dJ8KRyeths92mfyxpVdT5xi1moLKefz7: failed to lookup index for mh 1220f7ce2d20772b959c1071868e9495712f12785b1710ee88752af120dd49338190, err: datastore: key not found
```
<!--STEF what does 'mh' indicate here? -->

The error indicates that dagstore does not have a corresponding index shard for the piece containing the requested data. When a retrieval is requested, the dagstore on the storage provider side is queried and a reverse lookup is used to determine the key(piece CID). This key is then used to query the piece store to find the sector containing the data and byte offset.

If, for any reason, the shard is not registered with the dagstore, then the reverse look up to find the piece CID fails and the above error is seen. The most likely cause for the shard not being registered with the dagstore is:

`
2022-02-21T20:06:03.950+1100 INFO markets loggers/loggers.go:20 storage provider event {"name": "ProviderEventFailed", "proposal CID": "bafyreihr743zllr2eckgfiweouiap7pgcjqa3mg3t75jjt7sfcpu", "state": "StorageDealError", "message": "error awaiting deal pre-commit: failed to set up called handler: called check error (h: 1570875): failed to look up deal on chain: deal 3964985 not found - deal may not have completed sealing before deal proposal start epoch, or deal may have been slashed"}
`

To fix the deals where retrievals are impacted by above error, user will need to register the shards manually with dagstore:

```
boostd dagstore register-shard <piece CID>
```

If you have multiple deals in such state then you will need to generate a list of registered pieces with piece store and then compare with the shards available in the dagstore to create a list of missing shards.

{{< alert  >}}
Please pause accepting any new deals and ensure all current deals are handed off to the lotus-miner (sealer) subsystem before executing the steps below.
{{< /alert  >}}

1. Create a list of all sectors on `lotus-miner` and redirect the output to a file. Copy the output file to boost node to be used by the below command.
```
lotus-miner sectors list | awk '{print $1 " " $2}' | grep -v ID > aclist.txt
```
2. Generate a list of shards to be registered
```
comm -13 <(for i in $(boostd pieces list-pieces); do sector_list=`boostd pieces piece-info $i | awk '{print $2}'| sed -ne '/SectorID/,$p' | grep -v SectorID`; for j in $sector_list; do grep -w $j aclist.txt > /dev/null; if [ $? -eq 0 ]; then break; else echo "$i"; fi; done; done) <(comm -13 <(boostd dagstore list-shards | awk '{print $1}' | sed 1d | sort) <(boostd pieces list-pieces | sort))
```
3. Register the shards with dagstore in an automated fashion.
```
for i in `cat <OUTPUT OF STEP 2 IN A FILE>` ; do boostd dagstore register-shard $i; done
```

Please note that each shard may take upto 3-5 minutes to get registered. So, the above command might take hours or days to complete depending upon the number of missing shards.
