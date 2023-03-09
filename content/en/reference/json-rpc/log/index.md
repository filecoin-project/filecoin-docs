---
title: "Log"
draft: false
images: []
type: docs
menu:
  reference:
    parent: "reference-json-rpc"
    identifier: "log-ab6e15ebd409119b7fd1cfcc5d279bd3"
weight: 100
toc: true
aliases:
    - "/developers/reference/json-rpc/log/"
---

## LogAlerts

Perms: admin

Inputs: `null`

Response:

```json
[
  {
    "Type": {
      "System": "string value",
      "Subsystem": "string value"
    },
    "Active": true,
    "LastActive": {
      "Type": "string value",
      "Message": "json raw message",
      "Time": "0001-01-01T00:00:00Z"
    },
    "LastResolved": {
      "Type": "string value",
      "Message": "json raw message",
      "Time": "0001-01-01T00:00:00Z"
    }
  }
]
```

## LogList

Perms: write

Inputs: `null`

Response:

```json
[
  "string value"
]
```

## LogSetLevel

Perms: write

Inputs:

```json
[
  "string value",
  "string value"
]
```
