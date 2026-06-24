---
description: >-
  Set up nginx as an HTTPS reverse proxy in front of your Curio PDP service using
  Let's Encrypt certificates and Curio's DelegateTLS mode.
---

# Enable HTTPS for PDP

This guide documents a working nginx setup on **Ubuntu 22.04** that provides HTTPS access to Filecoin PDP (Curio) services using Let's Encrypt certificates. The examples use the placeholder domains `pdp.example.com` and `pdp2.example.com` — replace them with your own domains throughout.

{% hint style="warning" %}
**This setup is specific to one example environment.** You must adjust hostnames, internal IP addresses, and paths to match your own system and network configuration.
{% endhint %}

{% hint style="info" %}
**Before making any configuration changes,** back up your existing nginx configuration and validate every change with `sudo nginx -t` before reloading. This catches syntax errors before they take down the service.
{% endhint %}

***

## 🗺️ Overview

This setup uses nginx as a reverse proxy with SSL/TLS termination. The architecture:

* Nginx handles HTTPS on port 443 (public-facing).
* Nginx terminates SSL/TLS and manages certificates.
* Backend Curio services run on internal IPs on port 443, serving HTTP.
* Communication between nginx and Curio is unencrypted HTTP over the LAN.

***

## 🚀 Prerequisites

* Root or sudo access.
* Domain name(s) pointing to your server's public IP.
* Curio PDP service(s) running on the internal network. See [Install & Run PDP](install-and-run-pdp.md).
* Ports `80` and `443` open in the firewall.

***

## 1️⃣ Install Nginx

```sh
sudo apt update
sudo apt install nginx
```

Verify the installation:

```sh
nginx -v
```

Start and enable nginx:

```sh
sudo systemctl start nginx
sudo systemctl enable nginx
```

***

## 2️⃣ Install Certbot for SSL Certificates

```sh
sudo apt install certbot python3-certbot-nginx
```

Verify the installation:

```sh
certbot --version
```

***

## 3️⃣ Configure the Virtual Host

Create a configuration file for your domain. Replace `pdp.example.com` with your domain and `192.168.1.160` with your Curio service IP.

Create the file:

```sh
sudo nano /etc/nginx/sites-available/pdp.example.com
```

Add this initial configuration (before SSL setup):

```nginx
server {
    listen 80;
    server_name pdp.example.com;

    location / {
        return 200 "Server is ready for certbot";
    }
}
```

Enable the site:

```sh
sudo ln -s /etc/nginx/sites-available/pdp.example.com /etc/nginx/sites-enabled/
```

Test the configuration and reload nginx:

```sh
sudo nginx -t
sudo systemctl reload nginx
```

***

## 4️⃣ Obtain an SSL Certificate

Run Certbot with the nginx plugin:

```sh
sudo certbot --nginx -d pdp.example.com
```

Follow the prompts:

* Enter your email address.
* Agree to the terms of service.
* Choose whether to redirect HTTP to HTTPS (recommended: **yes**).

Certbot will automatically:

* Obtain the certificate from Let's Encrypt.
* Configure nginx to use the certificate.
* Set up automatic renewal.

***

## 5️⃣ Configure the Reverse Proxy

After Certbot completes, edit your site configuration:

```sh
sudo nano /etc/nginx/sites-available/pdp.example.com
```

Replace the contents with the following. Substitute `YOUR_DOMAIN` and `YOUR_CURIO_IP` with your own values.

