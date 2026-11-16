---
description: >-
  Run Filecoin Cloud locally with foc-devnet and point the Filecoin SDK at it
  with the chain, RPC, and funded account from devnet-info.json.
---

# Local devnet

**Use a local devnet to test your app against Filecoin Cloud without spending real tokens.** Start one with foc-devnet, then point the Filecoin SDK at it.

## Networks

| Network | Chain ID | Contract addresses |
| --- | --- | --- |
| Mainnet | 314 | Found automatically |
| Calibration testnet | 314159 | Found automatically |
| Local devnet | 31415926 | Read from `devnet-info.json` |

## Start a local network

[foc-devnet](https://github.com/FilOzone/foc-devnet) runs a complete Filecoin network on your machine, with all the Filecoin Cloud contracts deployed. Follow its README to start it. It writes the RPC URL, contract addresses, and funded test accounts to `~/.foc-devnet/state/latest/devnet-info.json`.

## Connect the SDK

Build the local chain from `devnet-info.json`, and pass it with an RPC transport and an account. `USER_1`, the first user in the file, is already funded and ready to store data.

```ts
import { readFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { Synapse } from "@filoz/synapse-sdk"
import { toChain, validateDevnetInfo } from "@filoz/synapse-core/devnet"
import { http } from "viem"
import { privateKeyToAccount } from "viem/accounts"

const infoPath = join(homedir(), ".foc-devnet", "state", "latest", "devnet-info.json")
const devnet = validateDevnetInfo(JSON.parse(readFileSync(infoPath, "utf8")))
const chain = toChain(devnet)

const synapse = Synapse.create({
  chain,
  transport: http(chain.rpcUrls.default.http[0]),
  account: privateKeyToAccount(devnet.info.users[0].private_key_hex as `0x${string}`),
  source: "my-app",
})

console.log(synapse.chain.id) // 31415926
```

If the chain ID isn't 31415926, the SDK isn't using your devnet. Check it before you upload. Then use the SDK as you would on Calibration. See [Upload data](../warm-storage/upload-data.md).

## Next steps

* [Filecoin SDK](../tools/filecoin-sdk.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/store-data/resources/local-devnet)
