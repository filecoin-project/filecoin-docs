#!/usr/bin/env node

const DEFAULT_TIMEOUT_MS = Number(process.env.RPC_CHECK_TIMEOUT_MS ?? 8000);

const endpoints = [
  {
    network: "Filecoin mainnet",
    source: "networks-and-tools/networks/mainnet/rpcs.md",
    url: "https://api.node.glif.io/rpc/v1",
  },
  {
    network: "Filecoin mainnet",
    source: "networks-and-tools/networks/mainnet/rpcs.md",
    url: "wss://wss.node.glif.io/apigw/lotus/rpc/v1",
  },
  {
    network: "Filecoin mainnet lite-node",
    source: "networks-and-tools/networks/mainnet/rpcs.md",
    url: "wss://wss.node.glif.io/apigw/lotus",
    expected: "lotus-lite",
    note: "Used as FULLNODE_API_INFO for Lotus lite nodes, not as a direct JSON-RPC URL.",
  },
  {
    network: "Filecoin mainnet",
    source: "networks-and-tools/networks/mainnet/rpcs.md",
    url: "https://rpc.ankr.com/filecoin",
  },
  {
    network: "Filecoin mainnet",
    source: "networks-and-tools/networks/mainnet/rpcs.md",
    url: "https://filecoin.chainup.net/rpc/v1",
  },
  {
    network: "Filecoin mainnet",
    source: "networks-and-tools/networks/mainnet/rpcs.md",
    url: "wss://filecoin.chainup.net/rpc/v1",
  },
  {
    network: "Filecoin mainnet",
    source: "networks-and-tools/networks/mainnet/rpcs.md",
    url: "https://fil.nownodes.io",
    expected: "auth",
    note: "Docs say signup/API access may be required.",
  },
  {
    network: "Filecoin mainnet",
    source: "networks-and-tools/networks/mainnet/rpcs.md",
    url: "https://filecoin.lava.build",
  },
  {
    network: "Filecoin Calibration",
    source: "networks-and-tools/networks/calibration/rpcs.md",
    url: "https://rpc.ankr.com/filecoin_testnet",
  },
  {
    network: "Filecoin Calibration",
    source: "networks-and-tools/networks/calibration/rpcs.md",
    url: "https://api.calibration.node.glif.io/rpc/v1",
  },
  {
    network: "Filecoin Calibration",
    source: "networks-and-tools/networks/calibration/rpcs.md",
    url: "wss://wss.calibration.node.glif.io/apigw/lotus/rpc/v1",
  },
  {
    network: "Filecoin Calibration lite-node",
    source: "networks-and-tools/networks/calibration/rpcs.md",
    url: "wss://wss.calibration.node.glif.io/apigw/lotus",
    expected: "lotus-lite",
    note: "Used as FULLNODE_API_INFO for Lotus lite nodes, not as a direct JSON-RPC URL.",
  },
  {
    network: "Local Lotus",
    source: "reference/exchanges/exchange-integration.md",
    url: "http://127.0.0.1:1234/rpc/v0",
    expected: "local",
    note: "Expected to fail unless a local node is running.",
  },
  {
    network: "Local Filecoin EVM testnet",
    source: "networks-and-tools/assets/metamask-setup.md",
    url: "http://localhost:1234/rpc/v1",
    expected: "local",
    note: "Expected to fail unless a local node is running.",
  },
  {
    network: "Base Sepolia",
    source: "build/cookbook/filecoin-pin/erc-8004-agent-registration.md",
    url: "https://sepolia.base.org",
    note: "Non-Filecoin RPC used by Filecoin Pin docs.",
  },
];

const rpcMethods = [
  ["eth_chainId", []],
  ["eth_blockNumber", []],
  ["Filecoin.ChainHead", []],
  ["Filecoin.StateNetworkName", []],
  ["Filecoin.Version", []],
];

function usage() {
  console.log(`Usage: node scripts/check-rpc-endpoints.mjs [--json] [--timeout-ms N]

Checks the RPC endpoints currently referenced by the docs and reports whether
each endpoint responds to Ethereum JSON-RPC and/or Filecoin JSON-RPC probes.
`);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = { json: false, timeoutMs: DEFAULT_TIMEOUT_MS };
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--help" || arg === "-h") {
      usage();
      process.exit(0);
    }
    if (arg === "--json") {
      options.json = true;
      continue;
    }
    if (arg === "--timeout-ms") {
      options.timeoutMs = Number(args[i + 1]);
      i += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

function withTimeout(promise, timeoutMs, onTimeout) {
  let timer;
  return Promise.race([
    promise.finally(() => clearTimeout(timer)),
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(onTimeout()), timeoutMs);
    }),
  ]);
}

async function probeHttp(url, method, params, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
      signal: controller.signal,
    });
    const text = await response.text();
    let body;
    try {
      body = JSON.parse(text);
    } catch {
      body = { parseError: text.slice(0, 240) };
    }
    return normalizeRpcResponse(response.status, body);
  } catch (error) {
    return { ok: false, transportError: error.message };
  } finally {
    clearTimeout(timer);
  }
}

