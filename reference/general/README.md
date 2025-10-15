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
* Other implementations:
  * [Venus](https://github.com/filecoin-project/venus) - also in GoLang ([Venus documentation](https://venus.filecoin.io/)).
  * [Forest](https://github.com/ChainSafe/forest) - Rust.
* Lotus Docker Hub Images (unofficial):
  * [`glif/lotus`](https://github.com/glifio/filecoin-docker)

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
* [Sentinel Project](https://lilium.sh/) - Filecoin Network Monitoring and Analysis System
* [DataCapStats](https://datacapstats.io/) - data providing insight on the Filecoin Plus program.

### Storage/Deals status

* [Starboard](https://dashboard.starboard.ventures/capacity-services) - Filecoin storage provider analytics
* [`filecoin.tools`](https://filecoin.tools) - check your CID’s storage deal status. Also provides an API - check [`filecoin.tools/docs`](https://filecoin.tools/docs) for reference
* [Deals list at `Filfox.io`](https://filfox.info/en/deal)

## Storage Onramps

Web-based applications that store your data on Filecoin. No command-line or coding experience required.

* [Lighthouse](https://lighthouse.storage/) "offers permanent, decentralized storage powered by Filecoin. Secure, scalable, and ideal for individuals, developers, and enterprises."
* [Storacha](https://storacha.network/) is an open hot storage network scales IPFS and Filecoin. Upload any data and Storacha will ensure it ends up on a decentralized set of IPFS and Filecoin storage providers. There Storacha [docs](https://docs.storacha.network/) detail the JavaScript and Go API libraries, and there is a no-code web uploader available as well.
* [Singularity](https://singularity.storage/) "facilitates onboarding of large quantaties of data (PB-scale) to the Filecoin network in an efficient, secure, and flexible way."
* [CID Gravity](https://www.cidgravity.com/) is a "seamless gateway to the decentralized web", allowing you to drag and drop files through an easy-to-use UI that uploads files to Filecoin and IPFS.  
* [Ramo](https://www.ramo.io/) is "a network coordinating people, hardware and capital to build a more open and resilient internet infrastructure for everyone."  
* [Starling Framework for Data Integrity](https://www.starlinglab.org/)
  * to securely capture, store and verify human history
  * learn more at [`starlinglab.org/78days`](https://www.starlinglab.org/78days/) or the [Filecoin blog interview](https://filecoin.io/blog/starling-framework/)

## APIs & Developer tools

Developer tools, API clients & storage services that developers can use to build on Filecoin.

### Storage APIs for app builders

* [Lighthouse](https://www.lighthouse.storage/) - Lighthouse offers a suite of tools to enable builders to store data on Filecoin when building apps.
* [Fleek’s tools](https://fleek.xyz/) - provides access to Fleek’s hosted services using IPFS, Filecoin, Ethereum, etc.
* [Akave](https://www.akave.ai/) is "revolutionizing data management with a decentralized, modular solution that combines the robust storage of Filecoin with cutting-edge encryption and easy-to-use interfaces."  

### JavaScript tools

* [iso-filecoin](https://github.com/hugomrdias/filecoin/tree/main/packages/iso-filecoin) - Filecoin Javascript Standard Library. Used by the [Metamask Filecoin Wallet](https://github.com/filecoin-project/filsnap) and [Ledger Live Filecoin app](https://www.ledger.com/coin/wallet/filecoin).
* [iso-filecoin-react](https://github.com/hugomrdias/filecoin/tree/main/packages/iso-filecoin-react) - React hooks and context to easily integrate Filecoin wallet interactions into your React applications. It works seamlessly with the wallet adapters from iso-filecoin-wallets.

Check out the [documentation website](https://filecoin.hugomrdias.dev/) for more information.

### Wallet-related tools

* [Metamask Filecoin Wallet](https://github.com/filecoin-project/filsnap) - A MetaMask [Snap](https://snaps.metamask.io/snap/npm/filsnap/) to add Filecoin support to the MetaMask extension. Check out [filsnap.dev](https://filsnap.dev/) built with the [iso-filecoin](https://github.com/hugomrdias/filecoin/tree/main/packages/iso-filecoin) and [filsnap](https://github.com/filecoin-project/filsnap) libraries.
* [iso-filecoin-wallets](https://github.com/hugomrdias/filecoin/tree/main/packages/iso-filecoin-wallets) - Filecoin wallet adapters to interact with different types of Filecoin wallets through a common interface. Supports Ledger, MetaMask Filecoin Wallet, and more.

### Node Infrastructure & APIs

> NOTE: making deep calls into the chain’s history may take some time to return and it may be more efficient to use a chain database (e.g. used by block explorers) that stores the chain’s history and is optimized for queries.

* [GLIF nodes](https://lotus.filecoin.io/lotus/developers/glif-nodes/) - A hosted endpoint to Filecoin mainnet and testnet. Note: as of Q1 2023, Infura no longer supports Filecoin.
  * The GLIF endpoint supports read-only calls and `MPoolPush()` for sending signed transactions to the network (which can be signed using the [Message signing tools](https://docs.filecoin.io/reference/general/overview/#message-signing-tools)).
* [**Lotus JSON-RPC API**](https://lotus.filecoin.io/lotus/get-started/what-is-lotus/) - Lotus offers the full feature set of its capabilities through API.
  * [lotus API Postman sample](https://documenter.getpostman.com/view/4872192/SWLh5mUd?version=latest) - (shows sample wallet calls only)

**Scalable endpoint hosting**

For running a node cluster of load balanced Lotus JSON RPC API endpoints.

* [Filecoin-chart](https://github.com/glifio/filecoin-chart) (k8 cluster) - Helm chart for hosting Lotus Node clients.

**Filecoin API clients**

* [iso-filecoin](https://github.com/hugomrdias/filecoin/tree/main/packages/iso-filecoin) - Filecoin Javascript Standard Library includes an API client for the Lotus JSON-RPC API.

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

* [Lotus Farcaster](https://github.com/s0nik42/lotus-farcaster) - Prometheus, Grafana and Python monitoring dashboard.

### Storage client and miner programs

* [Filecoin Plus Verified Data Program](https://www.fil.org/filecoin-plus)
  * Incentivizes valuable data stored on Filecoin with a social trust network for verified data.
  * Clients can apply to allocators to receive DataCap and incentivize storage providers at 10x to their quality-adjusted power, increasing probability of block rewards.

## Ecosystem

* [Filecoin Ecosystem](https://www.fil.org/ecosystem-explorer) - explore the hundreds of projects in the Filecoin ecosystem using Filecoin Foundation's "Ecosystem Explorer."
* [Upcoming Hackathons](https://hackathons.filecoin.io/) - keep a lookout for upcoming hackathons!
* [Events](https://www.fil.org/events) - attend a Filecoin event to engage with other ecosystem members.

### Grants and accelerators

* [**Filecoin Developer Grants**](https://www.fil.org/grants) - ongoing monthly developer grant program to support open source projects and new [Open Grants](https://github.com/filecoin-project/devgrants/blob/master/Program%20Resources/Open%20Grants%20README.md) on Filecoin.



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/reference/general)
