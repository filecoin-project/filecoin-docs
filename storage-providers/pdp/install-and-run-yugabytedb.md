# Install & Run YugabyteDB

<table data-view="cards"><thead><tr><th></th><th data-hidden data-card-cover data-type="files"></th></tr></thead><tbody><tr><td><a href="https://docs.yugabyte.com/preview/tutorials/quick-start/linux/">Yugabyte Documentation</a></td><td><a href="../../.gitbook/assets/yugabyte.svg">yugabyte.svg</a></td></tr><tr><td><a href="https://filecoinproject.slack.com/archives/C06LF5YP8S3">Filecoin Slaxk - #fil-curio-help</a></td><td><a href="../../.gitbook/assets/Filecoin.svg.png">Filecoin.svg.png</a></td></tr><tr><td><a href="https://inviter.co/yugabytedb">Yugabyte Slack</a></td><td><a href="../../.gitbook/assets/yugabyte.svg">yugabyte.svg</a></td></tr></tbody></table>

### Set ulimit configuration

{% hint style="info" %}
&#x20;Before starting Yugabyte, you must increase the default `ulimit` values to ensure system limits do not interfere with the database.
{% endhint %}

To do this:

#### **Persist new limits across reboots**

Add these lines to `/etc/security/limits.conf`:

```sh
echo "$(whoami) soft nofile 1048576" | sudo tee -a /etc/security/limits.conf
echo "$(whoami) hard nofile 1048576" | sudo tee -a /etc/security/limits.conf
```

This ensures the increased limits are automatically applied to future sessions.

#### **Apply limit immediately (for current shell only)**

```sh
ulimit -n 1048576
# Verify limit change:
ulimit -n
```

{% hint style="success" %}
This should output `1048576`.
{% endhint %}

### Install Yugabyte

```sh
wget https://software.yugabyte.com/releases/2.25.1.0/yugabyte-2.25.1.0-b381-linux-x86_64.tar.gz
tar xvfz yugabyte-2.25.1.0-b381-linux-x86_64.tar.gz
cd yugabyte-2.25.1.0
./bin/post_install.sh
```

### Start the DB

```sh
./bin/yugabyted start \
  --advertise_address 127.0.0.1 \
  --master_flags rpc_bind_addresses=127.0.0.1 \
  --tserver_flags rpc_bind_addresses=127.0.0.1
```

{% hint style="danger" %}
&#x20;If you encounter locale-related errors when starting Yugabyte for the first time, run:
{% endhint %}

```sh
sudo locale-gen en_US.UTF-8
```

{% hint style="success" %}
Visit `127.0.0.1:15433` to confirm successful installation. This is the YugabyteDB web UI — it should display the dashboard if the service is running correctly and all nodes are healthy.&#x20;
{% endhint %}

{% hint style="info" %}
You can also check your Yugabyte cluster details directly in the CLI with:
{% endhint %}

```sh
./bin/yugabyted status
```