```nginx
# HTTP server - redirect to HTTPS
server {
    listen 80;
    server_name YOUR_DOMAIN;

    # Let's Encrypt challenge location
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    # Redirect everything else to HTTPS
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS server - proxy to Curio
server {
    listen 443 ssl;
    server_name YOUR_DOMAIN;

    # Let's Encrypt certificates
    ssl_certificate /etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Logging
    access_log /var/log/nginx/YOUR_DOMAIN.access.log;
    error_log /var/log/nginx/YOUR_DOMAIN.error.log;

    # Large file upload/download settings
    client_max_body_size 0;
    proxy_request_buffering off;
    proxy_buffering off;
    gzip off;

    # Proxy everything to Curio (HTTP with DelegateTLS)
    location / {
        proxy_pass http://YOUR_CURIO_IP:443;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Test and reload:

```sh
sudo nginx -t
sudo systemctl reload nginx
```

### ⚙️ Configuration breakdown

**HTTP server block (port 80)**

* `location /.well-known/acme-challenge/`: allows Certbot to renew certificates.
* `location /`: redirects all other HTTP traffic to HTTPS.

**HTTPS server block (port 443)**

* `listen 443 ssl`: listen on the HTTPS port with SSL.
* `ssl_certificate` / `ssl_certificate_key`: paths to your SSL certificate and private key.
* `include /etc/letsencrypt/options-ssl-nginx.conf`: Certbot's SSL settings.
* `ssl_dhparam`: Diffie-Hellman parameters for security.

**Large file settings (critical for PDP)**

* `client_max_body_size 0`: no limit on upload size.
* `proxy_request_buffering off`: stream uploads directly to the backend (reduces memory usage).
* `proxy_buffering off`: stream downloads directly to the client (reduces memory usage).
* `gzip off`: don't compress binary data (saves CPU; PDP data doesn't compress).

**Proxy settings**

* `proxy_pass http://YOUR_CURIO_IP:443`: forward to the Curio service over plain HTTP. With `DelegateTLS = true`, Curio serves HTTP (even on port 443) and delegates TLS termination to nginx, so nginx is the only component encrypting traffic. Keep this link on a trusted LAN.
* `proxy_set_header` directives: preserve client information (original host, real IP, forwarded chain, and scheme).

***

## 6️⃣ Configure Curio for DelegateTLS

On your Curio machine (for example, `192.168.1.160`), configure Curio to use **DelegateTLS** mode in the **HTTP** section of your PDP configuration layer. This tells Curio to serve HTTP on port 443 and expect nginx to handle SSL termination.

In your Curio configuration, set:

```toml
DelegateTLS = true
```

{% hint style="warning" %}
Restart Curio after making configuration changes.
{% endhint %}

***

## 7️⃣ Test Your Setup

Test the HTTPS connection:

```sh
curl -I https://YOUR_DOMAIN
```

You should see a response from your Curio service through nginx.

Check the SSL certificate:

```sh
openssl s_client -connect YOUR_DOMAIN:443 -servername YOUR_DOMAIN
```

***

## 📊 Monitoring and Logs

View nginx access logs:

```sh
sudo tail -f /var/log/nginx/YOUR_DOMAIN.access.log
```

View nginx error logs:

```sh
sudo tail -f /var/log/nginx/YOUR_DOMAIN.error.log
```

Check nginx status:

```sh
sudo systemctl status nginx
```

***

## 🛠️ Troubleshooting

**Certificate renewal fails**

* Ensure port 80 is accessible from the internet.
* Check that the `/.well-known/acme-challenge/` location is configured in the HTTP block.
* Verify the `/var/www/html` directory exists.

**Proxy connection fails**

* Verify the Curio service is running on the internal IP.
* Check that Curio is configured with `DelegateTLS = true`.
* Ensure Curio is listening on the correct port (443).
* Verify network connectivity between the nginx and Curio machines.

**502 Bad Gateway**

* The Curio service is down or not responding.
* Wrong IP address in the `proxy_pass` directive.
* Curio not configured for DelegateTLS mode.

**Configuration test fails**

```sh
sudo nginx -t
```

This will show specific syntax errors in your configuration.

***

## 🎉 Summary

* Automatic SSL/TLS certificate management via Let's Encrypt.
* HTTPS access to Curio PDP services.
* Centralised certificate management (Curio services don't handle SSL).
* Support for unlimited upload sizes (needed for sector data).
* Proper client IP forwarding to backend services.
* Automatic HTTP-to-HTTPS redirection.
* Multiple domains supported (one per Curio instance).

The key advantage is that nginx handles all SSL complexity while Curio services focus on PDP operations without needing to manage certificates.
