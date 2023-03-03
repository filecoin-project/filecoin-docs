---
title: "Libraries"
description: "Libraries, software development kits (SDKs), and API clients exist to speed up the development of software on top of the Filecoin network. These assets provide a set of tools and resources that are tailored to Filecoin development, making it easier for developers to create high-quality applications quickly and efficiently."
lead: "Libraries, software development kits (SDKs), and API clients exist to speed up the development of software on top of the Filecoin network. These assets provide a set of tools and resources that are tailored to Filecoin development, making it easier for developers to create high-quality applications quickly and efficiently. The following libraries are currently available "
draft: false
images: []
type: docs
menu:
  developers:
    identifier: "libraries-c53694e3311ab167496470d05062d7d9"
weight: 230
toc: true
aliases:
    - "/build/tools/signing-libraries/"
---

{{< beta-warning >}}

## Zondax 

Zondax provides the [Filecoin Solidity npm package](#filecoin-solidity) and the [FEVM Precompiles library](#fevm-precompiles).

## Filecoin.sol

{{< alert >}}
The Filecoin Solidity project is [currently in beta](https://docs.zondax.ch/fevm/filecoin-solidity#disclaimer-%EF%B8%8F%EF%B8%8F).
{{< /alert >}}

_Filecoin.sol_ provides a set of libraries that allows Solidity smart contracts to seamlessly call built-in actors methods. Additionally, a set of mock libraries that respond to specific scenarios is available. The scenarios are based on the received parameters instead of real calls. For further information, including information on how to use the package, see the [official documentation](https://docs.zondax.ch/fevm/filecoin-solidity/).

#### FEVM Precompiles

The FEVM Precompiles library provides a set of Solidity-compatible tools and libraries to enable Ethereum developers to develop Filecoin applications in the FVM Early Builder program. For further information, see the [GitHub repository](https://github.com/Zondax/fevm-solidity-precompiles/tree/main/docs/fevm-solidity-precompiles).