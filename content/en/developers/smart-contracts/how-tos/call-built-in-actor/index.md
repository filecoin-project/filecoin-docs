---
title: "Call a built-in actor"
description: "In Filecoin, built-in actors are hardcoded programs, written ahead of time by network engineers, that manage and orchestrate key subprocesses and subsystems in the Filecoin network. The easiest way to access built-in actor methods is with the filecoin.solidity library, a set of Solidity libraries that allow Solidity smart contracts to seamlessly call methods of Filecoin built-in actors. The filecoin.solidity library supports cross-platform calls to real Filecoin built-in actors, as well as a set of mock libraries."
lead: "In Filecoin, built-in actors are hardcoded programs, written ahead of time by network engineers, that manage and orchestrate key subprocesses and subsystems in the Filecoin network. The easiest way to access built-in actor methods is with the filecoin.solidity library, a set of Solidity libraries that allow Solidity smart contracts to seamlessly call methods of Filecoin built-in actors. The filecoin.solidity library supports cross-platform calls to real Filecoin built-in actors, as well as a set of mock libraries."
draft: false
images: []
type: docs
weight: 90
menu:
  developers:
    parent: "developers-how-tos"
toc: true
---

## Available actors and methods

The majority of the Account, DataCap, Storage Market, Miner, Storage Owner and Verified Registry actor methods are supported and are listed below. **Cron, Payment Channel, Reward and System actor methods are currently not supported.**

