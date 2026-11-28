---
description: >-
  Have an AI agent publish its reports, logs, and other outputs to Filecoin with the publish skill, so anyone can later check a record is exactly what the agent produced.
---

# Keep verifiable agent records

**Have your agent publish its reports, logs, and files with the `publish` skill.** Each record gets a CID made from its content, so anyone can fetch it later and check it hasn't changed. The agent never holds your wallet key: it uses a session key you approve once.

**Using an AI agent?** Copy this prompt into it:

{% code overflow="wrap" %}
```text
Help me keep verifiable records of my agent's outputs on Filecoin by following this page:
https://docs.filecoin.io/guides/keep-verifiable-agent-records.md

1. This guide runs on mainnet and spends real tokens. Tell me the cost before each paid step.
2. Send me any approval or funding link, then wait for me. Never ask me for a private key or seed phrase.
3. Run the steps in order, and check each one worked before you go on.
4. If a step fails, stop and tell me which step and what happened.
```
{% endcode %}

{% hint style="info" %}
**Requirements**

* Node.js 24 or newer
* A wallet on mainnet with FIL for transaction fees and USDFC for storage. See [Networks and tokens](#networks-and-tokens)
* An agent that can run shell commands, such as Claude Code or Codex
{% endhint %}

## Networks and tokens

The `publish` skill runs on mainnet only. It has no testnet mode. Calibration is for testing only. Don't keep anything there that you need.

| Network | FIL, for transaction fees | USDFC, for storage |
| --- | --- | --- |
| Calibration testnet | Free from the [Calibration faucet](https://faucet.calibnet.chainsafe-fil.io/funds.html) | Free from the [tUSDFC faucet](https://forest-explorer.chainsafe.dev/faucet/calibnet_usdfc) |
| Mainnet | Buy on an exchange, or bridge with [Squid Router](https://app.squidrouter.com) | Swap with [Squid Router](https://app.squidrouter.com), or mint on [usdfc.net](https://app.usdfc.net) |

## Install and log in

```sh
npx skills add filecoin-project/filecoin-skills --skill publish
npm install -g filecoin-pin
filecoin-pin login
```

`login` prints a link. Open it, connect your wallet, and approve the session key. The key can store data but can't move your funds.

## Fund your account

Storage is paid from a USDFC deposit in Filecoin Pay. About 5 USDFC is enough to start.

In the [Filecoin Pay Console](https://pay.filecoin.cloud/console), use **Add Service** to approve Warm Storage and deposit USDFC in one transaction. Check your balance at any time:

```sh
filecoin-pin payments status
```

If an upload costs more than your balance, it stops and shows a link to add funds. See [Fund storage](../store-data/warm-storage/fund-storage.md).

## Step 1: Publish

Ask the agent: "Publish this report." It returns a link like `https://inbrowser.link/ipfs/<cid>`, first when the CID is known, then confirmed once the upload is checked.

The skill also keeps a list of everything it published at `~/.filecoin-share/shares.json`, with each Root CID, Piece CID, and data set. Keep that file: it's your audit trail.

## Step 2: Check a record

* **Still stored:** `filecoin-pin data-set show <data-set-id>` shows its proof status.
* **Unchanged:** fetch it by CID with any IPFS gateway or tool. If it loads under that CID, it's exactly what the agent published.

## Good to know

* **Public.** Anyone with the CID can read a record. Don't publish private data with this skill.
* **Keep it funded.** Records stay stored while your balance pays for them. See [Monitor balance and proofs](../store-data/warm-storage/monitor-balance-and-proofs.md).
* **No skill needed.** You can run `filecoin-pin add` yourself. See [Filecoin Pin](../store-data/tools/filecoin-pin.md).

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Not enough USDFC | The upload stops and shows how to add funds. Deposit, then run the command again. See [Fund storage](../store-data/warm-storage/fund-storage.md) |
| A new link returns 404 | Wait a few minutes, then try again |
| No proofs yet | The first proof can take up to 24 hours |

For other errors, see [Errors and troubleshooting](../store-data/resources/errors-and-troubleshooting.md).

## Next steps

* [Register an agent with ERC-8004](register-an-agent-with-erc-8004.md)
* [Give an agent persistent memory](give-an-agent-persistent-memory.md)
* [`publish` skill](../agents/filecoin-skill/skills-catalog/publish.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/guides/keep-verifiable-agent-records)
