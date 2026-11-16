---
description: >-
  Have an AI agent set up and run a Curio warm storage provider for you with
  the filecoin-pdp-agent skill.
---

# Provide warm storage with an agent

**The `filecoin-pdp-agent` skill lets an AI agent, such as Claude Code, Codex or Cursor, install Curio, set up warm storage and keep it running.** It works on a new machine or an existing provider, on Linux, macOS or another compatible host. Curio handles proofs and payments on its own. The agent checks in on a schedule and fixes problems within the limits you set.

{% hint style="warning" %}
**The agent gets full control.** It can read and use the provider's wallet key, sign transactions and spend the funds you give it. Use a machine and a wallet you're willing to hand over. Before it starts, the agent asks you to accept these risks.
{% endhint %}

## Before you start

* An AI agent that can run commands on the machine, such as Claude Code, Codex, Cursor or OpenClaw.
* Node.js and npm, to install the skill.
* Storage and a public domain for the machine. See [Requirements](requirements.md).
* FIL for the provider wallet.

## Step 1: Install the skill

```sh
npx skills add filecoin-project/filecoin-skills --skill filecoin-pdp-agent --global
```

Pick your agent when asked. In Codex, you can instead ask:

```text
Use $skill-installer to install https://github.com/filecoin-project/filecoin-skills/tree/main/skills/filecoin-pdp-agent
```

## Step 2: Start the agent

Run your agent with access to the machine, then ask:

```text
Use filecoin-pdp-agent to set up and run a Filecoin PDP provider on this machine. I authorize full agent control of this provider, including access to the private keys Curio uses and the funds I allocate. Handle installation and ongoing operation. Ask me for any missing storage, funding or access decisions.
```

The agent shows a risk notice first. Reply "I understand and accept" to continue.

## What the agent does

1. Checks the machine and anything already running.
2. Installs the latest stable Curio release and its services.
3. Sets up storage, the provider wallet, the chain connection and your public HTTPS address. Asks you to fund the wallet if needed.
4. Registers you as a provider and checks you're ready. It tags your provider in the registry with `curioOperator: filecoin-pdp-agent`.
5. Schedules a health and earnings check once a day, and a check for new releases once a week.

## Keep it running

* Scheduled checks need a working scheduler on your agent's host. The agent tells you if one is active. A single chat doesn't set up future checks.
* The agent keeps a short deployment record, with no secrets, so later sessions continue where it left off.
* It asks you before anything outside your limits, such as spending more or deleting data.
* To stop the agent, withdraw your acceptance. It cancels its scheduled jobs and leaves Curio running.

## Next steps

* [Verify and go live](verify-and-go-live.md)
* [Payouts and withdrawals](payouts-and-withdrawals.md)

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/provide-storage/provide-warm-storage-with-an-agent)
