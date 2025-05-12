declare module '@solana/web3.js' {
  export class Connection {
    constructor(endpoint: string, commitment?: string);
    getBalance(publicKey: PublicKey): Promise<number>;
    // Add other methods as needed
  }

  export class PublicKey {
    constructor(value: string | number[] | Buffer | Uint8Array);
    toBase58(): string;
    toBuffer(): Buffer;
    equals(publicKey: PublicKey): boolean;
    // Add other methods as needed
  }

  export class Keypair {
    constructor();
    static generate(): Keypair;
    publicKey: PublicKey;
    secretKey: Uint8Array;
    // Add other methods as needed
  }
}
