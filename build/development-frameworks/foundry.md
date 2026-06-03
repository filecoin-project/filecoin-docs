---
description: >-
  Foundry is a fast toolkit for application development written in Rust equipped
  with a testing framework, as well as utilities for interacting with smart
  contracts and getting chain data.
---

# Foundry

The [FEVM Foundry Kit](https://github.com/filecoin-project/fevm-foundry-kit) is a Foundry template for Filecoin EVM projects. It includes Solidity examples, Filecoin API examples, Foundry remappings, and verification tooling for Filecoin explorers.

## Prerequisites

You must have the following installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) and npm
- [Foundry](https://getfoundry.sh/)

You should also have an address on the Filecoin Calibration testnet. See the [MetaMask setup page](../../networks-and-tools/assets/metamask-setup.md) for information on how to get an address. You also need test `tFIL` in your wallet.

## Steps

1. Clone the `filecoin-project/fevm-foundry-kit` repository and move into the `fevm-foundry-kit` directory:

```shell
git clone https://github.com/filecoin-project/fevm-foundry-kit
cd fevm-foundry-kit
```

2. Build the contracts and install the project’s npm dependencies:

```shell
forge build
npm install
```

3. Export your private key from MetaMask. See the [MetaMask documentation](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) to find out how to export your private key.

4. Create your env file by running:

```shell
cp .env.example .env
```

5. In your newly created `.env`, replace `PRIVATE_KEY` with the private key exported from MetaMask. Keep the Calibration RPC URL or replace it with your preferred Filecoin Calibration RPC endpoint:

```bash
PRIVATE_KEY=your_private_key_here
CALIBRATIONNET_RPC_URL=https://api.calibration.node.glif.io/rpc/v1
```

6. Load the variables in your current shell before running deployment commands:

```shell
source .env
```

{% hint style="info" %}
Never commit `.env` files or real private keys. Anyone with access to the private key can spend funds from the account.
{% endhint %}

7. Deploy the kit’s `DealClient` example contract to Calibration:

```shell
forge create \
  --rpc-url "$CALIBRATIONNET_RPC_URL" \
  --private-key "$PRIVATE_KEY" \
  --broadcast \
  src/basic-deal-client/DealClient.sol:DealClient
```

The deployment output is environment-dependent. Record the `Deployed to` address from Foundry’s output; you will need it for contract interactions and verification.

8. You can now interact with your contract using the contract address given by Foundry.

Done! For more information, see the [Foundry book](https://book.getfoundry.sh/).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/development-frameworks/foundry)
