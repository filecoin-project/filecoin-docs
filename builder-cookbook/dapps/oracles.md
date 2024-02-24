---
description: >-
  Learn how to use oracle smart contracts to access external data sources when
  building an FVM dApp.
---

# Oracles

### <mark style="color:blue;">Obtain Price Feeds with the Tellor Oracle</mark>&#x20;

Tellor is an Oracle solution that enables price and Filecoin network data feeds for FVM dApps.  To see important disclaimers about the use of Tellor, please review the [Tellor Documentation](https://docs.tellor.io/tellor/getting-data/introduction), the [Tellor Contract Reference](https://docs.tellor.io/tellor/the-basics/contracts-reference#filecoin-fvm), and [this tutorial](https://youtu.be/AQIDqTLguyI?si=CuSY3uArgKJNVcYL).   &#x20;

**Ingredients**

* [Solidity](https://docs.soliditylang.org/en/v0.8.23/)&#x20;
* [UsingTellor](https://github.com/tellor-io/sampleUsingTellor?tab=readme-ov-file#2-how-to-use) package&#x20;

**Instructions**

1. Inherit the UsingTellor contract in your code.   An example, pulled from the [sample project for UsingTellor](https://github.com/tellor-io/sampleUsingTellor?tab=readme-ov-file#2-how-to-use), is shown just below.&#x20;

```solidity
contract PriceContract is UsingTellor {

  uint256 public btcPrice;

  //This Contract now has access to all functions in UsingTellor

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) {}

  function setBtcPrice() public {

    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryId = keccak256(_b);

    uint256 _timestamp;
    bytes memory _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    require(_timestamp > 0, "No data exists");
    require(block.timestamp - _timestamp < 24 hours, "Data is too old");

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

2. Pass the Tellor address as a constructor argument.&#x20;

Oracle contract address (on both Calibration Testnet and Mainnet): `0xb2CB696fE5244fB9004877e58dcB680cB86Ba444`

To see additional addresses for Tellor Oracles, please see [this doc](https://docs.filecoin.io/smart-contracts/advanced/oracles).&#x20;
