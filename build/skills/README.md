---
description: >-
  Agent skills for Filecoin: what each one does, how to install it, and its
  status.
---

# Build with skills

**Agent skills for Filecoin, with what each one does and how to install it.** A skill is a set of instructions that a coding agent, such as Claude Code or Codex, follows to do a task. Each skill installs on its own.

{% hint style="warning" %}
**Preview.** Skills marked Preview may change.
{% endhint %}

| Skill | What it does | Install | Status |
| --- | --- | --- | --- |
| [`private-share`](private-share.md) | Sends an encrypted file or folder to one person, and opens shares you receive | `npx skills add filecoin-project/filecoin-skills --skill private-share` | Preview |
| [`session-share`](session-share.md) | Saves an agent session as an encrypted handoff, shares it, and restores it in another agent | `npx skills add filecoin-project/filecoin-skills --skill session-share` | Preview |

Add `-g` to an `npx skills add` command to install the skill for every project, not just the current one.

For the full session flow, see [Save, share and restore a session](share-a-session.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/build-on-filecoin/skills)
