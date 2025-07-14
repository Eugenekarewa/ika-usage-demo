import { DWalletClient } from "@dwallet-network/dwallet.js/client";
import { SuiHTTPTransport } from "@mysten/sui/client";
import { Ed25519Keypair } from "@dwallet-network/dwallet.js/keypairs/ed25519";
import { loadOrCreateKeypair } from "./keypair";

const transport = new SuiHTTPTransport({
  url: "http://127.0.0.1:9000",
});

export const client = new DWalletClient({
  transport, 
});

export const keypair: Ed25519Keypair = loadOrCreateKeypair();
