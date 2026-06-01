---
description: >-
  Learn how to verify smart contracts on the Filecoin network using Hardhat
  with various verification services including Blockscout, Sourcify, and Filfox.
---

# Contract Verification with Hardhat

This guide shows you how to verify your smart contracts using Hardhat on the Filecoin network.

## Prerequisites

- A Hardhat project set up for Filecoin development. If you don't have one, start with the [FEVM Hardhat Kit](../development-frameworks/hardhat.md).
- The `@nomicfoundation/hardhat-verify` plugin installed and imported in your Hardhat config.
- A deployed contract address on Filecoin mainnet or Calibration testnet.
- The same Solidity version, optimizer settings, and source tree that were used for deployment.
- Contract constructor arguments, if the contract was deployed with any.
- A Filecoin RPC URL for the target network. Filecoin mainnet uses chain ID `314`; Calibration testnet uses chain ID `314159`.

## Verification Methods

### Blockscout Verification

Blockscout is a popular blockchain explorer that supports contract verification. The FEVM Hardhat Kit already includes the Filecoin networks and verifier configuration. In another Hardhat v2 project, add equivalent configuration to `hardhat.config.ts`:

```typescript
import "@nomicfoundation/hardhat-verify";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.23",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    filecoin: {
      url: process.env.FILECOIN_RPC_URL ?? "https://api.node.glif.io/rpc/v1",
      chainId: 314,
    },
    calibration: {
      url: process.env.CALIBRATION_RPC_URL ?? "https://api.calibration.node.glif.io/rpc/v1",
      chainId: 314159,
    },
  },
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

Set RPC URLs in your shell or `.env` if you do not want to use the example defaults:

```bash
export FILECOIN_RPC_URL=https://api.node.glif.io/rpc/v1
export CALIBRATION_RPC_URL=https://api.calibration.node.glif.io/rpc/v1
```

Compile with the same settings used for deployment, then verify the deployed address. Put constructor arguments after the address and omit them if the constructor had no arguments.

**Verify on Filecoin mainnet:**

```bash
npx hardhat compile
npx hardhat verify --network filecoin 0xYourContractAddress "constructor arg 1"
```

**Verify on Calibration testnet:**

```bash
npx hardhat compile
npx hardhat verify --network calibration 0xYourContractAddress "constructor arg 1"
```

If Hardhat cannot infer which local contract matches the deployed bytecode, pass the fully qualified contract name:

```bash
npx hardhat verify \
  --network calibration \
  --contract contracts/MyContract.sol:MyContract \
  0xYourContractAddress \
  "constructor arg 1"
```

### Sourcify Verification

Sourcify provides decentralized contract verification. Include the Blockscout configuration above and add the following Sourcify configuration:

```typescript
const config: HardhatUserConfig = {
  sourcify: {
    enabled: true, // verifies both on Sourcify and on Blockscout
    apiUrl: "https://sourcify.dev/server",
    browserUrl: "https://repo.sourcify.dev",
  },
};

export default config;
```

This configuration enables dual verification on both Sourcify and Blockscout when running the `npx hardhat verify` task.

If Blockscout verification is also enabled, keep passing constructor arguments when the deployed constructor required them.

For more information, see the [Sourcify documentation](https://docs.sourcify.dev/docs/how-to-verify/).

### Filfox Verification

Filfox is the native Filecoin explorer with dedicated verification support.

**Installation:**

Install the `@fil-b/filfox-verifier` package into your Hardhat project. The FEVM Hardhat Kit already includes this package.

```bash
npm install --save-dev @fil-b/filfox-verifier
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
# Verify on Filecoin mainnet
npx hardhat verifyfilfox --address 0xYourContractAddress --network filecoin

# Verify on Calibration testnet
npx hardhat verifyfilfox --address 0xYourContractAddress --network calibration
```

The Filfox Hardhat task requires Node.js 20 or later and a compiled Hardhat project. The verifier can discover supported Hardhat deployment artifacts, including `hardhat-deploy`, Ignition, and standard Hardhat artifacts.

For detailed information, see the [@fil-b/filfox-verifier documentation](https://www.npmjs.com/package/@fil-b/filfox-verifier).
