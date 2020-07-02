---
title: Overview
description: A brief description of the Network Inspector Example.
---

# Overview

In this tutorial, we will show you how to build a Filecoin network inspector using [lotus](https://github.com/filecoin-project/lotus/) via Textile’s [lotus-devnet](https://github.com/textileio/lotus-devnet), the [Lotus JS API client](https://github.com/filecoin-shipyard/js-lotus-client), and a [go-ipfs](https://github.com/ipfs/go-ipfs/) daemon.

This Filecoin network inspector can be used to interact with any aspect of the Filecoin network that is exposed through Lotus’ JS API. Our app will include:

- A simple chain explorer, showing information about Filecoin blocks.
- A miner explorer, showing information about all the active miners in the Filecoin network (in this example, this shows the miners in the local devnet).
- A marketplace, where you can add your files on the connected Filecoin network and see how storage and retrieval deals occur under the hood.
- A deals page, where you can see all your previous deals and their details.

After completing this tutorial, you will be able to:

1. Setup your own local Filecoin development network (devnet).
2. Connect to the running Filecoin network using different JavaScript-based libraries.
3. Use the JavaScript libraries to query the endpoints for chain and miner data.
4. Use JavaScript libraries to create storage and retrieval deals.
5. Use JavaScript libraries to fetch details about your previous deals.

Full tutorial coming soon!
