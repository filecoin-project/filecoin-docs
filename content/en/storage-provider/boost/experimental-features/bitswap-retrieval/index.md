---
title: "Bitswap retrievals"
description: "How to configure and use bitswap retrievals in Filecoin Boost"
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "bitswap-retrieval-533cc0cf115df09ca5f06d613c2c5c23"
weight: 20
toc: true
---

`booster-bitswap` is a binary that runs alongside the `boostd` process, to serve retrievals over the Bitswap protocol. This experimental feature of boost provides a number of tools for managing a production grade Bitswap retrieval service for a Storage Provider's content.

Note: There is currently no payment method in booster-bitswap. This endpoint is intended to serve free content.

There are two primary "modes" for exposing `booster-bitswap` to the internet.

1. In `private mode` the `booster-bitswap` peer ID is not publicly accessible to the internet. Instead, public Bitswap traffic goes to `boostd` itself, which then acts as a reverse proxy, forwarding that traffic on to `booster-bitswap`. This is similar to the way one might configure Nginx as a reverse proxy for an otherwise private web server. `private mode` is simpler to setup but may produce greater load on `boostd` as a protocol proxy.
2. In `public mode` the public internet firewall must be configured to forward traffic directly to the `booster-bitswap` instance. `boostd` is configured to announce the public address of `booster-bitswap` to the network indexer (the network indexer is the service that clients can query to discover where to retrieve content). This mode offers greater flexibility and performance. You can even setup `booster-bitswap` to run over a separate internet connection from `boostd`. However, it might require additional configuration and changes to your overall network infrastructure.

![Bitswap architecture and possible configuration](<bitswap.png>)

### Demo configuration

