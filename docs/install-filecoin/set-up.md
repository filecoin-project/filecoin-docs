---
title: Set up
description: Set up the Lotus Filecoin client on your computer, ready to be used as a node or in a mining operation.
---

| macOS                                                  | Linux                                                       |
| ------------------------------------------------------ | ----------------------------------------------------------- |
| [![The macOS logo.](./images/apple-icon.png)](#mac-os) | [![The Linux "Tux" logo.](./images/linux-icon.png)](#linux) |

## macOS

1. Make sure you have `xcode-select` and Homebrew installed:

    ```bash
    $ xcode-select --install

    $ brew --version
    ```

1. Install the dependencies for Lotus:

    ```bash
    $ brew install go bzr jq pkg-config rustup git
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
    ./lotus --version

    > lotus version 0.4.1+git.7d7496e1
    ```

That's it! You've now got Lotus installed on your system. If you'd like to be able to run `lotus` from anywhere on your system:

1. Move the `lotus` executable to `/usr/local`:

    ```bash
    sudo mv lotus /usr/local/bin
    ```

1. Add `lotus` to your system PATH:

    ```bash
    echo "export PATH=\$PATH:/usr/local/bin/lotus" >> ~/.profile
    source ~/.profile
    ```

1. You can now run `lotus` commands from anywhere:

    ```bash
    cd ~
    lotus --version

    > lotus version 0.4.1+git.7d7496e1
    ```

## Linux

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
    ./lotus --version

    > lotus version 0.4.1+git.7d7496e1
    ```

That's it! You've now got Lotus installed on your system. If you'd like to be able to run `lotus` from anywhere on your system:

1. Move the `lotus` executable to `/usr/local`:

    ```bash
    sudo mv lotus /usr/local/bin
    ```

1. Add `lotus` to your system PATH:

    ```bash
    echo "export PATH=\$PATH:/usr/local/bin/lotus" >> ~/.profile
    source ~/.profile
    ```

1. You can now run `lotus` commands from anywhere:

    ```bash
    cd ~
    lotus --version

    > lotus version 0.4.1+git.7d7496e1
    ```

## Troubleshooting

### Go: command not found

You may encounter the following error:

```bash
bash: go: command not found
make: *** [Makefile:68: lotus] Error 127
```

This error means that you do not have Go installed properly. Run `go version` to see which version of Go you have installed. If you don't get a response, Go has not been installed correctly. If you _think_ you've already downloaded and installed Go, check that the Go binary has been added to your system PATH. You may need to reboot your machine after adding the Go binary to your system PATH. See the [Go documentation for more details](https://golang.org/doc/install#install).
