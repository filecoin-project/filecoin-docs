---
description: >-
  Learn how to store data on the Filecoin network using different mechanisms
  that suit your project's requirements.
---

# Store Data

### <mark style="color:blue;">Prepare data for Filecoin storage</mark>

A CAR file is a standardized format for bundling and exchanging content-addressable data. It provides a way to organize and encapsulate data, ensuring it can be easily verified and retrieved. &#x20;

Before sending data to Filecoin storage providers, it is necessary to package the data into CAR (Content Addressable aRchive) files, regardless of whether you store the data via a smart contract or data onramp toolings.&#x20;

To provide the data to the SP which we make storage deals with, we need to prepare data and provide the following information when making storage deals via smart contracts or aggregators.

* Piece CID & Payload CID
* CAR size & piece size
* URL to your file

#### Ingredients

We can use the following tools to prepare your data into CAR for storage via FVM.

* [FVM Data Depot](https://data.lighthouse.storage/) - powered by [lighthouse.storage](https://www.lighthouse.storage/)
* CAR libraries\
  `web3.storage/ipfs-car` or `ipld/car`
* IPFS node\
  Store data on the IPFS network and provide CID to Filecoin SPs to initialize storage deals.

#### Instructions

We will explain each option available for preparing your data into CAR files and obtaining the necessary information to initialize storage deals via FVM, as there are multiple ways to accomplish this.

1. [FVM Data Depot](https://data.lighthouse.storage/) - **recommended**

Upload files, generate CAR, and get CAR links - we can do all these on the FVM Data Depot website. After logging in and uploading files following this [tutorial](https://docs.filecoin.io/smart-contracts/developing-contracts/client-contract-tutorial#preparing-a-file-for-storage), we will get the following information for proposing a storage deal via smart contract.

* Piece CID & Payload CID
* CAR size & piece size
* URL to your file

2. **using `web3.storage/ipfs-car` library**

`ipfs-car` is a thin wrapper over [@ipld/car](https://github.com/ipld/js-car) and [unix-fs](https://github.com/ipfs/js-ipfs-unixfs) which provides a library and CLI tool to pack and unpack CAR(Content Addressable aRchives) files.

After installing `ipfs-car` via NPM, we can use it as a CLI or JS library to pack your data into a CAR file. You can refer to[ ipfs-car GitHub](https://github.com/web3-storage/ipfs-car) to learn more about how to use it.&#x20;

**Pack files using CLI**

Replace the file path and output path of the file you want to pack into CAR.

<pre class="language-powershell"><code class="lang-powershell"><strong># ipfs-car will wrap files in an IPFS directory by default. --no-wrap will avoid it.
</strong><strong>ipfs-car --pack path/to/file --no-wrap --output path/to/write/a.car
</strong></code></pre>

Expect output same as following:

```
root CID: bafybeigj6nccb4rc6cujxwojt4yd7ikxxs2yekjo4zhb25ql65jh3k35um
  output: a.car
```

Then we can upload `a.car` file to the ipfs using [lighthouse.storage](https://www.lighthouse.storage/) or IPFS desktop, and then provide the CID & URL for proposing storage deals via FVM on the Filecoin network.

3. **upload to IPFS Desktop**

Another option is to upload data to the IPFS network using an IPFS node, such as IPFS Desktop or Kubo.  By following this [tutorial](https://docs.ipfs.tech/how-to/desktop-app/#add-local-files), you can learn how to add files using IPFS Desktop.

Afterward, you can obtain the CID or URL of the uploaded data to propose storage deals via FVM on the Filecoin network.

***

### <mark style="color:blue;">Store large data with the smart contract</mark>

With the support of FVM, applications can leverage the decentralized nature of the smart contract to store data on Filecoin in a more decentralized way. By initiating storage deals through smart contracts on the FVM, the Client Contract (CC) FRC is utilized to propose deals to the Filecoin network. Service Providers (SPs) running Boost can actively monitor and process these deal proposals by listening for specific smart contract events.

Client Contract serves as a crucial component in making on-chain storage deal proposals on the Filecoin network. To initialize a storage deal proposal via the Client Contract smart contract, we need to first pack your data into CAR files and obtain the following information before calling the CC smart contract.

* pieceCID
* CarLink
* car size&#x20;
* piece Size
* starting and ending epoch

#### Ingredients

* Client Contract
  * [FRC-0068](https://github.com/filecoin-project/FIPs/blob/master/FRCs/frc-0068.md)
  * [Reference Implementation](https://github.com/filecoin-project/fevm-hardhat-kit/blob/main/contracts/basic-deal-client/DealClient.sol)

#### Instructions

The Client Contract library implements the basic functions to make storage deal proposals as well as callback functions for successful storage deal creation.&#x20;

One of the key methods within this library is the `makeDealProposal` method, which is responsible for initiating a fully on-chain storage deal proposal. To invoke the `makeDealProposal` method, you will need to interact with the deployed DealClient contract on Calibration. This method accepts the required parameters for the storage deal, such as the data CID or URL, car size, piece size, the duration of the deal, and any other relevant details specific to your use case.

Additionally, the Client Contract library provides callback functions that can be used to handle successful storage deal creation events. These callbacks allow you to perform actions or trigger subsequent processes upon the successful establishment of a storage deal.

A Javascript function to invoke the `makeDealProposal` method should be like:

<pre class="language-javascript"><code class="lang-javascript">import contract from "../contracts/DealClient.json";
// ... other code
<strong>const handleSubmit = async () => {
</strong>    const contractAddress = '0x0219eB1740C315fe5e20612D7E13AE2A883dB3f4'; // Deployed DealClient Contract address
    const contractABI = contract.abi; // the path where the DealClient.json is
    const commP = 'baga6ea4seaqpi75umesad5vlyzyf66vbzntoave4bebmkcqu4f6nq6rchhx3ckq'; 
    // This handles proposing storage deals
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        dealClient = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        
        let cid = new CID(commP);
        const extraParamsV1 = [
          "https://bafybeif74tokne4wvxsrcsxh6dhrzv6ys7mtifhwzaen7jfjuvltean32a.ipfs.w3s.link/ipfs/bafybeif74tokne4wvxsrcsxh6dhrzv6ys7mtifhwzaen7jfjuvltean32a/baga6ea4seaqesm5ghdwocotmdavlrrzssfl33xho6xtrr5grwyi5gj3vtairaoq.car",//carLink
          236445, // carSize
          false, // skipIpniAnnounce,
          false, // removeUnsealedCopy
        ];
        
        const DealRequestStruct = [
          cid.bytes, //cidHex
          8388608, //pieceSize,
          false, //verifiedDeal,
          commP, //label,
          520000, // startEpoch
          1555200, // endEpoch
          0, // storagePricePerEpoch,
          0, // providerCollateral,
          0, // clientCollateral,
          1, // extraParamsVersion,
          extraParamsV1,
        ];
        const transaction = await dealClient.makeDealProposal(DealRequestStruct);
        const receipt = await transaction.wait();
        console.log(receipt);

        dealClient.on("DealProposalCreate", (id, size, verified, price)=>{
          console.log(id, size, verified, price);
        })

        console.log("Deal proposed! CID: " + cid);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };
</code></pre>

The full tutorial of proposal storage deals through the client contract can be found [here](https://docs.filecoin.io/smart-contracts/developing-contracts/client-contract-tutorial).&#x20;

***

### <mark style="color:blue;">Store small data with storage onramps</mark>

Filecoin is primarily designed for storing large data over extended periods. Due to economic considerations, it is generally not good for Service Providers (SPs) to accept small-scale datasets and allocate them to their 32 or 64 Gib storage sectors. As a result, it is unlikely that SPs will directly accept storage deals proposed by the client contract for small datasets.&#x20;

In the case of small datasets, a more viable option is to store them with [storage onramps](../../basics/how-storage-works/storage-onramps.md). Storage onramps combine multiple small datasets into a larger dataset and generate Proof of Deal Sub-piece Inclusion (PoDSI). PoDSI can be utilized to verify and provide evidence that the sub-piece datasets are included in a storage deal on the Filecoin network.&#x20;

One of the storage onramps we can use is [Lighthouse.storage](https://lighthouse.storage/) which is a perpetual file storage protocol that provides both on-chain and off-chain deal aggregation services. It provides a solution for storing small datasets on Filecoin while also enabling verification of deal inclusion using PoDSI. This combination of services can be valuable for ensuring the integrity and accessibility of small datasets stored on the Filecoin network.

#### Ingredients

* [Lighthouse.storage](https://lighthouse.storage/)
  * [SDK](https://github.com/lighthouse-web3/lighthouse-package): a JavaScript library that allows you to upload files to the Filecoin network.
  * [smart contract](https://github.com/lighthouse-web3/raas-starter-kit/blob/main/contracts/DealStatus.sol): solidity contract to submit and process storage deal aggregation requests.&#x20;

#### Instructions

Lighthouse.storage provides users with two options for uploading data and making storage: utilizing the Lighthouse SDK to store data or leveraging smart contracts to initiate on-chain storage deals.

1. **store data with lighthouse SDK**

By creating an account with Lighthouse storage and generating an API key, you can easily upload data to the Filecoin network using the Lighthouse SDK within any JavaScript application. Data stored using lighthouse SDK will be automatically registered for deal aggregation as well as RaaS(replication, renewal, and repair).&#x20;

First, install lighthouse SDK in your project with the command `npm install -g @lighthouse-web3/sdk`. Then use the following code to upload data to the lighthouse for deal aggregation.

```javascript
import lighthouse from "@lighthouse-web3/sdk";
// ... other code
const filePath = '/path/to/your/files'; // change the path of your file
const APIKey = 'YOUR_API_KEY';// the API key from the lighthouse account
const uploadResponse = await lighthouse.upload(filePath, APIKey);
```

The expected output of `uploadResponse`.

<pre class="language-json"><code class="lang-json">{
<strong>  data: {
</strong>    Name: 'a.jpg',
    Hash: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
    Size: '31735'
  }
}
</code></pre>

2. **store data via lighthouse smart contract**

Lighthouse has also implemented an aggregator smart contract based on [IAggregatorOracle](https://github.com/lighthouse-web3/raas-starter-kit/blob/main/contracts/interfaces/IAggregatorOracle.sol). This smart contract is deployed on the Filecoin Calibration testnet, allowing users to submit deal aggregation requests on-chain.&#x20;

We can call the smart contract at `0x01ccBC72B2f0Ac91B79Ff7D2280d79e25f745960` and submit a CID for aggregation via `submit(bytes memory _cid) external returns (uint256)` methods.&#x20;

A Javascript function to invoke the `submit` method should be like:

<pre class="language-javascript"><code class="lang-javascript">import contract from "../contracts/DealStatus.json";
import CID from "cids";
// ... other code
<strong>const SubmitDealAggregation = async () => {
</strong>    const contractAddress = '0x01ccBC72B2f0Ac91B79Ff7D2280d79e25f745960'; // Deployed DealClient Contract address on calibration
    const contractABI = contract.abi; // the path where the DealStatus.json is
    const cid = 'baga6ea4seaqpi75umesad5vlyzyf66vbzntoave4bebmkcqu4f6nq6rchhx3ckq'; 
    // This handles proposing storage deals
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        dealStatus = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        cid = new CID(commP)
        const transaction = await dealStatus.submit(cid.bytes);
        const receipt = await transaction.wait();
        console.log(receipt);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };
</code></pre>

The full tutorial for uploading data using Lighthouse SDK and smart contract can be found [here](https://docs.lighthouse.storage/lighthouse-1/filecoin-virtual-machine/section-a).

***

### <mark style="color:blue;">Manage storage deals with RaaS</mark>

RaaS (Replication, Renewal, and Repair as a Service) refers to the service provided for data stored in storage deals on the Filecoin network. When making storage deals with deal aggregators, such as lighthouse.storage, users have the option to register the RaaS job for the stored data. Subsequently, the aggregators monitor the status of the registered storage deals and initiate the necessary actions for replication, renewal, and repair as required.

When storing data using either the Lighthouse SDK or smart contracts, we can register a RaaS job.&#x20;

* Lighthouse SDK: register replication, renew, and repair service by setting deal parameters when uploading data.
* Lighthouse smart contract:  calling `submitRaaS` attaching RaaS parameters for the storage deal aggregation.

#### Ingredients

* [Lighthouse.storage](https://www.lighthouse.storage/)
  * [SDK](https://github.com/lighthouse-web3/lighthouse-package): a JavaScript library that allows you to upload files to the Filecoin network.
  * [smart contract](https://github.com/lighthouse-web3/raas-starter-kit/blob/main/contracts/DealStatus.sol): solidity contract to submit and process storage deal aggregation requests.&#x20;

#### Instructions

1. **register RaaS job when uploading with lighthouse SDK**

When uploading a file using the SDK, you have the flexibility to customize how it is stored in Lighthouse by adjusting the deal parameters.

* **num\_copies**: Decide how many backup copies you want for your file. The Max limit is 3. For instance, if set to 3, your file will be stored by 3 different storage providers.
* **repair\_threshold**: Determines when a storage sector is considered "broken" if a provider fails to confirm they still have your file. It's measured in "epochs", with 28800 epochs being roughly 10 days.
* **renew\_threshold**: Specifies when your storage deal should be renewed. It's also measured in epochs.
* **network**: This should always be set to 'calibration' (for RAAS services to function) unless you want to use the mainnet.

```javascript
// Sample JSON of deal parameters
const dealParams = {
  num_copies: 2,
  repair_threshold: 28800,
  renew_threshold: 28800,
  network: 'calibration',
};

// register RaaS job with the aggregator SDK.
const response = await lighthouse.upload(path, apiKey, false, dealParams);
```

2. **register RaaS job when proposal storage deal using lighthouse smart contract**

Another way to register RaaS jobs is by interacting with the Lighthouse smart contract and submitting a CID of your choice to the `submitRaaS` function. This action creates a new deal request that will be picked up by the Lighthouse RaaS Worker, initiating the necessary replication, renewal, and repair processes.

```javascript
import contract from "../contracts/DealStatus.json";
// ... other code
const SubmitRaaS = async () => {
    const contractAddress = '0x01ccBC72B2f0Ac91B79Ff7D2280d79e25f745960'; // Deployed DealClient Contract address
    const contractABI = contract.abi; // the path where the DealStatus.json is
    const cid = 'baga6ea4seaqpi75umesad5vlyzyf66vbzntoave4bebmkcqu4f6nq6rchhx3ckq'; 
    // This handles proposing storage deals
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        dealStatus = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        cid = new CID(commP)
        const transaction = await dealStatus.submitRaaS(cid.bytes, 2, 4, 40);
        const receipt = await transaction.wait();
        console.log(receipt);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };
```

***

### <mark style="color:blue;">Monitor storage deal status from a smart contract</mark>

The [Deal Bounty Contract](https://github.com/FILCAT/deal-bounty-contract/tree/main) also demonstrates a way to monitor the status of a Filecoin Storage Deal.  &#x20;

#### 1.  Import the [MarketAPI](https://github.com/Zondax/filecoin-solidity-mock-api/blob/master/contracts/v0.8/MarketAPI.sol).

```solidity
import { MarketAPI } from "../lib/filecoin-solidity/contracts/v0.8/MarketAPI.sol";
```

#### 2.  Use the MarketAPI functions to check the current status of a deal.  An example is shown in claim\_bounty():&#x20;

```solidity
function claim_bounty(uint64 deal_id) public {
        MarketTypes.GetDealDataCommitmentReturn memory commitmentRet = MarketAPI.getDealDataCommitment(MarketTypes.GetDealDataCommitmentParams({id: deal_id}));
        MarketTypes.GetDealProviderReturn memory providerRet = MarketAPI.getDealProvider(MarketTypes.GetDealProviderParams({id: deal_id}));

        authorizeData(commitmentRet.data, providerRet.provider, commitmentRet.size);

        // get dealer (bounty hunter client)
        MarketTypes.GetDealClientReturn memory clientRet = MarketAPI.getDealClient(MarketTypes.GetDealClientParams({id: deal_id}));

        // send reward to client 
        send(clientRet.client);
    }

```

***

### <mark style="color:blue;">Incentivized data storage</mark>

There are two sides to incentivizing data onboarding –the first is to incentivize the client to upload data, which can be done with an ERC20 token included in a DataDAO that pays to wallets that upload data through the DataDAO.  The second is to incentivize the storage providers to take a deal.  Both are demonstrated in the [Deal Bounty Contract](https://github.com/FILCAT/deal-bounty-contract/tree/main).&#x20;

#### **Ingredients**

* [Foundry](https://github.com/foundry-rs/foundry/blob/master/README.md)&#x20;
* [Solidity](https://docs.soliditylang.org/en/v0.8.23/)
* [Filecoin Storage](https://dataonboarding.filecoin.io/)&#x20;
* [Filecoin Retrieval](https://docs.filecoin.io/basics/how-retrieval-works/basic-retrieval)

#### **Instructions**

Note that the full solidity file for the Deal Bounty Contract can be found [HERE](https://github.com/FILCAT/deal-bounty-contract/blob/main/src/DealRewarder.sol).  This cookbook will pull relevant functions for you as a way to base your own code on.&#x20;

1. The contract owner will deploy the contract, establishing the rules of the dataDAO.
2. Data pinners will add the deal CIDs intended to be incentivized to the list.  This will allow storage providers to see which deals have additional incentives.&#x20;

```jsx
function addCID(bytes calldata cidraw, uint size) public {
       require(msg.sender == owner);
       cidSet[cidraw] = true;
       cidSizes[cidraw] = size;
    }
```

3. The contract should then be funded by those who want to see the CID be accepted.

```solidity
function call_actor_id(uint64 method, uint256 value, uint64 flags, uint64 codec, bytes memory params, uint64 id) public returns (bool, int256, uint64, bytes memory) {
        (bool success, bytes memory data) = address(CALL_ACTOR_ID).delegatecall(abi.encode(method, value, flags, codec, params, id));
        (int256 exit, uint64 return_codec, bytes memory return_value) = abi.decode(data, (int256, uint64, bytes));
        return (success, exit, return_codec, return_value);
    }

    // send 1 FIL to the filecoin actor at actor_id
    function send(uint64 actorID) internal {
        bytes memory emptyParams = "";
        delete emptyParams;

        uint oneFIL = 1000000000000000000;
        HyperActor.call_actor_id(METHOD_SEND, oneFIL, DEFAULT_FLAG, Misc.NONE_CODEC, emptyParams, actorID);

    }

```

4. Finally, the bounty is claimed by the storage providers that accepted the deal.  This is done by using the MarketAPI to check the status of a deal.

```solidity
function claim_bounty(uint64 deal_id) public {
        MarketTypes.GetDealDataCommitmentReturn memory commitmentRet = MarketAPI.getDealDataCommitment(MarketTypes.GetDealDataCommitmentParams({id: deal_id}));
        MarketTypes.GetDealProviderReturn memory providerRet = MarketAPI.getDealProvider(MarketTypes.GetDealProviderParams({id: deal_id}));

        authorizeData(commitmentRet.data, providerRet.provider, commitmentRet.size);

        // get dealer (bounty hunter client)
        MarketTypes.GetDealClientReturn memory clientRet = MarketAPI.getDealClient(MarketTypes.GetDealClientParams({id: deal_id}));

        // send reward to client 
        send(clientRet.client);
    }

```

***
