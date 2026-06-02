---
description: >-
  External Solidity libraries can help developers create their applications
  quicker by offloading some of the work to already existing smart contracts.
---

# Filecoin.sol

The Filecoin Solidity library allows developers to:

* Interact with Filecoin built-in actors.
* Simplify the interaction with the Filecoin storage market, miner actors, the verified registry for Filecoin Plus automation, and more.
* Use Filecoin-specific data types such as `FilAddress`, `FilActorId`, `Cid`, storage deals, and more.
* OpenZeppelin-like utilities specific to Filecoin.
* CBOR serialization and deserialization for parameters and return data.

In order to access exported Filecoin built-in actor methods in your smart contract, you will need to import Filecoin.sol in your Solidity project. As they are embeddable libraries, they don’t need to be present on-chain. You can just import the library you desire and call its methods.

Once the library is installed in your project, you can write Solidity code to call APIs from different built-in actors using Filecoin-specific data types or data conversions from the utility library.

## Add to your contract

Run the following command in your Solidity project, which is created using any smart contract development framework such as Hardhat or Foundry.

```shell
npm install filecoin-solidity-api
```

## Works on

Filecoin.sol calls Filecoin built-in actors from contracts deployed to Filecoin EVM networks. Use it on Filecoin mainnet or Calibration testnet with the current FVM actors and the Filecoin Solidity API package shown above. For local development, use a Filecoin EVM-compatible local network that exposes the same built-in actor precompiles.

## Usage

Once installed, you can call built-in actors in the library after importing them into your smart contract.

```solidity
// contracts/MyFilecoinContract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import { MarketAPI } from "filecoin-solidity-api/contracts/v0.8/MarketAPI.sol";
import { MarketTypes } from "filecoin-solidity-api/contracts/v0.8/types/MarketTypes.sol";
import { Errors } from "filecoin-solidity-api/contracts/v0.8/utils/Errors.sol";

contract MyFilecoinContract {
    function getDealTerm(uint64 dealID) public view returns (MarketTypes.GetDealTermReturn memory) {
        (int256 exitCode, MarketTypes.GetDealTermReturn memory result) = MarketAPI.getDealTerm(dealID);
        Errors.revertOnError(exitCode);
        return result;
    }
}
```

You can find the list of supported built-in actors and methods in the [Filecoin.sol documentation](../../reference/built-in-actors/filecoin.sol.md). You can access certain Filecoin-related features through these actors:

* `AccountAPI.sol`: validates signatures from an address.
* `MinerAPI.sol`: manages storage provider operation.
* `MarketAPI.sol`: manages storage deals on Filecoin.
* `PowerAPI.sol`: manages storage power for each storage provider and the whole network.
* `DataCapAPI.sol` and `VerifRegAPI.sol`: manages DataCap and verified clients for Filecoin Plus.

Unlike OpenZeppelin contracts, you do not need to inherit contracts to use their features. With Filecoin.sol you just need to call the methods from those solidity contracts:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import { MinerAPI } from "filecoin-solidity-api/contracts/v0.8/MinerAPI.sol";
import { CommonTypes } from "filecoin-solidity-api/contracts/v0.8/types/CommonTypes.sol";
import { MinerTypes } from "filecoin-solidity-api/contracts/v0.8/types/MinerTypes.sol";
import { Errors } from "filecoin-solidity-api/contracts/v0.8/utils/Errors.sol";

contract MinerQuery {
    function getVestingFunds(uint64 minerActorID) public view returns (MinerTypes.VestingFunds[] memory) {
        CommonTypes.FilActorId minerID = CommonTypes.FilActorId.wrap(minerActorID);
        (int256 exitCode, MinerTypes.VestingFunds[] memory vestingFunds) = MinerAPI.getVestingFunds(minerID);
        Errors.revertOnError(exitCode);
        return vestingFunds;
    }
}
```

Filecoin.sol also offers several utility libraries to help developers convert data types for different variables, including FIL addresses, big integers, actor IDs, and CBOR. Import only the utilities your contract uses. For example:

```solidity
import { Actor } from "filecoin-solidity-api/contracts/v0.8/utils/Actor.sol";
import { BigInts } from "filecoin-solidity-api/contracts/v0.8/utils/BigInts.sol";
import { FilAddresses } from "filecoin-solidity-api/contracts/v0.8/utils/FilAddresses.sol";
```

## Example

We can write a simple Solidity smart contract to query basic information for a Filecoin storage deal:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "filecoin-solidity-api/contracts/v0.8/MarketAPI.sol";
import "filecoin-solidity-api/contracts/v0.8/types/CommonTypes.sol";
import "filecoin-solidity-api/contracts/v0.8/types/MarketTypes.sol";
import "filecoin-solidity-api/contracts/v0.8/utils/Errors.sol";

contract StorageDealQuery {

    // Query the start epoch and duration, in epochs, of a deal proposal.
    function get_deal_term(uint64 dealID) public view returns (MarketTypes.GetDealTermReturn memory) {
        (int256 exitCode, MarketTypes.GetDealTermReturn memory result) = MarketAPI.getDealTerm(dealID);
        Errors.revertOnError(exitCode);
        return result;
    }

    // Query the storage provider who stores the data for this deal.
    function get_deal_provider(uint64 dealID) public view returns (uint64) {
        (int256 exitCode, uint64 result) = MarketAPI.getDealProvider(dealID);
        Errors.revertOnError(exitCode);
        return result;
    }

    // Query the collateral required from the storage provider for this deal proposal.
    function get_deal_provider_collateral(uint64 dealID) public view returns (CommonTypes.BigInt memory) {
        (int256 exitCode, CommonTypes.BigInt memory result) = MarketAPI.getDealProviderCollateral(dealID);
        Errors.revertOnError(exitCode);
        return result;
    }
}
```

#### Next steps

Check out these links to learn more about the Filecoin.sol library.

* [Filecoin-Solidity GitHub](https://github.com/filecoin-project/filecoin-solidity)
* [Built-In Actor APIs](../../reference/built-in-actors/filecoin.sol.md)
* [FEVM Hardhat Kit](https://github.com/filecoin-project/fevm-hardhat-kit/)



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/build/developing-contracts/filecoin.sol)
