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

### Setting multiaddresses

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

### Checking peer count

To ensure storage and retrieval deals operate smoothly, it is recommended to check how many peers a miner is connected to after each start-up. In the Lotus client, a manual peer check can be performed with the command:

```
lotus-miner net peers
``` 

If a very low peer count is present (1-5), it is possible to manually connect the miner to the DHT by utilising one of the bootstrap peers listed in the branch's `./build/bootstrap/bootstrappers.pi` file with the commmand:

```
lotus-miner net connect <address1> <address2>…
```

### Port forwarding

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

Alternatively, users with routers that support universal plug n' play (UPnP) can set up their firewalling automatically by configuring their client's daemon to use the address `0.0.0.0`. Note that, if using UPnP, **standard port forwarding does not need to be set up,** and can cause issues if used in parallel.  

### Setting a public IP address

To help storage and retrieval deals operate smoothly, it is recommended to add the host system's public IP address, as well as the port that was configured above, to the miner configuration file's `AnnounceAddresses` address list. DNS4 multi-address or IPV6 formats are also acceptable.

Below is an example `~/.lotusminer/config.toml` configuration file in which the public IP address is `1.2.3.4`:

```
[Libp2p]
   ListenAddresses = ["/ip4/0.0.0.0/tcp/5472"]
   AnnounceAddresses = ["/ip4/1.2.3.4/tcp/10240"]
```
In the above example, port `10240` is forwarded to `<internal-miner-host-ip>:5472`.

It is possible to verify that the port is listening by using telnet (eg: `telnet 1.2.3.4 10240`. `nc` is also sufficient.) If successful, a plaintext `/multistream/1.0.0` line will be within the response.

## Setting up a Relay endpoint

If you find yourself in a situation in which you set a public IP address on your machine (e.g. Residential Networks) and/or you do not control the NAT/Firewall that your device is behind (e.g. Entreprise Networks and other Firewalls), there is an alternative solution for you. Setting up a Relay endpoint so that your miner can relay its internet traffic through an external, publicly diable endpoint.

Below you can find multiple ways in how to achieve this.

Note: Remember that libp2p (the underlaying network stack of the Filecoin miner) will be listening on multiple addresses simultaneously. What this means is that adding a Relay endpoint is not a tradeoff but an advantage, as it will be used for last resort when direct connectivity can't be achieved.

### libp2p Relay

The [libp2p Circuit Relay (docs here)](https://docs.libp2p.io/concepts/circuit-relay/) is just a standard libp2p node that offers a service to any other Relay node to route their traffic through it. With it, you can deploy a libp2p Circuit Relay in a machine with a Public IP address (e.g. a standard Cloud Provider) and by adding a libp2p relay multiaddr to your miner node, you will instruct the miner to route all of its traffic through the libp2p Relay.

You can learn:
- How it works [here](https://docs.libp2p.io/concepts/circuit-relay)
- How to write a simple program that does the relay [here](https://github.com/libp2p/go-libp2p-examples/blob/master/relay/main.go)

### Wireguard

[Wireguard](https://www.wireguard.com) is a VPN service that uses state of the art cryptography to offer easy to setup VPN service through a secure connection. Once setup, Wireguard is transparent for applications and presents itself just as yet another network interface for your machine.

Similar to the libp2p Relay, you will need to deploy a Wireguard endpoint in a public machine so that your miner can route its traffic to the machine with the public IP.

Alternatively, you can benefit from service providers that offer you this VPN service setup, so that the only thing you have to do is setup the client on your miner machine.

#### Ungleich IPv6 VPN Service

[Ungleich](https://ungleich.ch) is a Swiss company that has a [IPv6 VPN service powered by Wireguard](https://ungleich.ch/ipv6/vpn/). The instructions are quite simple:

- 1. contract the service from [Ungleich](https://ungleich.ch)
- 2. [install wireguard](https://www.wireguard.com/install) in your machine
- 3. create a Wireguard keypair using the command `umask 077; wg genkey > privkey`
- 4. send the public key associated with your private key to Ungleich. You can get the public key using `wg pubkey < privkey`
- 5. wait to receive the wireguard configuration from Ungleich, then set it up in your machine.

Voilá, now you have a new network interface with an IPv6 address. All traffic that gets used by that interface will be routed through Ungleich IPv6 VPN, which means that your machine, independent of where it is, will be publicly diable through that IPv6 address. 

Remember: You will need to add this multiaddr to the list of the multiaddrs used by your miner.

#### VPN IPv6 IoT Router Box (VIIRB)

Recently, Ungleich announced an even simpler setup that can be done by installing a network box to your network. This box is known as the VIIRB.

You can order a VIIRB at:

- [VIIRB](https://ungleich.ch/u/products/viirb-ipv6-box/)
- [PIB (for faster connectivity)](https://ungleich.ch/u/products/pro-ipv6-box/)

### SSH Reverse Tunnel

Another option is to use an [ssh reverse tunnel](https://www.howtogeek.com/428413/what-is-reverse-ssh-tunneling-and-how-to-use-it) to setup the proxy between your miner machine and the public IP machine.

With this approach, you would like a local port in your local address to a public port in the public IP machine and then would announce the public port + public IP address to the world using the right multiaddr, but when peers dial back to you, they are dialing through that tunnel to your miner machine.