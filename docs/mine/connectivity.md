---
title: Improving connectivity
description: Tips and tricks for improving a miner's connectivity to the Filecoin network.
---

# Improving connectivity

Filecoin miners, like participants in all peer-to-peer protocols, require a steady and quality pool of peers to communicate with in order to perform their various functions. For other participants on the network to establish incoming P2P connections with a miner, a few conditions must be met:

* The miner's public IP address must be known
* The protocol (TCP/UDP) and port number (0-65535) on which the miner is listening must be known 
* All routers & firewalls must be configured to allow incoming traffic on that protocol/port combination

The following steps are highly recommended for all miners who wish to successfully accept storage and retrieval deals.

## Setting multiaddresses

You can set the multiaddresses that your miner listens on in a miner's `config.toml` file (by default located at `~/.lotusminer/config.toml`). 

Once you've done so, you can set the on-chain record of your miner's listen addresses with the command:
 
 ```
 lotus-miner actor set-addrs <multiaddr_1> <multiaddr_2> ... <multiaddr_n>
```

This updates the `MinerInfo` object in your miner's actor, which will be looked up when a client attempts to make a deal with you. You can provide any number of addresses.

As an example, you could run:

```
 lotus-miner actor set-addrs /ip4/123.123.73.123/tcp/12345 /ip4/223.223.83.223/tcp/23456 
```

This step is the best way to ensure your miner is dial-able for storage and retrieval deals!

## Checking peer count

To ensure storage and retrieval deals operate smoothly, it is recommended to check how many peers a miner is connected to after each start-up. In the Lotus client, a manual peer check can be performed with the command:

```
lotus-miner net peers
``` 

If a very low peer count is present (1-5), it is possible to manually connect the miner to the DHT by utilising one of the bootstrap peers listed in the branch's `./build/bootstrap/bootstrappers.pi` file with the commmand:

```
lotus-miner net connect <address1> <address2>…
```

## Port forwarding

In order to ensure that Filecoin packets are able to pass freely and unfiltered through a local firewall, it is highly recommended to set up port forwarding for a miner's `libp2p` address. By default, this port is randomised; for optimal connectivity, make sure that it is set to a static IP. 

#### Option 1: Standard port forwarding

To enable port forwarding on your local router:

1. Browse to the management website for your home router (typically http://192.168.1.1)
2. Log in as admin / root
3. Find the section to configure port forwarding
4. Choose a port, and configure a port forwarding rule with the following values:
    * External port: [CHOSEN PORT]
    * Internal port: [CHOSEN PORT]
    * Protocol: TCP
    * IP Address: Private IP address of the host system running the miner

#### Option 2: UPnP setup

Alternatively, users with routers that support universal plug and play (UPnP) can set up their firewalling automatically by configuring their client's daemon to use the address `0.0.0.0`. Note that, if using UPnP, **standard port forwarding does not need to be set up,** and can cause issues if used in parallel.  

## Establishing a public IP address

To help storage and retrieval deals operate smoothly, your miner will need to be dialable from a public IP address. Below are multiple ways to achieve this, from manually setting an IP address for your miner, to using software or hardware to set up a relay endpoint.

### Manually setting an IP address

To manually set an IP address for your miner, edit the `~/.lotusminer/config.toml` configuration file's `AnnounceAddresses` address list. You will need to include the port number. DNS4 multi-address or IPV6 formats are also acceptable.

Below is an example `~/.lotusminer/config.toml` configuration file in which the public IP address is `1.2.3.4`:

```
[Libp2p]
   ListenAddresses = ["/ip4/0.0.0.0/tcp/5472"]
   AnnounceAddresses = ["/ip4/1.2.3.4/tcp/10240"]
```
In the above example, port `10240` is forwarded to `<internal-miner-host-ip>:5472`.

Verify that the port is listening by using telnet (eg: `telnet 1.2.3.4 10240`. `nc` is also sufficient.) If successful, a plaintext `/multistream/1.0.0` line will be within the response.

As an additional litmus test, you should be able to:
- Ping your Public IP address using https://ping.eu/ping
- Establish a TCP socket to your Public IP address and port using https://ping.eu/port-chk/

If any of these tests fail, then your IP is not publicly dialable.

### Using relay endpoints

If you do not control the NAT/Firewall that your device is behind (such as within enterprise networks and other firewalls), there is an alternative solution for you. You can set up a **relay endpoint** so that your miner can relay its internet traffic through an external, publicly dialable endpoint.

There are multiple ways to achieve this.

_Note: Remember that libp2p (the underlying network stack of the Filecoin miner) listens on multiple addresses simultaneously. This means that adding a relay endpoint is not a tradeoff but an advantage, as it will be used as a last resort when direct connectivity can't be achieved._

#### libp2p relay

The [libp2p circuit relay](https://docs.libp2p.io/concepts/circuit-relay/) is a standard libp2p node that offers a service to any other relay node to route their traffic through it. You can deploy a libp2p circuit relay on a machine with a public IP address (e.g. a standard cloud provider), then instruct your miner to route all of its traffic through the libp2p relay by adding the new multiaddr to your miner.

- [libp2p circuit relay: How it works](https://docs.libp2p.io/concepts/circuit-relay)
- How to write a simple program that uses the relay [here](https://github.com/libp2p/go-libp2p-examples/blob/master/relay/main.go)

#### Wireguard

[Wireguard](https://www.wireguard.com) is a fast, simple, lean VPN. It is transparent for applications and presents itself as yet another network interface for your machine. Similar to the libp2p relay, you will need to deploy a Wireguard endpoint on a public machine, and route your miner's traffic through it.

#### Ungleich IPv6 VPN Service

[Ungleich](https://ungleich.ch) is a Swiss company offering a hosted [IPv6 VPN service powered by Wireguard](https://ungleich.ch/ipv6/vpn/).

- 1. Contract the service from [Ungleich](https://ungleich.ch)
- 2. [Install Wireguard](https://www.wireguard.com/install) on your machine
- 3. Create a Wireguard keypair using the command `umask 077; wg genkey > privkey`
- 4. Send the public key associated with your private key to Ungleich. You can get the public key using `wg pubkey < privkey`
- 5. Wait to receive the Wireguard configuration from Ungleich, then set it up on your machine
- 6. Follow the [Setting multiaddresses](#setting-multiaddresses) steps to add this multiaddr to your miner and announce it on-chain.

Voilà, now you have a new network interface with an IPv6 address. All traffic using that interface will be routed through Ungleich IPv6 VPN, which means that your machine, no matter where it is, will be publicly dialable through that IPv6 address. 

#### VPN IPv6 Router Box (VIIRB)

Recently, Ungleich announced an even simpler setup: a VPN contained in a hardware box. This box is known as the VIIRB.

You can order a VIIRB at:

- [VIIRB](https://ungleich.ch/u/products/viirb-ipv6-box/)
- [PIB (for faster connectivity)](https://ungleich.ch/u/products/pro-ipv6-box/)

Note: VIIRB uses open source software and hardware. You can also build your own using the specifications for the [VIIRB box](https://ungleich.ch/u/products/viirb-ipv6-box) and its microcomputer, the [VoCore](https://vocore.io/v2u.html).

#### SSH Reverse Tunnel

Another option is to use an [ssh reverse tunnel](https://www.howtogeek.com/428413/what-is-reverse-ssh-tunneling-and-how-to-use-it) to set up a proxy between your miner machine and a public IP machine.

With this approach, you link a local port in your local address to a public port in the public IP machine, and then announce the public port + public IP address to the world. When peers dial back to you on your public multiaddr, the traffic is relayed through that tunnel to your miner machine.
