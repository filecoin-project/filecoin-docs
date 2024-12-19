---
description: >-
  Discover the workings of the Filecoin Plus program: how DataCap is allocated, used by clients, and verified by allocators to ensure the storage of meaningful and valuable data on the Filecoin network.
---

# Filecoin Plus

## What is Filecoin Plus?

Filecoin Plus is a program designed to promote the storage of meaningful and valuable data on the Filecoin network. The program incentivizes clients to store datasets that are useful either to themselves or to others, ensuring the network focuses on hosting legitimate and impactful content.

At its core, Filecoin Plus operates through a system of [DataCap](#datacap). DataCap is distributed to clients by trusted allocators—individuals or organizations responsible for verifying that the clients intend to store data that meets the program’s usefulness criteria. Clients then use this DataCap to make storage deals with Filecoin storage providers, increasing the likelihood of the storage providers earning block rewards. This process aligns incentives for both clients and storage providers to prioritize quality over quantity in the data stored.

By encouraging the storage of useful datasets, Filecoin Plus helps create demand on the Filecoin network while ensuring the integrity and value of the stored data.

## Filecoin Plus processes & participants

The Filecoin Plus program relies on interactions among several participants. Their roles and responsibilities are detailed below:

- **Root-Key Holders**:

  - Execute governance decisions for Filecoin Plus as determined through community-executed Filecoin Improvement Proposals (FIPs).
  - Manage the granting and removal of DataCap batches to/from allocators.
  - Serve as signers to a multisig wallet on-chain—most decisions require majority approval.
  - Learn more about [Filecoin Plus governance](https://github.com/filecoin-project/allocator-governance/tree/main). For a list of FIPs, visit this [link](https://github.com/filecoin-project/FIPs).

- **Allocators**:

  - Perform due diligence on clients and their datasets to allocate DataCap to trusted clients.
  - Facilitate dispute resolution processes as needed.
  - Learn more about allocator selection and evaluation [here](https://blog.allocator.tech/2024/05/who-are-allocators.html).

- **Clients**:

  - Store data with Filecoin storage providers.
  - Verified clients receive DataCap from allocators based on data legitimacy and value.
  - Offer DataCap to storage providers as part of storage deals, enhancing the deal’s quality multiplier.

- **Storage Providers**:
  - Accept DataCap from clients as part of storage deals.
  - Use received DataCap to increase their [**Quality Adjusted Power**](#quality-adjusted-power), improving their likelihood of earning block rewards.

Decisions regarding participants and governance are made transparently via community-driven Filecoin Improvement Proposals.

## Storage providers & DataCap

Filecoin Plus introduces two key concepts that shape interactions on the Filecoin network: **DataCap** and **Quality Adjusted Power** (QAP).

### DataCap

DataCap is a unique unit within the Filecoin Plus program designed to incentivize the storage of verified and valuable data. It is distributed through a structured flow among key participants in the network:

1. **Root-Key Holders**: Trusted entities that manage the distribution of large DataCap batches to allocators as the first layer of verification.
2. **Allocators**: Verified individuals or organizations tasked with evaluating clients and their data. They allocate smaller DataCap amounts to clients based on the data's legitimacy and utility.
3. **Clients**: Users who store data on the Filecoin network. Verified clients use DataCap in storage deals with providers, increasing the attractiveness and quality rating of the deals.
4. **Storage Providers**: Entities offering storage on the network. They receive DataCap as part of deals, which enhances their [Quality Adjusted Power](#quality-adjusted-power), improving their likelihood of earning block rewards.

This flow ensures a transparent and efficient system for verifying and storing valuable data. By aligning incentives across all participants, Filecoin Plus prioritizes the quality and utility of the stored datasets.

#### Visualizing the flow of DataCap

The following diagram illustrates how DataCap moves through the Filecoin Plus system, with each participant playing a specific role:

![Diagram showing participant interactions in a Filecoin Plus deal](https://github.com/filecoin-project/filecoin-docs/assets/46801006/efd006ae-ea6f-4851-b072-ae73787e6975)

This flow represents not just the movement of DataCap but also the verification and trust-building process critical to the success of Filecoin Plus.

### Quality Adjusted Power

QAP is a metric used to assess the quality of storage deals on the Filecoin network. Factors influencing QAP include:

- The size and promised duration of the [sector](https://spec.filecoin.io/systems/filecoin_mining/sector/), the basic unit of storage on the Filecoin network.
- Whether the sector includes a Filecoin Plus deal. This is determined when:
  - DataCap is paid to the storage provider for a deal in that sector.
  - The more Filecoin Plus verified data in a sector, the higher the QAP.

**Key benefits of higher QAP:**

- Increased probability of being selected as the block verifier in the [Secret Leader Election](https://spec.filecoin.io/algorithms/expected_consensus/).
- Greater likelihood of earning block rewards.

As storage providers accumulate DataCap through deals with clients, their QAP increases. QAP directly affects their probability of earning block rewards, incentivizing them to store useful and verified data.

For detailed information, refer to the [Filecoin specification](https://spec.filecoin.io/systems/filecoin_blockchain/storage_power_consensus/).

---

> Important clarification:
>
> A common misconception is that Filecoin Plus deals directly multiply a storage provider's rewards by ten. This is incorrect. Instead:
>
> - Filecoin Plus deals increase QAP.
> - Higher QAP boosts the probability of being selected as the block verifier.
> - This increases the likelihood of earning block rewards but does not change the total rewards available.

---

#### Visualization of impact on block reward probabilities

1. **Equal opportunities for all storage providers**
   In the absence of Filecoin Plus deals, all ten storage providers have an equal 10% chance of earning block rewards.

   ![Equal distribution of block reward probabilities among ten storage provider](https://github.com/filecoin-project/filecoin-docs/assets/46801006/d577d1d7-5e4f-4b3d-9b60-f102b5ca27bb)

2. **Boosting probabilities with verified deals**
   If two providers include verified deals in their sectors:

   - Their probability increases to 36%.
   - Providers without verified deals drop to 4%.

   ![Increased block reward probabilities for providers with verified deals](https://github.com/filecoin-project/filecoin-docs/assets/46801006/a13dcf38-0115-49b0-896c-11da82808d70)

3. **Network balance through verified deal adoption:**
   As more storage providers adopt verified deals, the probabilities of earning block rewards gradually balance across the network.

   ![Balanced block reward probabilities as verified deal adoption increases](https://github.com/filecoin-project/filecoin-docs/assets/46801006/a7ec2921-ea7c-4c0b-94d8-94f8eb5a2824)

#### Additional notes

- **Incentives:** The benefits of adopting Filecoin Plus deals are strongest when few providers use them. Over time, as adoption increases, rewards probabilities normalize.
- **Collateral requirements:** Including verified deals increases collateral requirements for storage providers. Learn more about this [here](https://docs.filecoin.io/storage-providers/filecoin-economics/fil-collateral).

## Acquiring DataCap for clients & builders

Clients can secure DataCap by making a request to an allocator. Each allocator manages its own process and application for requesting DataCap.

One such allocator is [Filecoin Incentive Design Labs (FIDL)](https://www.fidl.tech). They manage a [GitHub repository](https://github.com/fidlabs) with an [application](https://github.com/fidlabs/Open-Data-Pathway/issues/new/choose) for clients to request DataCap from FIDL. Clients and builders looking to acquire DataCap can apply directly with FIDL, noting that all DataCap applications are transparent and publicly available for review on the [issues page](https://github.com/fidlabs/Open-Data-Pathway/issues).

### Steps to acquire DataCap for clients

1. **Create a [Filecoin wallet](https://docs.filecoin.io/basics/assets/wallets).**
2. **Choose an allocator** from the [full list of active allocators](https://fil.org/filecoin-plus/allocators) or the [active list of allocators](https://allocator.tech/) who have verified public datasets.
3. **Check the allocator's requirements.** For example, if you are uploading open-source datasets with FIDL as the allocator, you must:
   - Complete a third-party Know Your Customer (KYC) identity check.
   - Provide details about the storage provider (entity and location) where the data will be stored.
   - Demonstrate proof that the dataset can be actively retrieved.
     You can learn more about [FIDL’s requirements and application process](https://www.fidl.tech/apply-for-datacap).
4. **Submit an application to request DataCap from an allocator.** For FIDL, you can submit your request via their [GitHub application form](https://github.com/fidlabs/Open-Data-Pathway/issues/new/choose) or [Google Form](https://www.fidl.tech/apply-for-datacap).
5. **Use the DataCap** in a storage deal to store your data on the Filecoin network.

### Steps to Acquire Testnet DataCap for Builders

Builders on the [Calibration testnet](../../networks/calibration/) who need testnet DataCap to test their applications can acquire it via a faucet. Follow these steps:

1. **Create a wallet** on the Filecoin Calibration testnet. For more information, see the [Calibration docs](../../networks/calibration/) or [GitHub repository](https://github.com/filecoin-project/testnet-calibration).
2. **Request testnet DataCap** by using this [faucet](https://faucet.calibnet.chainsafe-fil.io/datacap.html).

### How to use DataCap

Once DataCap has been acquired, it can be used to make storage deals with storage providers on the Filecoin network. DataCap ensures that the deals are verified, improving reliability and trust in the Filecoin ecosystem. To learn more, see the [Filecoin documentation on storage deals](https://docs.filecoin.io/store/estuary/).

## Smart contracts

Smart contracts can acquire and use DataCap just like any regular client. To do so, provide the `f410` address of the smart contract as the client address when requesting DataCap.

> **Important**
>
> DataCap allocations are a one-time credit for a Filecoin address and cannot be transferred between smart contracts. If you redeploy the smart contract, you will need to request additional DataCap.

---

## Spend DataCap

Once an address has been allocated DataCap, you can use it to make storage deals. Because storage providers receive a deal quality multiplier for Filecoin Plus deals, many offer special pricing and services to attract clients using DataCap.

By default, deals created with an address that has DataCap will spend the allocated DataCap during the deal.

- **Using the [API](https://github.com/filecoin-project/lotus/blob/master/documentation/en/api-v0-methods.md#ClientStartDeal)**: Ensure the `VerifiedDeal` parameter is set to `true` when calling `ClientStartDeal`. Example API payload:

  ```json
  [
    {
      "Data": {
        "TransferType": "string value",
        "Root": {
          "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
        },
        "PieceCid": null,
        "PieceSize": 1024
      },
      "Wallet": "f01234",
      "Miner": "f01234",
      "EpochPrice": "0",
      "MinBlocksDuration": 42,
      "ProviderCollateral": "0",
      "DealStartEpoch": 10101,
      "FastRetrieval": true,
      "VerifiedDeal": true
    }
  ]
  ```

- **Using the Command Line**: Include the `--verified-deal=true` flag when running the `lotus client deal` command.

  ```shell
  lotus client deal --verified-deal=true
  ```

---

### Checking remaining DataCap balance

Once you have DataCap allocated to an address, you can check the remaining balance by querying your address on a node.

- **Using the Lotus CLI**: Run the following command, replacing `f00000` with your Filecoin address.

  ```shell
  lotus filplus check-client-datacap f00000
  ```

---

## Visualizing blockchain data for Filecoin Plus

You can track the status of Filecoin Plus deals and participants using the following resources:

- **[Filecoin Pulse Dashboard](https://filecoinpulse.pages.dev/allocators/):** Provides visualizations and tables for Filecoin Plus deals on the blockchain, organized by Allocators, Clients, and Storage Providers.
- **[Datacap Stats Dashboard](https://datacapstats.io):** Shows DataCap allocations, including the number of allocators, clients, storage providers, as well as deal count and size.
- **[Starboard Dashboard](https://dashboard.starboard.ventures/market-deals):** Displays network health data related to Filecoin Plus verified deals.

---

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/basics/how-storage-works/filecoin-plus)
