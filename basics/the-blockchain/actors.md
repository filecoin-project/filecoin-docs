---
description: >-
  Actors are smart contracts that run on the Filecoin Virtual Machine (FVM). They manage, query, and update the state of the Filecoin network.
---

# Actors

For those familiar with the Ethereum Virtual Machine (EVM), _actors_ work similarly to [smart contracts](../../smart-contracts/fundamentals/). In the Filecoin network, there are two types of actors:

- [_Built-in actors_](actors.md#built-in-actors): Hardcoded programs written ahead of time by network engineers that manage and orchestrate key subprocesses and subsystems in the Filecoin network.
- [_User actors_](actors.md#user-actors-smart-contracts): Code implemented by **any developer** that interacts with the FVM.

## Built-in actors

Built-in actors manage and update the _global state_ of the Filecoin network. The _global state_ at a given epoch is the set of blocks agreed upon via network consensus. This global state is represented as a _state tree_, mapping an actor to an _actor state_. The _actor state_ describes conditions such as the actor's FIL balance and nonce. In Filecoin, actors trigger _state transitions_ by sending _messages_. Each block in the chain represents a **proposed** global state, and the block selected by network consensus becomes the **new** global state. Each block contains a series of messages and a checkpoint of the current global state after applying those messages. The FVM executes all actor code.

### Example usage of actors

A basic example of how actors are used in Filecoin is the process by which storage providers prove storage and are rewarded:

1. The [`StorageMinerActor`](actors.md#storagemineractor) processes proof of storage submitted by a storage provider.
2. If valid, the storage provider is awarded storage power.
3. The [`StoragePowerActor`](actors.md#storagepoweractor) records this power in the system.
4. During block validation, the state recorded by the `StoragePowerActor` is checked.
5. Using this state, the consensus mechanism rewards storage providers with the most power by awarding blocks, and the [`RewardActor`](actors.md#rewardactor) sends FIL as a reward.

### Blocks

Each block in the Filecoin chain contains:

- Inline data such as the current block height.
- A pointer to the current state tree.
- A pointer to the set of messages that, when applied to the network, generated the current state tree.

### State tree

The _state tree_ is a [Merkle Directed Acyclic Graph (Merkle DAG)](../../reference/general/glossary.md#merkle-directed-acyclic-graph). It maps the relationships between actors and their states. Nodes in the state tree store:

- Information about actors, including FIL balances and nonces.
- Links (CIDs) pointing to actor state data.

The state tree is updated by messages, which trigger state transitions and ensure it reflects the latest state of the network.

### Messages

Messages are the instructions actors use to interact with each other. These are also represented in a Merkle DAG. Nodes in the messages may contain:

- The actor the message was sent to.
- The actor sending the message.
- The method to call on the receiving actor.
- A cryptographic signature for verification.
- The amount of FIL transferred between actors.

### Actor code

Actor code defines what an actor does and is separated into methods. Messages specify which methods to call and any input parameters. Actor code interacts with a _runtime_ object, which provides network information like the current epoch or cryptographic validations. Actors must pay a _gas fee_ (in FIL) for executing operations. Each actor has:

- A balance of FIL.
- A pointer to its state.
- Code defining its type and behavior.
- A nonce tracking the number of messages it has sent.

### Types of built-in actors

The 11 types of built-in actors are:

- [CronActor](actors.md#cronactor)
- [InitActor](actors.md#initactor)
- [AccountActor](actors.md#accountactor)
- [RewardActor](actors.md#rewardactor)
- [StorageMarketActor](actors.md#storagemarketactor)
- [StorageMinerActor](actors.md#storagemineractor)
- [MultisigActor](actors.md#multisigactor)
- [PaymentChannelActor](actors.md#paymentchannelactor)
- [StoragePowerActor](actors.md#storagepoweractor)
- [VerifiedRegistryActor](actors.md#verifiedregistryactor)
- [SystemActor](actors.md#systemactor)

#### CronActor

The `CronActor` sends messages to the `StoragePowerActor` and `StorageMarketActor` at the end of each epoch. These messages ensure internal states are updated and deferred events are processed. This actor is instantiated in the genesis block and interacts directly with the FVM.

#### InitActor

The `InitActor` initializes new actors on the Filecoin network. It maps public keys and temporary actor addresses to canonical ID addresses. This actor is instantiated in the genesis block and interacts directly with the FVM.

#### AccountActor

The `AccountActor` manages user accounts by updating the state tree with new actor addresses. It interacts directly with the FVM.

#### RewardActor

The `RewardActor` distributes rewards to miner actors based on their contributions. Rewards are locked for vesting, and values are updated at the end of each epoch. This actor interacts directly with the FVM.

#### StorageMarketActor

The `StorageMarketActor` processes and manages on-chain deals. It tracks storage deals and the locked balances of both clients and storage providers. When a deal is posted, it ensures both parties have sufficient collateral before including the deal on-chain. Collateral is returned when deals are successfully completed. This actor does not interact directly with the FVM.

#### StorageMinerActor

The `StorageMinerActor` manages storage mining operations and proof collection. It ensures miners can effectively commit storage and handles:

- Committing new storage.
- Continuously proving storage.
- Declaring and recovering from storage faults.

This actor does not directly interact with the FVM.

#### MultisigActor

The `MultisigActor` facilitates Filecoin wallet operations and transactions involving up to 256 signers. This actor does not directly interact with the FVM.

#### PaymentChannelActor

The `PaymentChannelActor` enables off-chain microtransactions for Filecoin dApps. It manages uni-directional payment channels, allowing transactions to be reconciled on-chain with minimal overhead. This actor does not directly interact with the FVM.

#### StoragePowerActor

The `StoragePowerActor` tracks the storage power of miners and determines block rewards based on proportional allocations. It creates `StorageMinerActor` instances and does not directly interact with the FVM.

#### VerifiedRegistryActor

The `VerifiedRegistryActor` manages Filecoin Plus clients and DataCap allocations, including adding verified clients and managing claims. This actor does not directly interact with the FVM.

#### SystemActor

The `SystemActor` performs low-level operations essential for the network. It is instantiated in the genesis block and interacts directly with the FVM. For more details, refer to the [source code](https://github.com/filecoin-project/specs-actors/blob/master/actors/builtin/system/system_actor.go).

## User actors (smart contracts)

_User actors_ (or _smart contracts_) are custom programs created by developers to define new rules and interactions within the Filecoin network. They can currently be written in Solidity, with future support planned for languages compiling to WebAssembly (Wasm). User actors can:

- Define rules for storing and accessing data.
- Automate workflows for data management.
- Manage transactions between users and services.

The FVM ensures these custom actors execute securely. Developers can use them to build scalable applications leveraging Filecoin’s decentralized storage.

To learn more, see [writing smart contracts](../../smart-contracts/fundamentals/).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/basics/the-blockchain/actors)
