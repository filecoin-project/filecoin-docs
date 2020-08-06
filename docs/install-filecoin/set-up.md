---
title: Set up
---

<!-- Add table of different distros here. -->

| macOS                                                  | Linux                                                       | Build from source                                        |
| ------------------------------------------------------ | ----------------------------------------------------------- | -------------------------------------------------------- |
| [![The macOS logo.](./images/apple-icon.png)](#mac-os) | [![The Linux "Tux" logo.](./images/linux-icon.png)](#linux) | [![Code brackets icon.](./images/manual-build-icon.png)] |

## macOS

1. Head over to the [Lotus releases page](https://github.com/filecoin-project/lotus/releases) and find the [latest release](https://github.com/filecoin-project/lotus/releases/latest).
1. Download the `lotus_v0.4.2_darwin-amd64.tar.gz` file and `lotus_v0.4.2_darwin-amd64.tar.gz.sha512` file.
1. Verify the download using `sha512sum`:

   a. Print out the sha512 hash of the Lotus binary, without unpacking it:

   ```bash
   shasum -a 512 lotus_v0.4.2_darwin-amd64.tar.gz
   ```

   b. Print out the verified `.sha512` file downloaded from the Lotus releases page:

   ```bash
   cat lotus_v0.4.2_darwin-amd64.tar.gz.sha512
   ```

   c. Compare the two hashes to make sure they are _identical_.

   ```bash
   shasum -a 512 -c lotus_v0.4.2_darwin-amd64.tar.gz.sha51
   ```

1. Unpack the Lotus binary:

   ```bash
   tar -xvzf lotus_v0.4.2_darwin-amd64.tar.gz

   > x lotus
   > x lotus/lotus-seal-worker
   > x lotus/lotus
   > x lotus/lotus-storage-worker
   ```

1. Move the Lotus binary to `/usr/local/bin`:

   ```bash
   sudo mv lotus /usr/local/bin
   ```

1. Add Lotus to your path:

   ```bash
   echo "export PATH=\$PATH:/usr/local/bin/lotus" >> ~/.profile
   source ~/.profile
   ```

1. Check that everything installed properly:

   ```bash
   lotus --version

   > lotus version 0.4.1+git.c459a13d
   ```

## Linux

The Lotus team periodically build and upload binaries to the `filecoin-project/lotus` releases page. You can download and install a Lotus client from there.

1. Head over to the [Lotus releases page](https://github.com/filecoin-project/lotus/releases) and find the [latest release](https://github.com/filecoin-project/lotus/releases/latest).
1. Download the `lotus_v0.4.2_linux-amd64.tar.gz` file and `lotus_v0.4.2_linux-amd64.tar.gz.sha512` file.
1. Verify the download using `sha512sum`:

   ```bash
   sha512sum -c lotus_v0.4.2_linux-amd64.tar.gz.sha51
   ```

1. Extract the `.tar` folder:

   ```bash
   tar -xvzf lotus_v0.4.2_linux-amd64.tar.gz

   > lotus/
   > lotus/lotus-seal-worker
   > lotus/lotus
   > lotus/lotus-storage-miner
   ```

1. Move the executable to `/usr/local/bin`:

   ```bash
   sudo mv lotus/lotus /usr/local/bin
   ```

1. Add `lotus` to your system PATH:

   ```bash
   echo "export PATH=\$PATH:/usr/local/bin/lotus" >> ~/.profile
   source ~/.profile
   ```

1. Check that everything installed properly:

   ```bash
   lotus --version

   > lotus version 0.4.1+git.7d7496e1
   ```

## Build from source

If you'd rather build the project from source, follow these steps.

1.  Install the following dependencies:

    | Operating system | Dependency list                                                                                                                                                                                                | Install command                                                                         |
    | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
    | Ubuntu           | go (`1.14` or higher)<br>gcc (`7.4.0` or higher)<br>git (`2.0` or higher)<br>bzr<br>jq<br>pkg-config<br>opencl-icd-loader<br>opencl driver (for GPU acceleration)<br>opencl-headers<br>rustup<br>llvm<br>clang | `sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl -y` |
    | macOS            | go<br>bzr<br>jq<br>pkg-config<br>rustup                                                                                                                                                                        | `brew install go bzr jq pkg-config rustup git`                                          |

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

    If you'd like to be able to run `lotus` from anywhere on your system:

        a. Move the `lotus` executable to `/usr/local`:

        	```bash
        	sudo mv lotus /usr/local/bin
        	```

        b. Add `lotus` to your system PATH:

        	```bash
        	echo "export PATH=\$PATH:/usr/local/bin/lotus" >> ~/.profile
        	source ~/.profile
        	```

        c. You can now run `lotus` commands from anywhere:

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

This means that you do not have Go installed properly. Run `go version` to see which version of Go you have installed. If you don't get a response, it's likley that Go has not been installed properly for your system. If you _think_ you've already downloaded and installed Go, check that the Go binary has been added to your system PATH. You may need to reboot your machine after adding the Go binary to your system PATH. See the [Go documentation for more details](https://golang.org/doc/install#install).
