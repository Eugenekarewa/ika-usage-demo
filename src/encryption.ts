import { getOrCreateEncryptionKey } from "@dwallet-network/dwallet.js/signature-mpc";
import { Ed25519Keypair } from "@dwallet-network/dwallet.js/keypairs/ed25519";
import { DWalletClient } from "@dwallet-network/dwallet.js/client";

const ACTIVE_ENCRYPTION_KEYS_TABLE_ID = "0x65e7d6e97af1eb41e8666cf8c0c9064f942dc45c03ca157c79f45f3e9a9d09aa "; // <-- REPLACE this placeholder with your actual on-chain table object ID (a valid Sui Object ID)

export async function createEncryptionKey(
  client: DWalletClient,
  keypair: Ed25519Keypair
) {
  return getOrCreateEncryptionKey(keypair, client, ACTIVE_ENCRYPTION_KEYS_TABLE_ID);
}
