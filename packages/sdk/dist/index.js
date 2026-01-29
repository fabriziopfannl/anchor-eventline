// src/decode.ts
function decodeEventLogs(logs, registry) {
  const out = [];
  for (const log of logs) {
    for (const [name, def] of Object.entries(registry)) {
      if (log.includes(name)) {
        try {
          const payload = extractBase64Payload(log);
          const data = def.decoder(payload);
          out.push({ name, version: def.version, data, raw: log });
        } catch {
          continue;
        }
      }
    }
  }
  return out;
}
function extractBase64Payload(log) {
  const parts = log.split(" ");
  const b64 = parts[parts.length - 1];
  const buf = Buffer.from(b64, "base64");
  return new Uint8Array(buf);
}
export {
  decodeEventLogs
};
