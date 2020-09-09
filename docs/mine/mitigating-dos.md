---
title: Mitigation of DoS attacks
---

# Mitigation of DoS attacks

Any service accessible to the Internet is exposed to a multitude of potential attacks that can be done intentionally (malicous actor), or indirectly (network scans, enumeration, etc). This a challenge not exclusive to Filecoin and it is a very well developed area with many organizations offering all kinds of services to protect from it. In this page, you will find some recommendations, but ultimately you should explore other solutions that are available to you.

## Port based protection

When running your Miner from a Public IP address, every single port on your machine will be accessible from the Internet by default. We recommend that you block all incoming traffic except for the ports that are essential, namely SSH and the Lotus listen addresses.

First, [set a static port for your Miner using the guide]./setting-a-static-port.md)

Then use the following command to block a specific port:

```
# Using port 80 to exemplify. This will block the port in all the network interfaces
iptables -A INPUT -p tcp --destination-port 80 -j DROP
```

Alternatively, you can just set the default policy to drop packets in all ports and only accept in a few

```
# Set the INPUT policy to DROP:
iptables -P INPUT DROP

# Allow packets from connections related to established ones, packets from established ones, and packets from localhost:
iptables -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A INPUT -i lo -j ACCEPT

# Allow new connections to TCP ports 22 (for SSH) and the ports of your miner (here, using 12345 as example):
iptables -A INPUT -p TCP -m multiport --dports 22,12345 -m state --state NEW -j ACCEPT
```

At the end of setting these rules, save them with:

```
# for Ubuntu
sudo /sbin/iptables-save

# for Red Hat / CentOS –
sudo /sbin/service iptables save
# or
sudo  /etc/init.d/iptables save 
```

## IP based protection

If you detect incoming traffic from an IP address, you can block all incoming traffic coming from that location. 

```
# Blocking 192.168.1.100 to exemplify.
iptables -I INPUT -s 192.168.1.100 -j DROP
```

After setting this rule, remember to save your new rule with

```
# for Ubuntu
sudo /sbin/iptables-save

# for Red Hat / CentOS –
sudo /sbin/service iptables save
# or
sudo  /etc/init.d/iptables save 
```

Learn more how to maintain a denylist of IPs at [Blocking IP Addresses in Linux with IPTables](https://linux-audit.com/blocking-ip-addresses-in-linux-with-iptables)

## libp2p based protection

If a malicious actor has successfully dialed to your miner and is spamming it at the Gossipsub level, you can block it at the libp2p level.

To detect this, look for patterns such as:

```
2020-08-31T16:12:16.214-0400	INFO	pubsub	go-libp2p-pubsub@v0.3.5/pubsub.go:927	received message from router graylisted peer 12D3KooWFf6t5Zj4u8585r9bLwU3unykX4DmHftUtx6kEzw89anL. Dropping RPC
2020-08-31T16:12:16.214-0400	INFO	pubsub	go-libp2p-pubsub@v0.3.5/pubsub.go:927	received message from router graylisted peer 12D3KooWJp8Kj9w65eQcsEdfT4dfhsWAeiroMfxAdZCzqd2wbHq2. Dropping RPC
2020-08-31T16:12:16.215-0400	INFO	pubsub	go-libp2p-pubsub@v0.3.5/pubsub.go:927	received message from router graylisted peer 12D3KooWJp8Kj9w65eQcsEdfT4dfhsWAeiroMfxAdZCzqd2wbHq2. Dropping RPC
```

In this case, it is likely that a node is misbehaving and sending so many invalid messages that it was already discarded from the Gossipsub routing table. To disable it from successfully setting a libp2p connection, you can use the following command:

```
TODO: ADD COMMAND HERE
```

You can also block this peer IPs by fetching its multiaddrs and adding a rule for the IP addresses on the iptables. Use:

```
lotus net findpeer 12D3KooWFf6t5Zj4u8585r9bLwU3unykX4DmHftUtx6kEzw89anL
TODO: ADD EXAMPLE HERE OF THE OUTPUT
```

And then follow the instructions on [IP based protection](#ip-based-protection) to block these IPs.

## Separating the Miner from the Gatekeeping machine

In order to be more effective when blocking incoming traffic, we recommend using a separate machine to front all the incoming traffic, so that the processing of IP packets, which can be an expensive operation when under attack, is not done by the Miner which also needs to run some CPU bound operations.

Additionally, you can also consider setting up a Bastion to avoid direct access to your Miner machines. This will enable you to better control who has access and when operators access these machines.

![](/images/filecoin-miner-operation.png)

## Final remarks

There is no ultimate way to prevent DoS attacks, in the end, it is a numbers game in which the malicious actor will try to overload the target by investing more resources than the target in order to cause an outage. Of course, this is an expensive operation and the best proctection is to make it as expensive as possible by running performant machines, having good filtering rules and being in the alert for any suspicious pattern.
