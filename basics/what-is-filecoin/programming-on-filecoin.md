---
description: >-
  Once data is stored, computations can be performed directly on it without needing retrieval. This page covers the basics of programming on Filecoin.
---

# Programming on Filecoin

## Compute-over-Data

Beyond storage and retrieval, data often needs transformation. Compute-over-data protocols enable computations over IPLD, the data layer used by content-addressed systems like Filecoin. Working groups are developing compute solutions for Filecoin data, including large-scale parallel compute (e.g., [Bacalhau](https://www.bacalhau.org/)) and cryptographically verifiable compute (e.g., [Lurk](https://filecoin.io/blog/posts/introducing-lurk-a-programming-language-for-recursive-zk-snarks/)).

For example, Bacalhau provides a platform for public, transparent, and verifiable distributed computation, allowing users to run Docker containers and WebAssembly (Wasm) images as tasks on data stored in InterPlanetary File System (IPFS).

Filecoin is uniquely positioned to support large-scale off-chain computation because storage providers have compute resources, such as GPUs and CPUs, colocated with their data. This setup enables a new paradigm where computations occur directly on the data where it resides, reducing the need to move data to external compute nodes.

## Filecoin Virtual Machine

The Filecoin Virtual Machine (FVM) is a runtime environment for executing smart contracts on the Filecoin network. These smart contracts allow users to run bounded computations and establish rules for storing and accessing data. The FVM ensures that these contracts are executed securely and reliably.

The FVM is designed to support both native Filecoin actors written in languages that compile to Wasm and smart contracts from other runtimes, such as Solidity for the Ethereum Virtual Machine (EVM), Secure EcmaScript (SES), and eBPF. The [reference FVM](https://github.com/filecoin-project/ref-fvm) and SDK are written in Rust, ensuring high performance and security.

Initially, the FVM supports smart contracts written in Solidity, with plans to expand to other languages that compile to Wasm, as outlined in the FVM roadmap.

By enabling compute-over-states on the Filecoin network, the FVM unlocks a wide range of potential use cases. Examples include:

### Data Organizations

FVM enables a new kind of organization centered around data.

#### Data DAOs and Tokenized Datasets

The FVM makes it possible to create and manage decentralized and autonomous organizations (Data DAOs) focused on data curation and preservation. Data DAOs allow groups of individuals or organizations to govern and monetize data access, pooling returns into a shared treasury to fund preservation and growth. These data tokens can also be exchanged among peers or used to request computation services, such as validation, analysis, feature detection, and machine learning.

#### Perpetual Storage

The FVM allows users to store data once and use repair and replication bots to manage ongoing storage deals, ensuring perpetual data storage. Through smart contracts, users can fund a wallet with FIL, allowing storage providers to maintain data storage indefinitely. Repair bots monitor these storage deals and replicate data across providers as needed, offering long-term data permanence.

### Financial Services for Miners

The FVM can facilitate unique financial services tailored for storage providers (SPs) in the Filecoin ecosystem.

#### Lending and Staking Protocols

Users can lend Filecoin to storage providers to be used as storage collateral, earning interest in return. Loans may be undercollateralized based on SP performance history, with reputation scores generated from on-chain data. Loans can also be automatically repaid to investors using a multisig wallet, which includes lenders and a third-party arbitrator. New FVM-enabled smart contracts create yield opportunities for FIL holders while supporting the growth of storage services on the network.

#### Insurance

SPs may require financial products to protect against risks in providing storage solutions. Attributes such as payment history, operational length, and availability can be used to underwrite insurance policies, shielding SPs from financial impacts due to storage faults or token price fluctuations.

### Core Chain Infrastructure

The FVM is expected to achieve feature parity with other persistent EVM chains, supporting critical infrastructure for decentralized exchanges and token bridges.

#### Decentralized Exchanges

To facilitate on-chain token exchange, the FVM may support decentralized exchanges like Uniswap or Sushi, or implement decentralized order books similar to Serum on Solana.

#### Token Bridges

Although not an immediate focus, token bridges will eventually connect Filecoin to EVM, Move, and Cosmos chains, enabling cross-chain wrapped tokens. While Filecoin currently offers unique value without needing to bootstrap liquidity from other chains, long-term integration with other blockchains is anticipated.

In addition to these, the FVM could support various other use cases, such as data access control ([Medusa](https://cryptonet.org/projects/project-medusa-scalable-threshold-network-on-chain)), trustless reputation systems, replication workers, storage bounties, and L2 networks. For more details on potential use cases, see our [Request for Startups](https://protocollabs.notion.site/Request-for-Startups-FVM-edition-8cd3e76982d14e29b33335ca458fb087) post.

If you are interested in building these use cases, the following solution blueprints may be helpful:

- [DataDAO Solution Blueprint](https://docs.google.com/document/d/1OYDh_gs7mAk2M_O9m-2KedQA7MNo6ysIzH6eaQZxMOk/edit?pli=1)
- [Perpetual Storage Solution Blueprint](https://docs.google.com/document/d/19Kck1PiGGrUKyd6XBYj6NtsC5NiCjndUSsv0OFA1Lv0/edit)
- [Lending Pool Cookbook](https://docs.google.com/document/d/18in74On0bY7KyEsPgItvNvfUUPcPtHjNQtVfLdJUyzM/edit)

### Filecoin EVM

The Filecoin EVM (FEVM) is an Ethereum Virtual Machine (EVM) runtime built on top of the FVM. It allows developers to port existing EVM-based smart contracts directly onto Filecoin. The FEVM emulates EVM bytecode at a low level, supporting contracts written in Solidity, Vyper, and Yul. The EVM runtime is based on open-source libraries, including [SputnikVM](https://github.com/rust-blockchain/evm) and Revm. More details can be found in the [EVM <> FVM mapping specification](https://github.com/filecoin-project/fvm-project/blob/main/04-evm-mapping.md).

Since Filecoin nodes support the Ethereum JSON-RPC API, FEVM is compatible with existing EVM development tools, such as Hardhat, Brownie, and MetaMask. Most smart contracts deployed to Filecoin require minimal adjustments, if any. For example, new ERC-20 tokens can be launched on Filecoin or bridged to other chains.

Developers can choose between deploying actors on the FEVM or native FVM: for optimal performance, actors should be written in languages that compile to Wasm and deployed to the native FVM. For familiarity with Solidity and EVM tools, the FEVM is a convenient alternative.

In summary, the FEVM provides a straightforward path for Web3 developers to begin building on Filecoin using familiar tools and languages, while gaining native access to Filecoin storage deals.

The primary difference between FEVM and EVM contracts is that FEVM contracts can interact directly with Filecoin-specific actors, such as miner actors, which are inaccessible to Ethereum contracts. To enable seamless integration, a Filecoin-Solidity API library has been developed to facilitate interactions with Filecoin-specific actors and syscalls.

For example FEVM contracts, see the available [example contracts here](https://github.com/lotus-web3/client-contract).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/basics/what-is-filecoin/programming-on-filecoin)
