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

There are several relayers available that support meta transactions on the Filecoin network. Builders can integrate these relayers into their applications today.

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

Depending on the method, you must inherit different contracts as they will provide other methods. In this case, we will have to inherit the `ERC2771Context`. The `ERC2771Context` provide us with the methods `_msgSender()` and `_msgData()` that will allow us to recover the original user sending the transaction.

```solidity
import {
    ERC2771Context
} from "@gelatonetwork/relay-context/contracts/vendor/ERC2771Context.sol";

contract CounterERC2771 is ERC2771Context {

    // ERC2771Context: setting the immutable trustedForwarder variable
    constructor(address trustedForwarder) ERC2771Context(trustedForwarder) {}

    function incrementContext() external {

        // Incrementing the counter mapped to the _msgSender!
        contextCounter[_msgSender()]++;

        // Emitting an event for testing purposes
        emit IncrementContextCounter(_msgSender());
    }
}
```

#### Step 2: Import the relay SDK

In your frontend/backend, you would need to import and instantiate the relay class.

```
import { GelatoRelay, SponsoredCallERC2771Request } from "@gelatonetwork/relay-sdk";
const relay = new GelatoRelay(API_KEY);
```

#### Step 3: Send the payload to Gelato

This is an example using Gelato's CounterERC2771.sol, which is deployed on these networks.

```
// Set up on-chain variables, such as target address
const counter = "0x00172f67db60E5fA346e599cdE675f0ca213b47b";
const abi = ["function incrementContext()"];
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = provider.getSigner();
const user = signer.getAddress();

// Generate the target payload
const contract = new ethers.Contract(counter, abi, signer);
const { data } = await contract.incrementContext.populateTransaction();

// Populate a relay request
const request: CallWithERC2771Request = {
  chainId: (await provider.getNetwork()).chainId,
  target: counter;
  data: data;
  user: user;
};

// Without a specific API key, the relay request will fail!
// Go to https://relay.gelato.network to get a testnet API key with 1Balance.
// Send a relay request using Gelato Relay!
const relayResponse = await relay.sponsoredCallERC2771(request, provider, apiKey);
```

#### Further Gelato resources

* [Gelato Relay Docs](https://docs.gelato.network/web3-services/relay)
* [What is 1Balance?](https://docs.gelato.network/web3-services/1balance)
* [YouTube - ERC2771](https://www.youtube.com/watch?v=P6LlzSzta1Q)
* [YouTube - non-ERC2771](https://youtu.be/shqLPDerunY)
* [GitHub Repository](https://github.com/gelatodigital/how-tos-5-6-7-8-relay-intro-methods)
