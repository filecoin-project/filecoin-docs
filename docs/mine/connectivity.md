---
title: Improving connectivity
description: Tips and tricks for improving a miner's connectivity to the Filecoin network.
---


# Improving connectivity

Filecoin miners, like participants in all P2P protocols, require a steady and quality pool of peers to communicate with in order to perform their various functions. For other participants on the network to establish incoming P2P connections with a miner, a few conditions must be met:

* The miner's public IP address must be known
* The protocol (TCP/UDP) and port number (0-65535) on which the miner is listening must be known 
* All routers & firewalls must be configured to allow incoming traffic on that protocol/port combination

The below sections assist in performing these tasks.

## Checking peer count
To ensure storage and retrieval deals operate smoothly, it is recommended to regularly check how many peers a miner is connected to. In the Lotus client, a manual peer check can be performed with the command:

```
lotus-miner net peers
``` 

If a very low peer count is present (1-5), it is possible to manually connect the miner to the DHT by utilising one of the bootstrap peers listed in the branch's `./build/bootstrap/bootstrappers.pi` file.

## Port forwarding

It is highly recommended to use port forwarding for a miner's `libp2p` address. By default, this port is randomised; for optimal connectivity, ensure that it is set to a static IP. 

To enable port forwarding on your local router:

1. Browse to the management website for your home router (typically http://192.168.1.1)
2. Log in as admin / root
3. Find the section to configure port forwarding
4. Choose a port, and configure a port forwarding rule with the following values:
    * External port: [CHOSEN PORT]
    * Internal port: [CHOSEN PORT]
    * Protocol: TCP
    * IP Address: Private IP address of the host system running the miner

## Setting a public IP address

It is important to ensure that the public IP address as well as the port that was configured above is listed in the miner configuration file's `AnnounceAddresses` address list. DNS4 multi-address or IPV6 formats are also valid.

Below is an example configuration file in which the public IP address is `1.2.3.4`:

```
[Libp2p]
   ListenAddresses = ["/ip4/0.0.0.0/tcp/5472"]
   AnnounceAddresses = ["/ip4/1.2.3.4/tcp/10240"]
In the example port 10240 is forwarded to <internal-miner-host-ip>:5472
Miners can verify that things are working by running by using telnet eg: telnet 1.2.3.4 10240 (nc also works)
Miners should see a plaintext  `/multistream/1.0.0` in the response.
```
