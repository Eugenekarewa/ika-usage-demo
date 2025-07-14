import { loadOrCreateKeypair } from "./keypair";
import { client } from "./dwallet";
import { createWallet } from "./createWallet";

async function main() {
  const keypair = loadOrCreateKeypair();
  console.log("🔑 Sui Address:", keypair.getPublicKey().toSuiAddress());

  const dkg = await createWallet(keypair, client);
}

main().catch(console.error);
