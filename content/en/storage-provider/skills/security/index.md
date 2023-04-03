---
title: "Security"
description: ""
lead: ""
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-skills"
    identifier: "Security-skills-c7fb5906c984e58752a462f3c42a6aa0"
weight: 220
toc: true
---
As a Filecoin Storage Provider you are not only storing customer data, you are also storing Filecoin wallets and running systems that require 24/7 uptime, so as not to lose collateral. In the event of a security intrusion on your network and systems being compromised, you risk downtime or even losing access to your systems or storage. Maintaining proper security is essential.

## Network security

As a first layer of defense, plan for a redundant firewall setup through which not only you can filter incoming traffic but also traffic between your VLANs.
By using a NGFW (Next-Generation-Firewall) you can also implement an IPS (Intrusion Prevention System) at the network perimeter.
Do keep in mind though that if you plan on using a NGFW with IPS enabled, that your internet bandwidth will be limited to the speed of the IPS.

## System security

A second layer of defense is system security. There are multiple concepts that contribute to good system security:

- Host-based firewall (UFW)

  Implement a host-based firewall on your systems (also called UFW on Ubuntu), which is `iptables` based.

- SELinux

  Linux comes with an additional security implementation called `SELinux` (Security Enhanced Linux). Most system administrators will not implement this by default because it takes additional consideration and administration. Once activated though it offers the highest grade of process and user isolation possible on Linux and contributes greatly to better security.

- Not running as root

  It is a common mistake to run processes or containers as `root`. This is a serious security risk because any attacker who compromises a service running as root automatically obtains root privileges on that system.
  
  Lotus software does not require root privileges and therefore should run under a normal account (such as a service account, for instance called `lotus`) on the system.

- Privilege escalation

  Since it is not required that Lotus runs as root, it is also not required for the service account to have privilege escalation. This means you should not allow the `lotus` account to use `sudo`.
