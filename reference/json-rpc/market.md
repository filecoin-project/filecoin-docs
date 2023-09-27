## Market

### MarketAddBalance

MarketAddBalance adds funds to the market actor

Perms: sign

Inputs:

```json
["f01234", "f01234", "0"]
```

Response:

```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### MarketGetReserved

MarketGetReserved gets the amount of funds that are currently reserved for the address

Perms: sign

Inputs:

```json
["f01234"]
```

Response: `"0"`

### MarketReleaseFunds

MarketReleaseFunds releases funds reserved by MarketReserveFunds

Perms: sign

Inputs:

```json
["f01234", "0"]
```

Response: `{}`

### MarketReserveFunds

MarketReserveFunds reserves funds for a deal

Perms: sign

Inputs:

```json
["f01234", "f01234", "0"]
```

Response:

```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```

### MarketWithdraw

MarketWithdraw withdraws unlocked funds from the market actor

Perms: sign

Inputs:

```json
["f01234", "f01234", "0"]
```

Response:

```json
{
  "/": "bafy2bzacea3wsdh6y3a36tb3skempjoxqpuyompjbmfeyf34fi3uy6uue42v4"
}
```
