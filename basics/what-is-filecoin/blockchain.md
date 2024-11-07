---
description: >-
  A blockchain is a distributed database shared among nodes in a computer network. This page covers the design and functions of the Filecoin blockchain.
---

# Blockchain

## Tipsets

The Filecoin blockchain consists of a chain of tipsets rather than individual blocks. A tipset is a set of blocks with the same height and parent tipset, allowing multiple storage providers to produce blocks in each epoch to increase network throughput.

Each tipset is assigned a weight, enabling the consensus protocol to guide nodes to build on the heaviest chain. This adds a level of security to the Filecoin network by preventing interference from nodes attempting to produce invalid blocks.

## Actors

An actor in the Filecoin blockchain is similar to a smart contract in the Ethereum Virtual Machine. It functions as an ‘object’ within the Filecoin network, with a state and a set of methods for interaction.

### Built-in actors

Several built-in system actors power the Filecoin network as a decentralized storage network:

- **System actor**: General system actor.
- **Init actor**: Initializes new actors and records the network name.
- **Cron actor**: Scheduler that runs critical functions at every epoch.
- **Account actor**: Manages user accounts (non-singleton).
- **Reward actor**: Manages block rewards and token vesting (singleton).
- **Storage miner actor**: Manages storage mining operations and validates storage proofs.
- **Storage power actor**: Tracks storage power allocation for each provider.
- **Storage market actor**: Manages storage deals.
- **Multisig actor**: Handles Filecoin multi-signature wallet operations.
- **Payment channel actor**: Sets up and settles payment channel funds.
- **Datacap actor**: Manages datacap tokens.
- **Verified registry actor**: Manages verified clients.
- **Ethereum Address Manager (EAM) actor**: Assigns Ethereum-compatible addresses on Filecoin, including EVM smart contract addresses.
- **Ethereum Virtual Machine (EVM) account actor**: Represents an external Ethereum identity backed by a secp256k1 key.

### User-programmable actors

With the maturity of the FVM, developers can write actors and deploy them on the Filecoin network, similar to other blockchains' smart contracts. User-programmable actors can interact with built-in actors via the exported API from built-in actors.

## Distributed randomness

Filecoin uses the [Drand](https://drand.love) protocol as a randomness beacon for leader election in the [expected consensus](blockchain.md#expected-consensus) process. This randomness ensures leader election is secret, fair, and verifiable.

## Nodes

Filecoin nodes are categorized by the services they provide to the storage network, including chain verifier nodes, client nodes, storage provider nodes, and retrieval provider nodes. All participating nodes must provide chain verification services.

Filecoin supports multiple protocol implementations to enhance security and resilience. Active implementations include:

- [Lotus](https://lotus.filecoin.io/)
- [Venus](https://github.com/filecoin-project/venus)
- [Forest](https://github.com/ChainSafe/forest)

## Addresses

In the Filecoin network, addresses identify actors in the Filecoin state. Each address encodes information about the corresponding actor, making it easy to use and resistant to errors. Filecoin has five address types. Mainnet addresses start with `f`, and Testnet addresses start with `t`.

- **`f0/t0`**: ID address for an actor in a human-readable format, such as `f0123261` for a storage provider.
- **`f1/t1`**: secp256k1 wallet address, generated from an encrypted secp256k1 public key.
- **`f2/t2`**: Address assigned to an actor (smart contract) in a way that ensures stability across network forks.
- **`f3/t3`**: BLS wallet address, generated from a BLS public key.
- **`f4/t4`**: Address created and assigned to user-defined actors by customizable "address management" actors. This address can receive funds before an actor is deployed.
- **`f410/t410`**: Address space managed by the Ethereum Address Manager (EAM) actor, allowing Ethereum-compatible addresses to interact seamlessly with the Filecoin network. Ethereum addresses can be cast as `f410/t410` addresses and vice versa, enabling compatibility with existing Ethereum tools.

## Consensus

### Expected consensus

Expected Consensus (EC) is the consensus algorithm underlying Filecoin. EC is a probabilistic, Byzantine fault-tolerant protocol that conducts a leader election among storage providers each epoch to determine which provider submits a block. Similar to proof-of-stake, Filecoin’s leader election relies on proof-of-storage, meaning the probability of being elected depends on how much provable storage power a miner contributes to the network. This storage power is recorded in the storage power table, managed by the Storage Power Actor.

At a high level, the consensus process uses [Drand](https://drand.love) to provide distributed, verifiable randomness, ensuring that leader election is secret, fair, and unbiased. Election participants and their storage power are drawn from the Power Table, which is continuously calculated and maintained by the Storage Power Consensus subsystem. Ultimately, EC gathers all valid blocks produced in an epoch and applies a weighting function to select the heaviest chain, adding blocks accordingly.

### Block production process

The block production process for each epoch is as follows:

- Elect leaders from eligible miners.
- Miners check if they are elected.
- Elected miners generate WinningPoSt using randomness.
- Miners build and propagate a block.
- Verify the winning miner and election.
- Select the heaviest chain to add blocks.

### Finality

EC enforces soft finality, where miners at round `N` reject blocks forking off before round `N - F` (where `F` is set to `900`). This ensures finality without compromising chain availability.

## Proofs

Filecoin operates on proof-of-storage, where miners offer storage space and provide proofs to verify data storage.

### Proof of replication

With proof-of-replication (PoRep), storage providers prove they have created a unique copy of the client’s data for the network.

### Proof of spacetime

Storage providers must continuously prove that they are storing clients' data throughout the entire duration of the storage deal. The proof-of-spacetime (PoSt) process includes two types of challenges:

- **Winning PoSt**: Verifies that a storage provider holds a copy of the data at a specific point in time.
- **Window PoSt**: Confirms that the data has been consistently stored over a defined period.

### Slashing

If storage providers fail to maintain reliable uptime or act maliciously, they face penalties through a process called slashing. Filecoin enforces two types of slashing:

- **Storage Fault Slashing**: Penalizes providers who fail to maintain healthy and reliable storage sectors.
- **Consensus Fault Slashing**: Penalizes providers attempting to disrupt the security or availability of the consensus process.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/basics/what-is-filecoin/blockchain)
