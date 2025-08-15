---
description: >-
  Learn how to verify smart contracts on the Filecoin network using Hardhat
  with various verification services including Blockscout, Sourcify, and Filfox.
---

# Contract Verification with Hardhat

This guide shows you how to verify your smart contracts using Hardhat on the Filecoin network.

## Prerequisites

- A Hardhat project set up for Filecoin development
- If you don't have a Hardhat project, check out the [FEVM Hardhat Kit](/smart-contracts/developing-contracts/hardhat.md)
- A deployed contract address
- Contract constructor arguments (if any)

## Verification Methods

### Blockscout Verification

Blockscout is a popular blockchain explorer that supports contract verification. Add the following configuration to your `hardhat.config.ts`:

```typescript
const config: HardhatUserConfig = {
  solidity: {
    ...
  },
  networks: {
    filecoin: {
      ...
    },
    calibration: {
      ...
    },
  },
  // Configuration for hardhat-verify plugin with Blockscout API
  etherscan: {
    apiKey: {
      filecoin: "empty",
      calibration: "empty",
    },
    customChains: [
      {
        network: "filecoin",
        chainId: 314,
        urls: {
          apiURL: "https://filecoin.blockscout.com/api",
          browserURL: "https://filecoin.blockscout.com",
        },
      },
      {
        network: "calibration",
        chainId: 314159,
        urls: {
          apiURL: "https://filecoin-testnet.blockscout.com/api",
          browserURL: "https://filecoin-testnet.blockscout.com",
        },
      },
    ],
  }
};

export default config;
```

**Verify on Filecoin Mainnet:**
```bash
npx hardhat verify $CONTRACT_ADDRESS_TO_VERIFY $CONTRACT_CONSTRUCTOR_ARGS --network filecoin
```

**Verify on Calibration Testnet:**
```bash
npx hardhat verify $CONTRACT_ADDRESS_TO_VERIFY $CONTRACT_CONSTRUCTOR_ARGS --network calibration
```

**Troubleshooting:**
If your contract appears already verified but shows a mismatch, use the `--force` flag:
```bash
npx hardhat verify $CONTRACT_ADDRESS_TO_VERIFY $CONTRACT_CONSTRUCTOR_ARGS --network filecoin --force
```

### Sourcify Verification

Sourcify provides decentralized contract verification. Include the Blockscout configuration above and add the following Sourcify configuration:

```typescript
const config: HardhatUserConfig = {
  ...
  // Configuration for hardhat-verify plugin to also verify on Sourcify
  sourcify: {
    enabled: true, // verifies both on Sourcify and on Blockscout
    // Optional: specify a different Sourcify server
    apiUrl: "https://sourcify.dev/server",
    // Optional: specify a different Sourcify repository
    browserUrl: "https://repo.sourcify.dev",
  },
};

export default config;
```

This configuration enables dual verification on both Sourcify and Blockscout when running the `npx hardhat verify` task.

For more information, see the [Sourcify documentation](https://docs.sourcify.dev/docs/how-to-verify/).

### Filfox Verification

Filfox is the native Filecoin explorer with dedicated verification support.

**Installation:**

Install the `@fil-b/filfox-verifier` package into your Hardhat project.
```bash
npm install -g @fil-b/filfox-verifier
```

**Configuration:**
Import the plugin in your Hardhat configuration file. This will add the `verifyfilfox` task into your Hardhat project!

```javascript
// hardhat.config.js
require("@fil-b/filfox-verifier/hardhat");

// or in hardhat.config.ts
import "@fil-b/filfox-verifier/hardhat";
```

**Usage:**
```bash
# Verify on Filecoin Mainnet
npx hardhat verifyfilfox --address 0xYourContractAddress --network filecoin

# Verify on Calibration Testnet
npx hardhat verifyfilfox --address 0xYourContractAddress --network calibration
```

For detailed information, see the [@fil-b/filfox-verifier documentation](https://www.npmjs.com/package/@fil-b/filfox-verifier).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/smart-contracts/developing-contracts/verify-a-contract/programmatic/hardhat)
