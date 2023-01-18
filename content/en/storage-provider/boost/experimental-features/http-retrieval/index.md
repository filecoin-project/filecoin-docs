---
title: "HTTP retrievals"
description: "How to configure and use HTTP retrievals with Filecoin Boost"
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "http-retrieval-15a197c89ab912c0e65453fcbb9c6abd"
weight: 10
toc: true
---

Boost is introducing a new binary, `booster-http`, with release v1.2.0. This binary can be run alongside the `boostd` market process in order to serve retrievals over http.

Currently, there is no payment method or built-in security integrated in the new binary. It can be run with any stable release of `boostd` and can also be run on a separate machine from the `boostd` process.

### Trying it out

To build and run `booster-http` :

1. Clone the main branch from the boost repo

```
git clone https://github.com/filecoin-project/boost.git
```

2. Build the new binary

```
make booster-http
```

3. Collect the token information for boost, lotus-miner and lotus daemon API

```
boostd auth api-info --perm=admin
```

```
lotus auth api-info --perm=admin
```

```
lotus-miner auth api-info --perm=admin
```


Output of the above commands is in the following format

```<ENV VARIABLE NAME> = \<TOKEN>:\<API ADDRESS>```

Please use only \<TOKEN>:\<API ADDRESS> part for the next step:


4. Start the `booster-http` server with the above details

```
booster-http run --api-boost=$BOOST_API_INFO --api-fullnode=$FULLNODE_API_INFO --api-storage=$MINER_API_INFO
```


You can also run multiple processes on the same machine but you would need to use different port for each `booster-http` instance by specifying the value using the `--port` flag. You can run multiple instances of the `booster-http` spread over multiple machines.


5. To download files from the new http-server locally, you use the following endpoints:

```
# Download a piece by its PieceCID
# Randomly selects the first deal/sector matching the CID
# This will transfer the entire piece including all its (compressible) padding
curl http://localhost:7777/piece/bagaSomePieceCID -o $HOME/download.piece 
```

## Running Public Boost HTTP Retrieval

The booster-http server listens on localhost. To expose the server publically, SPs should run a reverse proxy such as NGINX to handle operational concerns like:

* SSL
* Authentication
* Load balancing

While booster-http may get more operational features over time, the intent is that providers who want to scale their HTTP operations will handle most of operational concerns via software in front of booster-http.

### Making HTTP Retrieval Discoverable

To enable public discovery of the Boost HTTP server, SPs should set the domain root in boostd's `config.toml`: Under the `[DealMaking]` section, set `HTTPRetrievalMultiaddr` to the public domain root in multi-address format.

Example `config.toml` section:

{{< alert  >}}
Replace "example.com" in the lines below with your actual domain or IP address
{{< /alert >}}

```
[DealMaking]
  HTTPRetrievalMultiaddr = "/dns/example.com/tcp/443/https"
```

Clients can determine if an SP offers HTTP retrieval by running:

```
boost provider retrieval-transports <miner id>
```

Clients can check the HTTP URL scheme version and supported queries

```
// Supported queries
curl https://example.com/index

// Version
curl https://example.com/info
```

Clients can download a piece using the domain root configured by the SP:

```
# Download a piece by its CID
curl https://example.com/piece/bagaSomePieceCID -o $HOME/download.piece
```