For instructions on how import the `filecoin.solidity` library and call available built-in actor methods using Solidity, see the [procedure](#procedure).

### Account

| Method                                   | Supported?               |
|:-----------------------------------------|:-------------------------|
| Constructor                              | :heavy_multiplication_x: |
| PubkeyAddress                            | :heavy_multiplication_x: |
| AuthenticateMessage                      | :heavy_check_mark:       |
| UniversalReceiverHook                    | :heavy_check_mark:       |

### DataCap
| Method                                   | Supported?               |
|:-----------------------------------------|:-------------------------|
| Constructor                              | :heavy_multiplication_x: |
| Mint                                     | :heavy_multiplication_x: |
| Destroy                                  | :heavy_multiplication_x: |
| Name                                     | :heavy_check_mark:       |
| Symbol                                   | :heavy_check_mark:       |
| TotalSupply                              | :heavy_check_mark:       |
| BalanceOf                                | :heavy_check_mark:       |
| Transfer                                 | :heavy_check_mark:       |
| TransferFrom                             | :heavy_check_mark:       |
| IncreaseAllowance                        | :heavy_check_mark:       |
| DecreaseAllowance                        | :heavy_check_mark:       |
| RevokeAllowance                          | :heavy_check_mark:       |
| Burn                                     | :heavy_check_mark:       |
| BurnFrom                                 | :heavy_check_mark:       |
| Allowance                                | :heavy_check_mark:       |


### Storage market
| Method                                   | Supported?               |
|:-----------------------------------------|:-------------------------|
| Constructor                              | :heavy_multiplication_x: |
| AddBalance                               | :heavy_check_mark:       |
| WithdrawBalance                          | :heavy_check_mark:       |
| PublishStorageDeals                      | :heavy_check_mark:       |
| VerifyDealsForActivation                 | :heavy_multiplication_x: |
| ActivateDeals                            | :heavy_multiplication_x: |
| OnMinerSectorsTerminate                  | :heavy_multiplication_x: |
| ComputeDataCommitment                    | :heavy_multiplication_x: |
| CronTick                                 | :heavy_multiplication_x: |
| GetBalance                               | :heavy_check_mark:       |
| GetDealDataCommitment                    | :heavy_check_mark:       |
| GetDealClient                            | :heavy_check_mark:       |
| GetDealProvider                          | :heavy_check_mark:       |
| GetDealLabel                             | :heavy_check_mark:       |
| GetDealTerm                              | :heavy_check_mark:       |
| GetDealEpochPrice                        | :heavy_check_mark:       |
| GetDealClientCollateral                  | :heavy_check_mark:       |
| GetDealProviderCollateral                | :heavy_check_mark:       |
| GetDealVerified                          | :heavy_check_mark:       |
| GetDealActivation                        | :heavy_check_mark:       |

### Miner
| Method                                   | Supported?               |
|:-----------------------------------------|:-------------------------|
| Constructor                              | :heavy_multiplication_x: |
| ControlAddresses                         | :heavy_multiplication_x: |
| ChangeWorkerAddress                      | :heavy_check_mark:       |
| ChangePeerID                             | :heavy_check_mark:       |
| SubmitWindowedPoSt                       | :heavy_multiplication_x: |
| PreCommitSector                          | :heavy_multiplication_x: |
| ProveCommitSector                        | :heavy_multiplication_x: |
| ExtendSectorExpiration                   | :heavy_multiplication_x: |
| TerminateSectors                         | :heavy_multiplication_x: |
| DeclareFaults                            | :heavy_multiplication_x: |
| DeclareFaultsRecovered                   | :heavy_multiplication_x: |
| OnDeferredCronEvent                      | :heavy_multiplication_x: |
| CheckSectorProven                        | :heavy_multiplication_x: |
| ApplyRewards                             | :heavy_multiplication_x: |
| ReportConsensusFault                     | :heavy_multiplication_x: |
| WithdrawBalance                          | :heavy_check_mark:       |
| ConfirmSectorProofsValid                 | :heavy_multiplication_x: |
| ChangeMultiaddrs                         | :heavy_check_mark:       |
| CompactPartitions                        | :heavy_multiplication_x: |
| CompactSectorNumbers                     | :heavy_multiplication_x: |
| ConfirmUpdateWorkerKey                   | :heavy_multiplication_x: |
| RepayDebt                                | :heavy_check_mark:       |
| ChangeOwnerAddress                       | :heavy_check_mark:       |
| DisputeWindowedPoSt                      | :heavy_multiplication_x: |
| PreCommitSectorBatch                     | :heavy_multiplication_x: |
| ProveCommitAggregate                     | :heavy_multiplication_x: |
| ProveReplicaUpdates                      | :heavy_multiplication_x: |
| PreCommitSectorBatch2                    | :heavy_multiplication_x: |
| ProveReplicaUpdates2                     | :heavy_multiplication_x: |
| ChangeBeneficiary                        | :heavy_check_mark:       |
| GetBeneficiary                           | :heavy_check_mark:       |
| ExtendSectorExpiration2                  | :heavy_multiplication_x: |
| GetOwner                                 | :heavy_check_mark:       |
| IsControllingAddress                     | :heavy_check_mark:       |
| GetSectorSize                            | :heavy_check_mark:       |
| GetVestingFunds                          | :heavy_check_mark:       |
| GetAvailableBalance                      | :heavy_check_mark:       |
| Read peer ID, multiaddr                  | :heavy_check_mark:       |
| Read pre-commit deposit                  | :heavy_multiplication_x: |
| Read initial pledge total                | :heavy_multiplication_x: |
| Read fee debt                            | :heavy_multiplication_x: |

### Multisig
| Method                                   | Supported?               |
|:-----------------------------------------|:-------------------------|
| Constructor                              | :heavy_multiplication_x: |
| Propose                                  | :heavy_check_mark:       |
| Approve                                  | :heavy_check_mark:       |
| Cancel                                   | :heavy_check_mark:       |
| AddSigner                                | :heavy_check_mark:       |
| RemoveSigner                             | :heavy_check_mark:       |
| SwapSigner                               | :heavy_check_mark:       |
| ChangeNumApprovalsThreshold              | :heavy_multiplication_x: |
| LockBalance                              | :heavy_check_mark:       |
| UniversalReceiverHook                    | :heavy_check_mark:       |
| List signers and threshold               | :heavy_multiplication_x: |

### Storage power
| Method                                   | Supported?               |
|:-----------------------------------------|:-------------------------|
| Constructor                              | :heavy_multiplication_x: |
| CreateMiner                              | :heavy_check_mark:       |
| UpdateClaimedPower                       | :heavy_multiplication_x: |
| EnrollCronEvent                          | :heavy_multiplication_x: |
| OnEpochTickEnd                           | :heavy_multiplication_x: |
| UpdatePledgeTotal                        | :heavy_multiplication_x: |
| SubmitPoRepForBulkVerify                 | :heavy_multiplication_x: |
| CurrentTotalPower                        | :heavy_multiplication_x: |
| NetworkRawPower                          | :heavy_check_mark:       |
| MinerRawPower                            | :heavy_check_mark:       |
| Get miner count, consensus count         | :heavy_check_mark:       |
| Compute pledge collateral for new sector | :heavy_multiplication_x: |
| Get network bytes committed?             | :heavy_multiplication_x: |
| Get network total pledge collateral?     | :heavy_multiplication_x: |
| Get network epoch QA power               | :heavy_multiplication_x: |
| Get network epoch pledge collateral      | :heavy_multiplication_x: |
| Get miner's QA power                     | :heavy_multiplication_x: |

###  Verified registry    
| Method                                   | Supported?               |
|:-----------------------------------------|:-------------------------|
| Constructor                              | :heavy_multiplication_x: |
| AddVerifier                              | :heavy_multiplication_x: |
| RemoveVerifier                           | :heavy_multiplication_x: |
| AddVerifiedClient                        | :heavy_check_mark:       |
| RemoveVerifiedClientDataCap              | :heavy_multiplication_x: |
| RemoveExpiredAllocations                 | :heavy_check_mark:       |
| ClaimAllocations                         | :heavy_multiplication_x: |
| GetClaims                                | :heavy_check_mark:       |
| ExtendClaimTerms                         | :heavy_check_mark:       |
| RemoveExpiredClaims                      | :heavy_check_mark:       |
| UniversalReceiverHook                    | :heavy_check_mark:       |
| List/get allocations                     | :heavy_multiplication_x: |
| List claims                              | :heavy_multiplication_x: |
| List/check verifiers                     | :heavy_multiplication_x: |

## Procedure

To invoke built-in actor methods using `filecoin.solidity`, first import `filecoin.solidity` into your smart contract and create callable methods to access the built-in actor methods.

1. [Import `filecoin.solidity`](#import-filecoinsolidity).
1. [Call a built-in actor](#call-a-built-in-actor).

### Import filecoin.solidity

The `filecoin.solidity` library is embeddable into your smart contract, which means it does not need be present on chain first. Instead, you can just import the library and call the available methods. The `filecoin.solidity` library can be [added via `npm`](#import-filecoinsolidity-with-npm) or [manually imported](#import-filecoinsolidity-manually) into your contract. The `npm`-based import is simpler, and is recommended. 

#### Import filecoin.solidity with npm

1. Install [yarn](https://yarnpkg.com/) if you don't have it installed.

1. Install `filecoin-solidity`:
    
    ```shell
    yarn add @zondax/filecoin-solidity
    ```


#### Import filecoin.solidity manually

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

Once you've either imported particular contracts manually or simply installed `filecoin-solidity` using npm, create a callable method to access the built-in actor methods the way you normally would in a Solidity smart contract. Working examples of smart contracts that call built-in actor methods are available below.

- [Account](#call-the-account-actor)
- [DataCap](#call-the-datacap-actor)
- [Storage market](#call-the-storage-market-actor)
- [Miner](#call-the-miner-actor)
- [Storage power](#call-the-storage-power-actor)
- [Verified registry](#call-the-verified-registry-actor)

#### Call the account actor

The following example imports the Account actor library and creates a callable method for each of the [available actor methods](#account). For the full code, see [the GitHub repository](https://github.com/Zondax/filecoin-solidity/blob/master/contracts/v0.8/tests/account.test.sol). 

```solidity
pragma solidity ^0.8.17;

import "../types/AccountTypes.sol";
import "../types/CommonTypes.sol";
import "../AccountAPI.sol";
import "../Utils.sol";

contract AccountApiTest {
    function authenticate_message(CommonTypes.FilActorId target, AccountTypes.AuthenticateMessageParams memory params) public {
        AccountAPI.authenticateMessage(target, params);
    }

    function universal_receiver_hook(CommonTypes.FilActorId target, CommonTypes.UniversalReceiverParams memory params) public {
        Utils.universalReceiverHook(target, params);
    }
}
```

#### Call the DataCap actor

The following example imports the DataCap actor library and creates a callable method for each of the [available actor methods](#datacap). For the full code, see [the GitHub repository](https://github.com/Zondax/filecoin-solidity/blob/master/contracts/v0.8/tests/datacap.test.sol). 

```solidity
pragma solidity ^0.8.17;

import "../types/DataCapTypes.sol";
import "../types/CommonTypes.sol";
import "../cbor/BigIntCbor.sol";
import "../DataCapAPI.sol";
import "../Utils.sol";

contract DataCapApiTest {
    function name() public returns (string memory) {
        return DataCapAPI.name();
    }

    function symbol() public returns (string memory) {
        return DataCapAPI.symbol();
    }

    function total_supply() public returns (CommonTypes.BigInt memory) {
        return DataCapAPI.totalSupply();
    }

    function balance(CommonTypes.FilAddress memory addr) public returns (CommonTypes.BigInt memory) {
        return DataCapAPI.balance(addr);
    }

    function allowance(DataCapTypes.GetAllowanceParams memory params) public returns (CommonTypes.BigInt memory) {
        return DataCapAPI.allowance(params);
    }

    function transfer(DataCapTypes.TransferParams memory params) public returns (DataCapTypes.TransferReturn memory) {
        return DataCapAPI.transfer(params);
    }

    function transfer_from(DataCapTypes.TransferFromParams memory params) public returns (DataCapTypes.TransferFromReturn memory) {
        return DataCapAPI.transferFrom(params);
    }

    function increase_allowance(DataCapTypes.IncreaseAllowanceParams memory params) public returns (CommonTypes.BigInt memory) {
        return DataCapAPI.increaseAllowance(params);
    }

    function decrease_allowance(DataCapTypes.DecreaseAllowanceParams memory params) public returns (CommonTypes.BigInt memory) {
        return DataCapAPI.decreaseAllowance(params);
    }

    function revoke_allowance(CommonTypes.FilAddress memory operator) public returns (CommonTypes.BigInt memory) {
        return DataCapAPI.revokeAllowance(operator);
    }

    function burn(CommonTypes.BigInt memory amount) public returns (CommonTypes.BigInt memory) {
        return DataCapAPI.burn(amount);
    }

    function burn_from(DataCapTypes.BurnFromParams memory params) public returns (DataCapTypes.BurnFromReturn memory) {
        return DataCapAPI.burnFrom(params);
    }

    function handle_filecoin_method(uint64 method, uint64 codec, bytes calldata params) public pure {
        Utils.handleFilecoinMethod(method, codec, params);
    }
}
```

#### Call the storage market actor

The following example imports the Storage market actor library and creates a callable method for each of the [available actor methods](#storage-market). For the full code, see [the GitHub repository](https://github.com/Zondax/filecoin-solidity/blob/master/contracts/v0.8/tests/miner.test.sol). 

```solidity
pragma solidity ^0.8.17;

import "../MarketAPI.sol";
import "../types/MarketTypes.sol";

contract MarketApiTest {
    function add_balance(CommonTypes.FilAddress memory providerOrClient, uint256 value) public payable {
        MarketAPI.addBalance(providerOrClient, value);
    }

    function withdraw_balance(MarketTypes.WithdrawBalanceParams memory params) public returns (CommonTypes.BigInt memory) {
        return MarketAPI.withdrawBalance(params);
    }

    function get_balance(CommonTypes.FilAddress memory addr) public returns (MarketTypes.GetBalanceReturn memory) {
        return MarketAPI.getBalance(addr);
    }

    function get_deal_data_commitment(uint64 dealID) public returns (MarketTypes.GetDealDataCommitmentReturn memory) {
        return MarketAPI.getDealDataCommitment(dealID);
    }

    function get_deal_client(uint64 dealID) public returns (uint64) {
        return MarketAPI.getDealClient(dealID);
    }

    function get_deal_provider(uint64 dealID) public returns (uint64) {
        return MarketAPI.getDealProvider(dealID);
    }

    function get_deal_label(uint64 dealID) public returns (string memory) {
        return MarketAPI.getDealLabel(dealID);
    }

    function get_deal_term(uint64 dealID) public returns (MarketTypes.GetDealTermReturn memory) {
        return MarketAPI.getDealTerm(dealID);
    }

    function get_deal_total_price(uint64 dealID) public returns (CommonTypes.BigInt memory) {
        return MarketAPI.getDealTotalPrice(dealID);
    }

    function get_deal_client_collateral(uint64 dealID) public returns (CommonTypes.BigInt memory) {
        return MarketAPI.getDealClientCollateral(dealID);
    }

    function get_deal_provider_collateral(uint64 dealID) public returns (CommonTypes.BigInt memory) {
        return MarketAPI.getDealProviderCollateral(dealID);
    }

    function get_deal_verified(uint64 dealID) public returns (bool) {
        return MarketAPI.getDealVerified(dealID);
    }

    function get_deal_activation(uint64 dealID) public returns (MarketTypes.GetDealActivationReturn memory) {
        return MarketAPI.getDealActivation(dealID);
    }

    function publish_storage_deals(MarketTypes.PublishStorageDealsParams memory params) public returns (MarketTypes.PublishStorageDealsReturn memory) {
        return MarketAPI.publishStorageDeals(params);
    }
}
```

#### Call the miner actor

The following example imports the Account actor library and creates a callable method for each of the [available actor methods](#miner). For the full code, see [the GitHub repository](https://github.com/Zondax/filecoin-solidity/blob/master/contracts/v0.8/tests/miner.test.sol). 

```solidity
pragma solidity ^0.8.17;

import "../MinerAPI.sol";
import "../types/MinerTypes.sol";

contract MinerApiTest {
    function get_owner(CommonTypes.FilActorId target) public returns (MinerTypes.GetOwnerReturn memory) {
        return MinerAPI.getOwner(target);
    }

    function change_owner_address(CommonTypes.FilActorId target, CommonTypes.FilAddress memory addr) public {
        MinerAPI.changeOwnerAddress(target, addr);
    }

    function is_controlling_address(CommonTypes.FilActorId target, CommonTypes.FilAddress memory addr) public returns (bool) {
        return MinerAPI.isControllingAddress(target, addr);
    }

    function get_sector_size(CommonTypes.FilActorId target) public returns (uint64) {
        return MinerAPI.getSectorSize(target);
    }

    function get_available_balance(CommonTypes.FilActorId target) public returns (CommonTypes.BigInt memory) {
        return MinerAPI.getAvailableBalance(target);
    }

    function get_vesting_funds(CommonTypes.FilActorId target) public returns (MinerTypes.GetVestingFundsReturn memory) {
        return MinerAPI.getVestingFunds(target);
    }

    function change_beneficiary(CommonTypes.FilActorId target, MinerTypes.ChangeBeneficiaryParams memory params) public {
        return MinerAPI.changeBeneficiary(target, params);
    }

    function get_beneficiary(CommonTypes.FilActorId target) public returns (MinerTypes.GetBeneficiaryReturn memory) {
        return MinerAPI.getBeneficiary(target);
    }

    function change_worker_address(CommonTypes.FilActorId target, MinerTypes.ChangeWorkerAddressParams memory params) public {
        MinerAPI.changeWorkerAddress(target, params);
    }

    function change_peer_id(CommonTypes.FilActorId target, CommonTypes.FilAddress memory newId) public {
        MinerAPI.changePeerId(target, newId);
    }

    function change_multiaddresses(CommonTypes.FilActorId target, MinerTypes.ChangeMultiaddrsParams memory params) public {
        MinerAPI.changeMultiaddresses(target, params);
    }

    function repay_debt(CommonTypes.FilActorId target) public {
        MinerAPI.repayDebt(target);
    }

    function confirm_change_worker_address(CommonTypes.FilActorId target) public {
        MinerAPI.confirmChangeWorkerAddress(target);
    }

    function get_peer_id(CommonTypes.FilActorId target) public returns (CommonTypes.FilAddress memory) {
        return MinerAPI.getPeerId(target);
    }

    function get_multiaddresses(CommonTypes.FilActorId target) public returns (MinerTypes.GetMultiaddrsReturn memory) {
        return MinerAPI.getMultiaddresses(target);
    }

    function withdraw_balance(CommonTypes.FilActorId target, CommonTypes.BigInt memory amount) public returns (CommonTypes.BigInt memory) {
        return MinerAPI.withdrawBalance(target, amount);
    }
}
```

#### Call the storage power actor

The following example imports the Storage power actor library and creates a callable method for each of the [available actor methods](#storage-power). For the full code, see [the GitHub repository](https://github.com/Zondax/filecoin-solidity/blob/master/contracts/v0.8/tests/power.test.sol). 

```solidity
pragma solidity ^0.8.17;

import "../types/PowerTypes.sol";
import "../types/CommonTypes.sol";
import "../PowerAPI.sol";

contract PowerApiTest {
    function create_miner(PowerTypes.CreateMinerParams memory params, uint256 value) public payable returns (PowerTypes.CreateMinerReturn memory) {
        return PowerAPI.createMiner(params, value);
    }

    function miner_count() public returns (uint64) {
        return PowerAPI.minerCount();
    }

    function miner_consensus_count() public returns (int64) {
        return PowerAPI.minerConsensusCount();
    }

    function network_raw_power() public returns (CommonTypes.BigInt memory) {
        return PowerAPI.networkRawPower();
    }

    function miner_raw_power(uint64 minerID) public returns (PowerTypes.MinerRawPowerReturn memory) {
        return PowerAPI.minerRawPower(minerID);
    }
}
```

#### Call the verified registry actor

The following example imports the verified registry actor library and creates a callable method for each of the [available actor methods](#verified-registry). For the full code, see [the GitHub repository](https://github.com/Zondax/filecoin-solidity/blob/master/contracts/v0.8/tests/verifreg.test.sol). 

```solidity
pragma solidity ^0.8.17;

import "../types/VerifRegTypes.sol";
import "../types/CommonTypes.sol";
import "../VerifRegAPI.sol";

contract VerifRegApiTest {
    function get_claims(VerifRegTypes.GetClaimsParams memory params) public returns (VerifRegTypes.GetClaimsReturn memory) {
        return VerifRegAPI.getClaims(params);
    }

    function add_verified_client(VerifRegTypes.AddVerifiedClientParams memory params) public {
        VerifRegAPI.addVerifiedClient(params);
    }

    function remove_expired_allocations(
        VerifRegTypes.RemoveExpiredAllocationsParams memory params
    ) public returns (VerifRegTypes.RemoveExpiredAllocationsReturn memory) {
        return VerifRegAPI.removeExpiredAllocations(params);
    }

    function extend_claim_terms(VerifRegTypes.ExtendClaimTermsParams memory params) public returns (CommonTypes.BatchReturn memory) {
        return VerifRegAPI.extendClaimTerms(params);
    }

    function remove_expired_claims(VerifRegTypes.RemoveExpiredClaimsParams memory params) public returns (VerifRegTypes.RemoveExpiredClaimsReturn memory) {
        return VerifRegAPI.removeExpiredClaims(params);
    }
}
```

