---
title: Troubleshooting Lotus installation
description: If you're having issues install Lotus on your system, try running through some of these troubleshooting steps.
---

# Troubleshooting

If you're having trouble installing Lotus, try running through some of these troubleshooting steps. If you're still having trouble, feel free to reach out to the team on the `#fil-help` channel in the Filecoin Slack.

## Update your system

This sounds simple, but a common reason users aren't able to run Filecoin is because their system isn't up to date.

## Check the dependencies

Lotus has several dependencies that need to be installed and working _before_ the software can run. Run the command below for your operating system to make sure everything is installed and up-to-date.

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
