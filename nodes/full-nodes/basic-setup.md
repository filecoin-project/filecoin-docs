---
description: >-
  This page gives a very basic overview of how to install Lotus on your
  computer.
---

# Basic setup

To install Lotus on your computer, follow these steps:

1. First, you need to download the appropriate binary file for your operating system. Go to the [official Lotus GitHub repository](https://github.com/filecoin-project/lotus) and select the latest release that is compatible with your system. You can choose from Windows, macOS, and Linux distributions.
2. Once you have downloaded the binary file, extract the contents to a directory of your choice. For example, if you are using Linux, you can extract the contents to the `/usr/local/bin directory` by running the command:

```sh
sudo tar -C /usr/local/bin -xzf lotus-1.31.0-linux-amd64.tar.gz
```

3. After extracting the contents, navigate to the `lotus` directory in your terminal. For example, if you extracted the contents to `/usr/local/bin`, you can navigate to the lotus directory by running the command:

```sh
cd /usr/local/bin/lotus-1.31.0
```

4. Run the `lotus` binary file to start the Lotus daemon. You can do this by running the command:

```sh
./lotus daemon
```

5. This will start the Lotus daemon, which will connect to the Filecoin network and start synchronizing with other nodes on the network.
6. Optionally, you can also run the lotus-miner binary file if you want to participate in the Filecoin mining process. You can do this by running the command:

```sh
./lotus-miner run
```

7. This will start the Lotus miner, which will use your computer’s computing power to mine new blocks on the Filecoin network.



[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill\_Page+URL=https://docs.filecoin.io/nodes/full-nodes/basic-setup)
