"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  decodeEventLogs: () => decodeEventLogs
});
module.exports = __toCommonJS(src_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  decodeEventLogs
});
