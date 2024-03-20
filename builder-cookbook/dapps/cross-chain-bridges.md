---
description: Learn to support multi-chain dApp use cases with cross-chain bridges.
---

# Cross-Chain Bridges

Cross-chain bridges enable developers to build dApps, decentralized exchanges, and payment protocols using assets native to other blockchains. &#x20;

There are currently two options for cross-chain bridges between Filecoin and other blockchains, [Axelar](https://axelar.network/) and [Celer](https://cbridge.celer.network/1/314).  This cookbook will focus on the use of Celer since it is available on both Calibration testnet and Mainnet, while Axelar is currently only available on Mainnet.

### <mark style="color:blue;">Token Transfers with cBridge</mark>

cBridge is a cross-chain asset transfer solution that does not require upfront liquidity.&#x20;

**Ingredients**

* [Celer Documentation](https://cbridge.celer.network/1/56/USDC)
* [Celer Tutorial](https://cbridge-docs.celer.network/tutorial/cross-chain-transfer)
* [Celer cBridge SDK](https://cbridge-docs.celer.network/developer/cbridge-sdk)
* A full [tutorial](https://cbridge-docs.celer.network/tutorial/smart-contract-as-lp) on how to develop a smart contract as a liquidity pool

**Instructions**&#x20;

1. Sender sends [transferOut](https://github.com/celer-network/cBridge-contracts/blob/v1.0.0/contracts/CBridge.sol#L57) tx on the source chain.

```solidity
 /**
     * @dev transfer sets up a new outbound transfer with hash time lock.
     */
    function transferOut(
        address _bridge,
        address _token,
        uint256 _amount,
        bytes32 _hashlock,
        uint64 _timelock,
        uint64 _dstChainId,
        address _dstAddress
    ) external {
        bytes32 transferId = _transfer(_bridge, _token, _amount, _hashlock, _timelock);
        emit LogNewTransferOut(
            transferId,
            msg.sender,
            _bridge,
            _token,
            _amount,
            _hashlock,
            _timelock,
            _dstChainId,
            _dstAddress
        );
    }

```

2. Bridge node sends [transferIn](https://github.com/celer-network/cBridge-contracts/blob/v1.0.0/contracts/CBridge.sol#L83) tx on the destination chain, using the same `hashlock` set by the sender.

```solidity
   /**
     * @dev transfer sets up a new inbound transfer with hash time lock.
     */
    function transferIn(
        address _dstAddress,
        address _token,
        uint256 _amount,
        bytes32 _hashlock,
        uint64 _timelock,
        uint64 _srcChainId,
        bytes32 _srcTransferId
    ) external {
        bytes32 transferId = _transfer(_dstAddress, _token, _amount, _hashlock, _timelock);
        emit LogNewTransferIn(
            transferId,
            msg.sender,
            _dstAddress,
            _token,
            _amount,
            _hashlock,
            _timelock,
            _srcChainId,
            _srcTransferId
        );
    }
```

3. Sender [confirms](https://github.com/celer-network/cBridge-contracts/blob/v1.0.0/contracts/CBridge.sol#L112) the transfer on the source chain.
4. Bridge node [confirms](https://github.com/celer-network/cBridge-contracts/blob/v1.0.0/contracts/CBridge.sol#L112) the transfer on the destination chain.

```solidity
 /**
     * @dev confirm a transfer.
     *
     * @param _transferId Id of pending transfer.
     * @param _preimage key for the hashlock
     */
    function confirm(bytes32 _transferId, bytes32 _preimage) external {
        Transfer memory t = transfers[_transferId];

        require(t.status == TransferStatus.Pending, "not pending transfer");
        require(t.hashlock == keccak256(abi.encodePacked(_preimage)), "incorrect preimage");

        transfers[_transferId].status = TransferStatus.Confirmed;

        IERC20(t.token).safeTransfer(t.receiver, t.amount);
        emit LogTransferConfirmed(_transferId, _preimage);
    }
```

The contract addresses for Celer are as follows:&#x20;

| Name | Mainnet                                      | Calibration                                  |
| ---- | -------------------------------------------- | -------------------------------------------- |
| wFIL | `0x60E1773636CF5E4A227d9AC24F20fEca034ee25A` |                                              |
| USDC | `0x2421db204968A367CC2C866CD057fA754Cb84EdF` | `0xf5C6825015280CdfD0b56903F9F8B5A2233476F5` |
| USDT | `0x422849b355039bc58f2780cc4854919fc9cfaf94` | `0x7d43AABC515C356145049227CeE54B608342c0ad` |
| WBTC | `0x592786e04c47844aa3b343b19ef2f50a255a477f` | `0x265B25e22bcd7f10a5bD6E6410F10537Cc7567e8` |
| WETH | `0x522b61755b5ff8176b2931da7bf1a5f9414eb710` | `0x5471ea8f739dd37E9B81Be9c5c77754D8AA953E4` |

For further details on cBridge transfers, see the Celer created Github repo [HERE](https://github.com/celer-network/cBridge-contracts).&#x20;

### <mark style="color:blue;">Interchain Messaging</mark>

Celer also enables general message passing between chains. Below is sample code showing how one party can send a message to a counterparty on a different blockchain. &#x20;

**Ingredients**

* [Inter-chain Messaging](https://im-docs.celer.network/developer/development-guide/contract-examples/hello-world)

**Instructions**&#x20;

1. Someone looking to send a message to a wallet on another chain sends that message using the the function `sendMessage()` .

```solidity
// called by user on source chain to send cross-chain messages
    function sendMessage(
        address _dstContract,
        uint64 _dstChainId,
        bytes calldata _message
    ) external payable {
        bytes memory message = abi.encode(msg.sender, _message);
        sendMessage(_dstContract, _dstChainId, message, msg.value);
    }

```

2. The function `executeMessage()` is used by the intended recipient in the destination chain to receive and emit the message.&#x20;

```solidity
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
    
```

The MessageBus contract addresses are below:&#x20;

| Name       | Mainnet                                      | Calibration                                  |
| ---------- | -------------------------------------------- | -------------------------------------------- |
| MessageBus | `0x6ff2130fbdd2837b0c92d7f56f6c017642d84f66` | `0xd5818D039A702DdccfD11A900A40B3dc6DA03CEc` |

For more information on cross-chain messaging, see the Celer documentation [here](https://im-docs.celer.network/developer/development-guide/contract-examples/hello-world).

### <mark style="color:blue;">A note on Finality with Celer</mark>

Note that there is an expected finality period when conducting inter-chain messaging with Celer.  See details on Filecoin's finality [here](https://docs.filecoin.io/reference/general/glossary#finality).  There are two incoming improvements that developers can follow for the latest developments:&#x20;

1. [FIP86 for fast finality in Filecoin](https://github.com/filecoin-project/FIPs/pull/896)&#x20;
2. [Ready-to-use EC finality calculator](https://github.com/filecoin-project/FIPs/discussions/919)&#x20;

Learn more about cross-chain bridges and which bridges are available on which networks in the Filecoin Docs [here](https://docs.filecoin.io/smart-contracts/advanced/cross-chain-bridges).&#x20;
