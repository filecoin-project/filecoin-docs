---
description: >-
  Install the filecoin CLI, log in with a session key, store a file, and
  download it again on the Calibration testnet.
---

# Quickstart

This guide installs `filecoin`, logs in, stores a file, and downloads it again. It uses the Calibration testnet, so storage is paid with test USDFC.

You need:

* Node.js 24 or newer.
* A browser wallet, such as [MetaMask](../../networks-and-tools/assets/metamask-setup.md), with Calibration tFIL for gas and test USDFC. See [Get test tokens](../developing-contracts/get-test-tokens.md).

## Hand it to an agent

Add `filecoin` to your agent, then ask it to store a file. On its first run, the agent sends you a link to approve its key with your wallet. [Connect an agent](connect-an-agent.md) covers cloud and browser agents.

{% tabs %}
{% tab title="Plugin" %}
Adds the agent skill and the read-only MCP server to Claude Code or Codex.

```sh
claude plugin marketplace add filecoin-project/agents
claude plugin install filecoin@filecoin

# In Codex
codex plugin marketplace add filecoin-project/agents
codex plugin add filecoin@filecoin
```
{% endtab %}

{% tab title="Agent skill" %}
Teaches any agent with a shell when and how to run `filecoin`.

```sh
npx skills add filecoin-project/agents
```
{% endtab %}

{% tab title="MCP server" %}
Read-only tools for providers, data sets, and pieces. It cannot store files.

```sh
npx -y add-mcp https://mcp.filecoin.io -g
```
{% endtab %}
{% endtabs %}

To do it yourself, follow the steps below.

## Install the CLI

```sh
npm install -g filecoin
filecoin --help
```

## Log in

```sh
filecoin login
```

`filecoin login` makes a session key, saves it on your machine, and opens the web app's setup page. Connect your wallet there, review the request, and approve each step. The page can also approve Warm Storage and deposit USDFC. The private key never leaves your machine, and the CLI finds the approval on chain, so there is nothing to copy back.

Then check the account:

```sh
filecoin status
```

`filecoin status` reports when each permission expires, your USDFC funds, and the Warm Storage approval. If the account needs a deposit, it also returns a funding link.

## Store a file

Check the size, provider, and cost first. A dry run stores nothing:

```sh
filecoin put ./report.pdf --dry-run
```

Then store it:

```sh
filecoin put ./report.pdf
```

The result's `urls.browser` is the link to share. A new link to a file can return `404` for a while. [Retrieve and verify](retrieve-and-verify.md) explains why, and what each link checks.

## Get it back

```sh
filecoin ls
filecoin get res_… --output ./copy.pdf
```

`filecoin get` downloads from the provider and checks the bytes against the PieceCID.

## Next

* [CLI](cli.md) explains how `filecoin` works and where its help and schemas are.
* [Connect an agent](connect-an-agent.md) shows how to give an agent the same access.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/filecoin-for-agents/quickstart)
