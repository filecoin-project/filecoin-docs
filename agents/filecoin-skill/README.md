---
description: >-
  Install the Filecoin Skill so Claude Code, Codex, Cursor, or a cloud agent
  can store files on Filecoin and share links to them.
---

# Filecoin Skill

**The Filecoin Skill lets an AI agent store files on Filecoin, share links to them, and later retrieve and verify them.** You keep the wallet and approve what the agent can do.

{% hint style="warning" %}
**Beta.** The Filecoin Skill and the Filecoin CLI are prototypes. Their commands and services may change.
{% endhint %}

**Using an AI agent?** Copy this prompt into it:

{% code overflow="wrap" %}
```text
Help me store files on Filecoin by following this page:
https://docs.filecoin.io/agents/filecoin-skill.md

1. Install the Filecoin Skill for the agent you are running in.
2. Use the Calibration testnet until I tell you to use mainnet.
3. When you run `filecoin login`, send me the approval link and wait. Never ask me for a private key or seed phrase.
4. If the account needs funds, send me the funding link. Don't try to fund it yourself.
5. After each upload, give me the link to share.
```
{% endcode %}

{% hint style="info" %}
**Requirements**

* An agent that can run shell commands, such as Claude Code, Codex, or Cursor
* Node.js 24 or newer
* A wallet with USDFC, to approve the agent and pay for storage. See [Agent wallets and funding](../agent-wallets-and-funding.md)
{% endhint %}

## How the skill works

* **The skill** tells the agent how to store, share, and retrieve files on Filecoin.
* **The Filecoin CLI** (`filecoin`) does the work. The agent runs it in its own shell. See [Filecoin CLI agent mode](filecoin-cli-agent-mode.md).
* **The Filecoin plugin** installs the skill together with the read-only [MCP server](../mcp-server.md), in Claude Code and Codex.

You only need to install the skill. The rest of this page covers it.

## Install

{% tabs %}
{% tab title="Claude Code" %}
```sh
claude plugin marketplace add filecoin-project/agents
claude plugin install filecoin@filecoin
```
{% endtab %}

{% tab title="Codex" %}
```sh
codex plugin marketplace add filecoin-project/agents
codex plugin add filecoin@filecoin
```
{% endtab %}

{% tab title="Other agents" %}
```sh
npx skills add filecoin-project/agents
```

If the Filecoin CLI is already installed, `filecoin skills install` adds the version of the skill that matches it.
{% endtab %}
{% endtabs %}

## Use it

Ask the agent to store a file, for example:

```text
Store ./report.pdf on Filecoin and give me a link to share.
```

The agent returns a link to share. [Retrieve data](../../store-data/warm-storage/retrieve-data.md) explains each link and what it verifies.

On its first run, the agent sends you a link to approve its access with your wallet. If the account has no funds yet, it sends a funding link too. See [Agent wallets and funding](../agent-wallets-and-funding.md).

## Where your agent runs

| Platform | Recommended usage |
| --- | --- |
| Local, such as Claude Code, Codex, or Cursor | Install the plugin or skill, then approve the agent's access on its first run |
| Cloud, such as a coding agent in a hosted sandbox | Its files are gone when the session ends, so it can't keep a key. Install the skill, and give the agent a session key as a secret. See [Delegate access with session keys](../../store-data/warm-storage/delegate-access-with-session-keys.md) |
| Browser agent | It can't run the skill, so it can't store data. It can open the links the agent sends and look up data on [PDP Explorer](https://pdp.filecoin.cloud) |
| Chat app, such as Claude or ChatGPT | It can't run the skill. Add the read-only [MCP server](../mcp-server.md) to look up data |

## More skills

The [Skills Catalog](skills-catalog/README.md) lists other Filecoin skills, such as `publish` and `filecoin-pdp-agent`.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/agents/filecoin-skill)
