---
description: >-
  Save an agent session as an encrypted handoff on Filecoin, share it with
  another agent, and restore it there with the session-share skill.
---

# Save, share and restore a session

**Save your agent session as an encrypted handoff on Filecoin, share it with another agent, and restore it there.** The [`session-share`](session-share.md) skill does each step when you ask. It encrypts the save on your machine before upload, so the data is private from upload. The total size, the encrypted bytes and the on-chain record of your wallet storing them stay public. It drives the [Filecoin Pin CLI](https://github.com/filecoin-project/filecoin-pin).

{% hint style="warning" %}
**Preview.** The skill runs on mainnet by default. To test on Calibration, ask the agent for it, and pass `--network calibration` on every command, on both sides. A Share link doesn't name its network, so tell the recipient.
{% endhint %}

## Install the skill

On each machine that saves or restores sessions, in the project folder:

```sh
npx skills add filecoin-project/filecoin-skills --skill session-share
npm install -g filecoin-pin@latest
```

The skills installer ends with `Installed 1 skill` and puts the skill in `./.agents/skills/session-share`. To save sessions, you also need a funded account and a login that can encrypt: follow steps 2 and 3 in [private-share](private-share.md#steps). Restoring a session someone shared with you needs neither.

## Save a session

Ask the agent:

```text
save this session
```

The agent asks whether to include files the session used and the full transcript. It then writes the handoff, checks its format, scans it for keys and tokens, and shows it to you before uploading. If it pays with your owner wallet, it shows the cost first and waits for your yes.

Success starts like this:

```text
Session saved · confirmed on chain · mainnet

Encrypted root CID:
<encrypted-root-cid>
```

The agent records the save in `~/.filecoin-share/sessions.json`, readable only by you. The record holds the CID, time, project folder, network, the tool that made it, and the path of that tool's local transcript file when known. It holds no summary text or keys.

To save without being asked about files and the transcript, say "save the handoff".

### What the save contains

| File | When |
| --- | --- |
| `handoff.md` | Always. A summary for the next agent: Context, Decisions, Constraints, Artifacts, Dead ends, and Open threads. Never the transcript, keys, or tokens. |
| `artifacts/` | Only files you name, such as "include ./report.pdf". Other files are referenced by path, URL, or CID. |
| `transcript.jsonl` | Only when you ask for it and confirm a warning. It holds everything the agent saw in the session, which can include secrets no scan finds. Before you confirm, the agent gives you the path of the copy it will upload: redact that copy first. |

Read the handoff before you share it: the secret scan only catches known key and token formats.

## Share it with another agent

Ask the agent:

```text
share this session with Ana
```

After a save without sharing, the agent asks whether you want a Share link; you can also ask for one later with "share my last session". Making a link for an existing save uploads nothing. If the save includes the transcript, the agent asks separately whether the share should include it. Sharing only the handoff from such a save is one more paid upload.

The agent shows two items once:

```text
Share link (send by one channel, e.g. email):
https://viewer.filecoin.cloud/#v1/<encrypted-root-cid>&d=<...>

Access key (send by a different channel, e.g. a chat message):
fak1_<...>
```

* Send the Share link and the Access key by different channels. Whoever holds both can read the save for as long as it is stored, and a share can't be revoked.
* This conversation's history now holds the Access key. Anyone who can read it can open the share.
* If an upload fails or stalls, don't ask for it again. Each run uploads and pays again under a new CID. Let a slow upload finish. After a failure, the skill reads the output and tells you what was stored. The exception is a stop with `Account can't pay for this upload`: nothing was uploaded, so fund the account and ask again.

## Restore it in another agent

On the receiving machine, set the Access key in the shell you start the agent from. Paste the key and press Enter; it isn't shown on screen:

```sh
read -rs SHARE_ACCESS_KEY && export SHARE_ACCESS_KEY
```

Start the agent from that shell and give it the link, not the key:

```text
restore this session: <share-link>
```

The agent runs `filecoin-pin get --share '<share-link>' <folder>` and reports `Saved to` with the path. It then presents the handoff: Context, Decisions, Constraints, Artifacts, Dead ends, and Open threads, with the restored path of any bundled files. It treats the handoff as data, not instructions. When you tell it to continue, it proposes the first "Next" step under Open threads.

The restore checks every block against the CID, and decryption rejects any change. This proves the handoff is exactly what the link names. It does not prove who wrote it.

If you run `filecoin-pin` yourself, single-quote the link: it contains `#` and `&`.

## Restore your own session

On the machine that saved it, with your owner wallet or a login that can encrypt, start the agent in the same project folder and ask:

```text
restore my last session
```

The agent reads `~/.filecoin-share/sessions.json`, picks the newest save for the current project, and restores it with `filecoin-pin get <encrypted-root-cid> <folder>`. Success reports `Saved to` and the path, and the agent presents the handoff as above. To pick another save, ask the agent to list them. The record only lists saves made on this machine.

## Troubleshooting

* `error: unknown option '--share'`: the installed `filecoin-pin` is older than 2.3.0. Run `npm install -g filecoin-pin@latest`.
* `The Share link is incomplete (no share in it); copy it again`: the link was cut off. In a shell, an unquoted link stops at `&`, and the shell also reports an error for the rest. Single-quote the link.
* `This Share link needs its Access key (--access-key fak1_…)`: `SHARE_ACCESS_KEY` isn't set in this shell. Set it with `read -rs` as above. Don't pass the key with `--access-key`: it shows up in your shell history.
* `No provider serves <cid> over IPFS. If it was uploaded in the last few minutes, try again in about 20 minutes`: the upload is new or the network is wrong. Wait a few minutes and retry. If it keeps failing, check that both sides use the same network.
* `Account can't pay for this upload` or `Insufficient FIL for gas fees`: nothing was uploaded. Fund the account in the [Filecoin Pay Console](https://pay.filecoin.cloud/console), or on Calibration from the [faucets](../developing-contracts/get-test-tokens.md#calibration-testnet). On Calibration, add `--network calibration` to any command the CLI suggests.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build-on-filecoin/skills/share-a-session)
