---
description: >-
  Send gasless transactions on Filecoin with Gelato Relay and
  sponsoredCallERC2771, so your users can use your app without holding FIL.
---

# Relay

**A meta-transaction lets a user act onchain without paying gas. The user signs a message, and a third party called a relayer submits it and pays the gas. The user doesn't need FIL.**

It describes a third-party service, Gelato Relay.

Relayer support and contract addresses change over time. Before you deploy on [Mainnet](../../networks/mainnet.md) or [Calibration](../../networks/calibration.md), check that your network is on the relayer's [supported networks](https://docs.gelato.cloud/relay/additional-resources/supported-networks) page, and use the trusted forwarder address listed for it.

## Gelato Relay

[Gelato](https://gelato.network/) submits meta-transactions for you. If your contract uses a relay context contract, such as `ERC2771Context` or `GelatoRelayContext`, users can use your app without native tokens. The signature is validated with EIP-712.

The gas fee is paid in one of two ways.

**Offchain payment, by a sponsor:**

* **`SponsoredCallERC2771`.** The user signs a message, and the sponsor covers the gas from its Gelato 1Balance. ERC-2771 appends the user's address to the call data, so your contract can read who signed.
* **`SponsoredCall`.** The same, but without ERC-2771 signature checks. Your project has to handle signature validation and replay protection itself.

**Onchain payment, from the contract:**

* **`callWithSyncFeeERC2771`.** The fee is calculated in real time by Gelato's fee oracle and paid from your contract during execution. The user's signature is still verified with ERC-2771.
* **`callWithSyncFee`.** The same, without ERC-2771.

Teams have used relays to let users mint NFTs without gas, to automate in-game processes, and to enable gasless trading.

## Implement `sponsoredCallERC2771`

This is the most used method. It takes three steps.

### 1. Inherit the context contract

Inherit `ERC2771Context`. It provides `_msgSender()` and `_msgData()`, which recover the original user:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {
    ERC2771Context
} from "@gelatonetwork/relay-context/contracts/vendor/ERC2771Context.sol";

contract CounterERC2771 is ERC2771Context {
    mapping(address => uint256) public contextCounter;

    event IncrementContextCounter(address indexed account, uint256 value);

    // ERC2771Context: setting the immutable trustedForwarder variable
    constructor(address trustedForwarder) ERC2771Context(trustedForwarder) {}

    function incrementContext() external {
        address sender = _msgSender();
        uint256 nextValue = contextCounter[sender] + 1;

        // Increment the counter for the original sender
        contextCounter[sender] = nextValue;

        emit IncrementContextCounter(sender, nextValue);
    }
}
```

Deploy the contract with the trusted forwarder for your relay method and network.

### 2. Import the relay SDK

In your frontend or backend, create the relay object:

```typescript
import {
  GelatoRelay,
  type CallWithERC2771Request,
} from "@gelatonetwork/relay-sdk";

const relay = new GelatoRelay();
```

### 3. Send the request

Replace the counter address and API key with values for your deployed contract and a supported network. You need an API key with 1Balance funding from the [Gelato app](https://app.gelato.cloud). Without one, the request fails.

```typescript
import { ethers } from "ethers";

const counter = "0x00172f67db60E5fA346e599cdE675f0ca213b47b";
const abi = ["function incrementContext() external"];
const apiKey = process.env.NEXT_PUBLIC_GELATO_RELAY_API_KEY;

if (!apiKey) {
  throw new Error("Missing Gelato Relay API key");
}

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const user = await signer.getAddress();

// Generate the target payload
const contract = new ethers.Contract(counter, abi, signer);
const { data } = await contract.incrementContext.populateTransaction();

// Populate and send the relay request
const request: CallWithERC2771Request = {
  chainId: (await provider.getNetwork()).chainId,
  target: counter,
  data,
  user,
};

const relayResponse = await relay.sponsoredCallERC2771(request, provider, apiKey);
```

More: the [Gelato Relay documentation](https://docs.gelato.cloud/relay/erc2771-recommended/sponsoredcall-erc2771) and the [how-to repository](https://github.com/gelatodigital/how-tos-5-6-7-8-relay-intro-methods).

## Related pages

* [Contract automation](contract-automation.md): run contracts on a schedule or event.
* [Gas](../gas.md): how gas is charged and estimated.
* [FVM advanced](README.md): tools and services for FVM developers.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/fvm/advanced/relay)
