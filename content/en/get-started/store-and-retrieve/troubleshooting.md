---
title: "Troubleshooting"
description: "Running into problems with Filecoin storage and retrieval? Check out these troubleshooting steps."
weight: 5
menu:
    getstarted:
        parent: "getstarted-store-and-retrieve"
---

## ERROR: connect: connection refused

If you get an `connect: connection refused` error when trying to connect your Lotus lite-node to your Lotus full-node, it is likely because your full-node is not configured properly. Double check that your `~/.lotus/config.toml` file has line 3 uncommented and the address is set to `0.0.0.0`:

    ```shell
    [API]
    ListenAddress = "/ip4/0.0.0.0/tcp/1234/http"
    #  RemoteListenAddress = ""
    ```

Reset your Lotus full-node computer if you are still facing issues after editing the `config.toml` file. Make sure to start the Lotus daemon with `lotus daemon` once the computer has booted back up.

## Which shell am I using?

Run `echo $SHELL` to find out which shell you are using:

```shell with-output
echo $SHELL
```
```                                                                                                ~
/bin/zsh
```

## Which CPU does my Mac have?

Open a terminal window and run:

```shell
sysctl -n machdep.cpu.brand_string
```

M1-based Macs will return `Apple M1`. Macs with AMD or Intel-based CPUs will get something like `Intel(R) Core(TM) i7-10700K CPU @ 3.80GHz`
