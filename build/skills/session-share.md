---
description: >-
  Install the session-share skill so an agent can save a session as an
  encrypted handoff on Filecoin, share it, and restore it in another agent.
---

# session-share

**The `session-share` skill lets an agent save the current session as an encrypted handoff on Filecoin, share it with another agent, and restore it there.** This page walks you through installing the skill and saving your first session.

The skill drives the [Filecoin Pin CLI](https://github.com/filecoin-project/filecoin-pin).

{% hint style="warning" %}
**Preview.** This skill may change. The source is in [filecoin-project/filecoin-skills](https://github.com/filecoin-project/filecoin-skills/tree/main/skills/session-share).
{% endhint %}

**Using an AI agent?** Copy this prompt into it:

{% code overflow="wrap" %}
```text
Help me save and share this agent session on Filecoin by following this page:
https://docs.filecoin.io/build-on-filecoin/skills/session-share.md

1. Install the session-share skill and the Filecoin Pin CLI.
2. This skill runs on mainnet by default and spends real tokens. Show me the cost before each upload.
3. When you run `filecoin-pin login`, send me the approval link and wait. Never ask me for a private key, seed phrase or Grant.
4. If the account needs funds, tell me. Don't try to fund it yourself.
5. Never include the transcript unless I ask for it and confirm.
```
{% endcode %}

{% hint style="info" %}
**Requirements**

* Node.js 24 or newer
* `filecoin-pin` 2.3.0 or later
* To save a session: a funded Filecoin account, with FIL for transaction fees and USDFC for storage. See [Wallets](../../networks-and-tools/assets/wallets.md)
* To save, share, or restore your own sessions: a login that can encrypt
* To restore a session someone shared with you: this skill, Node.js and `filecoin-pin`. No wallet or login
* An agent that can run shell commands, such as Claude Code or Codex
{% endhint %}

The skill runs on mainnet by default. To test on Calibration, ask the agent for it: every command then needs `--network calibration`, including on the receiving side. The link doesn't name its network, so tell the recipient.

## Steps

1. **Install the skill and the CLI it drives:**

   ```sh
   npx skills add filecoin-project/filecoin-skills --skill session-share
   npm install -g filecoin-pin@latest
   ```

   The skills installer ends with `Installed 1 skill` and puts the skill in `./.agents/skills/session-share`. Add `-g` to `npx skills add` to install it for every project.

2. **Log in once, with encryption,** and **fund your account.** Both steps are the same as for `private-share`: see steps 2 and 3 in [private-share](private-share.md#steps).

3. **Ask the agent to save the session.** Say "save this session". The agent asks whether to include files and the transcript, shows you the handoff, then uploads it. Its reply starts with `Session saved`.

To share the session and restore it in another agent, follow [Save, share and restore a session](share-a-session.md). For the skill's full safety rules and limits, see its [README](https://github.com/filecoin-project/filecoin-skills/blob/main/skills/session-share/README.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build-on-filecoin/skills/session-share)
