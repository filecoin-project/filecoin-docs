---
title: "Beacon"
draft: false
images: []
type: docs
menu:
  reference:
    parent: "reference-json-rpc"
    identifier: "beacon-8de17b9d07d363191f6c1b41cc409dc0"
weight: 100
toc: true
aliases:
    - "/developers/reference/json-rpc/beacon/"
---

The Beacon method group contains methods for interacting with the random beacon (DRAND)

## BeaconGetEntry

BeaconGetEntry returns the beacon entry for the given Filecoin epoch. If
the entry has not yet been produced, the call will block until the entry
becomes available

Perms: read

Inputs:

```json
[
  10101
]
```

Response:

```json
{
  "Round": 42,
  "Data": "Ynl0ZSBhcnJheQ=="
}
```
<!--REVIEWED!-->