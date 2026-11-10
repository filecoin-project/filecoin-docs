---
description: >-
  Agent skills for Filecoin: what each one does, how to install it, and its
  status.
---

# Skills Catalog

**Agent skills for Filecoin, with what each one does and how to install it.** Each skill installs on its own. This list grows as new skills ship.

{% hint style="warning" %}
**Beta.** Skills marked Prototype or Preview may change.
{% endhint %}

| Skill | What it does | Install | Status |
| --- | --- | --- | --- |
| [Filecoin Skill](../README.md) | Stores files with the Filecoin CLI and returns links to share | `npx skills add filecoin-project/agents` | Prototype |
| [`publish`](publish.md) | Publishes a file or folder with Filecoin Pin and returns an IPFS link | `npx skills add filecoin-project/filecoin-skills --skill publish` | Stable |
| [`filecoin-pdp-agent`](https://github.com/filecoin-project/filecoin-skills/tree/main/skills/filecoin-pdp-agent) | Sets up and runs a storage provider with Curio, with health and earnings checks, recovery, and upgrades | `npx skills add filecoin-project/filecoin-skills --skill filecoin-pdp-agent` | Preview |

Add `-g` to an `npx skills add` command to install the skill for every project, not just the current one.

For the full storage provider setup, step by step, see the [Storage Provider Agent Quickstart](../../../storage-providers/agent-quickstart.md).

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/agents/filecoin-skill/skills-catalog)
