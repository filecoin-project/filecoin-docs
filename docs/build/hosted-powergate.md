---
title: 'Hosted Powergate'
description: 'Powergate is a multitiered storage solution that stores data with IPFS ("Hot" storage layer) and Filecoin ("Cold" storage layer). Hosted Powergate instances are available for builders upon request.'
breadcrumb: 'Hosted Powergate'
---

# {{ $frontmatter.title }}

[Powergate](powergate.md) is a multitiered storage solution that stores data with IPFS ("Hot" storage layer) and Filecoin ("Cold" storage layer). Hosted Powergate instances are available for builders upon request.

This guide will help you get started with _Hosted Powergate_. We will be using the Powergate CLI to interact with the Powergate API endpoint.

1. **Sign-up for a hosted Powergate instance**:

   Complete the form at [https://blog.textile.io/hosted-powergate/](https://blog.textile.io/hosted-powergate/). When your application is approved, you will receive an email with connection instructions and an assigned API endpoint.

1. **Download and install `pow` CLI**:

   The [`pow` CLI tool](https://docs.textile.io/powergate/cli/pow/) will help us interact with the Powergate instance. It can be installed with:

   ```sh
   git clone https://github.com/textileio/powergate
   cd powergate
   make install-pow
   ```

1. **Set up your remote API endpoint**:

   The endpoint is provided in the welcome email. To let `pow` use it:

   ```sh
   # Use your provided endpoint
   export POW_SERVERADDRESS=api.pow.something.textile.io:443
   # Verify it works
   pow version
   ```

1. **Create a new User instance**:

   A User instance manages all the necessary state and capabilities to provide multitiered file storage through the Powergate. Each Powergate setup can manage an arbitrary number of User instances. To create a new User:

   ```sh
   pow admin user create
   ```

   This will print an instance ID and a User auth token. Write down the token as we will need it for every other User operation. As an optional convienience (vs. including the User `--token` flag on every `pow` command), you can let Powergate know about it with the `POW_TOEKN` environment variable:

   ```sh
   export POW_TOKEN=<token>
   ```

   The hosted Powergate instance is automatically configured to add small funding into every User instance you create. You can repeat the `create` step multiple times if you need multiple User instances with different configurations, but you will need to use the `--token` flag so that Powergate knows which User instance to interact with. You can check the [default configuration](https://docs.textile.io/powergate/storageconfig/) for storage jobs within a User instance:

   ```sh
   pow config default -t [User auth token]
   ```

   Additional details about User instances can be found in the [official documentation](https://docs.textile.io/powergate/storage/#intro-to-users).

1. **Stage your data**:

   Unless your data is already available on IPFS (in which case you can skip this step), you can use Powergate to import your data using the `stage` command:

   ```sh
   pow data stage [path|url]
   ```

   Note the CID in the output. This will be used to initiate the Powergate storage.

1. **Initiate data storage**:

   The following command pushes a new storage configuration for a CID, creates a storage job for it, and watches the progress of the resulting job:

   ```sh
   pow config apply [cid] --watch
   ```

   The configuration used will be based on the default configuration unless a custom configuration is provided (see `pow config apply --help`). Powergate will automatically find miners and perform the storage deal. 
   
   You can watch the job progress anytime with:

   ```sh
   pow storage-jobs watch [jobid]
   ```

   For additional details and up-to-date information on how to use `pow` and perform other operations like retrieval, see the [official Textile docs](https://docs.textile.io/powergate/cli/pow/).

1. **Interact with the Powergate API**:

   Once you are familiar with the Powergate workflows, you can start programatically controlling the Powergate instance. Textile provides Go and Javascript API clients for Powergate using the gRPC API endpoint:

   - [js-powergate-client](https://github.com/textileio/js-powergate-client)
   - [Go Powergate client module](https://godoc.org/github.com/textileio/powergate/api/client)

Additional resources, including videos and examples using Powergate are available from our [dedicated page](powergate.md#additional-powergate-resources).