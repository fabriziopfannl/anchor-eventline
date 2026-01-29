import { Connection } from "@solana/web3.js";
import { decodeEventLogs } from "@eventline/anchor-events";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const signature = process.argv[2];

if (!signature) {
  console.error("Usage: ts-node src/decode_from_signature.ts <txid>");
  process.exit(1);
}

(async () => {
  const tx = await connection.getTransaction(signature, {
    maxSupportedTransactionVersion: 0,
  });
  if (!tx?.meta?.logMessages) {
    console.error("No logs found");
    return;
  }

  const registry = {
    SwapEvent: { version: 1, decoder: (buf: Uint8Array) => ({ raw: buf }) },
    DepositEvent: { version: 1, decoder: (buf: Uint8Array) => ({ raw: buf }) },
  };

  const events = decodeEventLogs(tx.meta.logMessages, registry);
  console.log(events);
})();
