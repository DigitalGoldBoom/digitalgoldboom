// On-chain truth for the NATG token.
//
// The NATG supply is the ONE number on this site that cannot be argued with:
// it is read straight from the Ethereum mainnet contract, not from a press
// release. NatGold's own July 9 2026 release states an aggregate of 106,800
// NATG minted (57,200 Cahuilla + 49,600 Friday). The contract reports 106,799.
// The chain wins — always. That discrepancy is disclosed on /projects rather
// than silently reconciled.
//
// Contract: 0x59c323346F4f62aE18289F346501389392cf5939 (ERC-20, symbol NATG)

import type { LiveValue } from './sources';

export const NATG_CONTRACT = '0x59c323346F4f62aE18289F346501389392cf5939';
export const NATG_ETHERSCAN_URL = `https://etherscan.io/address/${NATG_CONTRACT}`;

/** ERC-20 function selectors (first 4 bytes of keccak256 of the signature). */
const SELECTOR_TOTAL_SUPPLY = '0x18160ddd';
const SELECTOR_DECIMALS = '0x313ce567';

/**
 * Public no-auth Ethereum JSON-RPC endpoints, tried in order. Set ETH_RPC_URL
 * to put a private/paid endpoint (Alchemy, Infura, QuickNode) at the front —
 * recommended once traffic grows, since public endpoints rate-limit.
 */
const RPC_ENDPOINTS = [
  process.env.ETH_RPC_URL,
  'https://ethereum-rpc.publicnode.com',
  'https://eth.drpc.org',
  'https://rpc.ankr.com/eth',
].filter((u): u is string => typeof u === 'string' && u.length > 0);

const RPC_TIMEOUT_MS = 6_000;

/**
 * Last-known on-chain supply, read from the contract 2026-07-14 and held as the
 * fallback if every RPC endpoint is unreachable. This is a VERIFIED capture of
 * a real chain read, not an estimate — but it is served flagged `stale: true`
 * so the UI can say so.
 */
const NATG_SUPPLY_FALLBACK = 106_799;
const NATG_SUPPLY_FALLBACK_AT = '2026-07-14T00:00:00Z';

type JsonRpcResponse = {
  result?: string;
  error?: { message?: string };
};

async function ethCall(rpcUrl: string, data: string): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), RPC_TIMEOUT_MS);
  try {
    const res = await fetch(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_call',
        params: [{ to: NATG_CONTRACT, data }, 'latest'],
      }),
      signal: controller.signal,
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`rpc ${res.status}`);
    const json = (await res.json()) as JsonRpcResponse;
    if (json.error) throw new Error(json.error.message ?? 'rpc error');
    if (!json.result || json.result === '0x') throw new Error('rpc empty result');
    return json.result;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Total NATG minted, read live from the Ethereum contract's totalSupply().
 * Tries each RPC endpoint in turn; falls back to the last verified chain read
 * (flagged stale) only if every endpoint fails.
 */
export async function fetchNatgSupply(): Promise<LiveValue> {
  for (const rpcUrl of RPC_ENDPOINTS) {
    try {
      const [supplyHex, decimalsHex] = await Promise.all([
        ethCall(rpcUrl, SELECTOR_TOTAL_SUPPLY),
        ethCall(rpcUrl, SELECTOR_DECIMALS).catch(() => '0x12'), // default 18
      ]);

      const rawSupply = BigInt(supplyHex);
      const decimals = Number(BigInt(decimalsHex));
      if (!Number.isFinite(decimals) || decimals < 0 || decimals > 36) {
        throw new Error(`implausible decimals: ${decimals}`);
      }

      // Divide in BigInt space — Number() on the raw wei value would lose
      // precision. (BigInt(10) rather than a 10n literal: the TS target predates
      // ES2020 BigInt literals.)
      const divisor = BigInt(10) ** BigInt(decimals);
      const whole = Number(rawSupply / divisor);
      const fraction = Number(rawSupply % divisor) / Number(divisor);
      const value = whole + fraction;

      if (!Number.isFinite(value) || value <= 0) throw new Error('supply parse failed');

      return {
        value,
        unit: 'NATG',
        updatedAt: new Date().toISOString(),
        source: 'Ethereum mainnet — NATG contract totalSupply()',
        meta: {
          contract: NATG_CONTRACT,
          etherscan: NATG_ETHERSCAN_URL,
          decimals,
          rpc: new URL(rpcUrl).host,
        },
      };
    } catch {
      // Try the next endpoint.
    }
  }

  return {
    value: NATG_SUPPLY_FALLBACK,
    unit: 'NATG',
    updatedAt: NATG_SUPPLY_FALLBACK_AT,
    source: 'NATG contract (last verified read — all RPC endpoints unreachable)',
    stale: true,
    meta: {
      contract: NATG_CONTRACT,
      etherscan: NATG_ETHERSCAN_URL,
    },
  };
}