async function probeWebSocket(url, method, params, timeoutMs) {
  if (typeof WebSocket !== "function") {
    return { ok: false, transportError: "global WebSocket is unavailable in this Node runtime" };
  }

  return withTimeout(
    new Promise((resolve) => {
      const ws = new WebSocket(url);
      let settled = false;
      const finish = (result) => {
        if (settled) return;
        settled = true;
        try {
          ws.close();
        } catch {
          // Ignore close errors after failed handshakes.
        }
        resolve(result);
      };

      ws.addEventListener("open", () => {
        ws.send(JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }));
      });
      ws.addEventListener("message", (event) => {
        let body;
        try {
          body = JSON.parse(String(event.data));
        } catch {
          body = { parseError: String(event.data).slice(0, 240) };
        }
        finish(normalizeRpcResponse(101, body));
      });
      ws.addEventListener("error", () => {
        finish({ ok: false, transportError: "websocket error" });
      });
      ws.addEventListener("close", (event) => {
        finish({ ok: false, transportError: `websocket closed before response (${event.code})` });
      });
    }),
    timeoutMs,
    () => new Error("websocket timeout"),
  ).catch((error) => ({ ok: false, transportError: error.message }));
}

function normalizeRpcResponse(status, body) {
  if (body?.error) {
    return {
      ok: false,
      status,
      rpcError: body.error.message ?? JSON.stringify(body.error),
      code: body.error.code,
    };
  }
  if (Object.hasOwn(body ?? {}, "result")) {
    return { ok: true, status, result: body.result };
  }
  return { ok: false, status, rpcError: body?.parseError ?? "missing JSON-RPC result" };
}

function hexToNumber(value) {
  if (typeof value !== "string" || !value.startsWith("0x")) return undefined;
  return Number.parseInt(value, 16);
}

function summarizeMethod(method, response) {
  if (!response.ok) return response;
  if (method === "eth_chainId") {
    return { ...response, chainId: hexToNumber(response.result), raw: response.result };
  }
  if (method === "eth_blockNumber") {
    return { ...response, height: hexToNumber(response.result), raw: response.result };
  }
  if (method === "Filecoin.ChainHead") {
    return {
      ...response,
      height: response.result?.Height,
      cids: response.result?.Cids?.map((cid) => cid["/"]) ?? [],
    };
  }
  return response;
}

async function probeEndpoint(endpoint, timeoutMs) {
  const protocol = new URL(endpoint.url).protocol;
  const transport = protocol === "wss:" || protocol === "ws:" ? "websocket" : "http";
  const methodResults = await Promise.all(
    rpcMethods.map(async ([method, params]) => {
    const response =
      transport === "websocket"
        ? await probeWebSocket(endpoint.url, method, params, timeoutMs)
        : await probeHttp(endpoint.url, method, params, timeoutMs);
      return [method, summarizeMethod(method, response)];
    }),
  );
  const methods = Object.fromEntries(methodResults);

  const ethOk = methods.eth_chainId?.ok || methods.eth_blockNumber?.ok;
  const filecoinOk = methods["Filecoin.ChainHead"]?.ok || methods["Filecoin.StateNetworkName"]?.ok;
  const valid = Boolean(ethOk || filecoinOk);
  return {
    ...endpoint,
    transport,
    valid,
    ethOk,
    filecoinOk,
    chainId: methods.eth_chainId?.chainId,
    ethHeight: methods.eth_blockNumber?.height,
    filecoinHeight: methods["Filecoin.ChainHead"]?.height,
    networkName: methods["Filecoin.StateNetworkName"]?.result,
    version: methods["Filecoin.Version"]?.result,
    methods,
  };
}

function statusLabel(result) {
  if (result.valid) return "OK";
  if (result.expected === "auth") return "AUTH";
  if (result.expected === "local") return "LOCAL";
  if (result.expected === "lotus-lite") return "LITE";
  return "FAIL";
}

function compactError(result) {
  const errors = Object.entries(result.methods)
    .filter(([, response]) => !response.ok)
    .map(([method, response]) => `${method}: ${response.transportError ?? response.rpcError}`);
  return errors.slice(0, 2).join("; ");
}

function printTable(results) {
  for (const result of results) {
    const parts = [
      `[${statusLabel(result)}] ${result.url}`,
      `  source: ${result.source}`,
      `  network: ${result.network}`,
      `  support: eth=${Boolean(result.ethOk)} filecoin=${Boolean(result.filecoinOk)}`,
    ];
    if (result.chainId !== undefined) parts.push(`  chainId: ${result.chainId}`);
    if (result.ethHeight !== undefined) parts.push(`  eth_blockNumber: ${result.ethHeight}`);
    if (result.filecoinHeight !== undefined) parts.push(`  Filecoin.ChainHead height: ${result.filecoinHeight}`);
    if (result.networkName) parts.push(`  Filecoin.StateNetworkName: ${result.networkName}`);
    if (result.version) parts.push(`  Filecoin.Version: ${JSON.stringify(result.version)}`);
    if (result.note) parts.push(`  note: ${result.note}`);
    if (!result.valid) parts.push(`  errors: ${compactError(result)}`);
    console.log(parts.join("\n"));
    console.log("");
  }
}

const options = parseArgs();
const results = await Promise.all(endpoints.map((endpoint) => probeEndpoint(endpoint, options.timeoutMs)));

if (options.json) {
  console.log(JSON.stringify(results, null, 2));
} else {
  printTable(results);
  const checkable = results.filter((result) => !result.expected);
  const ok = checkable.filter((result) => result.valid).length;
  const expected = results.length - checkable.length;
  console.log(`Summary: ${ok}/${checkable.length} direct public endpoints responded to at least one RPC probe; ${expected} endpoints are auth-required, local-only, or lite-node connection strings.`);
}

process.exitCode = results.some((result) => !result.valid && !result.expected) ? 1 : 0;
