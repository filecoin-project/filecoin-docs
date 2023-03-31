---
title: "Linux skills"
description: ""
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "providers-skills"
    identifier: "Linux-skills-158bdc45ab2de852423d8ef2306e83bd"
weight: 200
toc: true
---

To become a successful Storage Provider, a team with a diverse range of skills is required. While storage knowledge is undoubtedly important, having a deep understanding of the Linux operating system is arguably even more critical.

While many enterprise storage systems such as NAS and SAN do not require administrators to have hands-on experience with Linux, this is not the case with Filecoin. As a blockchain platform that offers decentralized storage, Filecoin requires Storage Providers to have extensive knowledge of Linux. This is because Storage Providers are responsible for managing an always-on production system, not just a storage system.

In addition to storage, Storage Providers must also be familiar with the various components required to run a successful production environment. This includes managing servers, networking equipment, and other critical infrastructure components. Therefore, a thorough understanding of Linux is essential for Storage Providers to ensure smooth operation of the entire system.

In summary, while storage knowledge is important for a Storage Provider, a deep understanding of Linux is critical for success. This is because Filecoin is a blockchain platform that requires Storage Providers to manage an always-on production system, which involves much more than just storage. As such, Storage Providers must have the necessary skills and expertise to manage all components of the system, and a strong foundation in Linux is a must-have skill for achieving this.

## Ubuntu Server LTS
Although Lotus can run on Mac for testing and development, production systems all run on Linux. More specifically, most Storage Providers run on Ubuntu. Any Linux distribution should be possible but running Ubuntu makes it easier to find support in the community. Every distribution is a bit different and knowing that all components have been built and tested on Ubuntu, and knowing you have the same OS variables in your environment as someone else, lowers the barrier to starting as a Storage Provider significantly. Go for Ubuntu Server and choose the latest 20.04 **LTS** version as of March 2023. <!--Angelo: Bob, 22.04 gives issues with lotus-->

Install Ubuntu LTS as a **headless server**. This means there is no desktop environment or GUI installed. It requires you to do everything on the command line. Not having a desktop environment on your server(s) has multiple advantages:

- It reduces the attack surface of your systems. Fewer packages installed means fewer patches and updates but more importantly also fewer potential vulnerabilities.
- As you will be running several tasks on GPU (see [Reference Architectures]({{<relref "reference-architectures">}})), it's best to avoid running a Desktop Environment which might compete for resources on the GPU.

**Bonus tip**: Exclude the `nvidia-drivers` and `cuda` packages from your updates <!--TODO STEF link to how--> - once you have a working setup for your specific GPU, you won't want to risk breaking it without testing these packages first.

## Command-line and environment variables
All installation tasks and operational activities happen from the CLI. When installing and upgrading Lotus it is recommended to build the binaries from source code. Upgrades to lotus happen every two months or so. If you are unable to perform a mandatory lotus upgrade you may become disconnected from the filecoin network, which means you could be penalised and lose money, so it's vital to keep lotus up-to-date.

Setup lotus: [Online Docs](https://lotus.filecoin.io/lotus/install/linux/)

Configuration parameters for the lotus client are stored in 2 places:

- into `config.toml` files in `~/.lotus`, `~/.lotusminer` and `~/.lotusworker`
- into environment variables in `~/.bashrc` if you are using Bash as your shell

Configuration parameters, and most environment variables, are covered in the [Lotus documentation](https://lotus.filecoin.io/storage-providers/setup/configuration/). More specific environment variables around performance tuning can be found on the [Rust FIL Proofs](https://github.com/filecoin-project/rust-fil-proofs) repository on GitHub.

## Linux performance optimization

### Scheduler

Some Storage Providers fine-tune their setups by enabling CPU-core-pinning of certain tasks (especially PC1), as a starting Storage Provider it's not necessary to do that level of tuning. It is essential, however, to have some level of understanding of the [Linux kernel scheduler](https://www.kernel.org/doc/html/latest/scheduler/index.html) to know how to prioritize and deprioritize other tasks in the OS. In the case of Lotus workers you certainly want to prioritize the `lotus-worker` process(es).

### Configuring open file limits

Lotus needs to open a lot of files simultaneously, and it is necessary to reconfigure the OS to support this. 

This is one of the examples where not every Linux distribution is the same. On Ubuntu, run the following commands:

```shell
sudo echo "* soft nofile 32000000" >> /etc/security/limits.conf
sudo echo "* hard nofile 128000000" >> /etc/security/limits.conf
sudo echo "fs.nr_open=128000000" >> /etc/sysctl.conf
sudo echo "fs.file-max=128000000" >> /etc/sysctl.conf
sudo sysctl -p
```

### Performance analysis

Diagnosing performance bottlenecks on a system is vital to keeping a well balanced [sealing pipeline]({{<relref "sealing-pipeline">}}).

There are many good resources to check out when it comes to Linux performance troubleshooting. Brendan Gregg's [Linux performance analysis in 60 seconds](https://netflixtechblog.com/linux-performance-analysis-in-60-000-milliseconds-accc10403c55) is an excellent introduction. Each one of these commands deserves a chapter on its own but can be further researched in their man pages.

{{< youtube "ZdVpKx6Wmc8" >}}
 
 The commands used are:

```shell
uptime
dmesg | tail
vmstat 1
mpstat -P ALL 1
pidstat 1
iostat -xz 1
free -m
sar -n DEV 1
sar -n TCP,ETCP 1
top
```
