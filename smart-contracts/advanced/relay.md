---
description: >-
  Relay is a service that allows users to interact with the Filecoin network using meta transactions. Users can submit transactions to the network without having to pay gas fees. Instead, a relayer pays the gas fees on behalf of the user. This enables users to interact with the network without having to hold FIL tokens or manage their own wallets.
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

- Highlight.xyz: Allows users to mint NFTs without incurring gas fees.
- ZED RUN: Automates breeding processes for digital racehorses.
- Reya: Enable gasless trading on the platform

#### Off-chain and on-chain payments

Transactions can be paid for in two primary ways: off-chain payments and on-chain payments. Each method offers flexibility depending on how developers wish to handle transaction fees for their users.

##### Off-chain payments

- **SponsoredCallERC2771**: In this method, Gelato uses the ERC-2771 meta-transaction standard to allow gasless transactions. The user signs a message, and the relay service covers the gas fees. ERC-2771Context ensures that the user’s identity is verified off-chain, by encoding the user’s address in the last 20 bytes of the transaction. This provides a secure, gasless experience where Gelato, using its 1Balance, sponsors the transaction fee.

- **SponsoredCall**: When there is no need for ERC-2771's off-chain signature verification, this more flexible method can be used. The transaction fees are still covered by the sponsor using 1balance, but the responsibility for managing security measures such as signature validation and replay protection lies with the project. This option is ideal for use cases that already have built-in security mechanisms.

##### On-chain payments

- **callWithSyncFeeERC2771**: This method combines ERC-2771 meta-transaction functionality with Gelato’s SyncFee model. The user’s gas fee is calculated and paid directly from the smart contract during the transaction execution. Gelato’s Fee Oracle estimates the fee in real-time, and the GelatoRelayContext contract automatically handles the fee transfer. This is ideal for developers who want to maintain user signature verification while ensuring users cover their transaction costs.

- **callWithSyncFee**: This method is similar to callWithSyncFeeERC2771 but without the need for ERC-2771’s off-chain signature verification. The user’s gas fee is calculated and paid directly from the target smart contract during the transaction execution. This approach is useful for applications where users are expected to pay for their own gas without requiring meta-transaction features.

#### Further Gelato resources

- [Gelato Relay Docs](https://docs.gelato.network/web3-services/relay)
- [What is 1Balance?](https://docs.gelato.network/web3-services/1balance)
- [YouTube - ERC2771](https://www.youtube.com/watch?v=P6LlzSzta1Q)
- [YouTube - non-ERC2771](https://youtu.be/shqLPDerunY)
- [GitHub Repository](https://github.com/gelatodigital/how-tos-5-6-7-8-relay-intro-methods)
