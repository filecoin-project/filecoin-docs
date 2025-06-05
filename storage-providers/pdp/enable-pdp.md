---
description: >-
  This section enables Proof of Data Possession (PDP) for a Storage Provider
  node using Curio. These steps guide you through running a standalone PDP
  service using Curio and pdptool.
---

# Enable PDP

<table data-view="cards"><thead><tr><th></th><th data-hidden data-card-cover data-type="files"></th></tr></thead><tbody><tr><td><a href="https://docs.curiostorage.org/experimental-features/enable-pdp">PDP Documentation</a></td><td><a href="../../.gitbook/assets/Curio_placeholder.webp">Curio_placeholder.webp</a></td></tr><tr><td><a href="https://filecoinproject.slack.com/archives/C0717TGU7V2">Filecoin Slack - #fil-pdp</a></td><td><a href="../../.gitbook/assets/Filecoin.svg.png">Filecoin.svg.png</a></td></tr><tr><td><a href="../../basics/assets/metamask-setup.md">Filecoin Wallet - MetaMask Setup</a></td><td><a href="../../.gitbook/assets/Filecoin.svg.png">Filecoin.svg.png</a></td></tr></tbody></table>

### Attach Storage Locations

With Curio running with the GUI layer:

```sh
curio run --layers=gui
```

Run the following commands in your Curio CLI to attach storage paths:

```sh
curio cli storage attach --init --seal /fast-storage/path
curio cli storage attach --init --store /long-term-storage/path
```

{% hint style="info" %}
Your fast-storage path should point to high-performance storage media such as NVMe or SSD
{% endhint %}

***

### Add a PDP Configuration Layer

Browse to the Configurations page of the Curio GUI.

Create a new layer named pdp. Enable and set to `true` the following under Subsystems:

{% hint style="info" %}
You may find it helpful to search for the setting names in your browser.
{% endhint %}

* ✅ `EnableParkPiece`
* ✅ `EnablePDP`
* ✅ `EnableCommP`
* ✅ `EnableMoveStorage`

In the HTTP section:

* ✅ Enable: `true`
* 🌐 DomainName: `your domain (e.g., pdp.mydomain.com)`
* 📡 ListenAddress: `0.0.0.0:443`

{% hint style="info" %}
&#x20;You must point your domain’s A record to your server’s public IP address for Let’s Encrypt to issue a certificate.
{% endhint %}

***

### Set Up PDP Service Keys

Build the pdptool:

```sh
cd curio/cmd/pdptool
go build .
```

Generate a service secret:

```sh
./pdptool create-service-secret
```

```sh
# Example output:

-----BEGIN PUBLIC KEY-----
LxP9MzVmHdC7KwYBvNAo1jXuIRfGXqQyo2JzE4Uctn0a5eFZbs6Wlvq3dKYgphTD
XAqRsm38LPt2iVcGb9MruZJxEkBhO71wDdNyaFMoXpCJnUqRAezvKlfbIg==
-----END PUBLIC KEY-----
```

Browse to the **PDP** page of the Curio GUI and in the **Services** section:

* Select **Add PDP Service**
* Input a **Service Name** of your choice (e.g. `pdp-service`)
* Copy the previously generated public key into the **Public Key** field.
* Select **Add Service**

***

### Import your Filecoin Wallet Private Key:

{% hint style="info" %}
There are several ways to obtain private keys for Ethereum addresses. For this guide, we will use a new delegated Filecoin wallet address.
{% endhint %}

Create a new delegated wallet:

```sh
lotus wallet new delegated
```

```sh
# Example output:

t410fuo4dghaeiqzokiqnxruzdr6e3cjktnxprrc56bi
```

{% hint style="info" %}
You can display your Lotus wallets at any time by running:
{% endhint %}

```sh
lotus wallet list
```

Export & convert your new delegated wallet address private key:&#x20;

```sh
lotus wallet export <your-delegated-wallet-address> | xxd -r -p | jq -r '.PrivateKey' | base64 -d | xxd -p -c 32
```

```sh
# Example output:

d4c2e3f9a716bb0e47fa91b2cf4a29870be3c5982fd6eafed71e8ac3f9c0b12
```

Browse to the **PDP** page of the Curio GUI and in the **Owner Address** section:

* Select **Import Key**
* Copy the previously generated private wallet key into the **Private Key (Hex)** field.
* Select **Import Key**

{% hint style="success" %}
Your 0x wallet address -  the delegated Ethereum address derived from your Filecoin Metamask private key - will be added to the **Owner Address** section of the Curio PDP page.
{% endhint %}

Make sure to send a small amount of FIL to your 0x wallet - we recommend 5 FIL to ensure uninterrupted PDP operation during initial setup and testing.

{% hint style="danger" %}
Important: Secure your private key material. Don’t expose or store it in plain text without protection.
{% endhint %}

***

### Restart and Verify

Restart Curio with both layers:

```sh
curio run --layers=gui,pdp
```

{% hint style="warning" %}
&#x20;If you encounter errors binding to port 443  when starting Curio with the pdp configuration layer, run:
{% endhint %}

```sh
sudo setcap 'cap_net_bind_service=+ep' /usr/local/bin/curio
```

Test the PDP service:

```sh
./pdptool ping --service-url https://your-domain.com --service-name <ServiceName>
```

{% hint style="success" %}
Use the service name specified in the **Service Name** field when you added your public **PDP Service** key - e.g. `pdp-service`
{% endhint %}

Expected output:

```sh
Ping successful: Service is reachable and JWT token is valid.
```

{% hint style="info" %}
Note: The first ping often fails. Try again after a short delay.
{% endhint %}

***

### 🎉 You’re Ready!

You’ve successfully launched a PDP-enabled Filecoin Storage Provider stack. Your system is now:

* ✅ Syncing with the Filecoin network via Lotus
* ✅ Recording deal and sector metadata in YugabyteDB
* ✅ Operating Curio to manage sealing and coordination
* ✅ Submitting Proof of Data Possession to verify storage integrity

***

### 🔜 Next Steps

* 🚙 Take PDP for a test drive with the [Use PDP](use-pdp.md) guide
* 🧭 Monitor logs and metrics
* 💬 Join the community - Filecoin Slack - [#fil-pdp](https://filecoinproject.slack.com/archives/C0717TGU7V2)
