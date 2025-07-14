import { createDWallet } from "@dwallet-network/dwallet.js/signature-mpc";
import { DWalletClient } from "@dwallet-network/dwallet.js/client";
import { Ed25519Keypair } from "@dwallet-network/dwallet.js/keypairs/ed25519";
import { createEncryptionKey } from "./encryption";

export async function createWallet(keypair: Ed25519Keypair, client: DWalletClient) {
  const encryption = await createEncryptionKey(client, keypair);

  const dkg = await createDWallet(
    keypair,
    client,
    encryption.encryptionKey,
    encryption.objectID
  );

  if (!dkg) throw new Error("❌ Failed to create dWallet. DKG is null.");

  console.log("✅ dWallet Created");
  console.log("🔑 dWallet ID:", dkg.dwalletID);
  console.log("🔐 User Secret Share:", dkg.secretKeyShare);
  console.log("🔏 Encrypted Secret Share ID:", dkg.encryptedSecretShareObjID);
  console.log("🧠 Centralized DKG Output:", dkg.centralizedDKGOutput);
  console.log("🌐 Decentralized DKG Output:", dkg.decentralizedDKGOutput);
  console.log("🧾 Capability ID:", dkg.dwalletCapID);

  return dkg;
}
