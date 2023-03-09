---
title: "Using Filecoin.Solidity"
description: "Filecoin.Solidity provides solidity libraries to interact with Filecoin built-in actors."
lead: "Filecoin.Solidity is a set of Solidity libraries that allow developers to write Solidity smart contracts to seamlessly call exported methods of Filecoin built-in actors, as well as to access Filecoin specific syscalls idiomatically."
draft: false
images: []
type: docs
menu:
  smart-contracts:
    identifier: "filecoin-solidity-bff1cc77a90c8bea84857e1139981325"
weight: 110
toc: true

---

To leverage the provable storage of the Filecoin network through smart contracts running on FVM, Filecoin.Solidity library offers :

- Solidity Libraries to interact with Filecoin built-in actors

  Simplify the interaction with the Filecoin storage market, miner actors, verified registry for FIL+ automation, and more.

+ Filecoin-specific data types

  FilAddress, FilActorID, CID, storage deals, and more.

- OpenZeppelin-like utilities specific to Filecoin
- CBOR serialization and deserialization for params and return data

## Overview

In order to access exported Filecoin built-In actor methods in your smart contract, you will need to import Filecoin.Solidity in your solidity project. As they are embeddable libraries, they don't need to be present on the chain first. You can just import the library you desire and call its methods.

Once the library is installed in your project, you can write solidity codes to call APIs from different built-in actors, use Filecoin-specific data type, or data conversion from the utility library.

#### Installation

Run the following command in your solidity project, which is created using any smart contract development frameworks (hardhat, truffle, foundry, etc. ). 

```shell
npm install @zondax/filecoin-solidity
```

#### Usage

Once installed, you can call built-in actors in the library after importing them into your smart contract.

```solidity
// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@zondax/filecoin-solidity/contracts/v0.8/MarketAPI.sol";
import "@zondax/filecoin-solidity/contracts/v0.8/types/MarketTypes.sol";
import "@zondax/filecoin-solidity/contracts/v0.8/types/CommonTypes.sol";

contract MyFilecoinContract {
    ...
}
```

You can find the list of supported built-in actors and methods in [Zondax Filecoin.Solidity doc](https://docs.zondax.ch/fevm/filecoin-solidity/api/). In short, you can access certain Filecoin-related  features through those actors.

+ `AccountAPI.sol` - validates signature from an address
+ `MinerAPI.sol` - manages storage provider operation. 
+ `MarketAPI.sol` - manages storage deals on Filecoin.
+ `PowerAPI.sol` - manages storage power for each storage provider and the whole network.
+ `DataCap.sol` & `VerifRegAPI.sol` - manages DataCap and verified clients for Filecoin Plus.

Unlike OpenZeppelin contracts, you do not need to inherit contracts to use their features. With Filecoin.Solidity, you just need to simply call the methods from those solidity contracts. 

```solidity
CommonTypes.FilActorId minerID = CommonTypes.FilActorId.wrap(1130);
CommonTypes.BigInt memory returnData = MinerAPI.getVestingFunds(minerID);
```

Filecoin.Solidity also offers several utility libraries to help developers to convert data types for various variables, including FILAddress, BigIntegers, ActorID, CBOR, etc. You can import those libraries from the utils folder.

```solidity
import "@zondax/filecoin-solidity/contracts/v0.8/utils/Actor.sol";
import "@zondax/filecoin-solidity/contracts/v0.8/utils/BigInts.sol";
import "@zondax/filecoin-solidity/contracts/v0.8/utils/FilAddresses.sol";
```

#### Example

We can write a simple solidity smart contract to query basic information for a Filecoin Storage Deal. 

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@zondax/filecoin-solidity/contracts/v0.8/MarketAPI.sol";
import "@zondax/filecoin-solidity/contracts/v0.8/types/MarketTypes.sol";
import "hardhat/console.sol";

contract StorageDealQuery {

    //Query the start epoch and duration(in epochs) of a deal proposal.
    function get_deal_term(uint64 dealID) public returns (MarketTypes.GetDealTermReturn memory) {
        return MarketAPI.getDealTerm(dealID);
    }

    //Query the storage provider who store the date for this deal.
    function get_deal_provider(uint64 dealID) public returns (uint64) {
        return MarketAPI.getDealProvider(dealID);
    }

    //Query the collateral required from storage provider for this deal proposal.
    function get_deal_provider_collateral(uint64 dealID) public returns (CommonTypes.BigInt memory) {
        return MarketAPI.getDealProviderCollateral(dealID);
    }
    
}
```

## Learn More

- [Filecoin-Solidity GitHub](https://github.com/Zondax/filecoin-solidity)
- [Docs](https://docs.zondax.ch/fevm/filecoin-solidity/)
- [Built-In Actor APIs](https://docs.zondax.ch/fevm/filecoin-solidity/api/)
- [FEVM-Hardhat-Kit](https://github.com/filecoin-project/FEVM-Hardhat-Kit/)
