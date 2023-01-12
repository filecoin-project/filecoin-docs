---
title: "Create"
draft: false
images: []
type: docs
menu:
  developers:
    parent: "lorem"
    identifier: "create-ec25cd02bcbf09eb3d2621879ba0d42f"
weight: 100
toc: true
---

## CreateBackup

CreateBackup creates node backup onder the specified file name. The
method requires that the lotus daemon is running with the
LOTUS_BACKUP_BASE_PATH environment variable set to some path, and that
the path specified when calling CreateBackup is within the base path

Perms: admin

Inputs:

```json
[
  "string value"
]
```

Response: `{}`
