---
title: 'Hosted Powergate'
description: 'Powergate is a multitiered storage solution that stores data with IPFS ("Hot" storage layer) and Filecoin ("Cold" storage layer). Hosted Powergate instances are available for builders upon request.'
breadcrumb: 'Hosted Powergate'
---

# {{ $frontmatter.title }}

[Powergate](powergate.md) is a multitiered storage solution that stores data with IPFS ("Hot" storage layer) and Filecoin ("Cold" storage layer). Hosted Powergate instances are available for builders upon request.

This guide will help you get started with _Hosted Powergate_. We will be using the Powergate CLI to interact with the Powergate endpoints provided to us and get familiar them.

1. **Sign-up for a hosted Powergate instance**:

   Complete the form at [https://blog.textile.io/hosted-powergate/](https://blog.textile.io/hosted-powergate/). When your application is approved, you will receive an email with connection instructions and assigned endpoints.

1. **Download and install `pow` CLI**:

   The [`pow` CLI tool](https://github.com/textileio/powergate) will help us interact with the Powergate instance. It can be installed with:

   ```sh
   git clone https://github.com/textileio/powergate
   cd powergate
   make install-pow
   ```

1. **Set up your remote endpoint**:

   The endpoint is provided in the welcome email. To let `pow` use it:

   ```sh
   # Use your provided endpoint
   export POW_SERVERADDRESS=api.pow.something.textile.io:443
   # Verify it works
   pow version
   ```

1. **Create a new FFS instance**:

   An FFS instance manages all the necessary state and capabilities to provide multi-tiered file storage through the Powergate. Each Powergate setup can manage an arbitrary number of FFS instances.

   You should be able to create one as follows:

   ```sh
   pow ffs create
   ```

   This will print an instance ID and a token. Write down the token as we will need it for every other ffs operation. Additionally, let Powergate know about your token with:

   ```sh
   export POW_TOKEN=<token>
   ```

   The hosted Powergate instance is automatically configure to add small funding into every FFS you create. You can repeat the `create` step multiple times if you need multiple FFSs with different configurations, but you will need to use `--token` so that Powergate knows which instance it should interact with. You can check the [default configuration](https://docs.textile.io/powergate/storageconfig/) for storage jobs for your FFS with:

   ```sh
   pow ffs config get-default
   ```

   Additional details about FFS instances can be found in the [official documentation](https://docs.textile.io/powergate/ffs/).

1. **Stage your data**:

   Unless your data is already available on IPFS (in which case you can skip this step), you can use Powergate to import your data using the `stage` command:

   ```sh
   pow ffs stage <path/filename>
   ```

   Note the CID in the output. This will be used to initiate the Powergate storage.

1. **Initiate data storage**:

   The following command pushes a new storage configuration for a CID and creates a storage job for it:

   ```sh
   pow ffs config push <cid>
   ```

   The configuration used will be based on the default one unless one is provided (see `pow ffs config push --help`).

   Powergate will automatically find miners and perform the storage deal. You can watch the progress with:

   ```sh
   pow ffs watch <job id>
   ```

   For additional details and up-to-date information on how to use `pow` and perform other operations like retrieval, see the [official Textile docs](https://docs.textile.io/powergate/ffs/).

1. **Interact with the Powergate API**:

   Once you are familiar with the Powergate workflows, you can start programatically controlling the Powergate instance. Textile provides Go and Javascript API clients for Powergate using the gRPC API endpoint:

   - [js-powergate-client](https://github.com/textileio/js-powergate-client)
   - [Go Powergate client module](https://godoc.org/github.com/textileio/powergate/api/client)

Additional resources, including videos and examples using Powergate are available from our [dedicated page](powergate.md#additional-powergate-resources).
