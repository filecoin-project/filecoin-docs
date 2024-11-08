---
description: >-
  Learn about encrypting data to be stored on Filecoin and gating access to data
  already stored on Filecoin.
---

# Privacy & Access Control

### <mark style="color:blue;">Encrypting data for storing on Filecoin</mark>

Ensuring your dataset is encrypted is critical to good privacy hygiene when storing files on decentralized networks, including Filecoin and IPFS.  Uploading an unencrypted file would allow the storage provider to read the files you store with them, and allow them to send copies to unknown third parties.&#x20;

The Lighthouse team developed the Kavach encryption SDK, which is included in the Lighthouse SDK by default, to enable encryption of files pinned to IPFS or stored on Filecoin.  The below examples are pulled directly from their documentation, you can read more [here](https://docs.lighthouse.storage/lighthouse-1/how-to/upload-encrypted-data).

**Ingredients:**

* [Kavach encryption SDK](https://github.com/lighthouse-web3/encryption-sdk)
* [Access control to a dataset](https://docs.lighthouse.storage/lighthouse-1/how-to/encryption-features/access-control-conditions)

**Instructions:**&#x20;

There are two options for encrypting files being uploaded to Filecoin. &#x20;

1. The first option is encrypting your uploaded file using the Kavach SDK in the backend of your app.

```javascript
import {ethers} from "ethers"
import lighthouse from '@lighthouse-web3/sdk'
import kavach from "@lighthouse-web3/kavach"

const signAuthMessage = async(privateKey) =>{
  const signer = new ethers.Wallet(privateKey)
  const authMessage = await kavach.getAuthMessage(signer.address)
  const signedMessage = await signer.signMessage(authMessage.message)
  const { JWT, error } = await kavach.getJWT(signer.address, signedMessage)
  return(JWT)
}

const uploadEncrypted = async() =>{
  /**
   * This function lets you upload a file to Lighthouse with encryption enabled.
   * 
   * @param {string} path - Location of your file.
   * @param {string} apiKey - Your unique Lighthouse API key.
   * @param {string} publicKey - User's public key for encryption.
   * @param {string} signedMessage - A signed message or JWT used for authentication at encryption nodes.
   * 
   * @return {object} - Returns details of the encrypted uploaded file.
   */
  
  const pathToFile = '/home/cosmos/Desktop/wow.jpg'
  const apiKey = 'YOUR_API_KEY_HERE'
  const publicKey = 'YOUR_PUBLIC_KEY_HERE'
  const signedMessage = await signAuthMessage(privateKey)
  
  const response = await lighthouse.uploadEncrypted(pathToFile, apiKey, publicKey, signedMessage)
  console.log(response)
  /* Sample Response
  {
    data: [
      {
        Name: 'decrypt.js',
        Hash: 'QmeLFQxitPyEeF9XQEEpMot3gfUgsizmXbLha8F5DLH1ta',
        Size: '1198'
      }
    ]
  }
  */
}

uploadEncrypted()
```

2. Alternatively, files can be encrypted with MetaMask in your browser application.&#x20;

```jsx
import React, { useState } from "react"
import lighthouse from "@lighthouse-web3/sdk"

function App() {
  const [file, setFile] = useState(null)

  // Define your API Key (should be replaced with secure environment variables in production)
  const apiKey = process.env.REACT_APP_API_KEY

  // Function to sign the authentication message using Wallet
  const signAuthMessage = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        if (accounts.length === 0) {
          throw new Error("No accounts returned from Wallet.")
        }
        const signerAddress = accounts[0]
        const { message } = (await lighthouse.getAuthMessage(signerAddress)).data
        const signature = await window.ethereum.request({
          method: "personal_sign",
          params: [message, signerAddress],
        })
        return { signature, signerAddress }
      } catch (error) {
        console.error("Error signing message with Wallet", error)
        return null
      }
    } else {
      console.log("Please install Wallet!")
      return null
    }
  }

  // Function to upload the encrypted file
  const uploadEncryptedFile = async () => {
    if (!file) {
      console.error("No file selected.")
      return
    }

    try {
      // This signature is used for authentication with encryption nodes
      // If you want to avoid signatures on every upload refer to JWT part of encryption authentication section
      const encryptionAuth = await signAuthMessage()
      if (!encryptionAuth) {
        console.error("Failed to sign the message.")
        return
      }

      const { signature, signerAddress } = encryptionAuth

      // Upload file with encryption
      const output = await lighthouse.uploadEncrypted(
        file,
        apiKey,
        signerAddress,
        signature,
        progressCallback
      )
      console.log("Encrypted File Status:", output)
      /* Sample Response
        {
          data: [
            Hash: "QmbMkjvpG4LjE5obPCcE6p79tqnfy6bzgYLBoeWx5PAcso",
            Name: "izanami.jpeg",
            Size: "174111"
          ]
        }
      */
      // If successful, log the URL for accessing the file
      console.log(
        `Decrypt at https://decrypt.mesh3.network/evm/${output.data[0].Hash}`
      )
    } catch (error) {
      console.error("Error uploading encrypted file:", error)
    }
  }

  // Function to handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  return (
    <div className="App">
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadEncryptedFile} disabled={!file}>
        Upload Encrypted File
      </button>
    </div>
  )
}

