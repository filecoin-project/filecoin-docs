---
title: 'Lotus Miner: setup a high performance miner'
description: 'This guide describes the necessary steps to configure a Lotus miner so that it can effecitively perform its tasks in the Filecoin network.'
breadcrumb: 'Miner setup'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

LEFTOVERs:

## Environment variables

Specific to the _Lotus miner_:

- `LOTUS_MINER_PATH`: Location for the miner's on-disk repo. Defaults to `./lotusminer`.
- A number of environment variables are respected for configuring the behaviour of the Filecoin proving subsystem.
