---
title: 'Lotus: tips when running in China'
description: 'Running a Lotus node or miner from within China comes with some extra configurations steps.'
breadcrumb: 'Tips when running in China'
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

If you are trying to use `lotus`, `lotus-miner`, or `lotus-worker` from China, you must create an environment variable called `IPFS_GATEWAY` and give it the value of `https://proof-parameters.s3.cn-south-1.jdcloud-oss.com/ipfs/`. Most Unix operating systems allow you to do this from the command-line:

```sh
export IPFS_GATEWAY="https://proof-parameters.s3.cn-south-1.jdcloud-oss.com/ipfs/"
```

Running the above command will only make the environment variable available for the _current session_. You should add it to your `.bashrc` or `.bash_profile` file to keep the variable permanently.
