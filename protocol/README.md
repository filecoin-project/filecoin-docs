---
description: >-
  Learn how Filecoin works: networks, the FIL token, actors, addresses,
  consensus, storage proving, rewards and the FVM. Start here for protocol
  concepts.
---

# Protocol

**The Protocol section explains how the Filecoin network itself works: the chain, its actors and addresses, how storage is proved and rewarded, the FIL token, and the virtual machine that runs smart contracts. It is for developers and operators who want to understand or build on the protocol, not only use it.**

| Group | What you will find | Start here |
| --- | --- | --- |
| [Networks](networks/README.md) | Mainnet, Calibration and local testnets, with RPC endpoints, explorers and chain IDs | [Overview](networks/README.md) |
| [FIL](fil/the-fil-token.md) | The native token, wallets, how to get FIL, and how to transfer it | [The FIL token](fil/the-fil-token.md) |
| [Concepts](concepts/actors.md) | Actors, addresses, blocks and tipsets, consensus, drand, and proofs | [Actors](concepts/actors.md) |
| [Economics](economics/storage-proving.md) | Storage proving, block rewards, slashing and committed capacity | [Storage proving](economics/storage-proving.md) |
| [Manual storage deals](manual-storage-deals.md) | The lifecycle of a deal you negotiate directly with a provider | [Manual storage deals](manual-storage-deals.md) |
| [FVM](fvm/README.md) | The Filecoin Virtual Machine, the EVM runtime, precompiles, gas, Filecoin.sol, and advanced guides | [Overview](fvm/README.md) |

## All Protocol pages

### Networks

| Page | What it covers |
| --- | --- |
| [Networks](networks/README.md) | Compare Filecoin Mainnet, the Calibration testnet and a local testnet, and pick the right network for production, testing or development. |
| [Mainnet](networks/mainnet.md) | Filecoin Mainnet parameters: chain ID 314, RPC endpoints, block explorers, bootstrap peers, sector sizes and expected performance. |
| [Calibration](networks/calibration.md) | Calibration testnet reference: chain ID 314159, RPC endpoints, faucet, explorers, bootstrap peers, genesis and snapshots for testing without real FIL. |
| [Local testnet](networks/local-testnet.md) | Run a private Filecoin network on your machine with Lotus. Step-by-step setup with 2 KiB sectors, a storage provider, a client and funded test wallets. |
| [Legacy networks](networks/legacy-networks.md) | Retired Filecoin networks (Nerpanet, Spacenet, Wallaby) and what to use instead for testing. |

### FIL

| Page | What it covers |
| --- | --- |
| [The FIL token](fil/the-fil-token.md) | What FIL is used for: storage payments, provider rewards, gas on the FVM, collateral and governance. Maximum supply and denominations. |
| [Wallets](fil/wallets.md) | Choose a Filecoin wallet, understand hot and cold storage, and add Filecoin to MetaMask or connect a Ledger hardware wallet. |
| [Get FIL](fil/get-fil.md) | How to buy FIL on an exchange or on-ramp and withdraw it to your wallet without sending to an unsupported address type. |
| [Transfer FIL](fil/transfer-fil.md) | Move FIL between f1, f4 and 0x addresses. Four step-by-step paths for sending from and to native and Ethereum-style addresses. |

### Concepts

| Page | What it covers |
| --- | --- |
| [Actors](concepts/actors.md) | Filecoin actors explained: built-in actors that run the network, user actors (smart contracts), how they hold state and balance, and how they send messages. |
| [Addresses](concepts/addresses.md) | Filecoin address types explained: f0 ID, f1 secp256k1, f2 actor, f3 BLS and f4 delegated addresses, how they convert, and how they map to 0x. |
| [Blocks and tipsets](concepts/blocks-and-tipsets.md) | How Filecoin blocks and tipsets work: what a block contains, how a tipset groups one epoch's blocks, and why the chain is a chain of tipsets. |
| [Consensus](concepts/consensus.md) | Expected Consensus (EC) in Filecoin: how storage providers are elected each epoch, weighted by storage power, to propose a block. |
| [Drand](concepts/drand.md) | How Filecoin uses the drand randomness beacon to elect block producers unpredictably, and what the beacon guarantees. |
| [Proofs](concepts/proofs.md) | A comparison of PoRep, PoSt and PDP: what each proves, when it runs and which kind of storage uses it. |

### Economics

| Page | What it covers |
| --- | --- |
| [Storage proving](economics/storage-proving.md) | How Filecoin proves storage: Proof of Replication (PoRep) once at sealing, then WindowPoSt and WinningPoSt on a schedule, and what each proof checks. |
| [Block rewards](economics/block-rewards.md) | How block rewards work after Solstice: the consensus, service and burn streams, and how storage power wins blocks. |
| [Slashing](economics/slashing.md) | Filecoin slashing and fault fees: what triggers a penalty, how much it costs, and the exceptions that protect honest providers. |
| [Committed capacity](economics/committed-capacity.md) | Committed capacity (CC) sectors hold no customer data but earn the same 10x power as data sectors after Solstice. Why the network needs them and what providers must keep online. |

