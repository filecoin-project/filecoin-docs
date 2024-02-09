---
description: >-
  Learn how to use oracle smart contracts to access and use external data
  sources.
---

# Oracles

### <mark style="color:blue;">Feed token prices to smart contract using Chainlink</mark>

There is a critical need to feed accurate token prices to smart contracts when building DeFi apps on FVM. As an example, consider an options market where trades are triggered upon a smart contract receiving information about the price of a given token crossing a certain threshold. &#x20;

\
One Oracle solution that allows a developer to pull token prices into a smart contract on [Filecoin](https://filecoin.io/blog/posts/filecoin-and-chainlink-integration/) is the [ChainLink Price Feeds](https://docs.chain.link/data-feeds/price-feeds).   This Cookbook pulls code from the [ChainLink Blog by Harry Papacharissiou](https://blog.chain.link/fetch-current-crypto-price-data-solidity/).&#x20;

**Ingredients**&#x20;

* [Remix](https://remix.ethereum.org/#lang=en\&optimize=false\&runs=200\&evmVersion=null\&version=soljson-v0.8.22+commit.4fc1097e.js)
* [Solidity](https://docs.soliditylang.org/en/v0.8.23/)&#x20;
* [ChainLink Price Feeds](https://docs.chain.link/data-feeds/price-feeds)
* [Contract Addresses for Price Feeds](https://docs.chain.link/data-feeds/price-feeds/addresses?network=ethereum\&page=1)

**Instructions**&#x20;

1. Assuming you are on an FVM testnet, obtain testnet tFIL from a faucet.&#x20;
2. Import the relevant ChainLink functionality. &#x20;

```solidity
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
AggregatorV3Interface internal priceFeed;

```

3. Instantiate a variable for the price feed contract you want to pull prices from.&#x20;

```solidity
priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
```

4. Write a function that pulls the price from the `priceFeed` address using `latestRoundData()`. &#x20;

```solidity
function getLatestPrice() public view returns (int) {
    (
        uint80 roundID, 
        int price,
        uint startedAt,
        uint timeStamp,
        uint80 answeredInRound
    ) = priceFeed.latestRoundData();
    return price;
}

```

5. Deploy the contract and write tests that determine whether or not your function is pulling the prices correctly from Oracle. &#x20;

***

### Tellor's Oracle Contract

Tellor is an _optimistic_ oracle. Builders should not accept instant price quotes and should wait a few minutes before locking in details.

Tellor supports a price feed oracle and a data oracle for the Filecoin network. The data oracle can provide Filecoin-specific data, such as the reputation of storage providers, which helps lending protocols determine interest rates for SPs.

**Ingredients**

* [Tellor Documentation](https://docs.tellor.io/tellor/getting-data/introduction)
* [Tellor Contract Reference](https://docs.tellor.io/tellor/the-basics/contracts-reference#filecoin-fvm)
* You can find a tutorial video for using Tellor for any use case [HERE](https://www.youtube.com/watch?v=AQIDqTLguyI).&#x20;
* [Filecoin Insurance Use Case](https://github.com/tellor-io/filecoin-query-insurance-impl/tree/main)

**Instructions**&#x20;

Below is a sample code showing how Tellor can be used to pull data into a smart contract.  This is an insurance contract, where "users can deposit tokens to request coverage for the chance that a Filecoin deal becomes inactive, sending the IPFS pin offline. If the Filecoin deal becomes inactive, users can reclaim their tokens as a claim."

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "usingtellor/contracts/UsingTellor.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FilecoinInsurance is UsingTellor, ERC20 {

    string queryType;

    mapping(bytes32 => mapping(address => uint256)) public claims;

    constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) ERC20("FilecoinInsurance", "FCI") {
        queryType = "FilecoinDealStatus";
    }

    function requestClaim(string memory _proposalCID) external {
        bytes memory queryData = abi.encode(queryType, abi.encode(_proposalCID));
        bytes32 queryId = keccak256(queryData);
        (bool success, bytes memory rawStatus, uint256 timestamp) = getDataBefore(queryId, block.timestamp - 3 hours);

        require(success, "request to Tellor unsuccessful");

        bool status = abi.decode(rawStatus, (bool));

        uint256 claimAmount = claims[keccak256(abi.encode(_proposalCID))][msg.sender];

        if (status == false) {
            claims[keccak256(abi.encode(_proposalCID))][msg.sender] = 0;
        }

        transferFrom(address(this), msg.sender, claimAmount);

    }

    function requestCoverage(string memory _proposalCID, uint256 _amount) external {

        bytes memory queryData = abi.encode(queryType, abi.encode(_proposalCID));
        bytes32 queryId = keccak256(queryData);
        (bool success, bytes memory rawStatus, uint256 timestamp) = getDataBefore(queryId, block.timestamp - 3 hours);

        require(success, "request to Tellor unsuccessful");

        bool status = abi.decode(rawStatus, (bool));
        require(status, "Filecoin deal is non-active!");
        //set claim 
        claims[keccak256(abi.encode(_proposalCID))][msg.sender] = _amount;

        //approve
        approve(msg.sender, _amount);

        //transfer from
        transferFrom(msg.sender, address(this), _amount);


    }
}
```

