---
description: >-
  The Beacon method group contains methods for interacting with the random
  beacon (DRAND)
---

# Beacon

## BeaconGetEntry

BeaconGetEntry returns the beacon entry for the given Filecoin epoch. If the entry has not yet been produced, the call will block until the entry becomes available

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
