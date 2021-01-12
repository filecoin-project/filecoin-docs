---
title: 'Lotus: Upgrades'
description: 'This guide will show you how to safely upgrade a Lotus node to a newer version.'
breadcrumb: 'Upgrades'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## Installing an update

Usually, if you are updating Lotus, it as simple as rebuilding and re-installing the software after pulling the latest state for the chosen branch and repository. You can do that with:

```sh
git pull
git checkout <branch or tag>
```

Once the new version is checked-out, rebuild and re-install as explained in the [installation guide](installation.md).

You can verify your current version with:

```sh
lotus --version # for the lotus binary
lotus version   # for the currently running daemon
```

:::callout
**You will need to stop and start the daemon again after installing the new version**.
:::

## Switching networks

If you want to switch networks, read [this guide](switch-networks.md).
