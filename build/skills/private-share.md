---
description: >-
  Install the private-share skill so an agent can encrypt a file or folder,
  store it on Filecoin, and hand back a Share link and a separate Access key.
---

# private-share

**The `private-share` skill lets an agent send an encrypted file or folder to one person, and open shares you receive.** This page walks you through installing the skill and sending your first share.

The skill drives the [Filecoin Pin CLI](https://github.com/filecoin-project/filecoin-pin). To run the CLI yourself, see the commands in [Share privately](../advanced/encryption/keys-and-sharing.md#share-privately).

{% hint style="warning" %}
**Preview.** This skill may change. The source is in [filecoin-project/filecoin-skills](https://github.com/filecoin-project/filecoin-skills/tree/main/skills/private-share).
{% endhint %}

**Using an AI agent?** Copy this prompt into it:

{% code overflow="wrap" %}
```text
Help me share a file privately on Filecoin by following this page:
https://docs.filecoin.io/build-on-filecoin/skills/private-share.md

1. Install the private-share skill and the Filecoin Pin CLI.
2. This skill runs on mainnet by default and spends real tokens. Show me the cost before each upload.
3. When you run `filecoin-pin login`, send me the approval link and wait. Never ask me for a private key, seed phrase or Grant.
4. If the account needs funds, tell me. Don't try to fund it yourself.
5. After the upload, show me the Share link and the Access key once, as two separate items.
```
{% endcode %}

{% hint style="info" %}
**Requirements**

* Node.js 24 or newer
* `filecoin-pin` 2.3.0 or later
* To send: a funded Filecoin account, with FIL for transaction fees and USDFC for storage, and a login that can encrypt. See [Wallets](../../networks-and-tools/assets/wallets.md)
* To open a share you received: only Node.js and `filecoin-pin`. No wallet or login
* An agent that can run shell commands, such as Claude Code or Codex
{% endhint %}

The skill runs on mainnet by default. To test on Calibration, ask the agent for it: every command then needs `--network calibration`, including the recipient's. The link doesn't name its network, so tell the recipient.

## Steps

1. **Install the skill and the CLI it drives:**

   ```sh
   npx skills add filecoin-project/filecoin-skills --skill private-share
   npm install -g filecoin-pin@latest
   ```

   The skills installer ends with `Installed 1 skill` and puts the skill in `./.agents/skills/private-share`. Add `-g` to `npx skills add` to install it for every project.

2. **Log in once, with encryption.** The login creates a session key on this machine. It can upload but can't move funds. You approve it with your owner wallet, the wallet that holds your funds. When you approve, the console issues a Grant. The Grant gives this session key permanent read access to every encrypted upload in your keyspace, including later ones. Revoking or expiring the session key doesn't take that back.

   Run the login in your own terminal:

   ```sh
   filecoin-pin login --scopes createDataSet,addPieces,encrypt
   ```

   It opens the Filecoin Pay Console. Connect your owner wallet and approve the key. The console then shows the Grant (`fgr1_…`). Copy it and paste it at the prompt in your terminal. Success prints a line starting `✓ Grant saved`.

   If the agent runs the login, it sends you the console link. After you approve, copy the Grant and import it in your own terminal, not in the agent's chat:

   ```sh
   pbpaste | filecoin-pin login --grant -
   ```

   On Linux, use `wl-paste --no-newline` or `xclip -o -selection clipboard` instead of `pbpaste`.

3. **Fund your account.** In the [Filecoin Pay Console](https://pay.filecoin.cloud/console), approve the Filecoin Warm Storage Service and deposit USDFC. A session key can't move funds, so you do this step yourself. Ask the agent for a dry run to see the cost of an upload without uploading. For rates, see [Pricing](https://docs.filecoin.cloud/introduction/about/#pricing).

4. **Ask the agent to share something.** Say "share ./report.pdf privately with Ana". The upload ends with `Add completed successfully`, and the agent hands back a Share link and an Access key. Send them by different channels.

What comes back, how the recipient opens it, and how to restore your own upload are in [Share privately](../advanced/encryption/keys-and-sharing.md#share-privately). For the skill's full safety rules and limits, see its [README](https://github.com/filecoin-project/filecoin-skills/blob/main/skills/private-share/README.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build-on-filecoin/skills/private-share)
