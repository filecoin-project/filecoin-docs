---
description: >-
  Advanced operational setup for PDP nodes, including reverse proxy and LXD
  container patterns.
---

# Advanced PDP operations

This page collects advanced operational patterns for storage providers running PDP infrastructure. These examples are intended for operators who already have a PDP node running and want to harden network exposure or isolate services.

{% hint style="warning" %}
The examples below must be adapted to your network, domains, storage layout, and security policy. Test changes on non-production infrastructure before moving production PDP traffic.
{% endhint %}

## Nginx reverse proxy

Use nginx as a public HTTPS reverse proxy when Curio PDP services run on an internal host and a separate public endpoint terminates TLS.

### Architecture

* nginx listens publicly on ports 80 and 443.
* Let's Encrypt and Certbot manage TLS certificates on the nginx host.
* Curio runs on an internal IP address.
* nginx proxies requests to Curio over the internal network.
* Curio is configured for delegated TLS handling.

### Prerequisites

* Ubuntu 22.04 or equivalent Linux host.
* Root or sudo access.
* A domain name pointed at the nginx host.
* Ports 80 and 443 open to the internet.
* A Curio PDP service reachable from the nginx host on the internal network.

### Install nginx and Certbot

```sh
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
sudo systemctl enable --now nginx
nginx -v
certbot --version
```

### Create an initial virtual host

Replace `pdp.example.com` with your domain.

```sh
sudo nano /etc/nginx/sites-available/pdp.example.com
```

```nginx
server {
    listen 80;
    server_name pdp.example.com;

    location / {
        return 200 "ready for certbot";
    }
}
```

Enable and test the site:

