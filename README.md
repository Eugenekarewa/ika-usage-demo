# Decentralized Wallet Creation Project

## Overview
This project is a TypeScript-based decentralized wallet creation tool built on the DWallet network and the Sui blockchain. It leverages cryptographic keypair management, encryption key generation, and multi-party computation (MPC) to create a secure decentralized wallet (dWallet).

The project connects to a local Sui node and performs decentralized key generation (DKG) to create and manage wallet keys securely.

## Features
- Load or create Ed25519 keypairs and persist them locally.
- Connect to a local Sui blockchain node via HTTP transport.
- Create encryption keys tied to on-chain state.
- Perform decentralized key generation (DKG) using MPC to create a dWallet.
- Log detailed wallet creation outputs including wallet ID, secret shares, and capability IDs.

## Installation and Setup

### Prerequisites
- Node.js and npm installed.
- A local Sui blockchain node running and accessible at `http://127.0.0.1:9000`.
- The `@dwallet-network/dwallet.js` and `@mysten/sui` packages installed (see `package.json`).

### Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Ensure the local Sui node is running at the configured URL.
4. Replace the placeholder `ACTIVE_ENCRYPTION_KEYS_TABLE_ID` in `src/encryption.ts` with your actual on-chain table object ID (a valid Sui Object ID).

## Project Structure and Modules

### `src/index.ts`
- Entry point of the application.
- Loads or creates a keypair.
- Logs the Sui address derived from the keypair.
- Calls the wallet creation function to create a dWallet.

### `src/keypair.ts`
- Manages Ed25519 keypairs.
- Loads an existing keypair from `keypair.json` if available.
- Supports secret keys in hex or base64 format.
- Creates and saves a new keypair if none exists.

### `src/dwallet.ts`
- Sets up the `DWalletClient` using `SuiHTTPTransport` pointing to the local Sui node.
- Exports the client and the loaded/created keypair for use in other modules.

### `src/createWallet.ts`
- Contains the `createWallet` async function.
- Creates an encryption key using the client and keypair.
- Calls `createDWallet` from the DWallet MPC library to perform decentralized key generation.
- Logs detailed information about the created dWallet including IDs and secret shares.

### `src/encryption.ts`
- Manages encryption keys using the DWallet MPC library.
- Exports `createEncryptionKey` which calls `getOrCreateEncryptionKey` with the client, keypair, and on-chain table ID.
- **Important:** Replace the placeholder `ACTIVE_ENCRYPTION_KEYS_TABLE_ID` with your actual on-chain table object ID.

## Usage Example

The main function in `src/index.ts` demonstrates typical usage:

```typescript
import { loadOrCreateKeypair } from "./keypair";
import { client } from "./dwallet";
import { createWallet } from "./createWallet";

async function main() {
  const keypair = loadOrCreateKeypair();
  console.log("🔑 Sui Address:", keypair.getPublicKey().toSuiAddress());

  const dkg = await createWallet(keypair, client);
}

main().catch(console.error);
```

## Notes
- The project logs key information during wallet creation for debugging and verification.
- Ensure the local Sui node is running and accessible before running the project.
- The encryption key management depends on an on-chain table object ID that must be set correctly.

## Extending the Project
- Add support for other keypair types or blockchain networks.
- Implement wallet transaction signing and broadcasting.
- Integrate with front-end applications for user interaction.

---

This documentation provides a comprehensive overview of the project, its modules, and usage to help developers understand and work with the decentralized wallet creation tool.
