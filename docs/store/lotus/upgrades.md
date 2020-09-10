---
title: 'Lotus: Upgrades'
description: 'This guide will show you how to safely upgrade a Lotus node to a newer version.'
breadcrumb: 'Upgrades'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

If you installed Lotus on your machine, first you have to delete the configuration folder located at `~/.lotus` (or if you manually set `LOTUS_PATH`, look under that directory).

```bash
rm -rf ~/.lotus # or $LOTUS_PATH
```

Then you can upgrade to the latest version by going to Lotus directory and executing the following commands:

```bash
# get the latest
git pull origin master

# clean and remake the binaries
make clean && make build

# instal binaries in correct location
make install # or sudo make install if necessary
```