```sh
sudo ln -s /etc/nginx/sites-available/pdp.example.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Issue a TLS certificate

```sh
sudo certbot --nginx -d pdp.example.com
```

When prompted, enter an email address, accept the terms, and choose HTTPS redirection.

### Configure the reverse proxy

After Certbot succeeds, replace the site configuration with a reverse proxy. Replace `pdp.example.com` and `10.0.0.10` with your domain and Curio service IP.

```nginx
server {
    listen 80;
    server_name pdp.example.com;

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    location / {
        return 301 https://$server_name$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name pdp.example.com;

    ssl_session_cache shared:SSL:100m;
    ssl_certificate /etc/letsencrypt/live/pdp.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pdp.example.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    access_log /var/log/nginx/pdp.example.com.access.log;
    error_log /var/log/nginx/pdp.example.com.error.log;

    client_max_body_size 0;
    client_body_timeout 600s;
    send_timeout 600s;
    proxy_request_buffering off;
    proxy_buffering off;
    gzip off;

    location / {
        proxy_pass http://10.0.0.10:443;
        proxy_http_version 1.1;
        proxy_socket_keepalive on;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 600s;
        proxy_send_timeout 600s;
        proxy_read_timeout 600s;
    }
}
```

The large-file and buffering settings are important for PDP traffic because payloads may be large and should stream through the proxy rather than buffering in nginx memory.

Test and reload:

```sh
sudo nginx -t
sudo systemctl reload nginx
```

### Configure Curio for delegated TLS

On the Curio host, configure the PDP HTTP layer for delegated TLS.

```toml
DelegateTLS = true
```

Restart Curio after changing the configuration.

### Test and monitor

```sh
curl -I https://pdp.example.com
openssl s_client -connect pdp.example.com:443 -servername pdp.example.com
sudo tail -f /var/log/nginx/pdp.example.com.access.log
sudo tail -f /var/log/nginx/pdp.example.com.error.log
sudo systemctl status nginx
```

### Troubleshooting

| Symptom | What to check |
| --- | --- |
| Certificate renewal fails | Confirm port 80 is reachable and `/.well-known/acme-challenge/` is served. |
| 502 Bad Gateway | Confirm Curio is running, the upstream IP is correct, and `DelegateTLS` is enabled. |
| Uploads fail or stall | Check `client_max_body_size`, buffering, timeout settings, and upstream connectivity. |
| nginx reload fails | Run `sudo nginx -t` and fix the reported syntax or certificate path issue. |

## LXD container setup

Use LXD when you want to isolate PDP services or run multiple provider environments on a shared host. The pattern below creates an Ubuntu 22.04 container with SSH access, persistent storage mounts, and optional resource limits.

### Prerequisites

* Root or sudo access on the host.
* 32 GiB or more RAM recommended for PDP workloads.
* Enough disk capacity for the container root disk and mounted PDP storage.
* A network plan for how the container will be reached.

### Install and initialize LXD

```sh
sudo snap install lxd
sudo usermod -aG lxd "$USER"
newgrp lxd
lxd --version
```

Run the initialization wizard:

```sh
lxd init
```

For a simple local setup, use a ZFS-backed storage pool and the default `lxdbr0` bridge. Verify the result:

```sh
lxc storage list
lxc network list
```

### Create a container profile

Create a profile for each container so networking and storage can be managed explicitly.

```sh
lxc profile create pdp-1
lxc profile edit pdp-1
```

Example profile with a static IP on `lxdbr0`:

```yaml
name: pdp-1
description: PDP container with static IP
config:
  user.network-config: |
    version: 2
    renderer: networkd
    ethernets:
      eth0:
        dhcp4: false
        addresses:
          - 192.168.1.100/24
        routes:
          - to: default
            via: 192.168.1.1
        nameservers:
          addresses:
            - 192.168.1.1
            - 8.8.8.8
devices:
  eth0:
    name: eth0
    nictype: bridged
    parent: lxdbr0
    type: nic
  root:
    path: /
    pool: default
    type: disk
```

Change the IP address, gateway, DNS servers, bridge, and storage pool to match your environment.

### Launch the container

```sh
lxc launch ubuntu:22.04 pdp-1 -p pdp-1
lxc list
```

### Configure SSH access

Install and start OpenSSH inside the container:

```sh
lxc exec pdp-1 -- bash
apt update
apt install -y openssh-server
systemctl enable --now ssh
exit
```

Add your SSH key:

```sh
lxc exec pdp-1 -- mkdir -p /root/.ssh
lxc file push ~/.ssh/id_rsa.pub pdp-1/root/.ssh/authorized_keys
lxc exec pdp-1 -- chmod 700 /root/.ssh
lxc exec pdp-1 -- chmod 600 /root/.ssh/authorized_keys
```

Test access:

```sh
ssh root@192.168.1.100
```

For production administration, create a non-root sudo user:

```sh
lxc exec pdp-1 -- bash
adduser pdpadmin
usermod -aG sudo pdpadmin
mkdir -p /home/pdpadmin/.ssh
cp /root/.ssh/authorized_keys /home/pdpadmin/.ssh/
chown -R pdpadmin:pdpadmin /home/pdpadmin/.ssh
exit
ssh pdpadmin@192.168.1.100
```

### Add storage mounts

Create host directories and mount them into the container.

```sh
sudo mkdir -p /data/pdp-1/storage
lxc config device add pdp-1 data-storage disk source=/data/pdp-1/storage path=/mnt/storage
lxc exec pdp-1 -- df -h
```

For separate fast and long-term storage:

```sh
sudo mkdir -p /nvme-storage/pdp-1 /network-storage/pdp-1
lxc config device add pdp-1 sealing disk source=/nvme-storage/pdp-1 path=/sealing
lxc config device add pdp-1 long-term disk source=/network-storage/pdp-1 path=/storage
```

### Set resource limits

```sh
lxc config set pdp-1 limits.memory 32GiB
lxc config set pdp-1 limits.cpu 8
lxc info pdp-1
```

### Manage containers

```sh
lxc start pdp-1
lxc stop pdp-1
lxc restart pdp-1
lxc exec pdp-1 -- bash
lxc snapshot pdp-1 before-upgrade
lxc restore pdp-1 before-upgrade
lxc config show pdp-1
```

### Create another PDP container

```sh
lxc profile copy pdp-1 pdp-2
lxc profile edit pdp-2
lxc launch ubuntu:22.04 pdp-2 -p pdp-2
```

Edit the copied profile before launch or immediately after launch so the second container has a unique IP address and unique storage paths.

### Networking options

| Option | Use when | Tradeoff |
| --- | --- | --- |
| Managed bridge | You want simple local networking behind the host. | External access usually needs port forwarding or a reverse proxy. |
| Physical bridge | The container should receive an address on the physical network. | Requires host bridge configuration. |
| SR-IOV | You need near-native network performance and NIC isolation. | Requires compatible hardware and more network administration. |

### Troubleshooting

| Symptom | Command |
| --- | --- |
| Container does not start | `lxc info pdp-1 --show-log` |
| Network is not configured | `lxc exec pdp-1 -- cloud-init status` and `lxc exec pdp-1 -- ip addr` |
| SSH does not work | `lxc exec pdp-1 -- systemctl status ssh` |
| Storage mount is missing | `lxc exec pdp-1 -- df -h` and `lxc config show pdp-1` |
| ZFS or pool issue | `zpool status` and `lxc storage info default` |

After the container is ready, follow [Install and run PDP](install-and-run-pdp.md) inside the container.
