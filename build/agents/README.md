---
description: >-
  Set up an agent to store files and folders on Filecoin with the filecoin CLI,
  Filecoin plugin, and read-only MCP server.
---

# Agents

`filecoin` stores files and folders on Filecoin and returns links to share. Your agent can run it for you, or you can run it in a terminal.

## Set up your agent

Paste this prompt into an agent that has a shell, such as Claude Code, Codex, or Cursor. The agent follows the steps in [Agent setup](setup.md), then sends you a link where you approve its key with your wallet. The agent never holds the wallet key.

{% prompt description="Set up Filecoin" defaultExpanded="true" %}
```text
Set up Filecoin for me. Fetch https://docs.filecoin.io/build/agents/setup.md and follow it.
```
{% endprompt %}

To install one part yourself, pick it here:

<table data-card-size="large" data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Filecoin plugin</strong></td><td>Install all the skills and the MCP server together in Claude Code, Codex, or Cursor.</td><td><a href="plugin.md">plugin.md</a></td></tr><tr><td><strong>Skills</strong></td><td>Install one skill alone in any agent with a shell.</td><td><a href="skills.md">skills.md</a></td></tr><tr><td><strong>MCP server</strong></td><td>Add read-only tools to a chat app or an editor.</td><td><a href="mcp.md">mcp.md</a></td></tr><tr><td><strong>Docs for agents</strong></td><td>Read these docs as Markdown, and find the files that describe them to agents.</td><td><a href="docs-for-agents.md">docs-for-agents.md</a></td></tr></tbody></table>

## Pick the way in

The way in depends on what your agent can do. In every case, a person owns the wallet and approves what the agent may do. The agent never holds the wallet key.

| Agent | What it can do | Way in |
| --- | --- | --- |
| Local agent, such as Claude Code, Codex, or Cursor | Run a shell, keep files, and open pages for you | The [setup prompt](#set-up-your-agent), the [Filecoin plugin](plugin.md), or the [CLI](cli.md) and the [`filecoin` skill](skills.md) |
| Cloud agent, such as a coding agent in a hosted sandbox | Run a shell, but its files are gone when the session ends | [CLI with a key from secrets](#cloud-agents) |
| Chat app with connectors, such as Claude or ChatGPT | Call remote tools | [MCP server](mcp.md), read-only |

## Cloud agents

A cloud agent has a shell, so it uses the same skill and CLI as a local agent. It has no browser to open for you, and its disk is gone when the session ends. `filecoin login` saves the session key on that disk, so each session would ask you to approve a new key.

Give the agent a key that outlives the session instead:

1. On the Filecoin Pay console's [session keys page](https://pay.filecoin.cloud/console/session-keys), select **New session key** and authorize the key with your wallet. Use the network that the agent will use. The console shows the key once, as `SESSION_KEY` and `WALLET_ADDRESS`.
2. In the agent's environment settings, add the `SESSION_KEY` value as the secret `FILECOIN_SESSION_KEY`, and the `WALLET_ADDRESS` value as `FILECOIN_ROOT_ADDRESS`.

The agent then skips `filecoin login`. To confirm that the key works, it runs `filecoin status`. The key expires, and it cannot move funds. To stop the agent, revoke the key on the same page.

{% hint style="danger" %}
Never paste the session key into a chat. Store it only as a secret in the agent's environment.
{% endhint %}

`filecoin ls` lists the wallet's pieces from the [API](api.md), so a new session sees what earlier sessions stored. Refs and `filecoin operations` are in a local database that a new session does not have. To get content back without a ref, run `filecoin get <PieceCID>`.

## Approve the agent's key

The agent gets a session key, and the wallet owner approves it:

{% stepper %}
{% step %}
### The agent asks for a key

The agent runs `filecoin login`. It gets a `login_pending` error with an approval link, and gives you the link.
{% endstep %}

{% step %}
### You approve it

Open the link, connect your wallet, and review the request on the [Filecoin Pay console](https://pay.filecoin.cloud/console)'s setup page. With your wallet, approve each step that the page lists: the session key, the Warm Storage approval, and a deposit.
{% endstep %}

{% step %}
### The agent confirms and stores

The agent confirms the approval, then stores the file:

```sh
filecoin login --check
filecoin put ./report.pdf
```

`--check` never makes a new key, so it can't replace the key you approved.
{% endstep %}
{% endstepper %}

When the account needs funds or the Warm Storage approval, `filecoin put` returns `insufficient_funds` with a prefilled funding link for you. `filecoin status` returns the funding link in `account.fundingUrl`. To stop the agent, revoke its key on the console's [session keys page](https://pay.filecoin.cloud/console/session-keys). `filecoin logout` returns a link that opens the revocation for its key.

## Use the CLI

To run `filecoin` yourself, follow these steps:

{% stepper %}
{% step %}
### Install and log in

`filecoin login` opens a page where you approve a session key with your wallet.

```sh
npm install -g filecoin
filecoin login
```
{% endstep %}

{% step %}
### Check the account

If the account needs funds, `filecoin status` returns a funding link.

```sh
filecoin status
```
{% endstep %}

{% step %}
### Store a file

The result's `urls.browser` is the link to share.

```sh
filecoin put ./report.pdf
```
{% endstep %}

{% step %}
### Download the file

Use the `res_…` ref that `filecoin put` returned. The file is available after the provider indexes it. Indexing can take a few minutes.

```sh
filecoin get res_… --output ./copy.pdf
```
{% endstep %}
{% endstepper %}

[CLI](cli.md) explains how `filecoin` works.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/agents)
