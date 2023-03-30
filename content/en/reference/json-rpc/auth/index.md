---
title: "Auth"
draft: false
images: []
type: docs
menu:
  reference:
    parent: "reference-json-rpc"
    identifier: "auth-bf5e11c4b9188acedf356a3887d6a5c5"
weight: 100
toc: true
aliases:
    - "/developers/reference/json-rpc/auth/"
---

## AuthNew

Perms: admin

Inputs:

```json
[
  [
    "write"
  ]
]
```

Response: `"Ynl0ZSBhcnJheQ=="`

## AuthVerify

Perms: read

Inputs:

```json
[
  "string value"
]
```

Response:

```json
[
  "write"
]
```