### Manual storage deals

| Page | What it covers |
| --- | --- |
| [Manual storage deals](manual-storage-deals.md) | Make a storage deal directly with a storage provider and record it onchain with the Market actor. The deal lifecycle and what each side does. |

### FVM

| Page | What it covers |
| --- | --- |
| [Filecoin Virtual Machine](fvm/README.md) | The Filecoin Virtual Machine (FVM) runs smart contracts that can use Filecoin storage. What it is, what runs on it and where to start building. |
| [Quickstart: ERC-20](fvm/erc-20-quickstart.md) | Deploy an ERC-20 token to the Calibration testnet in about 20 minutes with MetaMask and Remix. A beginner tutorial that uses test FIL only. |
| [Filecoin EVM runtime](fvm/filecoin-evm-runtime.md) | The Filecoin EVM runtime (FEVM) runs Solidity contracts on Filecoin. What Ethereum compatibility covers and where Filecoin differs. |
| [Precompiles](fvm/precompiles.md) | Reference for Filecoin and Ethereum precompiles in the FEVM: addresses, inputs, outputs and the Filecoin-specific 0xfe00 set. |
| [Gas](fvm/gas.md) | How gas works on the Filecoin EVM runtime, why opcodes have no fixed cost and how to estimate the fee for a contract call. |
| [Filecoin.sol](fvm/filecoin.sol.md) | Use the Filecoin.sol Solidity library to call built-in actors such as Market and Miner from your contracts. Install, import and example calls. |
| [Contract verification](fvm/contract-verification.md) | Verify a smart contract on Filecoin with Hardhat, Foundry, Blockscout or Filfox so anyone can read and trust your source code. |

### FVM advanced

| Page | What it covers |
| --- | --- |
| [FVM advanced](fvm/advanced/README.md) | Index of tools and services for FVM developers: wrapped FIL, oracles, multicall, multisig, indexers, bridges, automation, relay and databases. |
| [Wrapped FIL](fvm/advanced/wrapped-fil.md) | Wrapped FIL (wFIL) is an ERC-20 version of FIL. Contract addresses, how to wrap and unwrap, and when you need it. |
| [Oracles](fvm/advanced/oracles.md) | Oracle networks with contracts on Filecoin (Pyth, Tellor, eOracle) and their contract addresses. |
| [Multicall](fvm/advanced/multicall.md) | Batch contract reads and writes with Multicall3 on Filecoin. Same address on Mainnet and Calibration, with ethers and cast examples. |
| [Multisig](fvm/advanced/multisig.md) | The native multisig actor and Safe on the FEVM, with Safe contract addresses and troubleshooting. |
| [FEVM indexers](fvm/advanced/fevm-indexers.md) | Index and query Filecoin contract events with Goldsky or The Graph instead of scanning tipsets yourself. |
| [Cross-chain bridges](fvm/advanced/cross-chain-bridges.md) | Bridges with contracts on Filecoin: Axelar and Celer, their token addresses on Mainnet, and wrapped FIL. |
| [Contract automation](fvm/advanced/contract-automation.md) | Trigger smart contracts on a schedule or onchain event with Gelato Web3 Functions on Filecoin. |
| [Relay](fvm/advanced/relay.md) | Send gasless transactions with Gelato Relay using sponsoredCallERC2771, so your users don't need FIL. |

### FVM legacy

| Page | What it covers |
| --- | --- |
| [Legacy FVM](fvm/legacy/README.md) | Archived FVM projects that are not actively maintained in these docs, with links to each. |
| [Decentralized databases](fvm/legacy/decentralized-databases.md) | Store storage-deal metadata in Tableland tables instead of contract state, using SQL from a smart contract. |
| [Interplanetary consensus](fvm/legacy/interplanetary-consensus.md) | What Interplanetary Consensus (IPC) is: a framework for scaling with subnets that have their own consensus, and how it relates to Filecoin. |

### FVM cookbooks

| Page | What it covers |
| --- | --- |
| [Real-world assets reference architecture](fvm/cookbooks/rwa-reference-architecture.md) | Reference architecture for tokenized real-world assets: keep deeds and appraisals on IPFS and Filecoin and reference their CIDs onchain. |

## Start storing data

If you only want to store data, you don't need this section. See [Choose a storage option](../getting-started/choose-a-storage-option.md) and [Store Data](../store-data/overview/filecoin-cloud.md). If you want to run a storage provider, see [Provide Storage](../provide-storage/overview.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol)
