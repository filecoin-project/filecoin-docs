---
title: Troubleshooting Lotus installation
description: If you're having issues installing Lotus, try running through some of these troubleshooting steps.
---

# Troubleshooting

If you're having trouble installing Lotus, try running through some of these troubleshooting steps. If you're still having trouble, feel free to reach out on the `#fil-help` channel in the Filecoin Slack.

## Check the dependencies

Lotus has several dependencies that must be installed _before_ the software can run. Check the [Install](../) instructions and re-run the "Install Dependencies" step for your operating system (Ubuntu, MacOS, Arch, or Fedora) to confirm that all dependencies are installed and up-to-date.

## Common errors

Here are some common errors users have encountered, and how to fix them.

### Go: command not found

You may encounter the following error:

```bash
bash: go: command not found
make: *** [Makefile:68: lotus] Error 127
```

Run `go version`, which should return the version number for Go. If you don't get a response, Go has not been installed correctly. 

If you _think_ you've already installed Go, remember that Go also requires you to specify a workspace in a separate location from where Go itself is installed. For example, if you have installed Go in `/usr/local/go`, remember to set your $PATH correctly to include `/usr/local/go/bin`. You may need to reboot your machine after setting the $PATH. See the [Go documentation for more details](https://golang.org/doc/install#install).

### panic: qtls.ClientSessionState not compatible with tls.ClientSessionState

When running lotus, you may encounter the following error:

```bash
panic: qtls.ClientSessionState not compatible with tls.ClientSessionState
goroutine 1 [running]:
github.com/lucas-clemente/quic-go/internal/handshake.init.2()
	/home/infra/go/pkg/mod/github.com/lucas-clemente/quic-go@v0.17.3/internal/handshake/unsafe.go:26 +0x205
```

The current Lotus client is not compatible with Go version `1.15`. If you have Go `1.15` installed, roll back to version `1.14.7` and rebuild.
