# Node

These methods are general node management and status commands

## NodeStatus

There are not yet any comments for this method.

Perms: read

Inputs:

```json
[true]
```

Response:

```json
{
  "SyncStatus": {
    "Epoch": 42,
    "Behind": 42
  },
  "PeerStatus": {
    "PeersToPublishMsgs": 123,
    "PeersToPublishBlocks": 123
  },
  "ChainStatus": {
    "BlocksPerTipsetLast100": 12.3,
    "BlocksPerTipsetLastFinality": 12.3
  }
}
```
