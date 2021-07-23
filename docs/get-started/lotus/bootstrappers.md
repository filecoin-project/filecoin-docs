---
title: Running Bootstrapper Nodes
description: 'Running your own bootstrapper nodes'
breadcrumb: 'Bootstrapper nodes'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

### Bootstrappers

Lotus daemons may be configured to act as network bootstrappers. Bootstrappers act as the initial point of
contact for other lotus daemons to find peers.

::: tip
Unless you are running a private test network, it is not usually necessary for you to run a network bootstrapper node.
:::

### Configuring a Bootstrapper node

Because bootstrapper nodes handle somewhat different traffic than a typical lotus daemon, we recommend using
the following configuration. This configuration will setup the node to act as a bootstrapper for 

```toml
  [API]
    ListenAddress = "/ip4/0.0.0.0/tcp/1234/http"
  [Libp2p]
    ListenAddresses = ["/ip4/0.0.0.0/tcp/1347"]
    ConnMgrLow = 400
    ConnMgrHigh = 500
    ConnMgrGrace = "5m0s"
    Bootstrapper = true
  [Pubsub]
    Bootstrapper = true 

```

### Starting a Bootstrapper node

Start the lotus daemon with the bootstrapper profile. `--profile=bootstrapper` overrides configuration defaults
to enable bootstrapper mode for libp2p and pubsub subsystems. If your daemon config file contains `Bootstrapper = true` as in the example above, this option is not required.

```bash
lotus daemon --profile=bootstrapper
```

### Operating a Bootstrapper node
Bootstrapper nodes will automatically bootstrap with existing bootstrappers. If you are operating your own infrastrucuture, you may want to manually peer your bootstrappers with each other.

```bash
lotus net peers
lotus net connect <peer_multiaddr>
```

### Configure lotus daemons to connect to this bootstrapper.

Lotus bootstrappers are built in at compile time. You can find the list of public bootstrapper nodes for
each network [here](https://github.com/filecoin-project/lotus/tree/master/build/bootstrap). This list can be overridden by adding the following to your daemon config file.


```
[Libp2p]
    BootstrapPeers = [
      "<multiaddr>"
    ]
```
