---
title: Reference
description: Helpful reference materials for the Filecoin specification, implementations, and ecosystem.
---

# Reference

This section contains links and reference materials for Filecoin.

## About the protocol

### Filecoin specification

View the [technical specification](https://github.com/filecoin-project/specs) for the Filecoin protocol and its associated subsystems.

### Filecoin's economy

[Engineering Filecoin's Economy](https://filecoin.io/2020-engineering-filecoins-economy-en.pdf) - discusses the design of Filecoin's economic incentives.

### Filecoin Plus for verified data

The [Filecoin Plus Client Onboarding](https://github.com/filecoin-project/filecoin-plus-client-onboarding) Github repo describes how to participate in the Fil+ program. See the [Engineering Filecoin's Economy](https://filecoin.io/2020-engineering-filecoins-economy-en.pdf) report for additional info about the Fil+ verified data program that earns 10x in miner rewards.

### Videos

Visit the [Filecoin Youtube channel](https://www.youtube.com/channel/UCPyYmtJYQwxM-EUyRUTp5DA) to view past presentations from various Filecoin workshops, conference talks, and Filecoin meetups.

## Filecoin community resources and tools

Resources, tooling, and other community projects in the ecosystem to aid in installing, using & building on Filecoin.

### Join the network

- [Mainnet status](https://filecoin.statuspage.io/)
- [Filfox block explorer](https://filfox.io/)
- [network.filecoin.io](https://network.filecoin.io) - overview of all Filecoin networks

### Node implementations

- [Lotus](https://github.com/filecoin-project/lotus) - _**Recommended**_ - most advanced implementation and [security audited](https://spec.filecoin.io/#section-intro.implementations-status), in GoLang
  - Other implementations in progress:
    - [Fuhon](https://github.com/filecoin-project/cpp-filecoin) - C++
    - [Forest](https://github.com/ChainSafe/forest) - Rust
    - [Venus](https://github.com/filecoin-project/venus) (formerly go-filecoin) - also in GoLang ([Venus Docs](https://venus.filecoin.io/))

### Devnets and testnets

- [**network.filecoin.io**](https://network.filecoin.io)
  - lists all current Filecoin networks, including devnets for testing
  - **Calibration** (currently disabled)
    - largest testnet
    - See [#fil-net-calibration-announce](https://filecoinproject.slack.com/archives/C01C5PT7ETC) for announcements and [#fil-net-calibration-discuss](https://filecoinproject.slack.com/archives/C01D42NNLMS) for questions and discussion in [Filecoin Slack](https://filecoin.io/slack)
  - **Nerpa**
    - a devnet for developers with smaller 512MB sectors that can seal in ~25 min
    - See [#fil-net-nerpa-discuss](https://filecoinproject.slack.com/archives/C016VJSJNTH) in [Filecoin Slack](https://filecoin.io/slack)

### Local devnets on your local machine

- See [**Run a Local Devnet** in Filecoin Docs](https://docs.filecoin.io/build/local-devnet/)
- [Textile's Local Devnet with mocked sectorbuilder](https://docs.textile.io/powergate/localnet/#localnet-with-lotus-client)
  - for faster storage app prototyping, it has a mocked sector builder for faster API usage and deal confirmation

### Containers and virtualization

- Unofficial Docker Hub images:
  - https://hub.docker.com/r/textile/lotus
  - https://github.com/openworklabs/filecoin-docker
  - https://hub.docker.com/r/ognots/lotus

### Scalable endpoint hosting scripts

- For running a node cluster of load balanced Lotus JSON RPC API endpoints
- https://github.com/openworklabs/filecoin-chart (k8 cluster)
- https://github.com/openworklabs/filecoin-docker

### Filecoin RPC proxy cache

- [filecoin-rpc-proxy](https://github.com/protofire/filecoin-rpc-proxy) - cache any [JSON RPC API](https://docs.filecoin.io/reference/lotus-api/) request to reduce request load

## Network status

Tools and resources to check status & details for the network & chain.

### Block explorers

- [Filfox](https://filfox.io/)
- [Filscan.io](https://filscan.io)
- [Filscout.io](https://filscout.io)
- [1475 Explorer](https://1475ipfs.com/#/blockBrowser)

### Network stats

- [Network Stats Dashboard](https://stats.testnet.filecoin.io/) - Grafana

### Testnet explorers

- [Calibration Testnet Filscan explorer](https://calibration.filscan.io/) - (currently Calibration is disabled)

### Chain data and monitoring

- [SpaceGap](https://spacegap.github.io/)
  - shows storage proof deadlines and sector details for the top 50 miners
- [Filstats.io](https://filstats.io) - node telemetry monitoring - add your node!
- [Sentinel Project](https://github.com/filecoin-project/sentinel) & [Sentinel-Visor](https://github.com/filecoin-project/sentinel-visor) - comprehensive historical chain data & monitoring infrastructure
- [Slate-Sentinel API](https://sentinel.slate.host/) - API to a subset of Sentinel data
- [GraphQL Explorer for Filecoin's Chain](https://node.glif.io/service/statediff/graphql.html) - see the Docs tab for query types
- [Statediff](https://node.glif.io/space07/statediff/rpc/)
  - Uses [filecoin-project/statediff](https://github.com/filecoin-project/statediff) to explore and compare changes to Filecoin chain state
  - See [keyko-io/filecoin-verifier-tools](https://github.com/keyko-io/filecoin-verifier-tools) for a JS tool to walk the state HAMT

### Chain ingest tools

- [Sentinel-Visor](https://github.com/filecoin-project/sentinel-visor) - has custom hooks into the VM of Lotus for parsing chain data
- [Filecoin ChainInfo npm library](https://www.npmjs.com/package/filecoin-chaininfo) - deals only with data extraction and it can be used by any application

### Storage status

- [**Filecoin Storage Stats**](https://storage.filecoin.io/)
- [CID Checker at filecoin.tools](https://filecoin.tools)
  - Shows information about stored CIDs
- [Filstats.com](https://filstats.com/) - general statistics about deals
- [Deals list at filfox.io](https://filfox.info/en/deal)

### Core dev calls

- https://github.com/filecoin-project/tpm - core dev meeting agendas, notes and recordings

## APIs and developer tools

### API clients

- [filecoin.js](https://github.com/filecoin-shipyard/filecoin.js) - active higher-level JS library for Lotus JSON RPC API with many convenience features ([Docs](https://filecoin-shipyard.github.io/filecoin.js/))
- [js-lotus-client](https://github.com/filecoin-shipyard/js-lotus-client) - lower-level JS library for basic parsing of the Lotus JSON RPC API
- [lotus-json-rpc-provider](https://www.npmjs.com/package/@coinsummer/lotus-jsonrpc-provider) - wraps the Lotus API in TypeScript
- [lotus JSON RPC Postman sample](https://documenter.getpostman.com/view/4872192/SWLh5mUd?version=latest) - shows wallet calls only
- [filecoin-ruby](https://github.com/subvisual/filecoin-ruby) - older interface to Lotus Filecoin in Ruby

### Wallet-related

- [filecoin-signing-tools](https://github.com/filecoin-project/filecoin-docs/wiki#remote-signing-tools) - for signing Filecoin messages without a full node, has an npm and version for use in browsers, see below
- [Glif web wallet](https://github.com/openworklabs/filecoin-web-wallet) - a good JS example of using `filecoin-signing-tools` and Ledger integration, live Filecoin wallet at [Glif.io](https://glif.io)

### Additional tools

- [**Powergate**](https://docs.textile.io/powergate/) - leverages IPFS alongside Filecoin for hot storage and retrieval, storage deal helpers, and many other convenience features for developers - **_recommended_**

### Developer tools

- [js-rle](https://github.com/willscott/js-rle) - RLE+ Spec. Learn about [rle-bitset-encoding in the Filecoin Spec](https://spec.filecoin.io/#section-appendix.data_structures.rle-bitset-encoding)

### REST clients

- [Starling Storage REST API + CLI](https://github.com/smalldata-industries/starling-api) - RESTful API + Node.js CLI that simplifies storing data for preservation use cases. Visit [Starlingstorage.io](https://starlingstorage.io/) to learn more.

### Storage client applications

- [**Slate**](https://slate.host/) - **_recommended_**
  - a storage application on Filecoin to collect, organize, and link files together and share them, listed on [Product Hunt here](https://www.producthunt.com/posts/slate-f195dcdd-18e2-4dc2-8c70-45208ccbb862)

### Ecosystem projects

- [Filecoin Ecosystem Map](http://ipfs.io/ipfs/QmQhjHgWzaW7obwDzBnTErQvAJY6cbKu5WUKXBzYPjuxto)
- [Awesome Filecoin](https://www.awesomefilecoin.com/) - awesome projects on Filecoin
- [**Filecoin Shipyard**](https://github.com/filecoin-shipyard) - a collection of open source community projects on Filecoin

### Grant programs and accelerators

- [**Filecoin Dev Grants**](https://filecoin.io/grants) - on-going quarterly dev grant program to support open source projects + new RFPs on Filecoin
  - now funded by the [Filecoin Foundation](https://fil.org)
- [Huobi-Filecoin Incubation Center](https://filecoin.io/blog/huobi-launches-filecoin-incubation-center/)
- [Filecoin Frontier Accelerator with LongHash](https://filecoin.io/blog/filecoin-frontier-accelerator/) - closed Nov 15, 2020
- [Filecoin Launchpad Accelerator](https://consensys.net/blog/press-release/filecoin-launchpad-accelerator-powered-by-tachyon/) - Fall 2020
- [Apollo - Gitcoin x Filecoin](https://gitcoin.co/blog/apollo/#:~:text=APOLLO%20will%20run%20from%20August,using%20Filecoin%20and%20Web3%20ecosystem) - Summer 2020
- [Gitcoin Grants Round 9](https://gitcoin.co/grants/) - upcoming grants round and online hackathon in mid-March 2021

Keep a lookout for other upcoming hackathons. Previous ones involving Filecoin included [EthOnline](https://ethonline.org/), [HackFS](https://hackfs.com/), [Spark University Hackathon](https://filecoin.io/blog/spark-university-hackathon/)...

## Mining

### Dashboards and reputation systems

- [SpaceGap](https://spacegap.github.io/)
  - shows storage proof deadlines and sector details for the top 50 miners
- [Codefi Miner Reputation System](https://www.storage.codefi.network/) - miner info, asking price, deals they've completed
- [FIL Swan](https://www.filswan.com/) - miner info, prices, offline deal acceptance

### Miner tools

- [Mining Benchmarks](https://filecoin-benchmarks.on.fleek.co/)
- [Lotus Farcaster](https://github.com/s0nik42/lotus-farcaster) - _**recommended**_ Prometheus, Grafana and Python monitoring dashboard
- [Filgas.io](https://fgas.io/) - real-time Filecoin mining gas queries
- [Gasoline](https://nikkolasg.github.io/gasoline/)
- [Hactar](https://www.hactar.app/) - analytics for your Filecoin miner node

### Storage client and miner programs

- [Slingshot Competition](https://slingshot.filecoin.io/) - currently in Phase 2 to store [these curated datasets](https://github.com/filecoin-project/slingshot/blob/master/datasets.md)
- [Filecoin Plus Verified Data Program](https://github.com/filecoin-project/filecoin-plus-client-onboarding) - to incentivize useful storage on Filecoin with a social trust network for verified data. Clients can apply to Notaries to receive DataCap, which can be used to incentivize Miners at 10x to their quality-adjusted power - increasing their probability of winning block rewards.
- [Filecoin Discover Store](https://store.filecoin-discover.com/)
  - where Storage miners can buy hard drives with offline data filled with important datasets - ([blog post](https://filecoin.io/blog/offline-data-transfer-for-large-scale-data/))
- [Miner X Fellowship](https://docs.google.com/document/d/1iqZ2xV5tlOJMrPQAg7V1XJQZz6CF1LYDHkwRGtoV5-g/edit) - to support and learn from small-to-medium miner experience

## Wallets

Tools for sending and receiving FIL tokens:

Wallets that have conducted third-party audits of their open-source code by a reputable security auditor are **recommended** below.

- [**Ledger HW wallet** in Filecoin Docs](https://docs.filecoin.io/get-started/lotus/ledger/#setup-your-ledger-device) - **recommended** - the Ledger Live UI does not have Filecoin support yet, but Ledger HW can be used with the Glif.io web wallet or a Lotus node.
- [Glif web wallet](https://github.com/openworklabs/filecoin-web-wallet) - **recommended** - security-audited web wallet that supports sending & receiving FIL, also integrated with Ledger HW (uses the audited [filecoin-signing-tools library](https://github.com/Zondax/filecoin-signing-tools) below)
- [FilSnap MetaMask Plugin](https://filsnap.netlify.app/) - MetaMask has a new plugin system called [Snaps](https://github.com/MetaMask/metamask-snaps-beta/wiki) currently still in beta that developers can try out
- A [Filecoin light wallet example is in the Filecoin.js library](https://github.com/filecoin-shipyard/filecoin.js)
- [Filecoin Rosetta proxy](https://github.com/Zondax/rosetta-filecoin) - [Rosetta](https://www.rosetta-api.org/) is an API standard created by Coinbase for a consistent interface to many chains for wallets and exchanges

### Other wallets

We do not know if the wallets below have been security audited, so please verify these for security and use them at your discretion.

- [TrustWallet](https://trustwallet.com/) - [open source](https://github.com/trustwallet/wallet-core) on Github, official mobile wallet of Binance
- [ImToken](https://token.im/)
- [MathWallet](https://mathwallet.org/)
- [Cobo](https://cobo.com/)
- [FilWallet.ai](https://filwallet.ai/) - by the team behind Filscan.io

### Filecoin signing tools

- [Filecoin Signing Tools](https://github.com/Zondax/filecoin-signing-tools) - a pure JS or Rust/WASM/JSONRPC library for creating signed messages apart from a Filecoin node
  - Also available on npm at [@zondax/filecoin-signing-tools](https://www.npmjs.com/package/@zondax/filecoin-signing-tools)
  - Supports [Ledger hardware device integration](https://github.com/Zondax/ledger-filecoin/) and payment channels ([paych demo example](https://github.com/mgoelzer/zondax-pch-demo)). Multisig support will be added soon.
