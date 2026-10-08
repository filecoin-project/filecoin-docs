---
description: >-
  Start with the maintained Filecoin Onchain Cloud docs for the current Synapse
  SDK quickstart, funding, upload, and retrieval steps.
---

# Synapse SDK quickstart

The Synapse SDK is the main developer interface for Filecoin Onchain Cloud (FOC). The current setup steps, SDK APIs, payment behavior, pricing, and contract references live in the dedicated FOC documentation.

To avoid this page drifting from the maintained FOC guides, use it as a routing page instead of a duplicated quickstart.

## Start in the FOC docs

* [FOC getting started](https://docs.filecoin.cloud/getting-started) - install the Synapse SDK, connect a wallet, fund storage, upload data, and retrieve it.
* [Synapse SDK guide](https://docs.filecoin.cloud/developer-guides/synapse) - integrate the SDK into applications and review the current API surface.
* [Storage operations](https://docs.filecoin.cloud/developer-guides/storage/storage-operations) - manage uploads, retrievals, data sets, and storage lifecycle operations.
* [Payment operations](https://docs.filecoin.cloud/developer-guides/payments/payment-operations) - understand deposits, approvals, withdrawals, and payment rails.
* [Contract addresses](https://docs.filecoin.cloud/resources/contracts) - find current mainnet and testnet contract references.

## Use the FOC CLI

Prefer the terminal, or want to drive FOC from an AI agent? The [FOC CLI](https://github.com/FIL-Builders/foc-cli) wraps the same Synapse SDK workflow - wallet setup, funding, uploads, and dataset management - in a single command-line tool.

Install it globally:

```bash
npm install -g foc-cli
```

A typical first run initializes a wallet, funds it, deposits USDFC for storage, and uploads a file:

```bash
foc-cli wallet init --auto
foc-cli wallet fund
foc-cli wallet deposit 1
foc-cli upload ./myfile.pdf
```

Commands default to the Filecoin Calibration testnet; add `--chain 314` to target mainnet. The CLI also exposes `dataset`, `piece`, and `provider` commands for managing collections and storage providers, plus `docs` for searching the FOC documentation. Run any command with `--help` for usage details.

You can also add the FOC CLI as an AI agent skill or as an MCP server:

```bash
# Install as an agent skill
npx skills add FIL-Builders/foc-cli

# Configure the MCP server
foc-cli mcp add
```

See the [FOC CLI repository](https://github.com/FIL-Builders/foc-cli) for the full command reference.

For a CLI-oriented pinning workflow in these docs, use [Filecoin Pin](../cookbook/filecoin-pin/README.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/filecoin-onchain-cloud/synapse-quickstart)
