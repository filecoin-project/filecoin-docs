---
description: >-
  Use the Filecoin.sol Solidity library to call built-in actors such as Market
  and Miner from your contracts. Install, import and example calls.
---

# Filecoin.sol

**Filecoin.sol is a Solidity library that lets your contracts call Filecoin's built-in actors and convert Filecoin-specific data types. It is embedded in your contract at compile time, so nothing needs to be deployed onchain.**

Filecoin.sol and Filecoin Solidity are the same library. The GitHub repository is named `filecoin-solidity` and the npm package is `filecoin-solidity-api`, but this page and the rest of the docs call it Filecoin.sol.

With Filecoin.sol you can:

* Call [built-in actors](../concepts/actors.md), including the storage market, storage provider and power actors.
* Use Filecoin data types such as `FilAddress`, `FilActorId` and `Cid`.
* Encode and decode the CBOR that actors use for parameters and return data.
* Use utilities for Filecoin addresses, big integers and actor IDs.

## Install

In a Solidity project created with a framework such as Hardhat or Foundry, run:

```shell
npm install filecoin-solidity-api
```

It works on Filecoin [Mainnet](../networks/mainnet.md) and [Calibration](../networks/calibration.md). For local development, use a Filecoin EVM-compatible local network that exposes the same built-in actor precompiles.

## Use it

Import the API for the actor you want, then call its methods. Each method returns an exit code and a result. Check the exit code with `Errors.revertOnError`:

```solidity
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

You don't inherit from these libraries, as you would with OpenZeppelin. You call their methods directly. The actor APIs are:

| File | What it does |
| --- | --- |
| `AccountAPI.sol` | Validates signatures from an address |
| `MinerAPI.sol` | Reads and manages a storage provider |
| `MarketAPI.sol` | Reads storage deals |
| `PowerAPI.sol` | Reads storage power for a provider and for the network |
| `PrecompilesAPI.sol` and `SendAPI.sol` | Wrap the Filecoin [precompiles](precompiles.md) and send FIL to an actor |
| `DataCapAPI.sol` and `VerifRegAPI.sol` | Wrap the DataCap and verified registry actors. See the note below |

{% hint style="warning" %}
Since the Solstice upgrade on 19 October 2026, DataCap and the verified registry are deprecated and their state-changing methods are disabled. Don't build on `DataCapAPI.sol` or `VerifRegAPI.sol`. See [Manual storage deals](../manual-storage-deals.md#datacap-and-verified-deals).
{% endhint %}

Here is a second example, which reads a storage provider's vesting funds:

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

The library also has utilities for converting data types. Import only the ones you use:

```solidity
import { Actor } from "filecoin-solidity-api/contracts/v0.8/utils/Actor.sol";
import { BigInts } from "filecoin-solidity-api/contracts/v0.8/utils/BigInts.sol";
import { FilAddresses } from "filecoin-solidity-api/contracts/v0.8/utils/FilAddresses.sol";
```

## Next steps

* [Built-in actor API reference](../../reference/built-in-actors/filecoin.sol.md)
* [Filecoin.sol source on GitHub](https://github.com/filecoin-project/filecoin-solidity)
* [Filecoin EVM runtime](filecoin-evm-runtime.md): what Ethereum compatibility covers on Filecoin.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/fvm/filecoin.sol)
