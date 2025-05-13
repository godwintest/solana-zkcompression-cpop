export type Connection = {
  getBalance(publicKey: string | Uint8Array): Promise<number>;
  getLatestBlockhash(): Promise<{ blockhash: string; lastValidBlockHeight: number }>;
  // Add other methods as needed
};

export type PublicKey = {
  toBase58(): string;
  toBytes(): Uint8Array;
  equals(other: PublicKey): boolean;
  // Add other methods as needed
};

export type Keypair = {
  publicKey: PublicKey;
  secretKey: Uint8Array;
  // Add other methods as needed
};
