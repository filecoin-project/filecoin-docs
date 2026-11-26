---
description: >-
  React hooks for Filecoin Cloud payments and storage, built on Wagmi and TanStack Query.
---

# Filecoin SDK React

**`@filoz/synapse-react` gives you React hooks for payments and storage.** It is built on [Filecoin SDK Core](README.md).

## Install

```bash
npm install @filoz/synapse-react wagmi viem @tanstack/react-query
```

You need React 18 or later, Wagmi 3.x, viem 2.x, TanStack Query 5.x, and a connected wallet. It works on Mainnet and Calibration Testnet.

## Set up

Wrap your app in the Wagmi and TanStack Query providers:

```tsx
import { calibration, mainnet } from "@filoz/synapse-core/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createConfig, http, WagmiProvider } from "wagmi"

const config = createConfig({
  chains: [calibration, mainnet],
  transports: { [mainnet.id]: http(), [calibration.id]: http() },
})
const queryClient = new QueryClient()

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <YourApp />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

## Example: show balance and deposit

```tsx
import { useAccountInfo, useDepositAndApprove } from "@filoz/synapse-react"
import { parseUnits } from "viem"
import { useAccount } from "wagmi"

function Balance() {
  const { address } = useAccount()
  const { data: account } = useAccountInfo({ address, watch: true })
  const deposit = useDepositAndApprove()

  return (
    <div>
      <p>Available: {account?.availableFunds.toString()} USDFC</p>
      <button onClick={() => deposit.mutate({ amount: parseUnits("1", 18) })}>
        Deposit 1 USDFC
      </button>
    </div>
  )
}
```

## Example: upload a file

```tsx
import { useUpload } from "@filoz/synapse-react"

const upload = useUpload({ source: "my-app" })
upload.mutate({ file })
```

## Hooks

**Payments (Filecoin Pay)**

| Hook | What it does |
| --- | --- |
| `useAccountInfo` | Your Filecoin Pay balance |
| `useDeposit` | Deposit tokens |
| `useDepositAndApprove` | Deposit and approve tokens in one step |
| `useWithdraw` | Withdraw tokens |
| `useOperatorApprovals` | Read which services can create payment rails for you |
| `useApproveOperator` | Let a service (such as FWSS) create payment rails for you |
| `useRevokeOperator` | Remove that permission |

**Storage (FWSS)**

| Hook | What it does |
| --- | --- |
| `useProviders` | List approved storage providers |
| `usePriceList` | Read warm storage prices |
| `useDataSets` | List your data sets and their pieces |
| `useCreateDataSet` | Create a data set |
| `useUpload` | Upload a file |
| `useUploadSimple` | Upload files to a data set and add them in one request |
| `useUploadPieces` | Upload files to an existing data set |
| `useDeletePiece` | Delete a piece |

**Tokens and wallet**

| Hook | What it does |
| --- | --- |
| `useERC20Balance` | Token balance and approved amount |
| `useApproveAllowance` | Approve tokens for Filecoin Pay |
| `useAddUsdfc` | Add USDFC to the wallet's token list |
| `useFundWallet` | Get test FIL and USDFC on Calibration Testnet |
| `useFilsnap` | Install Filsnap in MetaMask (import from `@filoz/synapse-react/filsnap`) |

Write hooks can sign with a session key instead of the wallet. See [Filecoin SDK session keys](session-keys.md).

Every hook, with its inputs and outputs: [Filecoin SDK React API](https://docs.filecoin.cloud/reference/filoz/synapse-react/toc/).

## Next steps

* [Filecoin SDK Core](README.md): the functions these hooks are built on.
* [Filecoin SDK](../../store-data/tools/filecoin-sdk.md): upload data with the main SDK.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/reference/filecoin-sdk/react)
