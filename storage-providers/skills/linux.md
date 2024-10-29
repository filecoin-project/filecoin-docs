---
description: >-
  This page covers importance of understanding the Linux operating system
  including installation, configuration, environment variables, performance
  optimization, and performance analysis.
---

# Linux

Becoming a storage provider requires a team with a variety of skills. Of all the technical skills needed to run a storage provider business, storage knowledge is important, but arguably, it is even more important to have deep understanding of the Linux operating system.

Where most enterprise storage systems (NAS, SAN and other types) do not require the administrator to have hands-on Linux experience, Filecoin does require a lot more knowledge about Linux. For starters, this is because Filecoin is not just a storage system. It is a blockchain platform that offers decentralized storage. As a storage provider, you must ensure that your production system is always available, not just providing the storage.

## Ubuntu Server LTS

Although Lotus also runs on Mac, production systems generally all run on Linux. More specifically, most storage providers run on Ubuntu. Any Linux distribution should be possible but running Ubuntu makes it easier to find support in the community. Every distribution is a bit different and knowing that all components have been built and tested on Ubuntu, and knowing you have the same OS variables in your environment as someone else, lowers the barrier to starting as a storage provider significantly. Go for Ubuntu Server and choose the latest **LTS** version.

Install Ubuntu LTS as a **headless server**. This means there is no desktop environment or GUI installed. It requires you to do everything on the command line. Not having a desktop environment on your server(s) has multiple advantages:

* It reduces the attack surface of your systems. Fewer packages installed means fewer patches and updates, but more importantly, fewer potential vulnerabilities.
* As you will be running several tasks on GPU (see [Reference Architectures](../infrastructure/reference-architectures.md)), it’s best to avoid running a desktop environment, which might compete for resources on the GPU.

Exclude the `nvidia-drivers` and `cuda` packages from your updates using [the appropriate command](https://tecadmin.net/exclude-packages-from-apt-upgrade/) set. Once you have a working setup for your specific GPU, you will want to test these packages before you risk breaking them. Many storage providers may need to [install CUDA](https://linux.how2shout.com/how-to-install-cuda-on-ubuntu-20-04-lts-linux/) since some operating systems do not include this package by default.

## Command-line and environment variables

All installation tasks and operational activities happen from the CLI. When installing and upgrading Lotus, it is recommended to build the binaries from source code. Upgrades to Lotus happen every two months or so. If you are unable to perform a mandatory Lotus upgrade, you may become disconnected from the Filecoin network, which means you could be penalized and lose money, so it’s vital to keep Lotus up-to-date.

Configuration parameters for the Lotus client are stored in 2 places:

* into `config.toml` files in `~/.lotus`, `~/.lotusminer` and `~/.lotusworker`
* into environment variables in `~/.bashrc` if you are using Bash as your shell

Configuration parameters, and most environment variables, are covered in the [Lotus documentation](https://lotus.filecoin.io/storage-providers/setup/configuration/). More specific environment variables around performance tuning can be found on the [Rust FIL Proofs](https://github.com/filecoin-project/rust-fil-proofs) repository on GitHub.

## Linux performance optimization

### Scheduler

Some storage providers fine-tune their setups by enabling CPU-core-pinning of certain tasks (especially PC1), as a starting storage provider it’s not necessary to do that level of tuning. It is essential, however, to have some level of understanding of the [Linux kernel scheduler](https://www.kernel.org/doc/html/latest/scheduler/index.html) to know how to prioritize and deprioritize other tasks in the OS. In the case of Lotus workers you certainly want to prioritize the `lotus-worker` process(es).

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

Diagnosing performance bottlenecks on a system is vital to keeping a well balanced [sealing pipeline](../architecture/sealing-pipeline.md).

There are many good resources to check out when it comes to Linux performance troubleshooting. Brendan Gregg’s [Linux performance analysis in 60 seconds](https://netflixtechblog.com/linux-performance-analysis-in-60-000-milliseconds-accc10403c55) is an excellent introduction. Each one of these commands deserves a chapter on its own but can be further researched in their man pages.

{% embed url="https://www.youtube.com/watch?v=ZdVpKx6Wmc8" %}

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



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/storage-providers/skills/linux)
