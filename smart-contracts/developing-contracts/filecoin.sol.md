---
description: >-
  External Solidity libraries can help developers create their applications
  quicker by offloading some of the work to already existing smart contracts.
---

# Filecoin.sol

The Filecoin Solidity library allows developers to:

* Interact with Filecoin built-in actors.
* Simplify the interaction with the Filecoin storage market, miner actors, the verified registry for Filecoin Plus automation, and more.
* Filecoin-specific data types such as `FilAddress`, `FilActorID`, `CIDs`, storage deals, and more.
* OpenZeppelin-like utilities specific to Filecoin.
* CBOR serialization and deserialization for parameters and return data.

In order to access exported Filecoin built-in actor methods in your smart contract, you will need to import Filecoin.sol in your Solidity project. As they are embeddable libraries, they don’t need to be present on-chain. You can just import the library you desire and call its methods.

Once the library is installed in your project, you can write Solidity code to call APIs from different built-in actors using Filecoin-specific data types or data conversions from the utility library.

## Add to your contract

Run the following command in your Solidity project, which is created using any smart contract development framework such as Hardhat, Truffle, or Foundry.

```shell
npm install filecoin-solidity-api
```

## Usage

Once installed, you can call built-in actors in the library after importing them into your smart contract.

```solidity
// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { MarketAPI } from "filecoin-solidity-api/contracts/v0.8/MarketAPI.sol";
import { CommonTypes } from "filecoin-solidity-api/contracts/v0.8/types/CommonTypes.sol";
import { MarketTypes } from "filecoin-solidity-api/contracts/v0.8/types/MarketTypes.sol";
import { BigIntCBOR } from "filecoin-solidity-api/contracts/v0.8/cbor/BigIntCbor.sol";

contract MyFilecoinContract {
    ...
}
```

You can find the list of supported built-in actors and methods in the [Filecoin.sol documentation](../../reference/built-in-actors/filecoin.sol.md). You can access certain Filecoin-related features through these actors:

* `AccountAPI.sol`: validates signatures from an address.
* `MinerAPI.sol`: manages storage provider operation.
* `MarketAPI.sol`: manages storage deals on Filecoin.
* `PowerAPI.sol`: manages storage power for each storage provider and the whole network.
* `DataCap.sol` and `VerifRegAPI.sol`: manages DataCap and verified clients for Filecoin Plus.

Unlike OpenZeppelin contracts, you do not need to inherit contracts to use their features. With Filecoin.sol you just need to call the methods from those solidity contracts:

```solidity
CommonTypes.FilActorId minerID = CommonTypes.FilActorId.wrap(1130);
CommonTypes.BigInt memory returnData = MinerAPI.getVestingFunds(minerID);
```

Filecoin.sol also offers several utility libraries to help developers to convert data types for different variables, including FILAddress, BigIntegers, ActorID, and CBOR. You can import those libraries from the `utils` folder:

```solidity
import "filecoin-solidity-api/contracts/v0.8/utils/Actor.sol";
import "filecoin-solidity-api/contracts/v0.8/utils/BigInts.sol";
import "filecoin-solidity-api/contracts/v0.8/utils/FilAddresses.sol";
```

## Example

We can write a simple Solidity smart contract to query basic information for a Filecoin storage deal:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "filecoin-solidity-api/contracts/v0.8/MarketAPI.sol";
import "filecoin-solidity-api/contracts/v0.8/types/MarketTypes.sol";
import "hardhat/console.sol";

contract StorageDealQuery {

    // Query the start epoch and duration(in epochs) of a deal proposal.
    function get_deal_term(uint64 dealID) public returns (MarketTypes.GetDealTermReturn memory) {
        return MarketAPI.getDealTerm(dealID);
    }

    // Query the storage provider who stores the date for this deal.
    function get_deal_provider(uint64 dealID) public returns (uint64) {
        return MarketAPI.getDealProvider(dealID);
    }

    // Query the collateral required from the storage provider for this deal proposal.
    function get_deal_provider_collateral(uint64 dealID) public returns (CommonTypes.BigInt memory) {
        return MarketAPI.getDealProviderCollateral(dealID);
    }
    
}
```

#### Next steps

Check out these links to learn more about the Filecoin.sol library.

* [Filecoin-Solidity GitHub](https://github.com/filecoin-project/filecoin-solidity)
* [Built-In Actor APIs](../../reference/built-in-actors/filecoin.sol.md)
* [FEVM-Hardhat-K](https://github.com/filecoin-project/FEVM-Hardhat-Kit/)



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/smart-contracts/developing-contracts/filecoin.sol)
