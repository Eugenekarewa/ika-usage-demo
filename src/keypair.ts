import { Ed25519Keypair } from "@dwallet-network/dwallet.js/keypairs/ed25519";
import fs from "fs";
import path from "path";

const KEYPAIR_PATH = path.join(__dirname, "..", "keypair.json");

function hexToBytes(hex: string): Uint8Array {
  if (hex.startsWith("0x")) hex = hex.slice(2);
  return new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
}

function base64ToBytes(base64: string): Uint8Array {
  const binaryString = Buffer.from(base64, 'base64').toString('binary');
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function loadOrCreateKeypair(): Ed25519Keypair {
  if (fs.existsSync(KEYPAIR_PATH)) {
    const json = JSON.parse(fs.readFileSync(KEYPAIR_PATH, "utf8"));

    if (!json.secretKeyHex || typeof json.secretKeyHex !== "string") {
      throw new Error("❌ 'secretKeyHex' missing or invalid in keypair.json");
    }

    let secretKeyBytes: Uint8Array;
    // Detect if the string is base64 (contains non-hex characters)
    if (/^[0-9a-fA-F]+$/.test(json.secretKeyHex.replace(/^0x/, ''))) {
      secretKeyBytes = hexToBytes(json.secretKeyHex);
    } else {
      secretKeyBytes = base64ToBytes(json.secretKeyHex);
    }

    return Ed25519Keypair.fromSecretKey(secretKeyBytes);
  }

  const keypair = new Ed25519Keypair();
  const exported = keypair.export(); // contains privateKeyHex

  fs.writeFileSync(
    KEYPAIR_PATH,
    JSON.stringify({ secretKeyHex: exported.privateKey }, null, 2)
  );

  const secretKeyBytes = hexToBytes(exported.privateKey);
  return Ed25519Keypair.fromSecretKey(secretKeyBytes);
}
