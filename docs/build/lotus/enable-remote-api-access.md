---
title: 'Lotus: enable remote API access'
description: 'This guide shows how to configure Lotus so that its APIs can be remotely accessed.'
breadcrumb: 'Enable remote API access'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

The **Lotus Miner** and the **Lotus Node** applications come with their own local API endpoints setup by default when they are running. Both `lotus` and `lotus-miner` act as a daemon (when launched with `lotus daemon` or `lotus-miner run`) and as client to that daemon (every other command).

In this section we will explain how to enable remote access to the Lotus APIs as run by the daemons.

::: callout
**Instructions are the equivalent for `lotus` and `lotus-miner`**. For simplicity, we will just show how to do it with `lotus` by editing the [Lotus Node configuration](../../store/lotus/configuration-and-advanced-usage.md), but the same can be achieved by editing the [Lotus Miner configuration](../../mine/lotus/miner-configuration.md).
:::

## Setting the listening interface for the API endpoint

By default, the API listens on the local "loopback" interface (`127.0.0.1`). This is [configured](../../store/lotus/configuration-and-advanced-usage.md) in the `config.toml` file:

To access the API remotely, Lotus needs to listen on the right IP/interface. The IP associated to each interface can be usually found with the command `ip a`. Once the right IP is known, it can be set in the configuration:

```toml
[API]
  ListenAddress = "/ip4/<EXTERNAL_INTERFACE_IP>/tcp/3453/http" # port is an example

  # Only relevant for lotus-miner
  RemoteListenAddress = "<EXTERNAL_IP_AS_SEEN_BY_OTHERS:<EXTERNAL_PORT_AS_SEEN_BY_OTHERS>"
```

:::tip
`0.0.0.0` can be used too. This is a wildcard that means "all interfaces". Depending on the network setup, this may affect security (listening on the wrong, exposed interface).
:::

After making these changes, please restart the affected process.

## Issuing tokens

Any client wishing to talk to the API endpoints will need a token. Tokens can be generated with:

```sh
lotus auth create-token --perm <read,write,sign,admin>
```

(similarly for the Lotus Miner).

The permissions work as follows:

- `read` - Read node state, no private data.
- `write` - Write to local store / chain, and `read` permissions.
- `sign` - Use private keys stored in wallet for signing, `read` and `write` permissions.
- `admin` - Manage permissions, `read`, `write`, and `sign` permissions.

Tokens can then be used in applications by setting an Authorization header as:

```
Authorization: Bearer <token>
```
