---
title: Implementations
description: A brief description of Filecoin protocol implementations and how to use them.
---

# Implementations

There are 4 Filecoin protocol implementations (or “node software”) currently in progress:

- [lotus](https://github.com/filecoin-project/lotus/) (Go): This implementation is closest to feature-complete and is therefore, the recommended Filecoin protocol implementation.
- [forest](https://github.com/chainsafe/forest) (Rust)
- [fuhon](https://github.com/filecoin-project/cpp-filecoin) (C++)
- [go-filecoin](https://github.com/filecoin-project/go-filecoin) (Go)

Each of these software clients implements the Filecoin protocol as described in the [Filecoin protocol specification](https://filecoin-project.github.io/specs). Please note that the protocol spec and all implementations are still works-in-progress and expected to change significantly between now and Filecoin mainnet launch. To learn more about why there are multiple Filecoin implementations, please read [this blog post](https://filecoin.io/blog/announcing-filecoin-implementations-in-rust-and-c++/).

Here is a snapshot of each implementation’s progress across the primary parts of the Filecoin protocol (updated June 24, 2020):

|                    | lotus | go-filecoin | forest | fuhon |
| ------------------ | ----- | ----------- | ------ | ----- |
| 1. Node            | ✅    | ✅          | ✅     | ✅    |
| 2. Files & data    | ✅    | 🔶          | 🔶     | ✅    |
| 3. Virtual Machine | ✅    | ✅          | 🔶     | 🔶    |
| 4. VM Actors       | 🔶    | 🔶          | 🔶     | 🔶    |
| 5. Blockchain      | ✅    | ✅          | ✅     | ✅    |
| 6. Token           | ✅    | ✅          | ✅     | ✅    |
| 7. Storage Mining  | ✅    | 🔄          | 🔄     | 🔄 🔶 |
| 8. Market          | ✅    | ✅          | 🔄     | ✅    |

✅ : fully featured implementation
🔄 : reuses components from another implementation
🔶 : partial implementation

**_We recommend that developers only build directly on Filecoin protocol implementations if they are very advanced developers or need to build at a very low level of the stack._** Filecoin protocol implementations expose low-level APIs that developers can use to integrate Filecoin directly into their applications. These APIs and their underlying functionality are still under heavy, active development, and require familiarity with blockchains and the Filecoin protocol. For most applications, we recommend developers use [FPS](./tools/filecoin-backed-pinning) or [Powergate](./tools/powergate).

## Using implementations

Generally speaking, you can use a Filecoin protocol implementation as a “client” (user) or a “miner” (storage provider) _(see [What is Filecoin?](../introduction/what-is-filecoin) for more information)_. Most implementations separate out the storage miner functionality into a separate process from the core node functionality. The core node runs the blockchain system, makes storage and retrieval deals, performs data transfers, supports block producer logic, and syncs and validates the chain. The storage miner process produces sector commitments and _Proofs-of-Spacetime_ to prove they have been correctly storing storage client data, among other important functions. To be a Filecoin “client,” you need to run a full node. To be a Filecoin "miner," you must run a full node and the storage mining process.

Each protocol implementation can be run and integrated in a few different ways:

1. **Run directly through its CLI**: This is often the best way to become familiar with the functionality and performance of Filecoin nodes, implementations, and APIs.
2. **Integrated as a library**: Developers can integrate Filecoin nodes directly into their application by using protocol implementations as libraries. Note that this option often requires end-users to install the dependencies required for node implementations (can be cumbersome for users).
3. **Interact with RPC APIs**: Each protocol implementation exposes an RPC API. Some implementations have wrapper libraries in various languages to make integration into applications easier. Note that most implementations also separate the APIs for the storage mining process from the full node APIs. For most application development use cases, we recommend interacting with the RPC APIs.

If interacting with the implementation’s RPC APIs, the general development pattern when integrating a Filecoin protocol implementation is for the application to do one of the following:

- Run a Filecoin node locally (e.g. run lotus locally) and have the application make RPC API requests to the local node.
- Run a Filecoin node remotely (e.g. in the cloud) and have the application make RPC API requests to the remote node.

Filecoin protocol implementations provide access to core Filecoin protocol workflows, with very few abstractions of the core concepts. This can be very useful, as it allows flexibility and precision in interacting with Filecoin network functionality. However, integrating nodes directly can require greater familiarity with how Filecoin works.

::: tip
See a walkthrough of an end-to-end example application (the Filecoin Network Inspector) built using [Lotus’ JS API client](./examples/network-inspector).
:::

## Resources

If you would like to run or integrate a Filecoin protocol implementation, you can use the following resources and libraries (this is an evolving list that will be updated as more resources come online):

- lotus
  - [General API documentation](https://lotu.sh/en+api) (includes information on authentication and troubleshooting)
  - Go JSON-RPC API
    ﻿ - [APIs common to lotus node + storage miner﻿](https://github.com/filecoin-project/lotus/blob/master/api/api_common.go)
    ﻿ - [Lotus node API﻿](https://github.com/filecoin-project/lotus/blob/master/api/api_full.go)
    ﻿ - [Storage miner API](https://github.com/filecoin-project/lotus/blob/master/api/api_storage.go)
  - [JS JSON-RPC API](https://github.com/filecoin-shipyard/js-lotus-client-rpc) (and [examples](https://github.com/filecoin-shipyard/js-lotus-client))
- forest
- fuhon
- go-filecoin
