---
title: "Remote CommP calculation"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "remote-commp-fbf677ed83d5967606d2d0f55d739399"
weight: 100
toc: true
---
# Remote CommP

<!-- STEF Does this page need to explain what commP is better? and also does it really need to explain how to checkout and build boost?-->

Boost is introducing a new <!--STEF when? --> feature that allows computing commP during the deal on a lotus worker node. This should alleviate any chokepoints in the market due to the commP calculation and reduce the overall resource utilisation on the market nodes.

To build `boostd` with remote commP feature please follow the below steps.

1. Clone the main branch from the boost repo

```
git clone https://github.com/filecoin-project/boost.git
```

2. Checkout the v1.4.0 or higher release

```
git checkout v1.4.0
```

3. Build the boost binaries

```
make build
```

4. Enable remote commP in the config

```
[Dealmaking]
   RemoteCommp = true
```

5. Start the boost node
