---
title: Step 1 - Start Powergate docker compose scripts
description: This article describes how to spin up a lotus-localnet, a go-ipfs node, and a powergate instance for the purpose of this tutorial.
---

# Step 1 - Start Powergate docker compose scripts

The Powergate [documentation](https://docs.textile.io/powergate/) describes several ways to set up the Powergate. For the purpose of this tutorial, the easiest and fastest way is to run a **Docker + localnet** setup. This configuration of Lotus runs a localnet at high speed, specifically designed local testing and development. It's easy to use via a [localnet Docker compose configuration](https://github.com/textileio/powergate#localnet-mode).

## Requirements

To follow this tutorial you will need:

1. [Docker Desktop](https://www.docker.com/products/docker-desktop) and [Docker Compose](https://docs.docker.com/compose/) (preferably the latest versions)
2. **Powergate docker compose files**: The [Powergate releases page](https://github.com/textileio/powergate/releases) includes bundled Docker Compose files that use appropriate Docker image versions of Powergate, Lotus, and IPFS. Check [package-lock.json](https://github.com/dappkit/powergate-pinning-service/blob/master/package-lock.json) to see the appropriate release to download and run. Look for `@textile/grpc-powergate-client`. Its version number corresponds to the version of Powergate the underlying gRPC bindings were created from. For the following tutorial, the version is `0.0.1-beta.10`.

## Powergate docker compose setup

To set up Powergate:

1. Download the `powergate-docker-<version>.zip` from the [releases page](https://github.com/textileio/powergate/releases/).
2. Unzip the release, go into the created folder:

```bash
unzip powergate-docker-v*.zip
cd powergate-docker-v*
```

3. Expose port `8080` on the go-ipfs daemon so that we can access the HTTP gateway. (We use the HTTP gateway to fetch the files in our browser)
4. Open the _docker-compose-localnet.yaml_ file in your favorite editor, and add `- 8080:8080` in the `ports` section of `ipfs`

```yaml
ipfs:
  ports:
    - 5001:5001
    - 8080:8080
```

5. Close the editor after making the change.
6. Open the [Docker Desktop](https://www.docker.com/products/docker-desktop) and start Powergate using the provided Makefile:

```bash
BIGSECTORS=true make localnet
```

Powergate is now running.

::: tip
**Important note on BIGSECTORS:** When running the localnet setup, the Lotus node is configured with a mocked sector builder, using either "small" or "big" sector sizes. The configuration has practical effects on the size of files you can store in the localnet and how quickly the storage deals will complete. Using BIGSECTORS=false limits storage to files of approximately 700 bytes and deals execute in 30-60 seconds. Using BIGSECTORS=true allows storage of files from 1Mb to 400Mb, but deals execute in 3-4 minutes. Be sure to choose the value that makes sense for your development scenario.
:::
