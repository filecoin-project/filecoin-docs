---
description: >-
  Onboard data from any Ethereum-compatible L1 to Filecoin using cross-chain
  data bridge.
---

# Cross-Chain Data Bridge(CCDB)

## Introduction

As one of the leading decentralized storage networks, Filecoin is designed to store and safeguard large volumes of data in a distributed and censorship-resistant manner. With the addition of the Filecoin Virtual Machine (FVM), programmatic storage is now available on Filecoin and enables fully trustless, on-chain storage deal-making. It will open up opportunities for Filecoin to offer its verifiable storage service to other smart contract platforms like Ethereum, Polygon, Avalanche, and other EVM-compatible blockchains.

In the context of decentralized storage, Cross-chain Data Bridge (AKA onramp contract) allows applications on EVM-compatible blockchains (such as Ethereum, Avalanche, Polygon, Linea, etc.) to seamlessly store data on Filecoin’s decentralized storage network without users interacting directly with Filecoin.

The process includes escrowed payments on the source chain, data preparation and aggregation for Filecoin storage deals, and cross-chain proof validation before payment release.

This tutorial will guide you through:

* Understanding the architecture and workflow of the data bridge.
* Setting up connections from any EVM-compatible source chain.
* Uploading data to Filecoin via the bridge.
* Hands-on code examples.

## Architecture Overview

A combination of on-chain contracts and off-chain services powers the cross-chain data bridge. At a high level, it consists of:

