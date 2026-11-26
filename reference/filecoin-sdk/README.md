---
description: >-
  Low-level Filecoin SDK functions for calling Filecoin Cloud contracts and storage providers directly.
---

# Filecoin SDK Core

**`@filoz/synapse-core` is the low-level part of the Filecoin SDK.** It has one function for each contract call or storage provider request. The main Filecoin SDK (`@filoz/synapse-sdk`) and [Filecoin SDK React](react.md) (`@filoz/synapse-react`) are built on it.

Use Core when you want to control each step yourself. For most apps, the main Filecoin SDK is simpler. See [Filecoin SDK](../../store-data/tools/filecoin-sdk.md) in Store Data.

## Install

```bash
npm install @filoz/synapse-core viem
```

Core needs [viem](https://viem.sh) 2.x.

## Set up a client

Every function takes a viem client as its first argument. Use a public client to read, and a wallet client to send transactions.

```ts
import { createPublicClient, createWalletClient } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { calibration } from "@filoz/synapse-core/chains"
import { getTransport } from "@filoz/synapse-core/client"

const publicClient = createPublicClient({
  chain: calibration, // or mainnet
  transport: getTransport(calibration),
})

const walletClient = createWalletClient({
  account: privateKeyToAccount("0x..."),
  chain: calibration, // or mainnet
  transport: getTransport(calibration),
})
```

`calibration` is Calibration Testnet and `mainnet` is Mainnet. Both include the contract addresses. `getTransport` uses a list of public RPC nodes and moves to the next one if a node fails.

## Example: upload a file

```ts
import * as piece from "@filoz/synapse-core/piece"
import * as sp from "@filoz/synapse-core/sp"
import { getPDPProvider } from "@filoz/synapse-core/sp-registry"

// 1. Pick a provider
const provider = await getPDPProvider(publicClient, { providerId: 1n })

// 2. Work out the PieceCID and upload the data
const pieceCid = await piece.calculate(data)
await sp.uploadPiece({ data, pieceCid, serviceURL: provider.pdp.serviceURL })
await sp.findPiece({ pieceCid, serviceURL: provider.pdp.serviceURL, poll: true })

// 3. Create a data set and add the piece onchain
const result = await sp.createDataSetAndAddPieces(walletClient, {
  serviceURL: provider.pdp.serviceURL,
  payee: provider.payee,
  cdn: false,
  pieces: [{ pieceCid }],
})

// 4. Wait for the transaction
const { dataSetId, pieceIds } = await sp.waitForCreateDataSetAddPieces({ client: publicClient, ...result })
```

For large files, use `sp.uploadPieceStreaming` instead of `uploadPiece`. It works out the PieceCID while it uploads.

## Lists come in pages

Functions that return a list return one page: `{ items, nextCursor }`. To get the next page, pass `nextCursor` back as `cursor`. To go through every page, use `paginate()`:

```ts
import { paginate } from "@filoz/synapse-core"
import { getClientDataSetIds } from "@filoz/synapse-core/warm-storage"

for await (const id of paginate(({ cursor }) =>
  getClientDataSetIds(publicClient, { address, cursor })
)) {
  console.log(id)
}
```

## Modules

| Import from | What it does |
| --- | --- |
| `@filoz/synapse-core/chains` | Network settings and contract addresses for Mainnet and Calibration Testnet |
| `@filoz/synapse-core/client` | `getTransport`, `asClient`, `toReadClient` |
| `@filoz/synapse-core/pay` | Filecoin Pay: balances, deposit, withdraw, operator approvals, payment rails |
| `@filoz/synapse-core/warm-storage` | FWSS: approved providers, your data sets, prices, provider selection |
| `@filoz/synapse-core/sp` | Requests to a storage provider: upload pieces, create data sets, add pieces, pull pieces from another provider |
| `@filoz/synapse-core/piece` | Work out a PieceCID, download a piece and check it |
| `@filoz/synapse-core/sp-registry` | Read provider details from the Service Provider Registry |
| `@filoz/synapse-core/pdp-verifier` | Read proof state from the PDP Verifier |
| `@filoz/synapse-core/session-key` | Create, approve and remove session keys |
| `@filoz/synapse-core/typed-data` | Build and sign the messages a provider needs (EIP-712) |
| `@filoz/synapse-core/endorsements` | Read the list of endorsed providers |
| `@filoz/synapse-core/auction` | Read the Filecoin Pay fee auction |
| `@filoz/synapse-core/erc20`, `/usdfc` | Token balances and approvals |
| `@filoz/synapse-core/abis` | Contract ABIs |
| `@filoz/synapse-core/errors` | Error types |
| `@filoz/synapse-core/utils` | Helpers such as `parseUnits` and `formatUnits` |
| `@filoz/synapse-core/mocks`, `/devnet` | Testing |

Every function, with its inputs and outputs: [Filecoin SDK Core API](https://docs.filecoin.cloud/reference/filoz/synapse-core/toc/).

## Next steps

* [Filecoin SDK storage operations](storage-operations.md): upload, download and manage data with the main SDK.
* [Filecoin SDK session keys](session-keys.md): sign without asking the wallet each time.
* [Contract addresses](../contracts/addresses.md): the addresses Core has built in.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/reference/filecoin-sdk)
