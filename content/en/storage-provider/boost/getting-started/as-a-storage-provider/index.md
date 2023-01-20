---
title: "As a storage provider"
description: "Installation instructions for Filecoin Boost, for Storage Providers"
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "as-a-storage-provider-b715e4f12ef1a7343ddd1268f4f9e05e"
weight: 10
toc: true
---

{{< alert  >}}
If you are already running a standalone markets process, follow the guide at [migrate-a-lotus-markets-service-process-to-boost.md](../upgrade-from-lotus-to-boost/migrate-a-lotus-markets-service-process-to-boost.md "mention")

If you are already running a monolith lotus-miner instance, follow the guide at [migrate-a-monolith-lotus-miner-to-boost.md](../upgrade-from-lotus-to-boost/migrate-a-monolith-lotus-miner-to-boost.md "mention")
{{< /alert  >}}

### Initialization and Running

1\. Make sure you have a Lotus node and miner running

2\. Create and send funds to two new wallets on the lotus node to be used for Boost

Boost currently uses two wallets for storage deals:

* The publish storage deals wallet - This wallet pays the gas cost when Boost sends the `PublishStorageDeals` message.
* The deal collateral wallet - When the Storage Provider accepts a deal, they must put collateral for the deal into escrow. Boost moves funds from this wallet into escrow with the `StorageMarketActor`.

```
PUBLISH_STORAGE_DEALS_WALLET=`lotus wallet new bls`
COLLAT_WALLET=`lotus wallet new bls`
lotus send --from mywallet $PUBLISH_STORAGE_DEALS_WALLET 10
lotus send --from mywallet $COLLAT_WALLET 10
```

3\. Set the publish storage deals wallet as a control wallet.

```
lotus-miner actor control set --really-do-it $PUBMSG_WALLET
```

4\. Create and initialize the Boost repository

{{< alert  >}}
If you are already running a Lotus markets service process, you should\
run `boostd migrate` instead of `boostd init`

See section [migrate-a-lotus-markets-service-process-to-boost.md](../upgrade-from-lotus-to-boost/migrate-a-lotus-markets-service-process-to-boost.md "mention") for more details.
{{< /alert  >}}

Boost keeps all data in a directory called the repository. By default the repository is at `~/.boost`. To use a different location pass the `--boost-repo` parameter.

Export the environment variables needed for `boostd init` to connect to the lotus daemon and lotus miner.

```
export $(lotus auth api-info --perm=admin)
export $(lotus-miner auth api-info --perm=admin)
```

Export environment variables that point to the API endpoints for the sealing and mining processes. They will be used by the `boost` node to make JSON-RPC calls to the `mining/sealing/proving` node.

```
export APISEALER=`lotus-miner auth api-info --perm=admin`
export APISECTORINDEX=`lotus-miner auth api-info --perm=admin`
```

Run `boostd init` to create and initialize the repository:

```
boostd --vv init \
       --api-sealer=$APISEALER \
       --api-sector-index=$APISECTORINDEX \
       --wallet-publish-storage-deals=$PUBLISH_STORAGE_DEALS_WALLET \
       --wallet-deal-collateral=$COLLAT_WALLET \
       --max-staging-deals-bytes=50000000000
```

* `--api-sealer` is the API info for the lotus-miner instance that does sealing
* `--api-sector-index` is the API info for the lotus-miner instance that provides storage
* `--max-staging-deals-bytes` is the maximum amount of storage to be used for downloaded files (once the limit is reached Boost will reject subsequent incoming deals)

5\. Update `ulimit` file descriptor limit if necessary. Boost deals will fail if the file descriptor limit for the process is not set high enough. This limit can be raised temporarily before starting the Boost process by running the command `ulimit -n 1048576`. We recommend setting it permanently by following the [Permanently Setting Your ULIMIT System Value](https://lotus.filecoin.io/kb/soft-fd-limit/) guide.

6\. Run the `boostd` service, which will start:

* libp2p listeners for storage and retrieval
* the JSON RPC API
* the graphql interface (used by the react front-end)
* the web server for the react front-end

```
boostd --vv run
```

{{< alert  >}}
In your firewall you will need to open the ports that libp2p listens on, so that Boost can receive storage and retrieval deals.

 See the `Libp2p` section of `config.toml` in the [configuration options]({{<ref "storage-provider/boost/configuration/overview#libp2p" >}}) 
{{< /alert  >}}

### Web UI

{{< alert  >}}
When you build `boostd` using `make build` the react app is also part of the process. You can skip this section.

Following steps are to be used only in case you are building binary and react app separately.
{{< /alert  >}}

1. Build the React frontend

```
cd react

# Download and install npm packages needed by the React frontend
npm install

# Build the optimized JavaScript and CSS in boost/react/build
npm run build
```

1. Open the Web UI

Open http://localhost:8080 in your browser.

{{< alert  >}}
To access a web UI running on a remote server, you can open an SSH tunnel from your local machine:

```
ssh -L 8080:localhost:8080 myserver
```
{{< /alert  >}}

### API Access

Boost API can be accessed by setting the environment variable `BOOST_API_INFO` same as `LOTUS_MARKET_INFO`.&#x20;

```
boostd auth api-info --perm=admin

export BOOST_API_INFO=<TOKEN>:<API Address>
```

You can also directly evaluate the `boostd auth` command with:

```
export $(boostd auth api-info --perm=admin)
```
