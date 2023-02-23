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

### Filecoin Solidity

The _Filecoin Solidity_ npm package provides a set of Solidity libraries that allows Solidity smart contracts to seamlessly call Filecoin built-in actors methods, and perform cross-platform calls to the real Filecoin built-in actors. Additionally, a set of mock libraries that respond to specific scenarios is available. The scenarios are based on the received parameters instead of real calls. For further, information, see the [official npm page](https://www.npmjs.com/package/@zondax/filecoin-solidity) and the [GitHub repository](https://github.com/Zondax/filecoin-solidity).

#### FEVM Precompiles

The FEVM Precompiles library provides a set of Solidity-compatible tools and libraries to enable Ethereum developers to develop Filecoin applications in the FVM Early Builder program. For further information, see the [GitHub repository](https://github.com/Zondax/fevm-solidity-precompiles/tree/main/docs/fevm-solidity-precompiles).