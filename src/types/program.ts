import { PublicKey } from '@solana/web3.js';
import { BN, Program as AnchorProgram } from '@project-serum/anchor';

export interface ProgramMethods {
  initializeEvent(
    eventName: string,
    eventDescription: string,
    tokenSupply: any
  ): any;

  claimToken(eventPubkey: any): any;

  deactivateEvent(eventPubkey: any): any;
}

export interface ProgramAccount {
  publicKey: any;
  account: any;
}

export interface Event {
  publicKey: any;
  account: {
    authority: any;
    name: string;
    description: string;
    active: boolean;
    tokenSupply: any;
    tokensClaimed: any;
    bump: any;
  };
}

export interface Program {
  publicKey: any;
  provider: any;
  methods: ProgramMethods;
  account: {
    event: {
      fetch(publicKey: any): Promise<any>;
      all(): Promise<Event[]>;
    };
  };
}

export type AnchorProgram = any;

export interface Program {
  publicKey: any;
  provider: any;
  methods: ProgramMethods;
  account: {
    event: {
      fetch(publicKey: any): Promise<any>;
      all(): Promise<Event[]>;
    };
  };
}
