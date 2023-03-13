---
title: "Actors"
description: ""
lead: ""
draft: false
images: []
type: docs
menu:
  basics:
    parent: "basics-the-blockchain"
    identifier: "actors-7a2c5e87fc20f4e6b44374df10344f5e"
weight: 100
toc: true
---

{{< alert >}}
For conceptual information on built-in actors, including their purposes, how they work and more, see the [conceptual guide]({{< relref "/reference/built-in-actors/overview" >}}).
{{< /alert >}}

## Prerequisites

Before you can call a built-in actor using the API, you must [import filecoin.solidity using one of the available methods]({{< relref "smart-contracts/developing-contracts/call-built-in-actors/index.md#using-filecoinsolidity" >}}).

## Call a built-in actor

{{< alert >}}
For available actors and methods see [Available actors and methods]({{< ref "smart-contracts/developing-contracts/call-built-in-actors/index.md#available-actors-and-methods" >}}).
{{< /alert >}}

Once you've either imported particular contracts manually or simply installed `filecoin-solidity` using npm, create a callable method to access the built-in actor methods the way you normally would in a Solidity smart contract. Working examples of smart contracts that call built-in actor methods are available below.

- [Account](#call-the-account-actor)
- [DataCap](#call-the-datacap-actor)
- [Miner](#call-the-miner-actor)
- [Storage market](#call-the-storage-market-actor)
- [Storage power](#call-the-storage-power-actor)
- [Verified registry](#call-the-verified-registry-actor)

{{< alert >}}
For conceptual information on built-in actors, including their purposes, how they work and available types, see the [conceptual guide]({{< relref "/reference/built-in-actors/overview" >}}).
{{< /alert >}}

### Call the account actor

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

### Call the DataCap actor

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

### Call the storage market actor

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

### Call the miner actor

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

### Call the storage power actor

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

### Call the verified registry actor

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
