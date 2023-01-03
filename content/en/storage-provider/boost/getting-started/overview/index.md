---
title: "Overview"
description: "This section details how to get started with Filecoin Boost if you are a storage provider or as a client"
lead: ""
date: 2022-01-25T14:41:39+01:00
lastmod: 2022-01-25T14:41:39+01:00
draft: false
images: []
type: docs
menu:
  storage-provider:
    parent: "lorem"
    identifier: "overview-348b70c6139515d90e20cdc1d3d10c47"
weight: 1
toc: true
---

The Filecoin Boost source code repository is hosted at [github.com/filecoin-project/boost](https://github.com/filecoin-project/boost)

### Boost and Lotus compatibility Matrix

| Boost Version | Lotus Version                          |
| ------------- | -------------------------------------- |
| v1.0.0        | v1.15.x                                |
| v1.1.0        | v1.16.x                                |
| v1.1.1        | v1.16.x                                |
| v1.2.0        | v1.16.x                                |
| v1.3.0        | v1.17.0, v1.17.1                       |
| v1.4.0        | v1.17.0, v1.17.1, v1.17.2, v1.18.0-rc1 |
| v1.5.0        | v1.18.0                                |
| v1.5.1-rc2    | v1.18.0                                |

### Building and installing

#### Prerequisites

{{< alert  >}}
Please make sure you have installed:\
\
**Go** - following [https://go.dev/learn/](https://go.dev/learn/)

**Rust** - following [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)

**Node 16.x**
{{< /alert  >}}

**Linux / Ubuntu**

```
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y
```

**MacOS**

```
brew install node
brew install bzr jq pkg-config hwloc coreutils
```

#### Linux

{{< alert  >}}
Depending on your architecture, you will want to export additional environment variables:

```
export RUSTFLAGS="-C target-cpu=native -g"
export FFI_BUILD_FROM_SOURCE=1
```
{{< /alert  >}}

```
git clone https://github.com/filecoin-project/boost
cd boost
make build
sudo make install
```

Please ignore any output or onscreen instruction during the `npm build` unless there is an error.

#### MacOS

```
export LIBRARY_PATH=$LIBRARY_PATH:/opt/homebrew/lib
git clone https://github.com/filecoin-project/boost
cd boost
make build
sudo make install
```

Please ignore any output or onscreen instruction during the `npm build` unless there is an error.

#### **Calibration Network**

To build boost for calibnet, please complete the above pre-requisites and build using the following commands.

```
git clone https://github.com/filecoin-project/boost
cd boost
make calibnet
```

### Upgrading Boost

#### Linux

1\. Make sure that Boost daemon is not running. Run the below commands to upgrade the binary.

```
cd boost
git pull
make build
sudo make install
```

2\. Please ignore any onscreen instruction during the `npm build` unless there is an error.

3\. Start the boost daemon.

#### MacOS

1\. Make sure that Boost daemon is not running. Run the below commands to upgrade the binary.

```
export LIBRARY_PATH=$LIBRARY_PATH:/opt/homebrew/lib
cd boost
git pull
make build
sudo make install
```

2\. Please ignore any onscreen instruction during the `npm build` unless there is an error.

3\. Start the boost daemon.
