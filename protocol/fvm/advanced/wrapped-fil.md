---
description: >-
  Wrapped FIL (wFIL) is an ERC-20 version of FIL. Contract addresses, how to
  wrap and unwrap, and when you need it.
---

# Wrapped FIL

**Wrapped FIL (wFIL) is an ERC-20 token that represents native FIL at a one-to-one ratio. You deposit FIL into the wFIL contract and receive the same amount of wFIL. You burn wFIL to get the FIL back.**

Native FIL isn't an ERC-20 token, so contracts and apps that expect one, such as decentralized exchanges and lending protocols, can't use it directly. wFIL fixes this. It can also be bridged to other chains. See [Cross-chain bridges](cross-chain-bridges.md).

{% hint style="danger" %}
Only use the wFIL contract addresses below. A wrong address can lose your FIL.
{% endhint %}

## Contract addresses

| Network | Address |
| --- | --- |
| Mainnet | `0x60E1773636CF5E4A227d9AC24F20fEca034ee25A` |
| Calibration | `0xaC26a4Ab9cF2A8c5DBaB6fb4351ec0F4b07356c4` |

The source code is in the [wFIL repository](https://github.com/glifio/wfil).

## Wrap and unwrap in a browser

You need FIL in a wallet such as MetaMask. See [Wallets](../../fil/wallets.md) and [Get FIL](../../fil/get-fil.md).

1. Open [Glif](https://www.glif.io/en) or [Squid](https://app.squidrouter.com/?chains=314%2C314&tokens=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee%2C0x60e1773636cf5e4a227d9ac24f20feca034ee25a) and connect your wallet.
2. Enter the amount of FIL to wrap and confirm the transaction in your wallet. The wFIL arrives in the same wallet.
3. To unwrap, use the same service to swap wFIL back to FIL. When the network confirms the transaction, the FIL returns to your wallet.

## Wrap and unwrap from a contract

Don't send FIL to the wFIL address as a plain transfer, and don't use the `METHOD_SEND` method. A bare-value send doesn't run the contract, so the FIL isn't wrapped. Always call the contract with the `InvokeEVM` method. See [Filecoin EVM runtime](../filecoin-evm-runtime.md#bare-value-sends).

### Wrap

You can wrap in two ways.

1. Call `deposit()` with the amount of FIL attached. It mints the same amount of wFIL to `msg.sender`:

   ```solidity
   function deposit() public payable virtual {
      _mint(msg.sender, msg.value);
      emit Deposit(msg.sender, msg.value);
   }
   ```

2. Send FIL to the contract with the `InvokeEVM` method. The contract's `receive()` function calls `deposit()`:

   ```solidity
   receive() external payable virtual {
      deposit();
   }
   ```

### Unwrap

Call `withdraw` with the amount of wFIL to unwrap. It burns that amount from the caller's balance and sends the same amount of FIL back to the caller:

```solidity
function withdraw(uint _amount) public virtual {
   _burn(msg.sender, _amount);
   emit Withdrawal(msg.sender, _amount);
   payable(msg.sender).sendValue(_amount);
}
```

## Related pages

* [The FIL token](../../fil/the-fil-token.md): what FIL pays for, its supply and its units.
* [FVM advanced](README.md): tools and services for FVM developers.

[Was this page helpful?](https://airtable.com/apppq4inOe4gmSSlk/pagoZHC2i1iqgphgl/form?prefill_Page+URL=https://docs.filecoin.io/protocol/fvm/advanced/wrapped-fil)
