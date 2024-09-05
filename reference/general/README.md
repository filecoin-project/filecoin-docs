---
description: >-
  Helpful reference materials for the Filecoin specification, implementations,
  and ecosystem.
---

# General

## About Filecoin

* [**Filecoin Specification**](https://spec.filecoin.io/) - technical specification for Filecoin protocol and its associated subsystems.
* [**Filecoin Slack**](https://filecoin.io/slack) - announcements and open discussion of Filecoin.
* [**Filecoin Orbit Community Program**](https://www.fil.org/orbit) - the Filecoin Orbit Community Program is an effort of dozens of volunteers around the world to organize meetups and hackathons in their local jurisdictions.
* [**Filecoin YouTube channel**](https://www.youtube.com/channel/UCPyYmtJYQwxM-EUyRUTp5DA) - various Filecoin workshops, conference talks, and meetups.

## Filecoin Network

### Node implementations

* [**Lotus**](https://github.com/filecoin-project/lotus) - _**Recommended**_ most advanced implementation and [security audited](https://spec.filecoin.io/#section-intro.implementations-status), in GoLang.
* Other implementations (In progress):
  * [Forest](https://github.com/ChainSafe/forest) - Rust
  * [Venus](https://github.com/filecoin-project/venus) (formerly `go-filecoin`) - also in GoLang ([Venus documentation](https://venus.filecoin.io/)).
* Lotus Docker Hub Images (unofficial):
  * [`glif/lotus`](https://github.com/glifio/filecoin-docker)
  * [`textile/lotus`](https://hub.docker.com/r/textile/lotus) 

### Networks

[`network.filecoin.io`](https://network.filecoin.io) - lists all current Filecoin networks and related information.

* **Mainnet**
  * [Mainnet network status](https://filecoin.statuspage.io/) - reports the status and incident of the Filecoin Mainnet.
* **Calibration**
  * Largest testnet which support 32 GiB and 64 GiB sectors.
  * See [`#fil-net-calibration-discuss`](https://filecoinproject.slack.com/archives/C01D42NNLMS) for questions and discussion in [Filecoin Slack](https://filecoin.io/slack).
* **Local Devnet**
  * [Run a Local Devnet using Lotus](https://lotus.filecoin.io/lotus/developers/local-network/).

## Network status

Tools to check status and details of the network and chain.

### Block explorers

* [`Filfox.info`](https://filfox.info/en) - Mainnet
* [Filscan](https://filscan.io) - Mainnet & Calibration

### Chain data and monitoring

* [Starboard](https://dashboard.starboard.ventures/) - network health monitoring
* [Filstats.io](https://filstats.io) - node telemetry monitoring - add your node!
* [Sentinel Project](https://lilium.sh/) - Filecoin Network Monitoring and Analysis System
* [DataCapStats](https://datacapstats.io/) - data providing insight on the Filecoin Plus program.

### Storage/Deals status

* [Starboard](https://dashboard.starboard.ventures/capacity-services) - Filecoin storage provider analytics
* [`filecoin.tools`](https://filecoin.tools) - check your CID’s storage deal status. Also provides an API - check [`filecoin.tools/docs`](https://filecoin.tools/docs) for reference
* [Deals list at `Filfox.io`](https://filfox.info/en/deal)

## Storage Web Applications

Web-based applications that store your data on Filecoin. No command-line or coding experience required.

* [ChainSafe Files](https://files.chainsafe.io/) - Dropbox-style UI, login with OAuth or general MetaMask
* [Starling Framework for Data Integrity](https://www.starlinglab.org/)
  * to securely capture, store and verify human history
  * learn more at [`starlinglab.org/78days`](https://www.starlinglab.org/78days/) or the [Filecoin blog interview](https://filecoin.io/blog/starling-framework/)
  * [`Starlingstorage.io`](https://starlingstorage.io/) - API + CLI that simplified storing data to a local Lotus node for preservation use cases.

## APIs & Developer tools

Developer tools, API clients & storage services that developers can use to build on Filecoin.

### Storage APIs for app builders

* [Lighthouse](https://www.lighthouse.storage/) - Lighthouse offers a suite of tools to enable builders to store data on Filecoin when biulding apps.
* [`NFT.storage`](https://nft.storage/) - Preserve your NFTs with our new low-cost, easy-to-use solution, ensuring verifiable long-term storage on Filecoin.
* [`Web3.storage`](https://web3.storage/) - service from Protocol Labs for storing off-chain _dApp_ data on IPFS and Filecoin, with help from Pinata (a fast IPFS Pinning Service) to [distribute the content across IPFS](https://www.pinata.cloud/blog/protocol-labs-and-pinata)
* [`Textile.io's tools`](https://docs.textile.io/) - suite of tools for interacting with IPFS and Filecoin, including [Tableland](https://tableland.xyz/) and Filecoin bridges to Polygon and NEAR.  
* [Fleek’s tools](https://fleek.co/) - provides access to Fleek’s hosted services using IPFS, Textile, Filecoin, Ethereum, etc.  More Fleek developer resources are available at [Fleek.xyz](https://fleek.xyz/).
  * [Space SDK](https://docs.fleek.co/space-sdk/overview/) - modular JavaScript/Typescript library and set of interfaces that packages tools and features enabled by Open Web protocols like IPFS, Textile, Filecoin, and Ethereum.
  * [Space Daemon](https://docs.fleek.co/space-daemon/overview/) - packages together IPFS and tools from Textile into one easy to install background service.

### Message signing tools

* [Filecoin Signing Tools](../built-in-actors/README.md) - _**Recommended**_ a pure JS or Rust / WASM / JSONRPC library for creating signed messages apart from a Filecoin node.
  * For an open source example of how to use it see the [Glif web wallet](https://github.com/glifio/wallet) on GitHub.
* [Filecoin JS Signer](https://github.com/blitslabs/filecoin-js-signer) - \[_last update: June 2021_] pure TS / JS library for creating signed messages and interacting with Filecoin’s built-in Actors (like Payment Channel and Multisig), used by the [Filecoin Loans grant project](https://github.com/blitslabs/filecoin.loans-monorepo).
  * On npm at [`@blitslabs/filecoin-js-signer`](https://www.npmjs.com/package/@blitslabs/filecoin-js-signer)

### Wallet-related tools

* [Filecoin Rosetta API Proxy](https://github.com/Zondax/rosetta-filecoin) - [Rosetta](https://www.rosetta-api.org/) is an API standard created by Coinbase for a consistent interface to many chains for wallets and exchanges.
* [FilSnap MetaMask Plugin](https://metamask.io/flask/) - MetaMask has a new plugin system currently still in beta that developers can try out. The MM UI will not change but Filecoin keys are in the MM vault.

### Node Infrastructure & APIs

> NOTE: making deep calls into the chain’s history may take some time to return and it may be more efficient to use a chain database (e.g. used by block explorers) that stores the chain’s history and is optimized for queries.

* [GLIF nodes](https://lotus.filecoin.io/lotus/developers/glif-nodes/) - A hosted endpoint to Filecoin mainnet and testnet.  Note: as of Q1 2023, Infura no longer supports Filecoin.
  * The GLIF endpoint supports read-only calls and `MPoolPush()` for sending signed transactions to the network (which can be signed using the [Message signing tools](https://docs.filecoin.io/reference/general/overview/#message-signing-tools)).
* [**Lotus JSON-RPC API**](https://lotus.filecoin.io/lotus/get-started/what-is-lotus/) - Lotus offers the full feature set of its capabilities through API.
  * [lotus API Postman sample](https://documenter.getpostman.com/view/4872192/SWLh5mUd?version=latest) - (shows sample wallet calls only)

**Scalable endpoint hosting**

For running a node cluster of load balanced Lotus JSON RPC API endpoints.

* [Filecoin-chart](https://github.com/glifio/filecoin-chart) (k8 cluster) - Helm chart for hosting Lotus Node clients.

**Filecoin API clients**

* [`Filecoin.js`](https://github.com/filecoin-shipyard/filecoin.js) (outdated) - higher-level JS library for interacting with Lotus via JSON-RPC API.
* [`js-lotus-client`](https://github.com/filecoin-shipyard/js-lotus-client) - lower-level JS wrapper for basic parsing of the Lotus JSON RPC API.
* [`lotus-json-rpc-provider`](https://www.npmjs.com/package/@coinsummer/lotus-jsonrpc-provider) (outdated) - wraps the Lotus API in TypeScript.

**Storage provider index API**

* [Filrep.io API](https://filrep.io/api) - A suite of RESTFul JSON endpoints to discover the best storage provider to make deals with.

### Data prep tools

* [CAR files](https://ipld.io/specs/transport/car/) - automatically used on Lotus import for less than 32 and 64 GiB, Filecoin archive format serialized from DAGs, see also [building with the Lotus API](https://lotus.filecoin.io/tutorials/lotus/build-with-lotus-api/).
* [`go-graphsplit`](https://github.com/filedrive-team/go-graphsplit) - FileDrive chunks a larger single DAG for storage in default Filecoin 32 and 64 GiB sector sizes.
* [IPFS](https://ipfs.tech) - you can use `ipfs add` with an IPFS node then [add the CID from a Filecoin node](https://docs.filecoin.io/builder-cookbook/data-storage/store-data).

### Databases using IPFS and Filecoin

* [Tableland](https://tableland.xyz/) - (new) create familiar SQL tables to read and write dynamic NFT metadata or application data for dApps, from Textile.
* [OrbitDB](https://orbitdb.org/) - decentralized multi-party database on IPFS with multi-party syncing with topic pubsub and CRDTs.
* [ThreadsDB](https://docs.textile.io/threads/) - decentralized multi-party database for user-siloed data on IPFS, from Textile.

### Other developer tools

* [`js-rle`](https://github.com/willscott/js-rle) - RLE+ Spec. Learn about [`rle-bitset-encoding` in the Filecoin Spec](https://spec.filecoin.io/#section-appendix.data\_structures.rle-bitset-encoding).
* [Truffle for Filecoin](https://www.trufflesuite.com/docs/filecoin/truffle/quickstart) - building apps to preserve files to IPFS and Filecoin.

## Storage providers

### Storage provider reputation systems

* [Filrep.io](https://filrep.io/) - Index of online storage providers and their pricing, ranked by power and reputation score.
* [SpaceGap](https://spacegap.github.io/) - shows storage proof deadlines and sector details for the top 50 storage providers.

### Storage provider tools

* [Bidbot](https://github.com/textileio/bidbot) - A Filecoin Network sidecar to bid in storage deal auctions.
* [Lotus Farcaster](https://github.com/s0nik42/lotus-farcaster) - Prometheus, Grafana and Python monitoring dashboard.

### Storage client and miner programs

* [Destor Network](https://destor.com/destor-network/overview) - a white glove service for storage provider and large institutional client onboarding to Filecoin.
* [Filecoin Plus Verified Data Program](https://www.fil.org/filecoin-plus)
  * Incentivizes valuable data stored on Filecoin with a social trust network for verified data.
  * Clients can apply to allocators to receive DataCap and incentivize storage providers at 10x to their quality-adjusted power, increasing probability of block rewards.

## Ecosystem

* [Filecoin Ecosystem](https://www.fil.org/ecosystem-explorer) - explore the hundreds of projects in the Filecoin ecosystem using Filecoin Foundation's "Ecosystem Explorer."
* [Upcoming Hackathons](https://hackathons.filecoin.io/) - keep a lookout for upcoming hackathons!
* [Events](https://www.fil.org/events) - attend a Filecoin event to engage with other ecosystem members.

### Grants and accelerators

* [**Filecoin Developer Grants**](https://www.fil.org/grants) - ongoing monthly developer grant program to support open source projects and new [Open Grants](https://github.com/filecoin-project/devgrants/blob/master/Program%20Resources/Open%20Grants%20README.md) on Filecoin.
