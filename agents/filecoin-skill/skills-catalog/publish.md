---
description: >-
  Install the publish skill so an agent can publish a file or folder with
  Filecoin Pin and hand back a verified IPFS link.
---

# publish

**The `publish` skill lets an agent publish a file or folder to Filecoin with Filecoin Pin and hand back a link that keeps working.** This page is a tutorial: it walks you through installing the skill and publishing your first file.

The skill drives the [Filecoin Pin CLI](https://github.com/filecoin-project/filecoin-pin), so everything here also works if you run the CLI yourself.

**Using an AI agent?** Copy this prompt into it:

{% code overflow="wrap" %}
```text
Help me publish files to Filecoin by following this page:
https://docs.filecoin.io/agents/filecoin-skill/skills-catalog/publish.md

1. Install the publish skill and the Filecoin Pin CLI.
2. This skill runs on mainnet and spends real tokens. Tell me the cost before each publish.
3. When you run `filecoin-pin login`, send me the approval link and wait. Never ask me for a private key or seed phrase.
4. If the account needs funds, tell me. Don't try to fund it yourself.
5. After each publish, give me the link to share.
```
{% endcode %}

{% hint style="info" %}
**Requirements**

* Node.js 24 or newer
* A wallet on Filecoin mainnet, with FIL for transaction fees and USDFC for storage. About 5 USDFC is enough to start. See [Wallets](../../../networks-and-tools/assets/wallets.md)
* An agent that can run shell commands, such as Claude Code or Codex
{% endhint %}

The `publish` skill runs on mainnet only. It has no testnet mode.

## Steps

1. **Install the skill and the CLI it drives:**

   ```sh
   npx skills add filecoin-project/filecoin-skills --skill publish
   npm install -g filecoin-pin
   ```

2. **Log in once.** Run `filecoin-pin login` and approve a session key from your wallet in the browser. The agent never gets your private key, and you can revoke the key at any time.

   ```sh
   filecoin-pin login
   ```

3. **Fund your account.** In the [Filecoin Pay Console](https://pay.filecoin.cloud/console), use **Add Service** to approve Warm Storage and deposit USDFC in one transaction. A session key can't move funds, so you do this step yourself. See [Agent wallets and funding](../../agent-wallets-and-funding.md).

4. **Ask the agent to publish something.** Say "publish this," "share this file," or "pin this." The agent hands back a link like `https://inbrowser.link/ipfs/<cid>`, first as soon as the CID is known, then confirmed once the upload is checked.

To run the CLI without the skill, see [Filecoin Pin: Getting Started](../../../build/cookbook/filecoin-pin/getting-started.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/agents/filecoin-skill/skills-catalog/publish)
