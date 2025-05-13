declare module '@solana/web3.js' {
  export class PublicKey {
    constructor(value: string);
    toBase58(): string;
    equals(other: PublicKey): boolean;
    toBytes(): Uint8Array;
  }

  export class Keypair {
    static generate(): Keypair;
    publicKey: PublicKey;
    secretKey: Uint8Array;
  }
}

declare module '@project-serum/anchor' {
  import { PublicKey } from '@solana/web3.js';

  export class BN {
    constructor(value: number | string);
    toNumber(): number;
  }

  export interface Program {
    methods: {
      initializeEvent(eventName: string, eventDescription: string, tokenSupply: BN): {
        accounts(accounts: Record<string, PublicKey>): {
          signers(signers: any[]): {
            rpc(): Promise<string>;
          };
        };
      };
      claimToken(): {
        accounts(accounts: Record<string, PublicKey>): {
          signers(signers: any[]): {
            rpc(): Promise<string>;
          };
        };
      };
      deactivateEvent(): {
        accounts(accounts: Record<string, PublicKey>): {
          signers(signers: any[]): {
            rpc(): Promise<string>;
          };
        };
      };
    };
    account: {
      event: {
        fetch(pubkey: PublicKey): Promise<{
          creator: PublicKey;
          eventName: string;
          eventDescription: string;
          tokenSupply: BN;
          tokensClaimed: BN;
          isActive: boolean;
          createdAt: BN;
        }>;
      };
    };
  }
}
