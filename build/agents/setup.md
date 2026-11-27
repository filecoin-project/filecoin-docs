---
hidden: true
description: >-
  Steps an agent follows to install the Filecoin plugin or skill, get its
  session key approved, and confirm the account is ready.
---

# Agent setup

Follow these steps to set up `filecoin` for your user. `filecoin` stores files and folders on Filecoin and returns links to share. It needs a shell and Node.js. If you have no shell, add the read-only [MCP server](mcp.md) instead.

A person owns the wallet and approves what you may do. Never ask for a private key or a seed phrase. Stay on the Calibration testnet unless the user asks for mainnet.

## 1. Check Node.js

Run `node --version`. If Node.js is missing, tell the user and stop. If it is older than 24, install the current LTS version and continue.

## 2. Set up a cloud agent

If your disk is gone when the session ends, such as in a cloud sandbox, don't install anything. Files that you install are gone with the session. Instead, follow these steps, then go to step 5. Otherwise, go to step 3.

1. Tell the user to add `filecoin` in their cloud agent's account settings, so that every new session has it. If the agent supports plugins, they add the [Filecoin plugin](plugin.md) from `filecoin-project/agents`. Otherwise, they add the [`filecoin` skill](skills.md) from `filecoin-project/agents`, and `https://mcp.filecoin.io` as an MCP server or connector.
2. Tell the user how to give you a session key that outlives the session. On the Filecoin Pay console's [session keys page](https://pay.filecoin.cloud/console/session-keys), they select **New session key** and authorize the key with their wallet, on the network that you use. The console shows the key once, as `SESSION_KEY` and `WALLET_ADDRESS`. In the cloud agent's environment settings, they add the `SESSION_KEY` value as the secret `FILECOIN_SESSION_KEY`, and the `WALLET_ADDRESS` value as `FILECOIN_ROOT_ADDRESS`. Tell them never to paste the key into the chat.
3. Stop until the user says that they added the secrets. Don't run `filecoin login`. Secrets apply only to sessions that start after the user adds them. In step 5, if `session.state` is `none`, ask the user to start a new session.

## 3. Install the plugin or the skill

Tell the user what you are about to install, then install it for your agent.

If your agent is in this table, install the [Filecoin plugin](plugin.md):

| Agent | Target |
| --- | --- |
| Claude Code | `claude-code` |
| Codex | `codex` |
| Cursor | `cursor` |
| GitHub Copilot CLI | `github-copilot` |
| Grok Build | `grok` |
| Kimi Code | `kimi` |
| Visual Studio Code | `vscode` |

Replace `<target>` with your agent's target:

```sh
DO_NOT_TRACK=1 npx -y plugins add filecoin-project/agents --target <target> --yes
```

In any other agent, or if the command fails, install the `filecoin` skill into the project:

```sh
npx -y skills add filecoin-project/agents --skill filecoin -y
```

Then add the read-only MCP server. Replace `<agent>` with your agent's name from `npx -y add-mcp list-agents`:

```sh
npx -y add-mcp https://mcp.filecoin.io -g -y -a <agent>
```

If your agent is not listed, or the command fails, add `https://mcp.filecoin.io` to the agent's MCP settings as a Streamable HTTP server. If you can't, give the user the URL.

The agent loads what you installed in its next session. To finish the setup in this session, follow the rest of this guide.

## 4. Log in

Run `npx -y filecoin login`. If it returns an approval link, give the user the link and stop until they say that they approved it. Then run `npx -y filecoin login --check`.

## 5. Check the account

Run `npx -y filecoin status`. If a scope is `expired` or `not granted`, or `account.ready` is `false`, tell the user. If the output has `account.fundingUrl`, give the user that link.

## 6. Finish

When `createDataSet` and `addPieces` have an expiry date and `account.ready` is `true`, tell the user that the setup is done. Offer to store a file or a folder. Store only what the user names. Before you store it, check the size and the cost with `npx -y filecoin put <path> --dry-run`.

Every command writes one JSON object, with `data` or `error`, then optional `next` steps. Give the user each step that is marked `by: "user"`. `npx -y filecoin --help` lists the commands, and `npx -y filecoin <command> --help` shows examples and flags. The [CLI](cli.md) page explains how they work.
