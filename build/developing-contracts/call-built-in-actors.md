---
description: >-
  Filecoin built-in actors can be invoked in a smart contract using either the Protocol API or the Filecoin.sol library. This page provides instructions on how to use each method.
---

# Call built-in actors

{% hint style="info" %}
For conceptual information on built-in actors, including their purposes, how they work and available types, see the [conceptual guide](../../reference/built-in-actors/)
{% endhint %}

Built-in actors can be invoked using the Protocol _JSON-RPC_ API or the Filecoin.sol API.

## APIs compared

The Protocol _JSON-RPC_ API:

* Is maintained by Protocol Labs (PL).
* Uses JSON-RPC, a standardized way to encode remote procedure calls in JSON that can be transported using HTTP or WebSockets.
* Provides a language agnostic interface for Filecoin functionality.
* Allows applications to access Filecoin functionality using HTTP or WebSockets calls to a Filecoin node, like the Lotus daemon.
* Requires authentication for some API calls.
* Serves as the foundation for language-specific libraries (some of which are maintained by organizations other than PL) such as [filecoin.js](https://filecoin-shipyard.github.io/filecoin.js/).

The Filecoin.sol API:

* Supports [_some but not all_ of the built-in actors and their methods](call-built-in-actors.md#available-actors-and-methods).

## Protocol API

Applications and off-chain services can access built-in actors and methods using the Filecoin JSON-RPC API exposed by nodes such as Lotus. Smart contracts should use Filecoin.sol or the actor precompiles instead. Links to the reference guides for each of the available actor methods are listed below:

* [Account actor](call-built-in-actors.md#account)
* [Datacap](call-built-in-actors.md#datacap)
* [Miner](call-built-in-actors.md#miner)
* [Multisig](call-built-in-actors.md#multisig)
* [Storage market actor](call-built-in-actors.md#storage-market)
* [Storage power actor](call-built-in-actors.md#storage-power)
* [Verified registry actor](call-built-in-actors.md#verified-registry)

## Filecoin.sol

Smart contracts can access built-in actor methods with the `filecoin.sol` library, a set of Solidity libraries that allow Solidity smart contracts to call methods of Filecoin built-in actors. The maintained npm package is `filecoin-solidity-api`, and its current import paths use `contracts/v0.8`. This section contains information on the actors and methods available from `filecoin.sol`, along with installation instructions and references for examples of smart contracts that call built-in actor methods.

To invoke built-in actor methods using `filecoin.sol`, follow these steps:

1. Review the [available actors and methods](#available-actors-and-methods).
2. [Import `filecoin.sol`](#import-filecoinsol).
3. [Call a built-in actor](#call-a-built-in-actor).

### Available actors and methods

The majority of the Account, DataCap, Storage Market, Miner, Storage Owner and Verified Registry actor methods are supported and are listed below. **Cron, Payment Channel, Reward and System actor methods are currently not supported.**

#### **Account**

| Method                | Supported? |
| --------------------- | ---------- |
| AuthenticateMessage   | ✔️         |
| Constructor           | ✖️         |
| PubkeyAddress         | ✖️         |
| UniversalReceiverHook | ✔️         |

#### **DataCap**

| Method            | Supported? |
| ----------------- | ---------- |
| Allowance         | ✔️         |
| BalanceOf         | ✔️         |
| Burn              | ✔️         |
| BurnFrom          | ✔️         |
| Constructor       | ✖️         |
| DecreaseAllowance | ✔️         |
| Destroy           | ✖️         |
| IncreaseAllowance | ✔️         |
| Mint              | ✖️         |
| Name              | ✔️         |
| RevokeAllowance   | ✔️         |
| Symbol            | ✔️         |
| TotalSupply       | ✔️         |
| Transfer          | ✔️         |
| TransferFrom      | ✔️         |

#### **Miner**

| Method                    | Supported? |
| ------------------------- | ---------- |
| ApplyRewards              | ✖️         |
| ChangeBeneficiary         | ✔️         |
| ChangeMultiaddrs          | ✔️         |
| ChangeOwnerAddress        | ✔️         |
| ChangePeerID              | ✔️         |
| ChangeWorkerAddress       | ✔️         |
| CheckSectorProven         | ✖️         |
| CompactPartitions         | ✖️         |
| CompactSectorNumbers      | ✖️         |
| ConfirmSectorProofsValid  | ✖️         |
| ConfirmUpdateWorkerKey    | ✖️         |
| Constructor               | ✖️         |
| ControlAddresses          | ✖️         |
| DeclareFaults             | ✖️         |
| DeclareFaultsRecovered    | ✖️         |
| DisputeWindowedPoSt       | ✖️         |
| ExtendSectorExpiration    | ✖️         |
| ExtendSectorExpiration2   | ✖️         |
| GetAvailableBalance       | ✔️         |
| GetBeneficiary            | ✔️         |
| GetOwner                  | ✔️         |
| GetSectorSize             | ✔️         |
| GetVestingFunds           | ✔️         |
| IsControllingAddress      | ✔️         |
| OnDeferredCronEvent       | ✖️         |
| PreCommitSector           | ✖️         |
| PreCommitSectorBatch      | ✖️         |
| PreCommitSectorBatch2     | ✖️         |
| ProveCommitAggregate      | ✖️         |
| ProveCommitSector         | ✖️         |
| ProveReplicaUpdates       | ✖️         |
| ProveReplicaUpdates2      | ✖️         |
| Read fee debt             | ✖️         |
| Read initial pledge total | ✖️         |
| Read peer ID, multiaddr   | ✔️         |
| Read pre-commit deposit   | ✖️         |
| RepayDebt                 | ✔️         |
| ReportConsensusFault      | ✖️         |
| SubmitWindowedPoSt        | ✖️         |
| TerminateSectors          | ✖️         |
| WithdrawBalance           | ✔️         |

#### **Multisig**

| Method                      | Supported? |
| --------------------------- | ---------- |
| AddSigner                   | ✔️         |
| Approve                     | ✔️         |
| Cancel                      | ✔️         |
| ChangeNumApprovalsThreshold | ✖️         |
| Constructor                 | ✖️         |
| List signers and threshold  | ✖️         |
| LockBalance                 | ✔️         |
| Propose                     | ✔️         |
| RemoveSigner                | ✔️         |
| SwapSigner                  | ✔️         |
| UniversalReceiverHook       | ✔️         |

#### **Storage market**

| Method                    | Supported? |
| ------------------------- | ---------- |
| ActivateDeals             | ✖️         |
| AddBalance                | ✔️         |
| ComputeDataCommitment     | ✖️         |
| Constructor               | ✖️         |
| CronTick                  | ✖️         |
| GetBalance                | ✔️         |
| GetDealActivation         | ✔️         |
| GetDealClient             | ✔️         |
| GetDealClientCollateral   | ✔️         |
| GetDealDataCommitment     | ✔️         |
| GetDealEpochPrice         | ✔️         |
| GetDealLabel              | ✔️         |
| GetDealProvider           | ✔️         |
| GetDealProviderCollateral | ✔️         |
| GetDealTerm               | ✔️         |
| GetDealVerified           | ✔️         |
| OnMinerSectorsTerminate   | ✖️         |
| PublishStorageDeals       | ✔️         |
| VerifyDealsForActivation  | ✖️         |
| WithdrawBalance           | ✔️         |

#### **Storage power**

| Method                                   | Supported? |
| ---------------------------------------- | ---------- |
| Compute pledge collateral for new sector | ✖️         |
| Constructor                              | ✖️         |
| CreateMiner                              | ✔️         |
| CurrentTotalPower                        | ✖️         |
| EnrollCronEvent                          | ✖️         |
| Get miner count, consensus count         | ✔️         |
| Get miner’s QA power                     | ✖️         |
| Get network bytes committed?             | ✖️         |
| Get network epoch pledge collateral      | ✖️         |
| Get network epoch QA power               | ✖️         |
| Get network total pledge collateral?     | ✖️         |
| MinerRawPower                            | ✔️         |
| NetworkRawPower                          | ✔️         |
| OnEpochTickEnd                           | ✖️         |
| SubmitPoRepForBulkVerify                 | ✖️         |
| UpdateClaimedPower                       | ✖️         |
| UpdatePledgeTotal                        | ✖️         |

#### **Verified registry**

| Method                      | Supported? |
| --------------------------- | ---------- |
| AddVerifiedClient           | ✔️         |
| AddVerifier                 | ✖️         |
| ClaimAllocations            | ✖️         |
| Constructor                 | ✖️         |
| ExtendClaimTerms            | ✔️         |
| GetClaims                   | ✔️         |
| List claims                 | ✖️         |
| List/check verifiers        | ✖️         |
| List/get allocations        | ✖️         |
| RemoveExpiredAllocations    | ✔️         |
| RemoveExpiredClaims         | ✔️         |
| RemoveVerifiedClientDataCap | ✖️         |
| RemoveVerifier              | ✖️         |
| UniversalReceiverHook       | ✔️         |

### Import filecoin.sol

The `filecoin.sol` library is embeddable into your smart contract, which means it does not need be present on chain first. Instead, you can just import the library and call the available methods. The `filecoin.sol` library can be [added via `npm`](#import-filecoinsol-with-npm) or [manually imported](#import-filecoinsol-manually) into your contract. The `npm`-based import is simpler, and is recommended.

#### **Import filecoin.sol with npm**

1. Install the Filecoin Solidity API package:

```shell
npm install filecoin-solidity-api
```

{% hint style="info" %}
Use the maintained `filecoin-solidity-api` package and import paths. Older examples may use legacy Zondax package names or repository paths; do not copy those into new projects.
{% endhint %}

#### **Import filecoin.sol manually**

1. Navigate to your smart contract project folder `<my-project>`:

```shell
cd my-project
```

2. Create a folder named `libs`:

```shell
mkdir libs
```

3. Move into the `libs` directory:

```shell
cd libs
```

4. Copy the Filecoin Solidity API contracts with the methods you wish to call from [the contracts folder](https://github.com/filecoin-project/filecoin-solidity/tree/master/contracts/v0.8) into `libs`. Preserve the subdirectories such as `types`, `utils`, and `cbor`, because the actor API files import those dependencies.

### Call a built-in actor

Once you’ve either imported particular contracts manually or installed `filecoin-solidity-api` using npm, create a callable method to access the built-in actor methods the way you normally would in a Solidity smart contract. See the [Filecoin.sol guide](filecoin.sol.md) for npm import examples and the [reference guide](../../reference/built-in-actors/filecoin.sol.md) for actor-specific method examples.



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/build/developing-contracts/call-built-in-actors)
