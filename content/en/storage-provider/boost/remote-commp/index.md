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
weight: 88
toc: true
---
# Remote CommP

<!-- STEF Does this page need to explain what commP is better? and also does it really need to explain how to checkout and build boost? Link to this and add more explanation of commP and Piece CID https://spec.filecoin.io/systems/filecoin_files/piece/ -->

Boost allows computing commP (Piece CID) during the deal on a lotus worker node. This should alleviate any chokepoints in the market due to the commP calculation and reduce the overall resource utilisation on the market nodes.

To enable remote commP calculation, enable this setting in the config file and restart the boost node

```
[Dealmaking]
   RemoteCommp = true
```

