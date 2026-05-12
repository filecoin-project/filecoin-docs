---
description: This page covers the built-in actors Filecoin.sol API.
---

# Filecoin.sol

For conceptual information on built-in actors, including their purposes, how they work and more, see the [conceptual guide](./).

## Prerequisites

Before you can call a built-in actor using the API, you must [import Filecoin.sol using one of the available methods](../../build/developing-contracts/call-built-in-actors.md#import-filecoinsol).

## Works on

Filecoin.sol is for contracts deployed to Filecoin EVM networks that expose Filecoin built-in actor precompiles. Use the current `filecoin-solidity-api` package on Filecoin mainnet or Calibration testnet, and use the same API surface when testing against a local Filecoin EVM-compatible network.

## Call a built-in actor

For available actors and methods see [Available actors and methods](../../build/developing-contracts/call-built-in-actors.md#available-actors-and-methods).

Once you’ve either imported particular contracts manually or installed `filecoin-solidity-api` using `npm`, create a callable method to access the built-in actor methods the way you normally would in a Solidity smart contract. Working examples of smart contracts that call built-in actor methods are available below.

* [Account](filecoin.sol.md#call-the-account-actor)
* [DataCap](filecoin.sol.md#call-the-datacap-actor)
* [Miner](filecoin.sol.md#call-the-miner-actor)
* [Storage market](filecoin.sol.md#call-the-storage-market-actor)
* [Storage power](filecoin.sol.md#call-the-storage-power-actor)
* [Verified registry](filecoin.sol.md#call-the-verified-registry-actor)

For conceptual information on built-in actors, including their purposes, how they work and available types, see the [conceptual guide](./).

### Call the account actor

The following example imports the Account actor library and creates a callable method for each of the [available actor methods](filecoin.sol.md#call-the-account-actor). For the full code, see [the GitHub repository](https://github.com/filecoin-project/filecoin-solidity/blob/master/contracts/v0.8/tests/account.test.sol).

```solidity
pragma solidity ^0.8.18;

import "../types/AccountTypes.sol";
import "../types/CommonTypes.sol";
import "../AccountAPI.sol";
import "../utils/UtilsHandlers.sol";
import "../utils/Errors.sol";

contract AccountApiTest {
    function authenticate_message(CommonTypes.FilActorId target, AccountTypes.AuthenticateMessageParams memory params) public view {
        int256 exit_code = AccountAPI.authenticateMessage(target, params);
        Errors.revertOnError(exit_code);
    }

    function universal_receiver_hook(CommonTypes.FilActorId target, CommonTypes.UniversalReceiverParams memory params) public {
        (int256 exit_code, ) = UtilsHandlers.universalReceiverHook(target, params);
        Errors.revertOnError(exit_code);
    }
}
```

### Call the DataCap actor

The following example imports the DataCap actor library and creates a callable method for each of the [available actor methods](filecoin.sol.md#call-the-datacap-actor). For the full code, see [the GitHub repository](https://github.com/filecoin-project/filecoin-solidity/blob/master/contracts/v0.8/tests/datacap.test.sol).

```solidity
pragma solidity ^0.8.18;

import "../types/DataCapTypes.sol";
import "../types/CommonTypes.sol";
import "../cbor/BigIntCbor.sol";
import "../DataCapAPI.sol";
import "../utils/UtilsHandlers.sol";
import "../utils/Errors.sol";

contract DataCapApiTest {
    function name() public view returns (string memory) {
        (int256 exit_code, string memory result) = DataCapAPI.name();
        Errors.revertOnError(exit_code);
        return result;
    }

    function symbol() public view returns (string memory) {
        (int256 exit_code, string memory result) = DataCapAPI.symbol();
        Errors.revertOnError(exit_code);
        return result;
    }

    function total_supply() public view returns (CommonTypes.BigInt memory) {
        (int256 exit_code, CommonTypes.BigInt memory result) = DataCapAPI.totalSupply();
        Errors.revertOnError(exit_code);
        return result;
    }

    function balance(CommonTypes.FilAddress memory addr) public view returns (CommonTypes.BigInt memory) {
        (int256 exit_code, CommonTypes.BigInt memory result) = DataCapAPI.balance(addr);
        Errors.revertOnError(exit_code);
        return result;
    }

    function allowance(DataCapTypes.GetAllowanceParams memory params) public view returns (CommonTypes.BigInt memory) {
        (int256 exit_code, CommonTypes.BigInt memory result) = DataCapAPI.allowance(params);
        Errors.revertOnError(exit_code);
        return result;
    }

    function transfer(DataCapTypes.TransferParams memory params) public returns (DataCapTypes.TransferReturn memory) {
        (int256 exit_code, DataCapTypes.TransferReturn memory result) = DataCapAPI.transfer(params);
        Errors.revertOnError(exit_code);
        return result;
    }

    function transfer_from(DataCapTypes.TransferFromParams memory params) public returns (DataCapTypes.TransferFromReturn memory) {
        (int256 exit_code, DataCapTypes.TransferFromReturn memory result) = DataCapAPI.transferFrom(params);
        Errors.revertOnError(exit_code);
        return result;
    }

    function increase_allowance(DataCapTypes.IncreaseAllowanceParams memory params) public returns (CommonTypes.BigInt memory) {
        (int256 exit_code, CommonTypes.BigInt memory result) = DataCapAPI.increaseAllowance(params);
        Errors.revertOnError(exit_code);
        return result;
    }

    function decrease_allowance(DataCapTypes.DecreaseAllowanceParams memory params) public returns (CommonTypes.BigInt memory) {
        (int256 exit_code, CommonTypes.BigInt memory result) = DataCapAPI.decreaseAllowance(params);
        Errors.revertOnError(exit_code);
        return result;
    }

    function revoke_allowance(CommonTypes.FilAddress memory operator) public returns (CommonTypes.BigInt memory) {
        (int256 exit_code, CommonTypes.BigInt memory result) = DataCapAPI.revokeAllowance(operator);
        Errors.revertOnError(exit_code);
        return result;
    }

    function burn(CommonTypes.BigInt memory amount) public returns (CommonTypes.BigInt memory) {
        (int256 exit_code, CommonTypes.BigInt memory result) = DataCapAPI.burn(amount);
        Errors.revertOnError(exit_code);
        return result;
    }

    function burn_from(DataCapTypes.BurnFromParams memory params) public returns (DataCapTypes.BurnFromReturn memory) {
        (int256 exit_code, DataCapTypes.BurnFromReturn memory result) = DataCapAPI.burnFrom(params);
        Errors.revertOnError(exit_code);
        return result;
    }

    function handle_filecoin_method(uint64 method, uint64 codec, bytes calldata params) public pure {
        UtilsHandlers.handleFilecoinMethod(method, codec, params);
    }
}
```

### Call the storage market actor

The following example imports the Storage market actor library and creates a callable method for each of the [available actor methods](filecoin.sol.md#call-the-storage-market-actor). For the full code, see [the GitHub repository](https://github.com/filecoin-project/filecoin-solidity/blob/master/contracts/v0.8/tests/market.test.sol).

```solidity
pragma solidity ^0.8.18;

import "../MarketAPI.sol";
import "../types/MarketTypes.sol";
import "../utils/Errors.sol";

contract MarketApiTest {
    function add_balance(CommonTypes.FilAddress memory providerOrClient, uint256 value) public payable {
        (int256 exit_code, ) = MarketAPI.addBalance(providerOrClient, value);
        Errors.revertOnError(exit_code);
    }

    function withdraw_balance(MarketTypes.WithdrawBalanceParams memory params) public returns (CommonTypes.BigInt memory) {
        (int256 exit_code, CommonTypes.BigInt memory result) = MarketAPI.withdrawBalance(params);
        Errors.revertOnError(exit_code);
        return result;
    }

    function get_balance(CommonTypes.FilAddress memory addr) public view returns (MarketTypes.GetBalanceReturn memory) {
        (int256 exit_code, MarketTypes.GetBalanceReturn memory result) = MarketAPI.getBalance(addr);
        Errors.revertOnError(exit_code);
        return result;
    }

    function get_deal_data_commitment(uint64 dealID) public view returns (MarketTypes.GetDealDataCommitmentReturn memory) {
        (int256 exit_code, MarketTypes.GetDealDataCommitmentReturn memory result) = MarketAPI.getDealDataCommitment(dealID);
        Errors.revertOnError(exit_code);
        return result;
    }

    function get_deal_client(uint64 dealID) public view returns (uint64) {
        (int256 exit_code, uint64 result) = MarketAPI.getDealClient(dealID);
        Errors.revertOnError(exit_code);
        return result;
    }

    function get_deal_provider(uint64 dealID) public view returns (uint64) {
        (int256 exit_code, uint64 result) = MarketAPI.getDealProvider(dealID);
        Errors.revertOnError(exit_code);
        return result;
    }

    function get_deal_label(uint64 dealID) public view returns (CommonTypes.DealLabel memory) {
        (int256 exit_code, CommonTypes.DealLabel memory result) = MarketAPI.getDealLabel(dealID);
        Errors.revertOnError(exit_code);
        return result;
    }

    function get_deal_term(uint64 dealID) public view returns (MarketTypes.GetDealTermReturn memory) {
        (int256 exit_code, MarketTypes.GetDealTermReturn memory result) = MarketAPI.getDealTerm(dealID);
        Errors.revertOnError(exit_code);
        return result;
    }

    function get_deal_total_price(uint64 dealID) public view returns (CommonTypes.BigInt memory) {
        (int256 exit_code, CommonTypes.BigInt memory result) = MarketAPI.getDealTotalPrice(dealID);
        Errors.revertOnError(exit_code);
        return result;
    }

    function get_deal_client_collateral(uint64 dealID) public view returns (CommonTypes.BigInt memory) {
        (int256 exit_code, CommonTypes.BigInt memory result) = MarketAPI.getDealClientCollateral(dealID);
        Errors.revertOnError(exit_code);
        return result;
    }

    function get_deal_provider_collateral(uint64 dealID) public view returns (CommonTypes.BigInt memory) {
        (int256 exit_code, CommonTypes.BigInt memory result) = MarketAPI.getDealProviderCollateral(dealID);
        Errors.revertOnError(exit_code);
        return result;
    }

    function get_deal_verified(uint64 dealID) public view returns (bool) {
        (int256 exit_code, bool result) = MarketAPI.getDealVerified(dealID);
        Errors.revertOnError(exit_code);
        return result;
    }

    function get_deal_activation(uint64 dealID) public view returns (MarketTypes.GetDealActivationReturn memory) {
        (int256 exit_code, MarketTypes.GetDealActivationReturn memory result) = MarketAPI.getDealActivation(dealID);
        Errors.revertOnError(exit_code);
        return result;
    }

    function publish_storage_deals(MarketTypes.PublishStorageDealsParams memory params) public returns (MarketTypes.PublishStorageDealsReturn memory) {
        (int256 exit_code, MarketTypes.PublishStorageDealsReturn memory result) = MarketAPI.publishStorageDeals(params);
        Errors.revertOnError(exit_code);
        return result;
    }
}
```

### Call the miner actor

The following example imports the Miner actor library and creates a callable method for each of the [available actor methods](filecoin.sol.md#call-the-miner-actor). For the full code, see [the GitHub repository](https://github.com/filecoin-project/filecoin-solidity/blob/master/contracts/v0.8/tests/miner.test.sol).

```solidity
pragma solidity ^0.8.18;

import "../MinerAPI.sol";
import "../types/MinerTypes.sol";
import "../utils/Errors.sol";

contract MinerApiTest {
    function get_owner(CommonTypes.FilActorId target) public view returns (MinerTypes.GetOwnerReturn memory) {
        (int256 exit_code, MinerTypes.GetOwnerReturn memory result) = MinerAPI.getOwner(target);
        Errors.revertOnError(exit_code);
        return result;
    }

    function change_owner_address(CommonTypes.FilActorId target, CommonTypes.FilAddress memory addr) public {
        int256 exit_code = MinerAPI.changeOwnerAddress(target, addr);
        Errors.revertOnError(exit_code);
    }

    function is_controlling_address(CommonTypes.FilActorId target, CommonTypes.FilAddress memory addr) public view returns (bool) {
        (int256 exit_code, bool result) = MinerAPI.isControllingAddress(target, addr);
        Errors.revertOnError(exit_code);
        return result;
    }

    function get_sector_size(CommonTypes.FilActorId target) public view returns (uint64) {
        (int256 exit_code, uint64 result) = MinerAPI.getSectorSize(target);
        Errors.revertOnError(exit_code);
        return result;
    }

    function get_available_balance(CommonTypes.FilActorId target) public view returns (CommonTypes.BigInt memory) {
        (int256 exit_code, CommonTypes.BigInt memory result) = MinerAPI.getAvailableBalance(target);
        Errors.revertOnError(exit_code);
        return result;
    }

    function get_vesting_funds(CommonTypes.FilActorId target) public view returns (MinerTypes.VestingFunds[] memory) {
        (int256 exit_code, MinerTypes.VestingFunds[] memory result) = MinerAPI.getVestingFunds(target);
        Errors.revertOnError(exit_code);
        return result;
    }

    function change_beneficiary(CommonTypes.FilActorId target, MinerTypes.ChangeBeneficiaryParams memory params) public {
        int256 exit_code = MinerAPI.changeBeneficiary(target, params);
        Errors.revertOnError(exit_code);
    }

    function get_beneficiary(CommonTypes.FilActorId target) public view returns (MinerTypes.GetBeneficiaryReturn memory) {
        (int256 exit_code, MinerTypes.GetBeneficiaryReturn memory result) = MinerAPI.getBeneficiary(target);
        Errors.revertOnError(exit_code);
        return result;
    }

    function change_worker_address(CommonTypes.FilActorId target, MinerTypes.ChangeWorkerAddressParams memory params) public {
        int256 exit_code = MinerAPI.changeWorkerAddress(target, params);
        Errors.revertOnError(exit_code);
    }

    function change_peer_id(CommonTypes.FilActorId target, CommonTypes.FilAddress memory newId) public {
        int256 exit_code = MinerAPI.changePeerId(target, newId);
        Errors.revertOnError(exit_code);
    }

    function change_multiaddresses(CommonTypes.FilActorId target, CommonTypes.FilAddress[] memory new_multi_addrs) public {
        int256 exit_code = MinerAPI.changeMultiaddresses(target, new_multi_addrs);
        Errors.revertOnError(exit_code);
    }

    function repay_debt(CommonTypes.FilActorId target) public {
        int256 exit_code = MinerAPI.repayDebt(target);
        Errors.revertOnError(exit_code);
    }

    function confirm_change_worker_address(CommonTypes.FilActorId target) public {
        int256 exit_code = MinerAPI.confirmChangeWorkerAddress(target);
        Errors.revertOnError(exit_code);
    }

    function get_peer_id(CommonTypes.FilActorId target) public view returns (CommonTypes.FilAddress memory) {
        (int256 exit_code, CommonTypes.FilAddress memory result) = MinerAPI.getPeerId(target);
        Errors.revertOnError(exit_code);
        return result;
    }

    function get_multiaddresses(CommonTypes.FilActorId target) public view returns (CommonTypes.FilAddress[] memory) {
        (int256 exit_code, CommonTypes.FilAddress[] memory result) = MinerAPI.getMultiaddresses(target);
        Errors.revertOnError(exit_code);
        return result;
    }

    function withdraw_balance(CommonTypes.FilActorId target, CommonTypes.BigInt memory amount) public returns (CommonTypes.BigInt memory) {
        (int256 exit_code, CommonTypes.BigInt memory result) = MinerAPI.withdrawBalance(target, amount);
        Errors.revertOnError(exit_code);
        return result;
    }
}
```

### Call the storage power actor

The following example imports the Storage power actor library and creates a callable method for each of the [available actor methods](filecoin.sol.md#call-the-storage-power-actor). For the full code, see [the GitHub repository](https://github.com/filecoin-project/filecoin-solidity/blob/master/contracts/v0.8/tests/power.test.sol).

```solidity
pragma solidity ^0.8.18;

import "../types/PowerTypes.sol";
import "../types/CommonTypes.sol";
import "../PowerAPI.sol";
import "../utils/Errors.sol";

contract PowerApiTest {
    function create_miner(PowerTypes.CreateMinerParams memory params, uint256 value) public payable returns (PowerTypes.CreateMinerReturn memory) {
        (int256 exit_code, PowerTypes.CreateMinerReturn memory result) = PowerAPI.createMiner(params, value);
        Errors.revertOnError(exit_code);
        return result;
    }

    function miner_count() public view returns (uint64) {
        (int256 exit_code, uint64 result) = PowerAPI.minerCount();
        Errors.revertOnError(exit_code);
        return result;
    }

    function miner_consensus_count() public view returns (int64) {
        (int256 exit_code, int64 result) = PowerAPI.minerConsensusCount();
        Errors.revertOnError(exit_code);
        return result;
    }

    function network_raw_power() public view returns (CommonTypes.BigInt memory) {
        (int256 exit_code, CommonTypes.BigInt memory result) = PowerAPI.networkRawPower();
        Errors.revertOnError(exit_code);
        return result;
    }

    function miner_raw_power(uint64 minerID) public view returns (PowerTypes.MinerRawPowerReturn memory) {
        (int256 exit_code, PowerTypes.MinerRawPowerReturn memory result) = PowerAPI.minerRawPower(minerID);
        Errors.revertOnError(exit_code);
        return result;
    }
}
```

### Call the verified registry actor

The following example imports the verified registry actor library and creates a callable method for each of the [available actor methods](filecoin.sol.md#call-the-verified-registry-actor). For the full code, see [the GitHub repository](https://github.com/filecoin-project/filecoin-solidity/blob/master/contracts/v0.8/tests/verifreg.test.sol).

```solidity
pragma solidity ^0.8.18;

import "../types/VerifRegTypes.sol";
import "../types/CommonTypes.sol";
import "../VerifRegAPI.sol";
import "../utils/Errors.sol";

contract VerifRegApiTest {
    function get_claims(VerifRegTypes.GetClaimsParams memory params) public view returns (VerifRegTypes.GetClaimsReturn memory) {
        (int256 exit_code, VerifRegTypes.GetClaimsReturn memory result) = VerifRegAPI.getClaims(params);
        Errors.revertOnError(exit_code);
        return result;
    }

    function add_verified_client(VerifRegTypes.AddVerifiedClientParams memory params) public {
        int256 exit_code = VerifRegAPI.addVerifiedClient(params);
        Errors.revertOnError(exit_code);
    }

    function remove_expired_allocations(
        VerifRegTypes.RemoveExpiredAllocationsParams memory params
    ) public returns (VerifRegTypes.RemoveExpiredAllocationsReturn memory) {
        (int256 exit_code, VerifRegTypes.RemoveExpiredAllocationsReturn memory result) = VerifRegAPI.removeExpiredAllocations(params);
        Errors.revertOnError(exit_code);
        return result;
    }

    function extend_claim_terms(VerifRegTypes.ClaimTerm[] memory claimTerms) public returns (CommonTypes.BatchReturn memory) {
        (int256 exit_code, CommonTypes.BatchReturn memory result) = VerifRegAPI.extendClaimTerms(claimTerms);
        Errors.revertOnError(exit_code);
        return result;
    }

    function remove_expired_claims(VerifRegTypes.RemoveExpiredClaimsParams memory params) public returns (VerifRegTypes.RemoveExpiredClaimsReturn memory) {
        (int256 exit_code, VerifRegTypes.RemoveExpiredClaimsReturn memory result) = VerifRegAPI.removeExpiredClaims(params);
        Errors.revertOnError(exit_code);
        return result;
    }
}
```



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/reference/built-in-actors/filecoin.sol)
