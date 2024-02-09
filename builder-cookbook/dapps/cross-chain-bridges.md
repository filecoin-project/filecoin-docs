---
description: Learn to support multichain dApp use cases with cross-chain bridges.
---

# Cross-Chain Bridges

### <mark style="color:blue;">Bridge wFIL with Axelar</mark>

Cross-chain bridges enable developers to build “decentralized exchanges to support the trading of assets from multiple blockchain networks” or “allow users to access decentralized applications (dApps) on different networks.” &#x20;

There are currently two options for cross-chain bridges between Filecoin and other blockchains, [Axelar](https://axelar.network/) and [Celer](https://cbridge.celer.network/1/314); this section will focus on the use of Axelar’s wFIL to achieve a cross-chain transaction.

**Ingredients**

* [Remix](https://remix.ethereum.org/#lang=en\&optimize=false\&runs=200\&evmVersion=null)
* [Solidity](https://docs.soliditylang.org/en/v0.8.23/)
* [Axelar Services Portal](https://axelar.network/)
* [Axelar Cross-chain Bridge Mainnet Addresses ](https://docs.filecoin.io/smart-contracts/advanced/cross-chain-bridges)
* Watch: [Getting Started with Axelar on FVM](https://www.youtube.com/watch?v=L7cw5FhxW4s)

**Instructions**&#x20;

Sending Tokens: There are three methods from Axelar that enables a developer to send tokens from one chain to another:&#x20;

* From Ethereum, create a deposit address so that the tokens end up on Filecoin on FEVM.&#x20;
* Use the sendToken() method on the EVM gateway contract. &#x20;
* &#x20;Use the Interchain Token standard from the Axelar Services Portal that allows you to take any ERC20 and create a version of that token on all other blockchains, creating your own bridge for your token.

```solidity
sendToken(
    "avalanche", // destination chain name
    "0xAAAAA", // Address 
    "USDC", // asset symbol
    100000000 // amount in atomic units 
)
```

Sending Messages: Axelar’s General Message Passing allows a developer to move compute in any arbitrary ways, moving compute to where the assets are. \


1. Using the callContract() from the source chain, specify the destination chain, address, and payload you want to send.   On the destination chain, there is an internal method called  \_execute(), where source chain, source address, and payload variables are stored.

```solidity
function callContract(
    string memory destChain,
    string memory destAddress, 
    bytes memory payload
) external;
```

```solidity
function _execute(
    string memory sourceChain,
    string memory sourceAddress, 
    bytes callData payload
) internal virtual {}
```

2. Use the payNativeGasForContractCall() method to ensure that the gas needed for the execution of the contract on the destination chain is paid for on the source chain. &#x20;

```
function payNativeGasForContractCall(
    address sender, 
    string calldata destChain, 
    string calldata destAddress, 
    bytes calldata payload, 
    address refundAddress
) external payablel 
```

### <mark style="color:blue;">Smart Contracts as Liquidity Pools with Celer on Testnet</mark>

Although Celer's wFIL contract is only available on mainnet, there are other tokens supported on Calibration testnet.   &#x20;

**Ingredients**

* [Celer Documentation](https://cbridge.celer.network/1/56/USDC)
* [Celer Tutorial](https://cbridge-docs.celer.network/tutorial/cross-chain-transfer)
* [Celer cBridge SDK](https://cbridge-docs.celer.network/developer/cbridge-sdk)
* A full tutorial on how to develop a smart contract as a liquidity pol can be found [HERE](https://cbridge-docs.celer.network/tutorial/smart-contract-as-lp).
* [Inter-chain Messaging](https://im-docs.celer.network/developer/development-guide/contract-examples/hello-world)

**Sample Code**

Here is a simple example of an inter-chain message of "Hellow World" as found in the Celer documentation:&#x20;

```solidity
// A HelloWorld example for basic cross-chain message passing
contract MsgExampleBasic is MessageApp {
    event MessageReceived(
        address srcContract,
        uint64 srcChainId,
        address sender,
        bytes message
    );

    constructor(address _messageBus) MessageApp(_messageBus) {}

    // called by user on source chain to send cross-chain messages
    function sendMessage(
        address _dstContract,
        uint64 _dstChainId,
        bytes calldata _message
    ) external payable {
        bytes memory message = abi.encode(msg.sender, _message);
        sendMessage(_dstContract, _dstChainId, message, msg.value);
    }

    // called by MessageBus on destination chain to receive cross-chain messages
    function executeMessage(
        address _srcContract,
        uint64 _srcChainId,
        bytes calldata _message,
        address // executor
    ) external payable override onlyMessageBus returns (ExecutionStatus) {
        (address sender, bytes memory message) = abi.decode(
            (_message),
            (address, bytes)
        );
        emit MessageReceived(_srcContract, _srcChainId, sender, message);
        return ExecutionStatus.Success;
    }
}
```

The MessageBus contract ID on the Calibration testnet is `0xd5818D039A702DdccfD11A900A40B3dc6DA03CEc`. &#x20;

Note that there is an expected finality period when conducting inter-chain messaging with Celer.  See details on Filecoin's finality [here](https://docs.filecoin.io/reference/general/glossary#finality).  There are two incoming improvements that developers can follow for the latest developments:&#x20;

1. [FIP86 for fast finality in Filecoin](https://github.com/filecoin-project/FIPs/pull/896)&#x20;
2. [Ready-to-use EC finality calculator](https://github.com/filecoin-project/FIPs/discussions/919)&#x20;

Learn more about cross-chain bridges and which bridges are available on which networks in the Filecoin Docs [here](https://docs.filecoin.io/smart-contracts/advanced/cross-chain-bridges).&#x20;