1. [**Smart contracts**](https://github.com/FIL-Builders/onramp-contracts)
   * **OnRamp Contract (Source Chain – Any EVM Chain)**
     * This smart contract receives storage requests from users.
     * Verifies the data aggregation proof.
     * It holds the user’s payment in escrow and emits an event for off-chain agents.
   * **Oracle Contract (Source Chain – Same EVM Chain)**
     * Receives storage confirmations from Filecoin.
     * Validates proofs and triggers the OnRamp to release escrowed funds.
   * **Prover Contract (Destination Chain – Filecoin Network)**
     * Verifies storage deals sealed on Filecoin.
     * Sends attestations (proofs) back to the source chain via a cross-chain messaging layer.
   * **Cross-Chain Messaging Bridge (e.g, Axelar)**
     * The system uses the Axelar network to transport messages between Avalanche and Filecoin.
2. [**xChain Client (Off-Chain Agent)**](https://github.com/FIL-Builders/xchainClient)
   * Monitors the OnRamp contract for new data offers.
   * Handles file packaging (CAR file creation), CommP calculation, and deal submission to Filecoin.
   * It can also serve as a storage buffer for storage providers to retrieve data to make storage deals on Filecoin.

### High-Level Workflow

<figure><img src="../../.gitbook/assets/CCDB.gif" alt=""><figcaption></figcaption></figure>

The bridge’s workflow can be summarized in a multi-step process:

1. **Upload Data**: A user submits a storage offer to the OnRamp contract on their EVM-compatible chain.
2. **Data Aggregation**: The xChain client detects the offer from smart contract events, fetches the data, aggregates smaller data into a big piece, and sends the proof of aggregation back to the onramp contract.
3. **Filecoin storage deal making**: The xChain client will send the storage deal proposal to the storage providers either through an on-chain smart contract or an off-chain process.
4. **Bridging Proofs**: Once Filecoin confirms the data is stored, the Prover contract will receive the deal notification automatically and emit a proof via the Axelar cross-chain messaging network.
5. **Payment Release**: The Oracle contract on the source chain verifies the proof and instructs the OnRamp to release payment.

Each component plays a vital role in ensuring trust-minimized and seamless data storage between chains. This modular design also makes the bridge extensible—one could integrate a different messaging layer or deal aggregator without changing the overall flow.

## Using the Bridge to store data

Now that we understand the architecture, let’s see how to interact with the cross-chain bridge as a developer. We will use the Avalanche Fuji testnet as an example. We will cover how to connect to an existing bridge deployment, upload data from Avalanche to Filecoin step-by-step, and what tools or SDKs are involved.

**Pre-Requisites**

* **RPC endpoints** for your source EVM chain (e.g., Avalanche Fuji).
* **Wallet** with enough native tokens (FIL & AVAX) and ERC-20 tokens for fees and storage payments.
* Access to OnRamp and Oracle contracts on Avalanche Fuji & Prover contract on the Filecoin network.
  * In this tutorial, we are going to use the pre-deployed contracts on Avalanche and Filecoin. The details are [here](ccdb.md#deployed-contracts-info).
  * In any case, if you need to deploy your version. Please follow the [deployment instructions](https://github.com/fil-builders/onramp-contracts?tab=readme-ov-file#-getting-started) on GitHub.

### Step 1: Connect to Existing Bridge

To use the cross-chain data bridge, you must interact with the deployed smart contracts on your desired source chain (e.g., Avalanche) and Filecoin. OnRamp (and related) contracts have been deployed on the Avalanche Fuji testnet and the Filecoin Calibration testnet in a development or test environment. You can connect to those networks and call the contracts directly without deploying your own.

To store data to Filecoin from your UI code, you must configure the following parameters so your project can interact with the onramp contract on the source chain (e.g., Avalanche).

* Wallet Connection to Metamask so you can use Fuji testnet configs and wallet with AVAX test tokens.
* Onramp contract details are deployed on one source chain (e.g., Avalanche).
  * `ONRAMP_CONTRACT_ADDRESS`: `0xeE857540dddB6E6EA10a5c84f57562F11D5Fb47D`
  * `ONRAMP_CONTRACT_ABI`: retrieve from [here](https://github.com/FIL-Builders/dataBridgeDemo/blob/ea9c6bcecaa6ea0b96a92e00dd148b69a141a8df/components/contracts/onrampContract.tsx#L3).

The OnRamp is an EVM-compatible contract, so standard Ethereum libraries (ethers.js, web3.js, etc.) will work.

### Step 2: Prepare Data and Submit Offer

Interacting with the bridge to store data involves a few steps, both on-chain and off-chain. Overall, we need to prepare a data offer structure to send to the onramp contract by calling `offerData(Offer calldata offer)`.

```solidity
struct Offer {
        bytes commP;
        uint64 size;
        string location;
        uint256 amount;
        IERC20 token;
        OfferStatus status;
    }
```

1. **Choose or upload the file you want to store**
2.  **Generate a CommP (Piece Commitment)**

    Ideally, you will generate a [CommP (Piece Commitment)](https://spec.filecoin.io/systems/filecoin_files/piece/#section-systems.filecoin_files.piece) for your data, which is a hash that uniquely represents the piece of data in Filecoin’s format. You can use [@web3-storage/data-segment](https://www.npmjs.com/package/@web3-storage/data-segment) library to generate CommP for your data.

    ```javascript
    //Generate Commp from a given file
    export async function generateCommp(file: File) {
        const bytes = new Uint8Array(await file.arrayBuffer());
        //Using the Piece Info to get the legacy coding for CID
        const piece = Piece.fromPayload(bytes).toInfo();
        return piece;
    }
    ```

    Once the _CommP_ is generated, you can get the pieceCid and pieceSize for calling the onramp contract.

    ```jsx
    const commP = await generateCommp(file);

    //commp & size for making offer struct
    const pieceCid = commP.link.bytes;
    const pieceSize = commP.size;
    ```
3.  **Upload your data to a buffer (e.g. IPFS)**

    Your data must be uploaded to a buffer before the data is aggregated and sent to Filecoin storage providers. We use IPFS as a storage buffer and will provide a link to download the data.

    One of the options for uploading data to IPFS is the [Pinata](https://pinata.cloud/) IPFS pinning service.

    ```jsx
    const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: fileData,
    });

    //CID of your data
    const fileCid = resData?.IpfsHash;

    //the buffer URL for Offer struct
    const ipfsU = 'https://gateway.pinata.cloud/ipfs/'+ fileCid
    ```
4.  **Approve the OnRamp contract to spend the chosen ERC-20 token (for payment).**

    If you want to add ERC20 tokens on Avalanche as a payment for storage data on Filecoin as an extra incentive, you can specify the ERC20 token address and amount you want to pay. These tokens will be escrowed in the onramp contract temperately, and they will be released to the payout address once the data is proven stored on Filecoin.

    Make sure you approve the OnRamp contract to spend the chosen ERC-20 token before you invoke the OnRamp contract.

    ```jsx
    const TOKEN_ADDRESS = "0x...";       // ERC-20 token (payment token) on Avalanche
    const paymentToken = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, signer);
    const paymentAmount = ethers.utils.parseUnits("10", 18);  // e.g. 10 tokens (assuming 18 decimals)

    // 2. Approve the OnRamp contract to pull payment
    await paymentToken.approve(ONRAMP_ADDRESS, paymentAmount);
    console.log("Payment approved");
    ```
5.  **Call the `offerData(...)` function on the OnRamp contract.**

    Now, we have prepare the data to make an offer struct to send it to OnRamp contract for Filecoin storage deals.

    ```jsx
    //Making offer struct
    const offer = {
      commP: ethers.hexlify(pieceCid) as `0x${string}`,
      size: BigInt(pieceSize),
      cid: fileCid.toString(),
      location: ipfsURL,
      amount: BigInt(0),
      token: PAYMENT_TOKEN_ADDRESS as `0x${string}`,
    };
    ```

    Then we can call the Onramp contract on Avalanche to initialize the Filecoin storage process, using the contract feature from [wagmi](https://wagmi.sh/react/api/hooks/useWriteContract).

    ```jsx
    writeContract({
      address: ONRAMP_CONTRACT_ADDRESS,
      abi: ONRAMP_CONTRACT_ABI,
      functionName: 'offerData',
      args: [offer],
    });
    ```

We are already done sending the data from the source chain (e.g., Avalanche) to store on Filecoin.

Once the offer is recorded on-chain, the xChain Client and Filecoin storage providers will process the storage deal on Filecoin and send the storage proof back to the source chain (e.g., Avalanche).

{% hint style="info" %}
Step 3 and 4 explain how the xChain client & Filecoin are handling cross-chain data storage and proofing. Avalanche dApp builders do not need to implement it.
{% endhint %}

### Step 3: xChain Client Processes the Offer

* The xChain client listens to `DataReady()` events emitted by the OnRamp contract.
* It aggregates the data, calculates CommP if needed, and submits a storage deal to the Filecoin network for storage providers to process.
* Deals may be aggregated for efficiency.

### Step 4: Proof Delivery & Payment Release

* Once Filecoin confirms the storage (deal sealed) on-chain, the Filecoin built-in actor will automatically notify the Prover contract and emit proof of attestation.
* This proof is sent via the cross-chain messaging layer (e.g, Axelar) to the Oracle contract on your source chain (e.g, Avalanche).
* The Oracle calls the `OnRamp.proveDataStored(...)` to prove that the data is stored and releases payment to the payout address.
* The offer status in the Onramp contract will be updated once proven.

### Step 5: Storage Confirmation

The storage should be completed after some time (depending on the speed of the Filecoin deal sealing and any batching delays). We can verify this in a couple of ways.

* **Listen for the Onramp event:** If we had the Onramp contract’s address/ABI, we could listen for a `ProveDataStored` event which fires when the proof comes back.
*   **Poll the OnRamp contract:**

    * If your application is tracking the offer ID, it can call a view function like `getOfferDetails(uint64 offerId)` or `getOfferStatus(uint64 offerId)` on the OnRamp contract to confirm that the status of a specific offer ID.
    * If not, your application can always retrieve all the data offers sent by a clients by calling `getClientOffers(address client)` on the OnRamp contract.

    ```jsx

    const ONRAMP_ADDRESS = "0x...";      // OnRamp contract on Avalanche
    const ONRAMP_ABI = [ /* ... offerData ABI ... */ ];
    // Initialize contract objects
    const onRamp = new ethers.Contract(ONRAMP_ADDRESS, ONRAMP_ABI, signer);

    const status = await onRamp.getOfferStatus(offerId);
    ```

You can also refer to this [dataBridgeDemo repo](https://github.com/FIL-Builders/dataBridgeDemo) as a reference for the implementation of storing your application data on Avalanche to the Filecoin network.

## Best Practices

When using a cross-chain data bridge in production or advanced projects, keep in mind the following best practices to ensure security and efficiency:

* **Chain-Agnostic Integration:** The contracts work across any EVM-compatible chain. Always check that you are connected to the correct RPC endpoint.
* **Token Approvals:** Ensure sufficient allowance is given to the OnRamp contract for ERC-20 tokens.
* **Data Handling and Privacy:** All data sent through this system will be stored on a public decentralized network. If your application deals with sensitive data, **encrypt** the files before offering them to the bridge.
* **Monitoring:** Implement monitoring of Oracle events and OnRamp status for better UX.
* **Stay Updated:** The cross-chain storage tooling is evolving rapidly. Keep an eye on updates to the FIL-Builders onramp repositories and related documentation from [here](ccdb.md#references).

By following these steps, you can integrate Filecoin storage into any EVM-compatible blockchain application via this cross-chain bridge.

## Deployed Contracts Info

Source Chain - Avalanche Fuji testnet

* Onramp.sol: [0xeE857540dddB6E6EA10a5c84f57562F11D5Fb47D](https://subnets-test.avax.network/c-chain/address/0xeE857540dddB6E6EA10a5c84f57562F11D5Fb47D)
* Oracle.sol: [0x476eE57404BD06c957a9BB6BF31216BFFa32dE18](https://subnets-test.avax.network/c-chain/address/0x476eE57404BD06c957a9BB6BF31216BFFa32dE18)

Destination Chain - Filecoin Calibration testnet

* Prover.sol: [0x75c9C9fAC04C696820260CC0bE4201859ff85397](https://calibration.filfox.info/en/address/0x75c9C9fAC04C696820260CC0bE4201859ff85397)

## References

* [onramp-contracts repo](https://github.com/FIL-Builders/onramp-contracts/)
* [xChainClient repo](https://github.com/FIL-Builders/xchainClient)
* [dataBridgeDemo repo](https://github.com/FIL-Builders/dataBridgeDemo)
* [Under the Hood: Architecture and Prototype of Cross Chain Data Storage](https://medium.com/@filoz/under-the-hood-architecture-and-prototype-of-cross-chain-data-storage-6f8ba2c480d6)

***

_Note:_ For chain-specific deployment instructions (e.g., deploying to Polygon or Linea), refer to the onramp-contracts & xChainClient repository deployment guide.
