## What is deterministic deployment?

Deterministic deployment refers to the ability to deploy smart contracts to the same address across different blockchain networks. This consistency can be particularly useful when deploying the same contract on multiple chains to streamline interactions or ensure interoperability. There are two primary methods to achieve deterministic deployment:

- Using a **factory contract that has been deployed keylessly** to deploy your contracts.
    - The factory usually uses the `CREATE2` opcode to deploy your contracts, precomputing the deployment address and ensuring consistency across all chains.
- **Deploying your contracts keylessly** (without using any factory) onto all blockchains.
    - You must keep the code and constructor arguments unchanged to get the same address.

## Creating a deterministic deployment

Contract address can be precomputed, before the contract is deployed, using a create opcode. This is one of the options for deterministic deployment.

### **`CREATE`**

If deploying from an externally-owned account (EOA), e.g. by calling `ethers.deployContract` from a hardhat script, the `CREATE` opcode will run in the EVM and contract addresses will be calculated using the:

- Address of the EOA;
- Nonce of the EOA.

If deploying using a `CREATE` factory contract, contract addresses are calculated using the:

- Address of the factory contract (that calls `CREATE` opcode) itself;
- Nonce of the factory contract ([EIP-161](https://eips.ethereum.org/EIPS/eip-161) specifies that contract nonce starts at 1, not 0 like EOAs).

### **`CREATE2`**

The `CREATE2` opcode must be run from a deployed contract, so usually it's done from a `CREATE2` factory contract. Contract addresses are precomputed using the:

- Address of the factory contract (that calls `CREATE2` opcode) itself;
- Bytecode of the contract;
- Salt (a chosen value).

See the following code snippet for an example of how to call `CREATE2` from a factory contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

...

function deploy(bytes memory bytecode, uint256 _salt) public payable {
    address addr;

    /*
    NOTE: How to call create2

    create2(v, p, n, s)
    create new contract with code at memory p to p + n
    and send v wei
    and return the new address
    where new address = first 20 bytes of keccak256(0xff + address(this) + s + keccak256(mem[p…(p+n)))
            s = big-endian 256-bit value
    */
    assembly {
        addr :=
            create2(
                callvalue(), // wei sent with current call
                // Actual code starts after skipping the first 32 bytes
                add(bytecode, 0x20),
                mload(bytecode), // Load the size of code contained in the first 32 bytes
                _salt // Salt from function arguments
            )

        if iszero(extcodesize(addr)) { revert(0, 0) }
    }

    emit Deployed(addr, _salt);
}
```

### **`CREATE3`**

With `CREATE2`, the contract bytecode affects the deployment address. So even blank spaces and comment text can affect the address.

CREATE3 is similar to CREATE2 but without including the contract initCode on the address derivation formula. It can be used to generate deterministic contract addresses that aren’t tied to a specific contract code.

CREATE3 is a way to use CREATE and CREATE2 in combination such that bytecode no longer affects the deployment address. — CREATE3 is more expensive than CREATE or CREATE2 (Fixed extra cost of ~55k gas).

Check out a reference implementation [here](https://github.com/0xsequence/create3).

### **Usage**

Other people may have already deployed the factory contract onto some of your desired blockchains to the expected address (if they didn't change the deployment transaction data), in which case you won't need to deploy it on those blockchains - you can then just use those already-deployed factory contracts to deploy whatever other contracts you want to deploy. So first check the expected address on a blockchain explorer to see if a factory contract already exists there.

If there isn't one yet then you'll need to deploy the factory contract via a **reusable signed raw deployment transaction**. The factory contract will then have the same address as on other blockchains (as long as the transaction bytecode stays the same). See the steps below to deploy the factory.

1. **Prepare the deployment transaction:**
    - Write the smart contract code for the factory contract.
    - Compile the contract to get the bytecode.
    - Create a deployment transaction with the bytecode.

2. **Sign the deployment transaction:**
    - Use a private key to sign the deployment transaction.
    - Ensure the private key is securely stored and not exposed.

3. **Broadcast the signed transaction:**
    - Send the signed transaction to the desired blockchain network.
    - Wait for the transaction to be mined and confirmed.

4. **Verify the deployment:**
    - Check the blockchain explorer to verify that the factory contract has been deployed to the expected address.
    - Ensure the contract code matches the expected bytecode.

By following these steps, you can deploy the factory contract to multiple blockchains, ensuring it has the same address on each one. This allows for consistent and deterministic deployment of other contracts using the factory contract.

## **Popular Tools**

1. [**Deterministic Deployment Proxy by Arachnid**](https://github.com/Arachnid/deterministic-deployment-proxy/tree/master)
    - Signing the Proxy deployment tx is hidden, only recover the public key from signed tx.
    - Somehow, the signing key and address is associated with the deployment tx. So if we change anything related to that deployment tx, the signing key and address will be different → proxy address is different.
2. **Safe singleton Factory**
    - Safe Multisig Wallet
    - [Masa Finance](https://www.masa.ai/)
    - Starlings lab forked and deployed it on many blockchains
    - [align.network](http://align.network) - Long-term storage solution for Ethereum
3. [**pcaversaccio/createx**](https://createx.rocks/)
    
    They offer two options for deploying [`CreateX`](https://github.com/pcaversaccio/createx/blob/main/src/CreateX.sol) to your desired chain:
    
    1. Deploy it yourself by using one of the pre-signed transactions. Details can be found in the subsequent paragraph.
    2. Request a deployment by opening an [issue](https://github.com/pcaversaccio/createx/issues/new?assignees=pcaversaccio&labels=new+deployment+%E2%9E%95&projects=&template=deployment_request.yml&title=%5BNew-Deployment-Request%5D%3A+). You can significantly reduce the time to deployment by sending funds to cover the deployment cost (a reliable amount with a small tip 😏 would be ~0.3 ETH) to the deployer account: `0xeD456e05CaAb11d66C4c797dD6c1D6f9A7F352b5`.
    3. See the [deployment result from Dune](https://dune.com/patronumlabs/createx)
    
4. [**pcaversaccio/xdeployer**](https://github.com/pcaversaccio/xdeployer) - hardhat
    hardhat **plugin** to deploy your smart contracts across multiple EVM chains with the same deterministic address.
    `npx hardhat xdeploy` 
    
    - It also deployed on Filecoin mainnet and testnet.
    - contract creation transaction is the helper smart contract [`CreateX`](https://github.com/pcaversaccio/createx) with address `0xba5Ed099633D3B313e4D5F7bdc1305d3c28ba5Ed`
    
5. OpenZepplin Defender
    - [How to tutorial](https://blog.openzeppelin.com/evm-deterministic-deployments-made-easy-with-openzeppelin-defender)

Some of the most popular projects are using their own proxy for deterministic deployment across multiple chains. For example, 

- Uniswap V2/V3 Factory Contracts
- Compound and Aave Proxy Contracts
- Synthetix Proxy and Synth Contracts
- ENS (Ethereum Name Service) Registrar Contracts
- Argent Wallet’s `Identity Proxy Factory`
