---
description: >-
  This guide walks you through setting up a PDP-enabled Filecoin Storage
  Provider using Lotus, YugabyteDB, and Curio
---

# Prerequisites

{% hint style="info" %}
⚠️ Note: This guide is written specifically for Ubuntu 22.04. If you are using a different Linux distribution, refer to the relevant documentation for package installation and compatibility.
{% endhint %}

Before starting, make sure you have a user with **sudo privileges**. This section prepares your system for the PDP stack.

### System Package Installation

```sh
sudo apt update && sudo apt upgrade -y && sudo apt install -y \
mesa-opencl-icd ocl-icd-opencl-dev gcc git jq pkg-config curl clang \
build-essential hwloc libhwloc-dev libarchive-dev wget ntp python-is-python3 aria2
```

***

### Install Go

```sh
sudo rm -rf /usr/local/go
wget https://go.dev/dl/go1.23.7.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.23.7.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc
go version
```

{% hint style="success" %}
You should see something like: go version go1.23.7 linux/amd64
{% endhint %}

***

### Install Rust

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

{% hint style="info" %}
When prompted, choose the option 1) Proceed with standard installation (default — just press Enter).
{% endhint %}

```sh
source $HOME/.cargo/env
rustc --version
```

{% hint style="success" %}
You should see something like: rustc 1.86.0 (05f9846f8 2025-03-31)
{% endhint %}

***

### Add Go and Rust to Secure Sudo Path

```sh
sudo tee /etc/sudoers.d/dev-paths <<EOF
Defaults secure_path="/usr/local/go/bin:$HOME/.cargo/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
EOF
```
