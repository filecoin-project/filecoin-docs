---
description: >-
  Learn how to store data on the Filecoin network using different mechanisms
  that suit your project's requirements.
---

# Store Data

### <mark style="color:blue;">Prepare data for Filecoin storage</mark>

A CAR file is a standardized format for bundling and exchanging content-addressable data. It provides a way to organize and encapsulate data, ensuring it can be easily verified and retrieved.

Before sending data to Filecoin storage providers, it is necessary to package the data into CAR (Content Addressable aRchive) files, regardless of whether you store the data via a smart contract or data onramp toolings.

To provide the data to the SP which we make storage deals with, we need to prepare data and provide the following information when making storage deals via smart contracts or aggregators.

* Piece CID & Payload CID
* CAR size & piece size
* URL to your file

#### Ingredients

We can use the following tools to prepare your data into CAR for storage via FVM.

* [Lighthouse storage](https://www.lighthouse.storage/) - web app flow for preparing storage inputs
* CAR libraries\
  `web3.storage/ipfs-car` or `ipld/car`
* IPFS node\
  Store data on the IPFS network and provide CID to Filecoin SPs to initialize storage deals.

#### Instructions

We will explain each option available for preparing your data into CAR files and obtaining the necessary information to initialize storage deals via FVM, as there are multiple ways to accomplish this.

1. [Lighthouse storage](https://www.lighthouse.storage/) - **recommended**

Upload files, generate CAR, and get CAR links in the Lighthouse web app. After logging in and uploading files, we will get the following information for proposing a storage deal via smart contract.

* Piece CID & Payload CID
* CAR size & piece size
* URL to your file

2. **using `web3.storage/ipfs-car` library**

`ipfs-car` is a thin wrapper over [@ipld/car](https://github.com/ipld/js-car) and [unix-fs](https://github.com/ipfs/js-ipfs-unixfs) which provides a library and CLI tool to pack and unpack CAR(Content Addressable aRchives) files.

After installing `ipfs-car` via NPM, we can use it as a CLI or JS library to pack your data into a CAR file. You can refer to[ ipfs-car GitHub](https://github.com/web3-storage/ipfs-car) to learn more about how to use it.

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

Another option is to upload data to the IPFS network using an IPFS node, such as IPFS Desktop or Kubo. By following this [tutorial](https://docs.ipfs.tech/how-to/desktop-app/#add-local-files), you can learn how to add files using IPFS Desktop.

Afterward, you can obtain the CID or URL of the uploaded data to propose storage deals via FVM on the Filecoin network.

***

### <mark style="color:blue;">Store large data with modern programmatic patterns</mark>

Legacy Deal Client tutorials are deprecated and are not maintained in the Builder Cookbook.

Use the maintained references below for current implementation paths:

* [PDP documentation](../../storage-providers/pdp/README.md)
* [Modern storage patterns](../../reference/general/modern-storage-patterns.md)

Use the data preparation options above to generate CAR artifacts and CIDs, then follow the maintained docs for your selected workflow.

***

### <mark style="color:blue;">Store small data with storage onramps</mark>

Filecoin is primarily designed for storing large data over extended periods. Due to economic considerations, it is generally not good for Service Providers (SPs) to accept small-scale datasets and allocate them to their 32 or 64 Gib storage sectors. As a result, directly submitting small datasets to SPs is usually inefficient.

In the case of small datasets, a more viable option is to store them with [storage onramps](../../basics/how-storage-works/storage-onramps.md). Storage onramps combine multiple small datasets into a larger dataset and generate Proof of Deal Sub-piece Inclusion (PoDSI). PoDSI can be utilized to verify and provide evidence that the sub-piece datasets are included in a storage deal on the Filecoin network.

One of the storage onramps we can use is [Lighthouse.storage](https://lighthouse.storage/) which is a perpetual file storage protocol that provides both on-chain and off-chain deal aggregation services. It provides a solution for storing small datasets on Filecoin while also enabling verification of deal inclusion using PoDSI. This combination of services can be valuable for ensuring the integrity and accessibility of small datasets stored on the Filecoin network.

#### Ingredients

* [Lighthouse.storage](https://lighthouse.storage/)
  * [SDK](https://github.com/lighthouse-web3/lighthouse-package): a JavaScript library that allows you to upload files to the Filecoin network.
  * [smart contract integration guide](https://docs.lighthouse.storage/how-to/using-pdp-with-lighthouse): guidance for submitting storage deal aggregation requests on-chain.

#### Instructions

Lighthouse.storage provides users with two options for uploading data and making storage: utilizing the Lighthouse SDK to store data or leveraging smart contracts to initiate on-chain storage deals.

1. **store data with lighthouse SDK**

By creating an account with Lighthouse storage and generating an API key, you can upload data to the Filecoin network using the Lighthouse SDK within any JavaScript application. Data stored using the Lighthouse SDK can be registered for deal aggregation workflows.

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

Lighthouse also provides aggregator smart contract examples for submitting deal aggregation requests on-chain on Filecoin Calibration.

We can call the smart contract at `0x01ccBC72B2f0Ac91B79Ff7D2280d79e25f745960` and submit a CID for aggregation via `submit(bytes memory _cid) external returns (uint256)` methods.

A Javascript function to invoke the `submit` method should be like:

<pre class="language-javascript"><code class="lang-javascript">import contract from "../contracts/DealStatus.json";
import CID from "cids";
// ... other code
<strong>const SubmitDealAggregation = async () => {
</strong>    const contractAddress = '0x01ccBC72B2f0Ac91B79Ff7D2280d79e25f745960'; // Deployed DealStatus contract address on calibration
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

The full tutorial for uploading data using Lighthouse SDK and smart contract can be found [here](https://docs.lighthouse.storage/how-to/using-pdp-with-lighthouse).

***

### <mark style="color:blue;">Monitor storage deal status from a smart contract</mark>

The [Deal Bounty Contract](https://github.com/FILCAT/deal-bounty-contract/tree/main) also demonstrates a way to monitor the status of a Filecoin Storage Deal.

#### 1. Import the [MarketAPI](https://github.com/Zondax/filecoin-solidity-mock-api/blob/master/contracts/v0.8/MarketAPI.sol).

```solidity
import { MarketAPI } from "../lib/filecoin-solidity/contracts/v0.8/MarketAPI.sol";
```

#### 2. Use the MarketAPI functions to check the current status of a deal. An example is shown in claim\_bounty():

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

There are two sides to incentivizing data onboarding –the first is to incentivize the client to upload data, which can be done with an ERC20 token included in a DataDAO that pays to wallets that upload data through the DataDAO. The second is to incentivize the storage providers to take a deal. Both are demonstrated in the [Deal Bounty Contract](https://github.com/FILCAT/deal-bounty-contract/tree/main).

#### **Ingredients**

* [Foundry](https://github.com/foundry-rs/foundry/blob/master/README.md)
* [Solidity](https://docs.soliditylang.org/en/v0.8.23/)
* [Filecoin Storage](https://dataonboarding.filecoin.io/)
* [Filecoin Retrieval](https://docs.filecoin.io/basics/how-retrieval-works/basic-retrieval)

#### **Instructions**

Note that the full solidity file for the Deal Bounty Contract can be found [HERE](https://github.com/FILCAT/deal-bounty-contract/blob/main/src/DealRewarder.sol). This cookbook will pull relevant functions for you as a way to base your own code on.

1. The contract owner will deploy the contract, establishing the rules of the dataDAO.
2. Data pinners will add the deal CIDs intended to be incentivized to the list. This will allow storage providers to see which deals have additional incentives.

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

4. Finally, the bounty is claimed by the storage providers that accepted the deal. This is done by using the MarketAPI to check the status of a deal.

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

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/builder-cookbook/data-storage/store-data)
