---
title: "Call built-in actors"
description: "Filecoin built-in actors can be invoked in a smart contract using either the Protocol API or the Zondax filecoin.solifity library. This page provides instructions on how to use each method."
lead: "Filecoin built-in actors can be invoked in a smart contract using either the Protocol API or the Zondax filecoin.solifity library. This page provides instructions on how to use each method."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    parent: "smart-contracts-developing-contracts"
    identifier: call-built-in-actors-5544d4c9d2960540625aa69529c6fc50"
weight: 420
toc: true
---

{{< alert >}}
For conceptual information on built-in actors, including their purposes, how they work and available types, see the [conceptual guide]({{< ref "/reference/built-in-actors/overview" >}})
{{< /alert >}}

Built-in actors can be invoked using the Protocol _JSON-RPC_ API or the Zondax _filecoin.sol_ API.

## APIs compared

The Protocol _JSON-RPC_ API:

- Is maintained by Protocol Labs (PL).
- Uses JSON-RPC, a standardized way to encode remote procedure calls in JSON that can be transported using HTTP or WebSockets.
- Provides a language agnostic interface for Filecoin functionality.
- Allows applications to access Filecoin functionality using HTTP or WebSockets calls to a Filecoin node, like the Lotus daemon.
- Requires authentication for some API calls.
- Serves as the foundation for language-specific libraries (some of which are maintained by organizations other than PL) such as [filecoin.js](https://filecoin-shipyard.github.io/filecoin.js/).

The Zondax _filecoin.sol_ API:

- Is maintained by [Zondax](https://docs.zondax.ch/).
- Supports [_some but not all_ of the built-in actors and their methods](#available-actors-and-methods).

## Protocol API

Smart contracts can directly access built-in actors and methods using the Protocol API. Links to the reference guides for each of the available actor methods is listed below:

- [Account actor]({{< ref "/reference/built-in-actors/protocol-api.md#account-actor" >}})
- [Datacap]({{< ref "/reference/built-in-actors/protocol-api.md#datacap" >}})
- [Miner]({{< ref "/reference/built-in-actors/protocol-api.md#miner" >}})
- [Multisig]({{< ref "/reference/built-in-actors/protocol-api.md#multisig" >}})
- [Storage market actor]({{< ref "/reference/built-in-actors/protocol-api.md#storage-market-actor" >}})
- [Storage power actor]({{< ref "/reference/built-in-actors/protocol-api.md#storage-power-actor" >}})
- [Verified registry actor]({{< ref "/reference/built-in-actors/protocol-api.md#verified-registry-actor" >}})

## Filecoin.sol

Smart contracts can access built-in actor methods with the `filecoin.sol` library, a set of Solidity libraries that allow Solidity smart contracts to seamlessly call methods of Filecoin built-in actors. The `filecoin.sol` library supports cross-platform calls to real Filecoin built-in actors. This section contains information on the actors and methods available from `filecoin.sol`, along with installation instructions and working examples of smart contracts that call built-in actor methods.

To invoke built-in actor methods using `filecoin.sol`, follow these steps:

1. Review the [available actors and methods](#available-actors-and-methods).
1. [Import `filecoin.sol`](#import-filecoinsol).
1. [Call a built-in actor](#call-a-built-in-actor).

### Available actors and methods

The majority of the Account, DataCap, Storage Market, Miner, Storage Owner and Verified Registry actor methods are supported and are listed below. **Cron, Payment Channel, Reward and System actor methods are currently not supported.**

[procedure](#import-filecoinsol)

#### Account

| Method                                   | Supported?               |
|:-----------------------------------------|:-------------------------|
| AuthenticateMessage                      | :heavy_check_mark:       |
| Constructor                              | :heavy_multiplication_x: |
| PubkeyAddress                            | :heavy_multiplication_x: |
| UniversalReceiverHook                    | :heavy_check_mark:       |

#### DataCap

| Method                                   | Supported?               |
|:-----------------------------------------|:-------------------------|
| Allowance                                | :heavy_check_mark:       |
| BalanceOf                                | :heavy_check_mark:       |
| Burn                                     | :heavy_check_mark:       |
| BurnFrom                                 | :heavy_check_mark:       |
| Constructor                              | :heavy_multiplication_x: |
| DecreaseAllowance                        | :heavy_check_mark:       |
| Destroy                                  | :heavy_multiplication_x: |
| IncreaseAllowance                        | :heavy_check_mark:       |
| Mint                                     | :heavy_multiplication_x: |
| Name                                     | :heavy_check_mark:       |
| RevokeAllowance                          | :heavy_check_mark:       |
| Symbol                                   | :heavy_check_mark:       |
| TotalSupply                              | :heavy_check_mark:       |
| Transfer                                 | :heavy_check_mark:       |
| TransferFrom                             | :heavy_check_mark:       |

#### Miner

| Method                                   | Supported?               |
|:-----------------------------------------|:-------------------------|
| ApplyRewards                             | :heavy_multiplication_x: |
| ChangeBeneficiary                        | :heavy_check_mark:       |
| ChangeMultiaddrs                         | :heavy_check_mark:       |
| ChangeOwnerAddress                       | :heavy_check_mark:       |
| ChangePeerID                             | :heavy_check_mark:       |
| ChangeWorkerAddress                      | :heavy_check_mark:       |
| CheckSectorProven                        | :heavy_multiplication_x: |
| CompactPartitions                        | :heavy_multiplication_x: |
| CompactSectorNumbers                     | :heavy_multiplication_x: |
| ConfirmSectorProofsValid                 | :heavy_multiplication_x: |
| ConfirmUpdateWorkerKey                   | :heavy_multiplication_x: |
| Constructor                              | :heavy_multiplication_x: |
| ControlAddresses                         | :heavy_multiplication_x: |
| DeclareFaults                            | :heavy_multiplication_x: |
| DeclareFaultsRecovered                   | :heavy_multiplication_x: |
| DisputeWindowedPoSt                      | :heavy_multiplication_x: |
| ExtendSectorExpiration                   | :heavy_multiplication_x: |
| ExtendSectorExpiration2                  | :heavy_multiplication_x: |
| GetAvailableBalance                      | :heavy_check_mark:       |
| GetBeneficiary                           | :heavy_check_mark:       |
| GetOwner                                 | :heavy_check_mark:       |
| GetSectorSize                            | :heavy_check_mark:       |
| GetVestingFunds                          | :heavy_check_mark:       |
| IsControllingAddress                     | :heavy_check_mark:       |
| OnDeferredCronEvent                      | :heavy_multiplication_x: |
| PreCommitSector                          | :heavy_multiplication_x: |
| PreCommitSectorBatch                     | :heavy_multiplication_x: |
| PreCommitSectorBatch2                    | :heavy_multiplication_x: |
| ProveCommitAggregate                     | :heavy_multiplication_x: |
| ProveCommitSector                        | :heavy_multiplication_x: |
| ProveReplicaUpdates                      | :heavy_multiplication_x: |
| ProveReplicaUpdates2                     | :heavy_multiplication_x: |
| Read fee debt                            | :heavy_multiplication_x: |
| Read initial pledge total                | :heavy_multiplication_x: |
| Read peer ID, multiaddr                  | :heavy_check_mark:       |
| Read pre-commit deposit                  | :heavy_multiplication_x: |
| RepayDebt                                | :heavy_check_mark:       |
| ReportConsensusFault                     | :heavy_multiplication_x: |
| SubmitWindowedPoSt                       | :heavy_multiplication_x: |
| TerminateSectors                         | :heavy_multiplication_x: |
| WithdrawBalance                          | :heavy_check_mark:       |

#### Multisig

| Method                                   | Supported?               |
|:-----------------------------------------|:-------------------------|
| AddSigner                                | :heavy_check_mark:       |
| Approve                                  | :heavy_check_mark:       |
| Cancel                                   | :heavy_check_mark:       |
| ChangeNumApprovalsThreshold              | :heavy_multiplication_x: |
| Constructor                              | :heavy_multiplication_x: |
| List signers and threshold               | :heavy_multiplication_x: |
| LockBalance                              | :heavy_check_mark:       |
| Propose                                  | :heavy_check_mark:       |
| RemoveSigner                             | :heavy_check_mark:       |
| SwapSigner                               | :heavy_check_mark:       |
| UniversalReceiverHook                    | :heavy_check_mark:       |

#### Storage market

| Method                                   | Supported?               |
|:-----------------------------------------|:-------------------------|
| ActivateDeals                            | :heavy_multiplication_x: |
| AddBalance                               | :heavy_check_mark:       |
| ComputeDataCommitment                    | :heavy_multiplication_x: |
| Constructor                              | :heavy_multiplication_x: |
| CronTick                                 | :heavy_multiplication_x: |
| GetBalance                               | :heavy_check_mark:       |
| GetDealActivation                        | :heavy_check_mark:       |
| GetDealClient                            | :heavy_check_mark:       |
| GetDealClientCollateral                  | :heavy_check_mark:       |
| GetDealDataCommitment                    | :heavy_check_mark:       |
| GetDealEpochPrice                        | :heavy_check_mark:       |
| GetDealLabel                             | :heavy_check_mark:       |
| GetDealProvider                          | :heavy_check_mark:       |
| GetDealProviderCollateral                | :heavy_check_mark:       |
| GetDealTerm                              | :heavy_check_mark:       |
| GetDealVerified                          | :heavy_check_mark:       |
| OnMinerSectorsTerminate                  | :heavy_multiplication_x: |
| PublishStorageDeals                      | :heavy_check_mark:       |
| VerifyDealsForActivation                 | :heavy_multiplication_x: |
| WithdrawBalance                          | :heavy_check_mark:       |

#### Storage power

| Method                                   | Supported?               |
|:-----------------------------------------|:-------------------------|
| Compute pledge collateral for new sector | :heavy_multiplication_x: |
| Constructor                              | :heavy_multiplication_x: |
| CreateMiner                              | :heavy_check_mark:       |
| CurrentTotalPower                        | :heavy_multiplication_x: |
| EnrollCronEvent                          | :heavy_multiplication_x: |
| Get miner count, consensus count         | :heavy_check_mark:       |
| Get miner's QA power                     | :heavy_multiplication_x: |
| Get network bytes committed?             | :heavy_multiplication_x: |
| Get network epoch pledge collateral      | :heavy_multiplication_x: |
| Get network epoch QA power               | :heavy_multiplication_x: |
| Get network total pledge collateral?     | :heavy_multiplication_x: |
| MinerRawPower                            | :heavy_check_mark:       |
| NetworkRawPower                          | :heavy_check_mark:       |
| OnEpochTickEnd                           | :heavy_multiplication_x: |
| SubmitPoRepForBulkVerify                 | :heavy_multiplication_x: |
| UpdateClaimedPower                       | :heavy_multiplication_x: |
| UpdatePledgeTotal                        | :heavy_multiplication_x: |

#### Verified registry

| Method                                   | Supported?               |
|:-----------------------------------------|:-------------------------|
| AddVerifiedClient                        | :heavy_check_mark:       |
| AddVerifier                              | :heavy_multiplication_x: |
| ClaimAllocations                         | :heavy_multiplication_x: |
| Constructor                              | :heavy_multiplication_x: |
| ExtendClaimTerms                         | :heavy_check_mark:       |
| GetClaims                                | :heavy_check_mark:       |
| List claims                              | :heavy_multiplication_x: |
| List/check verifiers                     | :heavy_multiplication_x: |
| List/get allocations                     | :heavy_multiplication_x: |
| RemoveExpiredAllocations                 | :heavy_check_mark:       |
| RemoveExpiredClaims                      | :heavy_check_mark:       |
| RemoveVerifiedClientDataCap              | :heavy_multiplication_x: |
| RemoveVerifier                           | :heavy_multiplication_x: |
| UniversalReceiverHook                    | :heavy_check_mark:       |

### Import filecoin.sol

The `filecoin.sol` library is embeddable into your smart contract, which means it does not need be present on chain first. Instead, you can just import the library and call the available methods. The `filecoin.sol` library can be [added via `npm`](#import-filecoinsol-with-npm) or [manually imported](#import-filecoinsol-manually) into your contract. The `npm`-based import is simpler, and is recommended.

#### Import filecoin.sol with npm

1. Install [yarn](https://yarnpkg.com/) if you don't have it installed.

1. Install `filecoin.sol`:

    ```shell
    yarn add @zondax/filecoin.sol
    ```

#### Import filecoin.sol manually

1. Navigate to your smart contract project folder `<my-project>`:

    ```shell
    cd <my-project>
    ```

1. Create a folder named `libs`:

    ```shell
    mkdir libs
    ```

1. Navigate to `libs`:

    ```shell
    cd libs
    ```

1. Copy the Zondax contracts with the methods you wish to call from [the contracts folder](https://github.com/Zondax/filecoin-solidity/tree/master/contracts/v0.8) into `libs`.

### Call a built-in actor

Once you've either imported particular contracts manually or simply installed `filecoin.sol` using npm, create a callable method to access the built-in actor methods the way you normally would in a Solidity smart contract. Working examples of smart contracts that call built-in actor methods are available in the [reference guide]({{< ref "/reference/built-in-actors/filecoin-sol" >}}).
