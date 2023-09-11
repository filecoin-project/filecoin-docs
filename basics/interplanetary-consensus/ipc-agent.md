---
description: >-
  The IPC Agent is the entrypoint to interacting with IPC. It is a client
  application that provides a simple and easy-to-use interface to interact with
  IPC
---

# IPC agent

The IPC Agent is the entry point to interacting with IPC. It is a client application that provides a simple and easy-to-use interface to interact with IPC as a user and run all the processes required for the operation of a subnet. See the [GitHub docs](https://github.com/consensus-shipyard/ipc-agent/tree/main/docs) for a conceptual overview.

### Installation

#### Prerequisites

To build the IPC Agent you need to have Rust installed in your environment. The current MSRV (Minimum Supported Rust Version) is nightly-2022-10-03 due to some test build dependencies. A working version is tracked in rust-toolchain (this is picked up by rustup automatically). You can look for instructions on [how to run Rust and rustup following this link](https://www.rust-lang.org/tools/install).

{% hint style="info" %}
️According to the operating system you are running, you may have to install additional dependencies not installed in your system to follow these instructions like `build-essentials`, `libssl-dev`, `git`, `curl`. If something fails while building the binaries double-check these dependencies.
{% endhint %}

#### Build instructions

To build the binary for the IPC agent you need to build the requirements in your environment, clone this repository, and build the binary following these steps:

```shell
git clone https://github.com/consensus-shipyard/ipc-agent.git
cd ipc-agent
rustup target add wasm32-unknown-unknown
make build
```

This builds the binary of the IPC agent in the `./bin` folder of your repository. If you want to make the command available everywhere, add this folder to the binary `PATH` of your system. To see if the installation was successfully you can run the following command:

```shell
./bin/ipc-agent --help
```

### Infrastructure

IPC currently uses [a fork of Lotus](https://github.com/consensus-shipyard/lotus), that we like to call _Eudico_, to run its subnets. The IPC agent does nothing by itself, and is just an orchestrator over existing subnet deployments. To ease the deployment of new subnets and nodes, we provide a set of convenient scripts to deploy all the infrastructure required to run IPC.

#### Install infrastructure scripts

[Eudico](https://github.com/consensus-shipyard/lotus/tree/spacenet/scripts/ipc) provides a set of infrastructure scripts, which assume a working installation of Docker. To install Docker [follow this link](https://docs.docker.com/get-docker/) and choose your working environment.

{% hint style="info" %}
Some users have reported issues trying to build the required images using Docker Desktop, if this is the case, try installing a version of [Docker engine](https://docs.docker.com/engine/install/#server) supported by your system.
{% endhint %}

With Docker installed, you can then `make install-infra` in the root of the `ipc-agent`. This make rule will clone the Eudico repository, build the docker image that you need to run subnets, and install the infrastructure scripts in the `./bin` folder. In Unix-based systems, it is highly recommended to include your user inside the `docker` group to avoid having to run many of the commands from this tutorial using `sudo`. You can achieve this running the following commands:

```shell
sudo usermod -aG docker $USER newgrp docker
newgrp docker
```

To check if the installation of the image and all infra-related scripts was successful you can run the following command, and it should return a similar output:

```shell
docker images | grep eudico
# eudico                      latest        8fb6db609712   2 minutes ago   341MB
```

### Usage

#### Configuration

If you are running the agent for the first time, the first thing you need to do is to create a new config. The default config path for the agent is `~/.ipc-agent/config.toml`. The agent will always try to pick up the config from this path unless told otherwise. To populate a sample config file in the default path, you can run the following command:

```shell
./bin/ipc-agent config init
```

If you `cat ~/.ipc-agent/config.toml` you should see a new config populated with a sample root and subnet configurations.

#### Running the daemon

The IPC agent runs as a foreground daemon process that spawns a new JSON RPC server to interact with it, and all the processes to automatically handle checkpoints and the execution of cross-net messages for the subnets our agent is participating in. The agent determines the list of subnets it should interact with from its config file.

Alternatively, the agent can also be used as a CLI to interact with IPC. Under the hood, this CLI sends new commands to the RPC server of the daemon. To run the IPC agent daemon you can run:

```shell
./bin/ipc-agent daemon
```

Running the agent at this point will throw an error, because we haven´t configured it to interact with any IPC network. In the next few sections we will walk you through different alternatives to spawn and connect your agent to a running IPC instance.

The RPC server of the daemon will be listening to the endpoint determined in the `json_rpc_address` field of the config. If you are looking for your agent to be accessible from Docker or externally, remember to listen from `0.0.0.0` instead of `127.0.0.1` as specified in the empty configuration.

### Interacting with a rootnet

#### Spacenet

For more information about the Spacenet testnet have a look at the [Spacenet repository](https://github.com/consensus-shipyard/spacenet). In this section we will guide you through how to connect your IPC agent to a running instance of Spacenet. Spacenet hosts all the IPC actors and can be used as a rootnet to deploy new subnets from.

In order to use the IPC agent with Spacenet we need to have access to a full-node syncing with the network. The easiest way to achieve this is to run your own Spacenet node. Running you own Spacenet node is as simple as [installing the dependencies](https://github.com/consensus-shipyard/lotus#basic-build-instructions), cloning the Eudico repository, and compiling and running it:

```shell
git clone https://github.com/consensus-shipyard/lotus
cd lotus
```

The `spacenet` branch is the main branch in the repository. To find the latest release deployed over Spacenet, you can check the [last release](https://github.com/consensus-shipyard/lotus/releases) published in the repository and use checkout that tag:

```shell
git checkout <release/branch>
```

Compile Eudico for Spacenet:

```shell
make spacenet
```

Run your node:

```shell
./eudico mir daemon --bootstrap=true
```

With this, your node should automatically connect to the bootstraps of the network and start syncing the latest state of the chain.

{% hint style="info" %}
More information and further details about the operation of Spacenet can be found in the [Spacenet repository](https://github.com/consensus-shipyard/spacenet).
{% endhint %}

With the node running, you are ready to connect the IPC agent to Spacenet. For this, you’ll need to get an authentication token for your node, and point to the RPC API of the node (by default running on port `1234`).

```shell
# Generate auth token to node
./eudico auth create-token --perm admin

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.8vIV7pCrWx-nxOBAAw_IayDzrGf22kMjagRYmj_8Qqw
```

Additionally, you should create a new wallet address (if you don’t have one already) to use for your IPC interactions. You can create a new wallet by running the following command in your Eudico node:

```shell
# Create new wallet
./eudico wallet new

t1cp4q4lqsdhob23ysywffg2tvbmar5cshia4rweq
```

With all this information, the config of the agent should be updated to connect to the peer and start interacting with Spacenet’s IPC by editing the following section for the `/root`:

```toml
[[subnets]]
id = "/root"
gateway_addr = "t064"
network_name = "root"
jsonrpc_api_http = "http://127.0.0.1:1234/rpc/v1"
auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.8vIV7pCrWx-nxOBAAw_IayDzrGf22kMjagRYmj_8Qqw"
accounts = ["t1xbevqterae2tanmh2kaqksnoacflrv6w2dflq4i"]
```

You can now start your IPC agent daemon with `./bin/ipc-agent daemon`.

{% hint style="warning" %}
In the current implementation of Spacenet, the gateway is always deployed in the `t064` address. This should be the address always reflected on your config for the gateway. In the future, this will change, and the gateway may be deployed in different addresses.
{% endhint %}

To check if the agent has been connected to Spacenet successfully you can try creating a new wallet in the network, but this type through the agent by running:

```shell
./bin/ipc-agent wallet new --key-type=bls

2023-03-30T12:01:11Z INFO  ipc_agent::cli::commands::manager::wallet] created new wallet with address WalletNewResponse { address: "t1om5pijjq5dqic4ccnqqrvv6zgzwrlxf6bh2apvi" } in subnet "/root"
```

Finally, to be able to interact with Spacenet and run new subnets, some FIL should be provided to, at least, the wallet that will be used by the agent to interact with IPC. You can request some Spacenet FIL for your address through the `spacenet.consensus.ninja`.

#### Local deployment

To deploy sample rootnet locally for testing you can use the IPC scripts installed in `./bin/ipc-infra` by running:

```shell
./bin/ipc-infra/run-root-docker-1val.sh <lotus-api-port> <validator-libp2p-port>
```

For instance, running `./bin/ipc-infra/run-root-docker-1val.sh 1235 1379` will run a rootnet daemon listening at `localhost:1235`, and a single validator mining in the rootnet listening through its libp2p host in `localhost:1379`. The end of the log in the execution of this script should look something like:

```plaintext
>>> Root daemon running in container: 84711d67cf162e30747c4525d69728c4dea8c6b4b35cd89f6d0947fee14bf908
>>> Token to /root daemon: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.j94YYOr8_AWhGGHQd0q8JuQVuNhJA017SK9EUkqDOO0
>>> Default wallet: t1cp4q4lqsdhob23ysywffg2tvbmar5cshia4rweq
```

This information will be relevant to configure our agent to connect to this rootnet node. For this, the `config.toml` section should be updated accordingly. In the above case, we need to set the endpoint of our rootnet node to be `127.0.0.1:1235`, we need to set `auth_token` to the one provided by the script, and the default account, for instance, the one provided by the script (although we could use ant other).

The configuration for our rootnet should look therefore like this:

```toml
[[subnets]]
id = "/root"
gateway_addr = "t064"
network_name = "root"
jsonrpc_api_http = "http://127.0.0.1:1235/rpc/v1"
auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.j94YYOr8_AWhGGHQd0q8JuQVuNhJA017SK9EUkqDOO0"
accounts = ["t1cp4q4lqsdhob23ysywffg2tvbmar5cshia4rweq"]
```

{% hint style="warning" %}
If you are already running the daemon, changes in the config file are only picked up after running `./bin/ipc-agent config reload` so be sure to run it after editing your config.
{% endhint %}

Finally, to test if the connection to the rootnet has been successful, we can for instance try to create a new wallet in the rootnet:

```shell
./bin/ipc-agent wallet new --key-type=bls
```

### Running a subnet

To spawn a new subnet, our IPC agent should be connected to at least the subnet of the parent we want to spawn the subnet from. You can refer to the previous section for information on how to run or connect to a rootnet. This instructions will assume the deployment of a subnet from `/root`, but the steps are equivalent for any other parent subnet.

#### Spawn subnet actor

To run a subnet the first thing is to configure and create the subnet actor that will govern the subnet’s operation:

```shell
./bin/ipc-agent subnet create -p <parent-id> -n <subnet-name> --min-validator-stake 1 --min-validators <num-validators> --bottomup-check-period <number-epochs> --topdown-check-period <epochs-between-checks>

# Sample command execution
./bin/ipc-agent subnet create -p /root -n test --min-validator-stake 1 \
--min-validators 0 --bottomup-check-period 10 --topdown-check-period 10

[2023-03-21T09:32:58Z INFO  ipc_agent::cli::commands::manager::create] created subnet actor with id: /root/t01002
```

This command deploys a subnet actor for a new subnet from the `root`, with a human-readable name `test`, that requires at least `1` validator to join the subnet to be able to mine new blocks, and with a checkpointing period to the parent of `10` blocks. We can see that the output of this command is the ID of the new subnet.

#### Exporting wallet keys

In order to run a validator in a subnet, we’ll need a set of keys to handle that validator. To export the validator key from a wallet that may live in another network into a file (like the wallet address we are using in the rootnet), we can use the following Lotus command:

```shell
eudico wallet export --lotus-json <address-to-export> > <output file>
```

For example:

```shell
eudico wallet export --lotus-json t1cp4q4lqsdhob23ysywffg2tvbmar5cshia4rweq > ~/.ipc-agent/wallet.key
```

If your daemon is running on a docker container, you can get the container id (provided also in the output of the infra scripts), and run the following command above inside a container outputting the exported private key into a file locally:

```shell
docker exec -it <container-id> eudico wallet export --lotus-json <adress-to-export> > ~/.ipc-agent/wallet.key
```

For example:

```shell
docker exec -it 84711d67cf162e30747c4525d69728c4dea8c6b4b35cd89f6d0947fee14bf908 eudico wallet export --lotus-json t1cp4q4lqsdhob23ysywffg2tvbmar5cshia4rweq > ~/.ipc-agent/wallet.key
```

Let’s illustrate the flow by creating a new wallet in our recently deployed root and exporting the keys.

```shell
# Create the new wallet
./bin/ipc-agent wallet new --key-type=secp256k1
[2023-03-29T09:32:52Z INFO  ipc_agent::cli::commands::manager::wallet] created new wallet with address WalletNewResponse { address: "t17rnww5qirr2fh5uiqy6fyi6ix7otwjzgu6pgpey" } in subnet "/root"

# Export the created wallet into ipc-agent
docker exec -it <subnet-container-id> eudico wallet export --lotus-json <filecoin-addr> > <output_directory>

# Sample execution for the address created above
docker exec -it 84711d67cf162e30747c4525d69728c4dea8c6b4b35cd89f6d0947fee14bf908 eudico wallet export --lotus-json t17rnww5qirr2fh5uiqy6fyi6ix7otwjzgu6pgpey > ~/.ipc-agent/wallet.key
```

#### Deploy subnet daemon

Before joining a new subnet, our node for that subnet should be initialized, because as part of the joining process we would need to provide information about our validator network address, so other validators know how to dial them. For the deployment of subnet daemons we also provide a convenient infra script:

```shell
./bin/ipc-infra/run-subnet-docker.sh <lotus-api-port> <validator-libp2p-port> <subnet-id> <absolute-path-validator-key>

# Sample execution
./bin/ipc-infra/run-subnet-docker.sh 1239 1349 /root/t01002 ~/.ipc-agent/wallet.key
```

{% hint style="danger" %}
This script doesn’t support the use of relative paths for the wallet path.
{% endhint %}

The end of the log of the execution of this script provides a bit more of information than the previous one as it is implemented to be used for production deployments:

```shell
>>> Subnet /root/t01002 daemon running in container: 22312347b743f1e95e50a31c1f47736580c9a84819f41cb4ed3d80161a0d750f
>>> Token to /root/t01002 daemon: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.TnoDqZJ1fqdkr_oCHFEXvdwU6kYR7Va_ALyEuoPnksA
>>> Default wallet: t1cp4q4lqsdhob23ysywffg2tvbmar5cshia4rweq
>>> Subnet subnet validator info:
t1cp4q4lqsdhob23ysywffg2tvbmar5cshia4rweq@/ip4/172.17.0.3/udp/1348/quic/p2p/12D3KooWN5hbWkCxwvrX9xYxMwFbWm2Jpa1o4qhwifmS t1cp4q4lqsdhob23ysywffg2tvbmar5cshia4rweq@/ip4/127.0.0.1/udp/1348/quic/p2p/12D3KooWN5hbWkCxwvrX9xYxMwFbWm2Jpa1o4qhwifmS t1cp4q4lqsdhob23ysywffg2tvbmar5cshia4rweq@/ip4/172.17.0.3/tcp/1347/p2p/12D3KooWN5hbWkCxwvrX9xYxMwFbWm2Jpa1o4qhwifmSw3Fb t1cp4q4lqsdhob23ysywffg2tvbmar5cshia4rweq@/ip4/127.0.0.1/tcp/1347/p2p/12D3KooWN5hbWkCxwvrX9xYxMwFbWm2Jpa1o4qhwifmSw3FbaVcL
>>> API listening in host port 1239
>>> Validator listening in host port 1349
```

The validator address specified here should be the same as the one that will be used in the next step to join the subnet.

This log provides information about the API and auth tokens for the daemon, default validator wallet used, the multiaddresses where the validator is listening, etc. To configure our IPC agent with this subnet daemon, we need to once again update our IPC agent with the relevant information. In this case, for the sample execution above we need to add the following section to the end of our config file:

```toml
[[subnets]]
id = "/root/t01002"
gateway_addr = "t064"
network_name = "test"
jsonrpc_api_http = "http://127.0.0.1:1239/rpc/v1"
auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.TnoDqZJ1fqdkr_oCHFEXvdwU6kYR7Va_ALyEuoPnksA"
accounts = ["t1cp4q4lqsdhob23ysywffg2tvbmar5cshia4rweq"]
```

As always, remember to run `./bin/ipc-agent config reload` for changes in the config of the agent to be picked up by the daemon.

#### Joining a subnet

With the daemon for the subnet deployed, we can join the subnet:

```shell
./bin/ipc-agent subnet join --subnet=<subnet-id> --collateral=<collateral_amount> --validator-net-addr=<libp2p-add-validator>
```

For example:

```bash
./bin/ipc-agent subnet join --subnet=/root/t01002 --collateral=2 --validator-net-addr="GET_ADDRESS_FROM_SCRIPT"
```

This command specifies the subnet to join, the amount of collateral to provide and the validator net address used by other validators to dial them. We can pick up this information from the execution of the script above or running `eudico mir validator config validator-addr` from your deployment. Bear in mind that the multiaddress provided for the validator needs to be accessible publicly by other validators. According to the deployment used you may need to tweak the IP addresses of the multiaddresses and the ones provided by these scripts and commands won’t be usable out-of-the-box.

For instance, in the example above, we are using the DNS endpoint `/dns/host.docker.internal/` so other Docker containers for the subnet deployed in the host machine know how to contact the validator.

As a sanity-check that we have joined the subnet successfully and that we provided enough collateral to register the subnet to IPC, we can list the child subnets of our parent with the following command:

```shell
./bin/ipc-agent subnet list --gateway-address=<gateway-addr> --subnet=<parent-subnet-id>

```

For example:

```bash
./bin/ipc-agent subnet list --gateway-address=t064 --subnet=/root

# [2023-03-30T17:00:25Z INFO  ipc_agent::cli::commands::manager::list_subnets] /root/t01003 - status: 0, collateral: 2 FIL, circ.supply: 0.0 FIL
```

In the current implementation of IPC the gateway actor is deployed as a system actor on the default address `t064`, so whenever one of the IPC commands requests the address of the gateway actor you can use that value.

#### Mining in a subnet

With our subnet daemon deployed, and having joined the network, as the minimum number of validators we set for our subnet is 0, we can start mining and creating new blocks in the subnet. Doing so is a simple as running the following script using as an argument the container of our subnet node:

```shell
./bin/ipc-infra/mine-subnet.sh <node-container-id>
```

For example:

```bash
./bin/ipc-infra/mine-subnet.sh 84711d67cf162e30747c4525d69728c4dea8c6b4b35cd89f6d0947fee14bf908
```

The mining process is currently run in the foreground in interactive mode. Consider using `nohup ./bin/ipc-infra/mine-subnet.sh` or tmux to run the process in the background and redirect the logs to some file.

#### Changing subnet validator network address

It may be the case that while joining the subnet, you didn’t set the multiaddress for your validator correctly and you need to update it. You’ll realize that the network address of your validator is not configured correctly, because your agent throws an error when trying to connect to your subnet node, or starting the validator in your subnet throws a network-related error.

Changing the validator is as simple as running the following command:

```shell
./bin/ipc-agent subnet set-validator-net-addr --subnet=<subnet-id> --validator-net-addr=<new-validator-addr>
```

For example:

```bash
./bin/ipc-agent subnet set-validator-net-addr --subnet=/root/t01002 --validator-net-addr="/dns/host.docker.internal/tcp/1349/p2p/12D3KooWDeN3bTvZEH11s9Gq5bDeZZLKgRZiMDcy2KmA6mUaT9KE"
```

#### Committing checkpoints from a subnet

Subnets are periodically committing checkpoints to their parent every `check-period` (parameter defined when creating the subnet). When you configure the connection to your child subnet in the agent config, and `config reload`, your agent should automatically start the process responsible for creating the checkpoints and submitting them to the parent. This process will only commit new subnet if you are a validator in that subnet. If the agent has spawned successfully the checkpointing process, you should start seeing every now and then these logs:

```plaintext
[2023-03-29T09:52:48Z INFO  ipc_agent::manager::checkpoint] Submitting checkpoint for account t1cp4q4lqsdhob23ysywffg2tvb
[2023-03-29T09:52:55Z INFO  ipc_agent::manager::checkpoint] successfully published checkpoint submission for epoch 50
```

It is common for the checkpointing process to fail if while configuring a child subnet: either because the auth token is not correct, or because no wallet addresses have been configured in the subnet, etc. If this happens, running `./bin/ipc-agent config reload` will restart the checkpoint manager and pick up the latest config values. Whenever you see an error in the checkpointing process, check that your subnet’s configuration is correct and `config reload` to restart the process.

Finally, if you want to inspect the information of a range of checkpoints committed in the parent for a subnet, you can use the `list-bottomup` command provided by the agent as follows:

```shell
# List checkpoints between two epochs for a subnet
./bin/ipc-agent checkpoint list-bottomup --from-epoch=<range-start> --to-epoch=<range-end> --subnet=<subnet-id>

```

For example:

```bash
./bin/ipc-agent checkpoint list-bottomup --from-epoch=0 --to-epoch=100 --subnet=/
root/t01002

# [2023-03-29T12:43:42Z INFO  ipc_agent::cli::commands::manager::list_checkpoints] epoch 0 - prev_check={"/":"bafy2bzacedkoa623kvi5gfis2yks7xxjl73vg7xwbojz4tpq63dd5jpfz757i"}, cross_msgs=null, child_checks=null
# [2023-03-29T12:43:42Z INFO  ipc_agent::cli::commands::manager::list_checkpoints] epoch 10 - prev_check={"/":"bafy2bzacecsatvda6lodrorh7y7foxjt3a2dexxx5jiyvtl7gimrrvywb7l5m"}, cross_msgs=null, child_checks=null
# [2023-03-29T12:43:42Z INFO  ipc_agent::cli::commands::manager::list_checkpoints] epoch 30 - prev_check={"/":"bafy2bzaceauzdx22hna4e4cqf55jqmd64a4fx72sxprzj72qhrwuxhdl7zexu"}, cross_msgs=null, child_checks=null
```

#### Sending funds in a subnet

The agent provides a command to conveniently exchange funds between addresses of the same subnet. This can be achieved through the following command:

```shell
./bin/ipc-agent subnet send-value --subnet=<subnet-id> --to=<to-addr> <value>
```

For example:

```
./bin/ipc-agent subnet send-value --subnet=/root/t01002 --to=t1xbevqterae2tanmh2kaqksnoacflrv6w2dflq4i 10
```

#### Leaving a subnet

To leave a subnet, the following agent command can be used:

```shell
./bin/ipc-agent subnet leave --subnet=<subnet-id>
```

For example:

```bash
./bin/ipc-agent subnet leave --subnet=/root/t01002
```

Leaving a subnet will release the collateral for the validator and remove all the validation rights from its account. This means that if you have a validator running in that subnet, its validation process will immediately terminate.

#### Importing a wallet to a subnet node

Depending on if the subnet is running inside a docker container or not, we can use the following commands to import a wallet to a subnet node:

```shell
# Importing directly into the node
eudico wallet import --lotus-json <wallet-key-file-path>
```

```bash
# Importing directly into a docker container
docker cp <wallet-key-path> <container-id>:<target-file-in-container>
```

```bash
# Copy the wallet key inside the container
docker exec -it <container-id> sh -c "./eudico wallet import --format=json-lotus <target-file-in-container>"
```

```bash
# Sample execution
docker cp ~/.ipc-agent/t1ivy6mo2ofxw4fdmft22nel66w63fb7cuyslm4cy.key 91d2af805346:/input.key
docker exec -it 91d2af805346 sh -c "eudico wallet import --format=json-lotus input.key"
```

#### Running a subnet with several validators

In this section, we will deploy a subnet where the IPC agent is responsible for handling more than one validator in the subnet. Throughout this guide, we use the `ipc-infra` scripts to deploy the nodes in Docker containers, but a similar steps could be used to deploy the nodes on bare-metal or any other runtime.

For the rest of this tutorial, we’ll assume that you have your agent already configured and interacting with a rootnet. We are going to deploy a subnet with 5 validators. The first thing we’ll need to do is creating a new wallet for every validator we want to run. We can do this directly through the agent with the following command:

```shell
./bin/ipc-agent wallet new --key-type=secp256k1
```

We also need to provide with some funds our wallets so they can put collateral to join the subnet. According to the rootnet you are connected to, you may need to get some funds from the faucet, or send some from your main wallet. Funds can be send from your main wallet also through the agent with:

```shell
./bin/ipc-agent subnet send-value --subnet=/root --to=<target-wallet> <amount_FIL>
```

With this, we can already create the subnet with `/root` as its parent. We are going to set the `--min-validators 5` so no new blocks can be created without this number of validators in the subnet.

```shell
# Creating a sample subnet with 5 as the minimum number of validators.
./bin/ipc-agent subnet create -p /root -n test --min-validator-stake 1 --min-validators 5 --bottomup-check-period 10 --topdown-check-period 10
```

#### Deploying the infrastructure

In order to deploy the 5 validators for the subnet, we will have to first export the keys from our root node so we can import them to our validators. Depending on how you are running your rootnet node you’ll have to make a call to the docker container, or your nodes API.

With the five keys conveniently exported, we can deploy the subnet nodes using the `infra-scripts`. The following code snippet showcases the deployment of five sample nodes. Note that each node should be importing a different wallet key for their validator, and should be exposing different ports for their API and validators:

```shell
./bin/ipc-infra/run-subnet-docker.sh 1240 1359 /root/t01002 ~/.ipc-agent/wallet1.key
./bin/ipc-infra/run-subnet-docker.sh 1250 1369 /root/t01002 ~/.ipc-agent/wallet2.key
./bin/ipc-infra/run-subnet-docker.sh 1280 1379 /root/t01002 ~/.ipc-agent/wallet3.key
./bin/ipc-infra/run-subnet-docker.sh 1270 1389 /root/t01002 ~/.ipc-agent/wallet4.key
./bin/ipc-infra/run-subnet-docker.sh 1280 1399 /root/t01002 ~/.ipc-agent/wallet5.key
```

If the deployment is successful each of these nodes should return the following output at the end of their logs. Note down this information somewhere as we will need it to conveniently join our validators to the subnet.

```plaintext
>>> Subnet /root/t01002 daemon running in container: 91d2af80534665a8d9a20127e480c16136d352a79563e74ee3c5497d50b9eda8 (friendly name: ipc_root_t01002_1240)
>>> Token to /root/t01002 daemon: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.JTiumQwFIutkTb0gUC5JWTATs-lUvDaopEDE0ewgzLk
>>> Default wallet: t1ivy6mo2ofxw4fdmft22nel66w63fb7cuyslm4cy
>>> Subnet subnet validator info:
t1ivy6mo2ofxw4fdmft22nel66w63fb7cuyslm4cy@/ip4/172.17.0.4/udp/1348/quic/p2p/12D3KooWEJXcSPw6Yv4jDk52xvp2rdeG3J6jCPX9AgBJE2mRCVoR
t1ivy6mo2ofxw4fdmft22nel66w63fb7cuyslm4cy@/ip4/127.0.0.1/udp/1348/quic/p2p/12D3KooWEJXcSPw6Yv4jDk52xvp2rdeG3J6jCPX9AgBJE2mRCVoR
t1ivy6mo2ofxw4fdmft22nel66w63fb7cuyslm4cy@/ip4/172.17.0.4/tcp/1347/p2p/12D3KooWEJXcSPw6Yv4jDk52xvp2rdeG3J6jCPX9AgBJE2mRCVoR
t1ivy6mo2ofxw4fdmft22nel66w63fb7cuyslm4cy@/ip4/127.0.0.1/tcp/1347/p2p/12D3KooWEJXcSPw6Yv4jDk52xvp2rdeG3J6jCPX9AgBJE2mRCVoR
>>> API listening in host port 1240
>>> Validator listening in host port 1359
```

#### Configuring the agent

To configure the agent for its use with all the validators, we need to connect to the RPC API of one of the validators, and import all of the wallets of the validators in that node, so the agent is able through the same API to act on behalf of any validator.

Here’s an example of the configuration connecting to the RPC of the first validator, and configuring all the wallets for the validators in the subnet.

```toml
[[subnets]]
id = "/root/t01002"
gateway_addr = "t064"
network_name = "test"
jsonrpc_api_http = "http://127.0.0.1:1240/rpc/v1"
auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.JTiumQwFIutkTb0gUC5JWTATs-lUvDaopEDE0ewgzLk"
accounts = ["t1ivy6mo2ofxw4fdmft22nel66w63fb7cuyslm4cy", "t1cp4q4lqsdhob23ysywffg2tvbmar5cshia4rweq", "t1nv5jrdxk4ljzndaecfjgmu35k6iz54pkufktvua", "t1pr3qzqieikp33pfdaygwkwt5v35a5ljsxsu64xq", "t1pmxk3nhg2u2ge7ioilrk7c5rmdmmbgpazipvzyy"]
```

Remember to run `./bin/ipc-agent config reload` for your agent to pick up the latest changes for the config.

#### Joining the subnet

All the infrastructure for the subnet is now deployed, and we can join our validators to the subnet. For this, we need to send a `join` command from each of our validators from their validator wallet addresses providing the validators multiaddress. We can get the validator multiaddress from the output of the script we ran to deploy the infrastructure (or by running `eudico mir validator config validator-addr`). These scripts expose through docker the port for the TPC port of the libp2p host of the validator (if there is interest to use the UDP-based multiaddress drop an issue and we can update them accordingly). Hence, we need to choose from the available multiaddresses one that exposes a TCP connection. Finally, our validators are configured so their docker containers interact with each other through ports in the host machine, so instead of exposing an IP address for the multiaddress, the following DNS-based multiaddress needs to be used for all validators: `/dns/host.docker.internal/`.

This is the command that needs to be executed for every validator to join the subnet:

```shell
./bin/ipc-agent subnet join --from=<validator-wallet> --subnet=/root/t01002 --collateral=<amount-collateral> --validator-net-addr="/dns/host.docker.internal/tcp/<VALIDATOR_PORT>/p2p/<VALIDATOR_MULTIADDR>"
```

For example:

```bash
# Sample execution for the validator whose logs where shared above for 2FIL collateral
./bin/ipc-agent subnet join --from=t1ivy6mo2ofxw4fdmft22nel66w63fb7cuyslm4cy --subnet=/root/t01002 --collateral=2 --validator-net-addr="/dns/host.docker.internal/tcp/1359/p2p/12D3KooWEJXcSPw6Yv4jDk52xvp2rdeG3J6jCPX9AgBJE2mRCVoR
```

Remember doing the above step for the five validators.

#### Mining in subnet

We have everything in place now to start mining from all the validators. Mining is as simple as running the following script passing the container id for the validators:

```shell
./bin/ipc-infra/mine-subnet.sh <node-container-id>
```

The mining process is currently run in the foreground in interactive mode. Consider using `nohup ./bin/ipc-infra/mine-subnet.sh` or tmux to run the process in the background and redirect the logs to some file as handling the mining process of the five validators in the foreground may be quite cumbersome.

### Troubleshooting

#### I need to upgrade my IPC agent

Sometimes, things break, and we’ll need to push a quick path to fix some bug. If this happens, and you need to upgrade your agent version, kill you agent daemon if you have any running, pull the latest changes from this repository, build the binary, and start your daemon again. This should pick up the latest version for the agent. In the future, we will provide a better way to upgrade your agent.

```shell
# Pull latest changes
git pull

# Build the agent
make build

# Restart the daemon
./bin/ipc-agent daemon
```

#### The make install-infra command is not building the Eudico image

`make install-infra` may fail and not build the `eudico` image if your system is not configured correctly. If this happens, you can always try to build the image yourself to have a finer-grain report of the issues to help you debug them. For this you can [follow these instructions](https://github.com/consensus-shipyard/lotus/blob/spacenet/scripts/ipc/README.md).

High-level you just need to clone the [Eudico repository](https://github.com/consensus-shipyard/lotus), and run `docker build -t eudico .` in the root of the repository.

#### My subnet node doesn’t start

Either because the dockerized subnet node after running `./bin/ipc-infra/run-subnet-docker.sh` gets stuck waiting for the API to be started with the following message:

```plaintext
Not online yet... (could not get API info for FullNode: could not get api endpoint: API not running (no endpoint))
```

Or because when the script finishes no validator address has been reported as expected by the logs, the best way to debug this situation is to attach to the docker container and check the logs with the following command:

```shell
docker exec -it <container_name/id> bash
```

Once inside the container, run:

```bash
tmux a
```

Generally, the issue is that:

* You haven’t passed the validator key correctly and it couldn’t be imported.
* There was some network instability, and lotus parameters couldn’t be downloaded successfully.

#### My agent is not submitting checkpoints after an error

Try running `./bin/ipc-agent config reload`, this should pick up the latest config and restart all checkpointing processes. If the error has been fixed or it was an network instability between the agent and your subnet daemon, checkpoints should start being committed again seamlessly.
