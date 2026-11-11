---
description: >-
  Register an AI agent on the ERC-8004 Identity Registry, with its agent card stored on Filecoin so anyone can fetch it and check it's still stored.
---

# Register an agent with ERC-8004

**Register an AI agent on the ERC-8004 Identity Registry so other agents and apps can look it up.** You store the agent's card on Filecoin with Filecoin Pin, then register a link to it on Base. The example registers a "GitHub Integration Agent" on testnets. Example code is in [FilOzone/FilecoinPin-for-ERC8004](https://github.com/FilOzone/FilecoinPin-for-ERC8004).

**Using an AI agent?** Copy this prompt into it:

{% code overflow="wrap" %}
```text
Help me register my agent with ERC-8004 by following this page:
https://docs.filecoin.io/guides/register-an-agent-with-erc-8004.md

1. Use the Calibration testnet until I tell you to use mainnet.
2. I'll set `PRIVATE_KEY` in your environment myself. Never ask me to paste a private key or seed phrase.
3. Run the steps in order, and check each one worked before you go on.
4. If a step fails, stop and tell me which step and what happened.
```
{% endcode %}

{% hint style="info" %}
**Requirements**

* Node.js 24 or newer
* The Filecoin Pin CLI: `npm install -g filecoin-pin`
* [Foundry](https://getfoundry.sh), to send the registration transaction
* [jq](https://jqlang.org) (optional), to read JSON output
* A wallet with FIL and USDFC on Filecoin, and ETH on Base. One wallet works on both. See [Networks and tokens](#networks-and-tokens)
{% endhint %}

## Networks and tokens

Filecoin Pin uses mainnet by default. To test, add `--network calibration` to each command. Calibration is for testing only. Don't keep anything there that you need.

| Network | FIL, for transaction fees | USDFC, for storage |
| --- | --- | --- |
| Calibration testnet | Free from the [Calibration faucet](https://faucet.calibnet.chainsafe-fil.io/funds.html) | Free from the [tUSDFC faucet](https://forest-explorer.chainsafe.dev/faucet/calibnet_usdfc) |
| Mainnet | Buy on an exchange, or bridge with [Squid Router](https://app.squidrouter.com) | Swap with [Squid Router](https://app.squidrouter.com), or mint on [usdfc.net](https://app.usdfc.net) |

You also need ETH on Base to register. About 0.001 is enough:

| Network | ETH, for registration |
| --- | --- |
| Base Sepolia (testnet) | Free from the [Base Sepolia faucet](https://www.alchemy.com/faucets/base-sepolia) |
| Base (mainnet) | Buy, or bridge ETH to Base |

## Fund your account

Storage is paid from a USDFC deposit in Filecoin Pay. About 5 USDFC is enough to start. With your key set, approve Warm Storage and deposit USDFC, then check your balance:

```sh
export PRIVATE_KEY=0x...   # never commit this
filecoin-pin payments setup --auto
filecoin-pin payments status
```

If an upload costs more than your balance, it stops before it stores anything. Deposit more, then run the command again. See [Fund storage](../store-data/warm-storage/fund-storage.md).

## Step 1: Write your agent card

An agent card is a small JSON file that says what your agent is and how to reach it. Create `github-agent-card.json`:

```json
{
  "type": "https://eips.ethereum.org/EIPS/eip-8004#registration-v1",
  "name": "GitHub Integration Agent",
  "description": "AI agent for GitHub repositories, issues and pull requests through GitHub's official MCP server.",
  "image": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  "endpoints": [
    {
      "name": "MCP",
      "endpoint": "https://api.githubcopilot.com/mcp/",
      "version": "1.0.0"
    },
    {
      "name": "agentWallet",
      "endpoint": "eip155:84532:0x0000000000000000000000000000000000000000"
    }
  ],
  "registrations": [],
  "supportedTrust": ["reputation"]
}
```

| Field | What it is |
| --- | --- |
| `type` | The ERC-8004 version the card follows |
| `name`, `description`, `image` | How people see your agent |
| `endpoints` | Where to reach the agent, here an MCP server and the agent's wallet |
| `supportedTrust` | How others can trust it, for example reputation |

Check the file is valid JSON with `jq . github-agent-card.json`.

## Step 2: Store the card on Filecoin

```sh
filecoin-pin add --auto-fund github-agent-card.json
```

From the output, save two values:

* **Root CID**, for example `bafybei…`. This is the card's ID on IPFS.
* **Data Set ID**, for example `11653`. You use it to check proofs.

Your token URI is the Root CID plus the file name. **It must include the file name:**

```
ipfs://<ROOT_CID>/github-agent-card.json
```

Check the card loads from IPFS. It can take a few minutes to appear:

```sh
curl -s "https://ipfs.io/ipfs/<ROOT_CID>/github-agent-card.json" | jq .
```

## Step 3: Register the agent

Set your values:

```sh
export TOKEN_URI="ipfs://<ROOT_CID>/github-agent-card.json"
export IDENTITY_REGISTRY="0x8004A818BFB912233c491871b3d84c89A494BD9e"
export BASE_SEPOLIA_RPC="https://sepolia.base.org"
```

Send the registration:

```sh
cast send $IDENTITY_REGISTRY "register(string)" "$TOKEN_URI" \
  --rpc-url $BASE_SEPOLIA_RPC --private-key $PRIVATE_KEY
```

`status 1 (success)` in the output means your agent is registered. Registration creates an NFT, and its token ID is your **agent ID**.

## Step 4: Check it worked

**Find your agent ID.** Open your transaction on [BaseScan (Base Sepolia)](https://sepolia.basescan.org/), go to the **Logs** tab, and read the token ID from the **Transfer** event. Or use `cast`:

```sh
export TX_HASH="0x…"   # transactionHash from Step 3
AGENT_ID=$(cast receipt $TX_HASH --rpc-url $BASE_SEPOLIA_RPC --json \
  | jq -r '.logs[] | select(.topics[0] == "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef") | .topics[3]' \
  | head -1 | xargs cast --to-dec)
echo "Agent ID: $AGENT_ID"
```

**Check the registry points to your card:**

```sh
cast call $IDENTITY_REGISTRY "tokenURI(uint256)" $AGENT_ID --rpc-url $BASE_SEPOLIA_RPC
```

Decode the result with `cast --abi-decode "f()(string)" <result>`. You should see your token URI. You can also view the agent at `https://sepolia.basescan.org/nft/0x8004a818bfb912233c491871b3d84c89a494bd9e/<AGENT_ID>`.

**Check the card is being proven:**

```sh
filecoin-pin data-set show <DATA_SET_ID>
```

## Step 5: Go to mainnet

The steps are the same, with real tokens and the mainnet registry:

|  | Testnet | Mainnet |
| --- | --- | --- |
| Filecoin network | Calibration | Mainnet (Filecoin Pin's default) |
| Tokens | tFIL, test USDFC, Base Sepolia ETH | FIL, USDFC, Base ETH |
| Registry address | `0x8004A818BFB912233c491871b3d84c89A494BD9e` | `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432` |
| RPC | `https://sepolia.base.org` | `https://mainnet.base.org` |

## Good to know

* **To update the card,** upload a new version (it gets a new CID) and point the registry at the new token URI.
* **ERC-8004** also defines reputation and validation registries. See the [specification](https://eips.ethereum.org/EIPS/eip-8004).

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Not enough USDFC | The upload stops and shows how to add funds. Deposit, then run the command again. See [Fund storage](../store-data/warm-storage/fund-storage.md) |
| A new link returns 404 | Wait a few minutes, then try again |
| No proofs yet | The first proof can take up to 24 hours |
| `filecoin-pin: command not found` | Run `npm install -g filecoin-pin@latest` |
| `Transaction reverted` on Base | Check your ETH with `cast balance <ADDRESS> --rpc-url https://sepolia.base.org --ether` and top up |
| The card won't load from IPFS | Wait a few minutes, or try another gateway such as `dweb.link` |
| The token URI is missing the file name | Register a new agent with `ipfs://<CID>/github-agent-card.json` |

For other errors, see [Errors and troubleshooting](../store-data/resources/errors-and-troubleshooting.md).

## Next steps

* [Keep verifiable agent records](keep-verifiable-agent-records.md)
* [Filecoin Pin](../store-data/tools/filecoin-pin.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/guides/register-an-agent-with-erc-8004)
