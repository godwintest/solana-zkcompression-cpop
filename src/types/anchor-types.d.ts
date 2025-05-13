declare module '@project-serum/anchor' {
  export class BN {
    constructor(value: number | string);
    toNumber(): number;
  }

  export class Program {
    methods: {
      initializeEvent(eventName: string, eventDescription: string, tokenSupply: BN): {
        accounts(accounts: Record<string, any>): {
          signers(signers: any[]): {
            rpc(): Promise<string>;
          };
        };
      };
      claimToken(): {
        accounts(accounts: Record<string, any>): {
          signers(signers: any[]): {
            rpc(): Promise<string>;
          };
        };
      };
      deactivateEvent(): {
        accounts(accounts: Record<string, any>): {
          signers(signers: any[]): {
            rpc(): Promise<string>;
          };
        };
      };
    };
    account: {
      event: {
        fetch(pubkey: any): Promise<{
          creator: any;
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
