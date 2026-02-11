---
description: >-
  Canonical guidance for modern Filecoin storage patterns and migration away
  from legacy Deal Client workflows.
---

# Modern storage patterns

{% hint style="info" %}
This is the canonical replacement page for deprecated Deal Client workflows.

Use this page as the default destination from deprecation notices.
{% endhint %}

Filecoin storage guidance has evolved away from legacy Deal Client workflows. Today, storage integrations should start from modern patterns that are actively supported and easier to maintain.

## What changed

Legacy Deal Client flows depended on older toolchains and workflows that are no longer the recommended baseline for new integrations. They are kept as reference material only.

## Current primary paths

### PDP

[PDP documentation](../../storage-providers/pdp/README.md) is the current in-repo reference for Proof of Data Possession workflows.

### FOC

Use the [FOC documentation index](foc-documentation-index.md) as the current landing point for FOC-related guidance and updates.

### Onramps

For managed ingestion paths and simpler onboarding, see the [Storage onramps overview](README.md#storage-onramps).

## How to choose

* Start with **PDP** when your workflow needs verifiable storage/proof semantics.
* Use **onramps** when you want a managed ingestion path rather than low-level deal orchestration.
* Use **FOC** resources for newer ecosystem patterns as they are published.

## Migration from Deal Client

If you're maintaining a legacy Deal Client workflow, apply the templates from [Deprecation notices](deprecation-notices.md) and move users to one of the modern paths above.