You can configure booster-bitswap in the demo mode and familiarise yourself with the configuration. Once you are confident and familiar with the options, please go ahead and configure `booster-bitswap` for [production use](#set-up-booster-bitswap-to-serve-retrievals-publicly).

1. Clone the `release/booster-bitswap` branch from the boost repo

```
git clone https://github.com/filecoin-project/boost.git
cd boost
git checkout release/booster-bitswap
```

2. Build the `booster-bitswap` binary:

```
make booster-bitswap
```

3. Initialize `booster-bitswap`:

```
booster-bitswap init
```

4. Record the peer ID output by `booster-bitswap init` -- we will need this peer id later

5. Collect the boost API Info

```
export ENV_BOOST_API_INFO=`boostd auth api-info --perm=admin`

export BOOST_API_INFO=`echo $ENV_BOOST_API_INFO | awk '{split($0,a,"="); print a[2]}'`
```

6. Run booster-bitswap

```
booster-bitswap run --api-boost=$BOOST_API_INFO
```

7. By default, booster-bitswap runs on port 8888. You can use `--port` to override this behaviour

8. Fetching over bitswap by running

```
booster-bitswap fetch /ip4/127.0.0.1/tcp/8888/p2p/{peerID} {rootCID} outfile.car
```

Where `peerID` is the peer id recorded when you ran `booster-bitswap init` and `rootCID` is the CID of a data CID known to be stored on your SP.

## Set up booster-bitswap To Serve Retrievals Publicly

As described above, `booster-bitswap` can be configured to serve the retrievals in 2 modes. We recommend using `public mode` to avoid greater load on `boostd` as a protocol proxy.

### Private Mode

1. Clone the `release/booster-bitswap` branch from the boost repo

```
git clone https://github.com/filecoin-project/boost.git
cd boost
git checkout release/booster-bitswap
```

2. Build the `booster-bitswap` binary:

```
make booster-bitswap
```

3. Initialize `booster-bitswap`:

```
booster-bitswap init
```

4. Record the peer ID output by `booster-bitswap init` -- we will need this peer id later

5. Stop `boostd` and edit \~/.boost/config.toml to set the peer ID for bitswap

```
[DealMaking]
  BitswapPeerID ="{peer id for booster-bitswap you recorded earlier}"
```

6. Start `boostd` service again

7. Collect the boost API Info

```
export ENV_BOOST_API_INFO=`boostd auth api-info --perm=admin`

export BOOST_API_INFO=`echo $ENV_BOOST_API_INFO | awk '{split($0,a,"="); print a[2]}'`
```

8. Run booster-bitswap

```
booster-bitswap run --api-boost=$BOOST_API_INFO --proxy={boostd multiaddress}
```

{{< alert  >}}
You can get a `boostd` multiaddress by running `boostd net listen` and using any of the returned addresses.
{{< /alert  >}}

9. By default, booster-bitswap runs on port 8888. You can use `--port` to override this behaviour

10. Try to fetch a payload CID over bitswap to verify your configuration

### Public Mode

1. Clone the `release/booster-bitswap` branch from the boost repo

```
git clone https://github.com/filecoin-project/boost.git
cd boost
git checkout release/booster-bitswap
```

2. Build the `booster-bitswap` binary:

```
make booster-bitswap
```

3. Initialize `booster-bitswap`:

```
booster-bitswap init
```

4. Record the peer ID output by `booster-bitswap init` -- we will need this peer id later

5. Stop `boostd` and edit \~/.boost/config.toml to set the peer ID for bitswap

```
[DealMaking]
 BitswapPeerID ="{peer id for bosoter bitswap you recorded earlier}"
 BitswapPublicAddresses = ["/ip4/{booster-bitswap public IP}/tcp/{booster-bitswap public port}"]
 BitswapPrivKeyFile = "{path to libp2p private key file for booster bitswap}"
```

The libp2p private key file for booster-bitswap can generally be found at \<booster-bitswap repo path>/libp2p.key

The reason boost needs to know the public multiaddresses and libp2p private key for `booster-bitswap` is so it can properly announce these records to the network indexer.

6. Start `boostd` service again

7. Collect the boost API Info

```
export ENV_BOOST_API_INFO=`boostd auth api-info --perm=admin`

export BOOST_API_INFO=`echo $ENV_BOOST_API_INFO | awk '{split($0,a,"="); print a[2]}'`
```

8. Run booster-bitswap

```
booster-bitswap run --api-boost=$BOOST_API_INFO
```

9. By default, booster-bitswap runs on port 8888. You can use `--port` to override this behaviour

10. Try to fetch a payload CID over bitswap to verify your configuration

## `Booster-bitswap` configuration

`booster-bitswap` provides a number of performance and safety tools for managing a production grade bitswap server without overloading your infrastructure.

### BadBits filtering

Booster-bitswap is automatically setup to deny all requests for CIDs that are on the BadBits Denylist. The default badbits list can be override or addition badbits list can be provided to the  `booster-bitswap` instance.

#### To override the default badbits list

```
booster-bitswap run --api-boost=$BOOST_API_INFO --badbits-denylists <URL>
```


#### To provide additional badbits list


```
booster-bitswap run --api-boost=$BOOST_API_INFO --badbits-denylists https://badbits.dwebops.pub/denylist.json <URL1> <URL2>
```


### Request Filtering

`booster-bitswap` provides a number of controls for filtering requests and limiting resource usage. These are expressed in a JSON configuration file `<booster-bitswap repo>/retrievalconfig.json`

You can create a new `retrievalconfig.json` file if one does not exist:

```
{
   "AllowDenyList": { // list of peers to either deny or allow (denying all others)
   	"Type": "allowlist",  // "allowlist" or "denylist"
   		"PeerIDs": [
   			"Qma9T5YraSnpRDZqRR4krcSJabThc8nwZuJV3LercPHufi",
   			"QmYyQSo1c1Ym7orWxLYvCrM2EmxFTANf8wXmmE7DWjhx5N"
   		]
   },
       "UnderMaintenance": false, // when set to true, denies all requests
       "StorageProviderLimits": {
           "Bitswap": {
                       "SimultaneousRequests": 100, // bitswap block requests served at the same time across peers
                       "SimultaneousRequestsPerPeer": 10, // bitswap block requests served at the same time for a single peer
   		"MaxBandwidth": "100mb" // human readable size metric, per second
   	}
   }
}
```

To make changes to the current configuration, you need to edit the `retrievalconfig.json` file and restart `booster-bitswap` for the changes to take affect. All configs are optional and absent parameters generally default to no filtering at all for the given parameter.

You can also configure `booster-bitswap` to fetch your retrieval config from a remote HTTP API, possibly one provided by a third party configuration tool like CIDGravity. To do this, start `booster-bitswap` with the --api-filter-endpoint {url} option where URL is the HTTP URL for an API serving the above JSON format. Optionally, add --api-filter-auth {authheader}, if you need to pass a value for the HTTP Authorization header with your API


```
booster-bitswap run --api-boost=$BOOST_API_INFO --api-filter-endpoint <URL> --api-filter-auth <OPTIONAL SCURITY HEADERS>
```


When you setup with an API endpoint, `booster-bitswap` will update its local configuration from the API every five minutes, so you won't have to restart `booster-bitswap` to make a change. Please, be aware that the remote config will overwrite, rather than merge, with the local config.
