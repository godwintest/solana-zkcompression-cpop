// Type definitions for Anchor program

export interface ProgramMethods {
  initializeEvent(
    eventName: string,
    eventDescription: string,
    tokenSupply: any
  ): {
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
}

export interface ProgramAccount {
  event: {
    fetch(pubkey: any): Promise<{
      creator: any;
      eventName: string;
      eventDescription: string;
      tokenSupply: any;
      tokensClaimed: any;
      isActive: boolean;
      createdAt: any;
    }>;
  };
}

export interface Program {
  methods: ProgramMethods;
  account: ProgramAccount;
}
