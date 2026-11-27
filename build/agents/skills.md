---
description: >-
  The skills in the Filecoin plugin: filecoin for storing files and folders, plus
  skills for private shares, session handoffs, and running a PDP storage provider.
---

# Skills

A skill tells an agent when to act, which steps to follow, and which rules to keep. The [Filecoin plugin](plugin.md) includes all of these skills. To add one skill alone, use its install command. The skills are in the [`plugins/filecoin/skills`](https://github.com/filecoin-project/agents/tree/main/plugins/filecoin/skills) directory of the filecoin-project/agents repository.

| Skill | What it does | Install |
| --- | --- | --- |
| [`filecoin`](https://github.com/filecoin-project/agents/tree/main/plugins/filecoin/skills/filecoin) | Stores files and folders on Filecoin with the `filecoin` CLI, and returns links to share. | `npx skills add filecoin-project/agents --skill filecoin` |
| [`private-share`](https://github.com/filecoin-project/agents/tree/main/plugins/filecoin/skills/private-share) | Encrypts a file or folder and shares it with one person or agent, as a Share link and a separate Access key. Also opens a share you received. The skill is in preview. | `npx skills add filecoin-project/agents --skill private-share` |
| [`session-share`](https://github.com/filecoin-project/agents/tree/main/plugins/filecoin/skills/session-share) | Saves an agent session as an encrypted handoff, shares it, and restores it in another agent. The skill is in preview. | `npx skills add filecoin-project/agents --skill session-share` |
| [`filecoin-pdp-agent`](https://github.com/filecoin-project/agents/tree/main/plugins/filecoin/skills/filecoin-pdp-agent) | Deploys and runs a Curio PDP storage provider, with health and earnings checks, recovery, and upgrades. | `npx skills add filecoin-project/agents --skill filecoin-pdp-agent` |

To install a skill for your user instead of the current project, add `-g`.

`private-share` and `session-share` run the [filecoin-pin](https://github.com/filecoin-project/filecoin-pin) CLI, version 2.3.0 or later, and store on mainnet by default. To send a share, the login needs the `encrypt` scope:

```sh
filecoin-pin login --scopes createDataSet,addPieces,encrypt
```

{% hint style="danger" %}
`filecoin-pdp-agent` gives the agent full control of the storage provider, including the private keys that Curio uses. The agent can sign transactions and spend the funds those keys control. Use it only with a provider and a wallet that you intend to put under the agent's control. The Filecoin plugin includes this skill, and the agent loads it when you ask it to run a storage provider. The [Curio setup guide](https://github.com/filecoin-project/curio/blob/main/documentation/en/filecoin-pdp-agent.md) describes the control model.
{% endhint %}

## The filecoin skill

The `filecoin` skill tells an agent when to run `filecoin`. For commands and flags, it sends the agent to the CLI's own help, which always matches the installed version.

To install the copy that matches your installed CLI, run `filecoin skills install`. The command writes the skill to the current project. To install it for your user instead, add `--scope global`.

The agent runs the [`filecoin` package on npm](https://www.npmjs.com/package/filecoin) with `npx -y filecoin`, which needs Node.js 24 or newer. To install the package instead, run `npm install -g filecoin`.

The first `filecoin login` asks you to [approve the agent's key](README.md#approve-the-agents-key).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build/agents/skills)
