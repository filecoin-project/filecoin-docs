---
description: >-
  Run Filecoin Cloud locally with foc-localnet and point the Filecoin SDK at
  it by passing the Warm Storage and Multicall3 contract addresses.
---

# Local devnet

**Use a local devnet to test your app against Filecoin Cloud without spending real tokens.** Start one with foc-localnet, then point the Filecoin SDK at it by passing two contract addresses.

## Networks

| Network | Chain ID | Contract addresses |
| --- | --- | --- |
| Mainnet | 314 | Found automatically |
| Calibration testnet | 314159 | Found automatically |
| Local devnet | 31415926 | You provide them |

## Start a local network

[foc-localnet](https://github.com/FilOzone/foc-localnet) runs a complete Filecoin network on your machine, with all the Filecoin Cloud contracts deployed. Follow its README to start it, and note the RPC URL and contract addresses it prints.

## Connect the SDK

Pass the Warm Storage and Multicall3 addresses. The SDK finds every other contract from the Warm Storage address.

```ts
import { Synapse } from "@filoz/synapse-sdk"

const synapse = await Synapse.create({
  privateKey: process.env.PRIVATE_KEY,
  rpcURL: process.env.RPC_URL,
  source: "my-app",
  warmStorageAddress: process.env.WARM_STORAGE_ADDRESS,
  multicall3Address: process.env.MULTICALL3_ADDRESS,
  usdfcAddress: process.env.USDFC_ADDRESS, // optional
})
```

Then use the SDK as you would on Calibration. See [Upload data](../warm-storage/upload-data.md).

## Next steps

* [Filecoin SDK](../tools/filecoin-sdk.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data/resources/local-devnet)
