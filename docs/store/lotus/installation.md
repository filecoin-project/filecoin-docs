---
title: 'Lotus: installation'
description: ' Set up the Lotus Filecoin client on your computer, ready to be used as a single node or in a mining operation.'
breadcrumb: 'Installation'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

Lotus is an implementation of the Filecoin specification written in Go. You can run the Lotus client to interact with the Filecoin network. The Lotus project is created and maintained by Protocol Labs, the creators of IPFS, libp2p, and Filecoin. This section covers how to install the Lotus client on your machine.

## Ubuntu

While these instructions are for Ubuntu specifically, they should work on any Ubuntu-based distribution.

1.  Install the dependencies:

    ```bash
    sudo apt update
    sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl build-essential -y
    ```

1.  Clone the Lotus repository:

    ```bash
    git clone https://github.com/filecoin-project/lotus.git
    ```

1.  _Build_ and _Make_ the Lotus project:

    ```bash
    make clean && make all
    sudo make install
    ```

    This process might take a while

1.  Once the build process has finished, you're left with a `lotus` executable:

    ```bash
    lotus version

    > lotus version 0.4.1+git.7d7496e1
    ```

## macOS

1. Make sure you have `xcode-select` and Homebrew installed:

   ```bash
   xcode-select --install

   brew --version
   ```

1. Install the dependencies for Lotus:

   ```bash
   brew install go bzr jq pkg-config rustup git
   ```

1. Clone the Lotus repository:

   ```bash
   git clone https://github.com/filecoin-project/lotus.git
   ```

1. _Build_ and _Make_ the Lotus project:

   ```bash
   make clean && make all
   sudo make install
   ```

   This process might take a while

1. Once the build process has finished, you're left with a `lotus` executable:

   ```bash
   lotus version

   > lotus version 0.4.1+git.7d7496e1
   ```

## Arch

1. Install dependencies:

   ```bash
   sudo pacman -Syu opencl-icd-loader gcc git bzr jq pkg-config opencl-icd-loader opencl-headers
   ```

1. Clone the Lotus repository:

   ```bash
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   ```

1. Build the Lotus binaries from source and install. If you are running an AMD platform or if your CPU supports SHA extensions you will want to build the Filecoin proofs natively:

   ```bash
   make clean && make all
   sudo make install
   ```

1. Native Filecoin FFI building:

   ```bash
   env env RUSTFLAGS="-C target-cpu=native -g" FFI_BUILD_FROM_SOURCE=1 make clean deps all
   sudo make install
   ```

   After installing Lotus, you can run the `lotus` command directly from your CLI to see usage documentation. Next, you can join the [Lotus Testnet](https://lotu.sh/en+join-testnet).

## Fedora

1. Install dependencies

   ```bash
   sudo dnf -y update
   sudo dnf -y install gcc git bzr jq pkgconfig mesa-libOpenCL mesa-libOpenCL-devel opencl-headers ocl-icd ocl-icd-devel clang llvm
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

1. Clone the Lotus repository:

   ```bash
   git clone https://github.com/filecoin-project/lotus.git
   cd lotus/
   ```

1. Build the Lotus binaries from source and install. If you are running an AMD platform or if your CPU supports SHA extensions you will want to build the Filecoin proofs natively:

   ```bash
   make clean && make all
   sudo make install
   ```

1. Native Filecoin FFI building:

   ```bash
   env env RUSTFLAGS="-C target-cpu=native -g" FFI_BUILD_FROM_SOURCE=1 make clean deps all
   sudo make install
   ```

   After installing Lotus, you can run the `lotus` command directly from your CLI to see usage documentation. Next, you can join the [Lotus TestNet](https://lotu.sh/en+join-testnet).
