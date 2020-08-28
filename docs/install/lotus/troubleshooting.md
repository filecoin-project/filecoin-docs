---
title: Troubleshooting Lotus installation
description: If you're having issues installing Lotus on your system, try running through some of these troubleshooting steps.
---

# Troubleshooting

If you're having trouble installing Lotus, try running through some of these troubleshooting steps. If you're still having trouble, feel free to reach out on the `#fil-help` channel in the Filecoin Slack.

## Update your operating system

This sounds simple, but a common reason users aren't able to run Filecoin is because their operating system isn't up to date.

## Check the dependencies

Lotus has several dependencies that must be installed _before_ the software can run. Run the command below for your operating system to make sure everything is installed and up-to-date.

| Operating system | Update command                                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Ubuntu           | `sudo apt update && sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl build-essential -y` |
| macOS            | `brew install go bzr jq pkg-config rustup git`                                                                             |

## Common errors

Here are some common errors users have encountered, and how to fix them.

### Go: command not found

You may encounter the following error:

```bash
bash: go: command not found
make: *** [Makefile:68: lotus] Error 127
```

This error means that you do not have Go installed properly. Run `go version` to see which version of Go you have installed. If you don't get a response, Go has not been installed correctly. If you _think_ you've already downloaded and installed Go, check that the Go binary has been added to your system PATH. You may need to reboot your machine after adding the Go binary to your system PATH. See the [Go documentation for more details](https://golang.org/doc/install#install).

### panic: qtls.ClientSessionState not compatible with tls.ClientSessionState

You may encounter the following error:

```bash
panic: qtls.ClientSessionState not compatible with tls.ClientSessionState
goroutine 1 [running]:
github.com/lucas-clemente/quic-go/internal/handshake.init.2()
	/home/infra/go/pkg/mod/github.com/lucas-clemente/quic-go@v0.17.3/internal/handshake/unsafe.go:26 +0x205
```

The current Lotus client is not compatible with Go version `1.15`. If you have Go `1.15` installed, roll back to version `1.14.7`.
