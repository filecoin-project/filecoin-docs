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

## Soft-delete the Lotus data

At some point, you may need to soft-delete the [lotus configuration](configuration-and-advanced-usage.md) folder located at `~/.lotus` (or, if manually set, at `$LOTUS_PATH`).  For example, in the case of a network reset where an existing chain is rebooted from scratch. The best way to do this is to move `~/.lotus` into another directory that will not interfere with the Lotus application. Without a `~/.lotus` folder, the Lotus daemon will create a new one on boot, along with a new wallet and chain data.

```bash
mv ~/.lotus ~/.lotus-pre-reset
```

If you manually set your `$LOTUS_PATH` variable, find out what the variable is set to, and move your Lotus data accordingly:

```bash
echo $LOTUS_PATH

> /root/lotus/.config/lotus

mv /root/lotus/.config/lotus /root/lotus/.config/lotus-pre-reset
```

::: warning
Do not **delete** your `~/.lotus` folder unless you are sure you do not need it. It is much safer to _soft-delete_ your `~/.lotus` directory so you can easily recover anything in the future.
:::

## Switching networks

If you want to switch networks, read [this guide](switch-networks.md).