export default App
```

3. The following code also demonstrates how to encrypt JSON / text files stored on IPFS or Filecoin.

```javascript
import lighthouse from '@lighthouse-web3/sdk'

/**
* Use this function to upload an encrypted text string to IPFS.
* 
* @param {string} text - The text you want to upload.
* @param {string} apiKey - Your unique Lighthouse API key.
* @param {string} publicKey - Your wallet's public key.
* @param {string} signedMessage - A message you've signed using your private key.
* @param {string} [name] - optional name for text
*
* @return {object} - Details of the uploaded file on IPFS.
*/

const yourText = "PLACE_YOUR_TEXT_HERE"
const apiKey = "PLACE_YOUR_API_KEY_HERE"
const publicKey = "PLACE_YOUR_PUBLIC_KEY_HERE"
const signedMessage = "SIGNATURE/JWT"
const name = "anime"

const response = await lighthouse.textUploadEncrypted(yourText, apiKey, publicKey, signedMessage)
console.log(response)
/* Sample Response
{
  data: {
    Name: 'anime',
    Hash: 'QmTsC1UxihvZYBcrA36DGpikiyR8ShosCcygKojHVdjpGd',
    Size: '67'
  }
}
*/
```

***

### <mark style="color:blue;">Gated access to your dataset</mark>

Lighthouse also provides a number of methods to gate access a given data set.  In the below code, the variables are:&#x20;

| Variable             | Description                                                                          |
| -------------------- | ------------------------------------------------------------------------------------ |
| id                   | the condition number                                                                 |
| chain                | the current blockchain network                                                       |
| method               | function used to check a condition                                                   |
| standardContractType | the type of contract being checked. Options include ERC20, ERC1155, ERC721 or Custom |
| returnValueTest      | details what is being compared                                                       |
| parameters           | allow for the function to take in any data it may need                               |
| inputArrayType       | the type of the parameter being taken as input                                       |
| outputType           | the type of response returned by the function                                        |

**Sample Code:**&#x20;

* The first method is “NFT-based access,” where a user is able to access a file if they own at least one NFT of a given ERC721 contract.&#x20;

```
{
    id: 1,
    chain: "wallaby",
    method: "balanceOf",
    standardContractType: "ERC721",
    contractAddress: "0x1a6ceedD39E85668c233a061DBB83125847B8e3A",
    returnValueTest: { comparator: ">=", value: "1" },
    parameters: [":userAddress"],
}
```

* The second method is “Custom contract,” where a user is able to access a file if the returned value of a given function in the custom contract satisfies a certain condition.  In the below example, the condition being checked is whether the “get()” function returns “1”. &#x20;

```
{
    id: 1,
    chain: "Mumbai",
    method: "get",
    standardContractType: "Custom",
    contractAddress: "0x019e5A2Eb07C677E0173CA789d1b8ed4384e59A5",
    returnValueTest: {
	comparator: "==",
	value: "1"
    },
    parameters: [],
    inputArrayType: [],
    outputType: "uint256"
}
```

* The third method is to check native tokens.  In the below example, the condition being checked is whether the wallet address looking to access a file owns at least 1 ETH.&#x20;

```
{
    id: 1,
    chain: "Ethereum",
    method: "getBalance",
    standardContractType: "",
    returnValueTest: {
        comparator: ">=",
	value: "1000000000000000000"
    }
}
```

* The fourth and final method is to condition the access of a file on the block height, which is effectively time-based gate access.  In the example below, a user can access the file above the block height of 133494. &#x20;

```
{
    id: 1,
    chain: "Optimism",
    method: "getBlockNumber",
    standardContractType: "",
    returnValueTest: {
        comparator: ">",
            value: "133493"
     },
}
```

To review the Lighthouse documentation in its entirety, please visit: [https://docs.lighthouse.storage/lighthouse-1/](https://docs.lighthouse.storage/lighthouse-1/)&#x20;



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/builder-cookbook/data-storage/privacy-and-access-control)
