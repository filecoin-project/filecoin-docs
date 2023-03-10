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
    parent: "lorem"
    identifier: "Linux-skills-158bdc45ab2de852423d8ef2306e83bd"
weight: 200
toc: true
---

Becoming a Storage Provider requires a team with a variety of skills, which we will discuss in this section.
Of all the technical skills needed to run a Storage Provider business, storage knowledge is definitely not the top skill to have. Arguably it is even more important to have deep understanding of the Linux operating system.

Where most enterprise storage systems (NAS, SAN and other types) don't require the administrator to have hands-on Linux experience, Filecoin does require a lot more knowledge about Linux. For starters this is because Filecoin is not just a storage system. It is a blockchain platform that offers decentralized storage. As a Storage Provider you are dealing with all things it requires to run a production system, not just storage.

## Ubuntu Server LTS
Although Lotus also runs on Mac, production systems of Storage Providers all run on Linux. More specifically most Storage Providers run on Ubuntu. Any Linux distribution should be possible but running Ubuntu brings to advantage of finding support in the community. Every distribution is a bit different and knowing that all components have been built and tested on Ubuntu, and knowing you have the same OS variables in your environment as someone else lowers the barrier to start as a Storage Provider significantly. Go for Ubuntu Server and choose the latest **LTS** version. Having to upgrade your system frequently is not what you want to be doing.

Install Ubuntu LTS as a **headless server**. This means there is no Desktop Environment or GUI installed. It requires you to do everything on the command-line. Not having a desktop environment on your server(s) has multiple advantages:

- It reduces the attack surface of your systems. Less packages installed means less patches and updates but more importantly also less vulnerabilities.
- As you will be running several tasks on GPU (see [Reference Architectures]({{<relref "reference-architectures">}})), you must avoid running a Desktop Environment which might compete for resources on the GPU.

**Bonus tip**: Exclude the `nvidia-drivers` and `cuda` packages from your updates. With that you won't break things once you have a working setup for your specific GPU.

## Command-line and environment variables
All installation tasks and operational activities happen from the CLI. When installing and upgrading Lotus it is even recommended to build the binaries from source code. You need to know what that means in order to keep your Storage Provider setup running. If you are unable to perform a mandatory upgrade (which happen bi-monthly) you will either fail to come back online, or you will end up on a forked network and therefore also lose money on mainnet.

Configuration parameters for the software are mostly done in 2 places:

- into `config.toml` files in `~/.lotus`, `~/.lotusminer` and `~/.lotusworker`
- into environment variables in `~/.bashrc` if you are using Bash as your shell

Configuration parameters and most environment variables are covered in the [Lotus documentation](https://lotus.filecion.io). More specific environment variables around performance tuning can be found on the [Rust FIL Proofs](https://github.com/filecoin-project/rust-fil-proofs) repository on GitHub.

## Linux performance optimization

### Scheduler
Although CPU core pinning of certain tasks has been done (especially for PC1) by certain Storage Providers, it should not be a requirement as a starting Storage Provider to do this level of tuning. It is necessary however to have some level of understanding of the [Linux kernel scheduler](https://www.kernel.org/doc/html/latest/scheduler/index.html) to know how to prioritize some and deprioritize other tasks in the OS. In the case of Lotus workers you certainly want to prioritize the `lotus-worker` process(es).

### Limits
The default configuration of the Linux OS does not allow Lotus to run. There are limitations on the maximum amount of files a process is allowed top open that do not satisfy the needs of Lotus. 

This is one of the examples where not every Linux distribution is the same. On Ubuntu your modifications go under:

    sudo echo "* soft nofile 32000000" >> /etc/security/limits.conf
    sudo echo "* hard nofile 128000000" >> /etc/security/limits.conf
    sudo echo "fs.nr_open=128000000" >> /etc/sysctl.conf
    sudo echo "fs.file-max=128000000" >> /etc/sysctl.conf
    sudo sysctl -p

### Performance analysis
Knowing when a Linux system has a performance problem is important. Diagnosing what causes slow performance on a system is vital to keeping a well balanced [sealing pipeline]({{<relref "sealing-pipeline">}}).

There are many good resources to check out when it comes to Linux performance troubleshooting. Let us highlight Brendan Gregg's Linux performance analysis in 60 seconds. Each one of these commands deserves a chapter on its own but can be further researched in its respective man-pages or on [Brendan's blog post](https://netflixtechblog.com/linux-performance-analysis-in-60-000-milliseconds-accc10403c55) from when he was the Linux performance expert at Netflix.
{{< youtube "ZdVpKx6Wmc8" >}}
 
 The commands used are:

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


