## What is deterministic deployment?

Deterministic deployment refers to the ability to deploy smart contracts to the same address across different blockchain networks. This consistency can be particularly useful when deploying the same contract on multiple chains to streamline interactions or ensure interoperability. There are two primary methods to achieve deterministic deployment:

- Using a **factory contract that has been deployed keylessly** to deploy your contracts.
    - The factory usually uses the `CREATE2` opcode to deploy your contracts, precomputing the deployment address and ensuring consistency across all chains.
- **Deploying your contracts keylessly** (without using any factory) onto all blockchains.
    - You must keep the code and constructor arguments unchanged to get the same address.

## Creating a deterministic deployment

Contract address can be precomputed, before the contract is deployed, using a create opcode. This is one of the options for deterministic deployment.

### **`CREATE`**

If deploying using a `CREATE` factory contract, contract addresses are calculated using the:

- Address of the factory contract (that calls `CREATE` opcode) itself;
- Nonce of the factory contract ([EIP-161](https://eips.ethereum.org/EIPS/eip-161) specifies that contract nonce starts at 1, not 0 like EOAs).

### **`CREATE2`**

Similar to `CREATE`, `CREATE2` is used to deploy contracts to the same address across different blockchain networks in factory contract implementations. Contract addresses are precomputed using the:

- Address of the factory contract (that calls `CREATE2` opcode) itself;
- Bytecode of the contract;
- Salt (a chosen value).

See this [code snippet](https://solidity-by-example.org/app/create2/) for an example of how to call `CREATE2` from a factory contract.

## **Deploying a factory contract to Filecoin**

Other people may have already deployed the factory contract onto Filecoin, in which case you won't need to redeploy it. You can just use the factory to deploy your contracts. So first check the expected address on a blockchain explorer to see if a factory contract already exists there.

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
    - Check the [blockchain explorer](https://docs.filecoin.io/networks/mainnet/explorers) to verify that the factory contract has been deployed to the expected address.
    - Ensure the contract code matches the expected bytecode.

By following these steps, you can deploy the factory contract to multiple blockchains, ensuring it has the same address on each one. This allows for consistent and deterministic deployment of other contracts using the factory contract.
## **Using Popular Tools on Filecoin**

### **1. Deterministic Deployment Proxy by Arachnid**
- **Address:** `0x4e59b44847b379578588920ca78fbf26c0b4956c`
- **How-to:**
    - Signing the Proxy deployment transaction is hidden, only recover the public key from the signed transaction.
    - The signing key and address are associated with the deployment transaction. If anything related to the deployment transaction changes, the signing key and address will be different, resulting in a different proxy address.
    - [Repository Link](https://github.com/Arachnid/deterministic-deployment-proxy/tree/master)

### **2. Safe Singleton Factory**
- **Address:** `0x914d7Fec6aaC8cd542e72Bca78B30650d45643d7`
- **How-to:**
    - Safe Multisig Wallet
    - Deployed by Masa Finance, Starlings lab, and align.network on many blockchains.
    - [Masa Finance](https://www.masa.ai/)
    - [align.network](http://align.network)

### **3. CreateX / xdeployer by pcaversaccio**
- **Address:** `0xba5Ed099633D3B313e4D5F7bdc1305d3c28ba5Ed`
- **How-to:**
    - Deploy it yourself using one of the pre-signed transactions. Details can be found in the repository.
    - xdeployer is a hardhat plugin that allows you to deploy your smart contracts across multiple EVM chains with the same deterministic address.
    - It is deployed on Filecoin mainnet and testnet.
    - Request a deployment by opening an [issue](https://github.com/pcaversaccio/createx/issues/new?assignees=pcaversaccio&labels=new+deployment+%E2%9E%95&projects=&template=deployment_request.yml&title=%5BNew-Deployment-Request%5D%3A+).
    - [CreateX Repository](https://github.com/pcaversaccio/createx), [xdeployer Repository](https://github.com/pcaversaccio/xdeployer)
    - [Deployment Result from Dune](https://dune.com/patronumlabs/createx)

### **4. OpenZeppelin Defender**
- **Address:** N/A
- **How-to:**
    - Follow the tutorial to use OpenZeppelin Defender for deterministic deployments.
    - [How to tutorial](https://blog.openzeppelin.com/evm-deterministic-deployments-made-easy-with-openzeppelin-defender)
