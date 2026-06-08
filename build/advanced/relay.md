---
description: >-
  Relay is a service that allows users to interact with the Filecoin network
  using meta transactions. Users can submit transactions to the network without
  having to pay gas fees. Instead, a relayer pays
---

# Relay

## Meta Transactions

Meta transactions are a type of transaction that allows users to interact with the Filecoin network without having to pay for gas fees. Instead, a third party, known as a relayer, pays the gas fees on behalf of the user. This enables users to interact with the network without having to hold FIL tokens or manage their own wallets.

## Available relayers

Relayer support and contract addresses change over time. Before deploying a Filecoin Mainnet or Calibration integration, verify that your target network is listed in the relayer's current supported-network documentation and use the current trusted forwarder or relay contract address for that network.

### [Gelato](https://gelato.network/)

Relay services, like Gelato Relay, act as intermediaries that handle the submission of meta-transactions to the blockchain. By integrating relay contracts (such as GelatoRelayContext or ERC2771Context) into a smart contract, developers can enable gasless transactions. This allows users to interact with decentralized applications without holding native tokens, while maintaining security through features like EIP-712 signature validation.

The relayer ensures the transaction is executed securely and promptly, handling the gas fee payment either off-chain (via a sponsor) or on-chain (with the user’s funds). This system simplifies blockchain interactions, broadening accessibility and reducing friction for dapp users.

### Use cases

* Highlight.xyz: Allows users to mint NFTs without incurring gas fees.
* ZED RUN: Automates breeding processes for digital racehorses.
* Reya: Enable gasless trading on the platform

#### Off-chain and on-chain payments

Transactions can be paid for in two primary ways: off-chain payments and on-chain payments. Each method offers flexibility depending on how developers wish to handle transaction fees for their users.

**Off-chain payments**

* **SponsoredCallERC2771**: In this method, Gelato uses the ERC-2771 meta-transaction standard to allow gasless transactions. The user signs a message, and the relay service covers the gas fees. ERC-2771Context ensures that the user’s identity is verified off-chain, by encoding the user’s address in the last 20 bytes of the transaction. This provides a secure, gasless experience where Gelato, using its 1Balance, sponsors the transaction fee.
* **SponsoredCall**: When there is no need for ERC-2771's off-chain signature verification, this more flexible method can be used. The transaction fees are still covered by the sponsor using 1balance, but the responsibility for managing security measures such as signature validation and replay protection lies with the project. This option is ideal for use cases that already have built-in security mechanisms.

**On-chain payments**

* **callWithSyncFeeERC2771**: This method combines ERC-2771 meta-transaction functionality with Gelato’s SyncFee model. The user’s gas fee is calculated and paid directly from the smart contract during the transaction execution. Gelato’s Fee Oracle estimates the fee in real-time, and the GelatoRelayContext contract automatically handles the fee transfer. This is ideal for developers who want to maintain user signature verification while ensuring users cover their transaction costs.
* **callWithSyncFee**: This method is similar to callWithSyncFeeERC2771 but without the need for ERC-2771’s off-chain signature verification. The user’s gas fee is calculated and paid directly from the target smart contract during the transaction execution. This approach is useful for applications where users are expected to pay for their own gas without requiring meta-transaction features.

### Implementation

We will require three simple steps to implement Gelato Relay. Here, we are going to showcase the three steps required to implement the method `sponsoredCallERC2771`, which is the most used one.

#### Step 1: Inherit Context Contract

Depending on the method, you must inherit different contracts as they will provide other methods. In this case, we will have to inherit the `ERC2771Context`. The `ERC2771Context` provides us with the methods `_msgSender()` and `_msgData()` that will allow us to recover the original user sending the transaction.

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

        // Incrementing the counter mapped to the _msgSender!
        contextCounter[sender] = nextValue;

        // Emitting an event for testing purposes
        emit IncrementContextCounter(sender, nextValue);
    }
}
```

#### Step 2: Import the relay SDK

In your frontend or backend, import and instantiate the relay class. For ERC-2771 calls, deploy your contract with the trusted forwarder for the relay method and network you are targeting. Check Gelato's [supported networks](https://docs.gelato.cloud/relay/additional-resources/supported-networks) page before deploying.

```typescript
import {
  GelatoRelay,
  type CallWithERC2771Request,
} from "@gelatonetwork/relay-sdk";

const relay = new GelatoRelay();
```

#### Step 3: Send the payload to Gelato

This is a TypeScript skeleton for sending a `sponsoredCallERC2771` request. Replace the counter address, trusted forwarder, and API key with values for your deployed contract and supported target network.

```typescript
import { ethers } from "ethers";

// Set up on-chain variables, such as target address
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

// Populate a relay request
const request: CallWithERC2771Request = {
  chainId: (await provider.getNetwork()).chainId,
  target: counter,
  data,
  user,
};

// Without a specific API key, the relay request will fail!
// Go to https://app.gelato.cloud to get an API key with 1Balance funding.
// Send a relay request using Gelato Relay!
const relayResponse = await relay.sponsoredCallERC2771(request, provider, apiKey);
```

#### Further Gelato resources

* [Gelato Relay Docs](https://docs.gelato.cloud/relay/erc2771-recommended/sponsoredcall-erc2771)
* [Gelato Supported Networks](https://docs.gelato.cloud/relay/additional-resources/supported-networks)
* [GitHub Repository](https://github.com/gelatodigital/how-tos-5-6-7-8-relay-intro-methods)
