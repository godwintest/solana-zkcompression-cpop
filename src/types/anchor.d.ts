declare module '@project-serum/anchor' {
  export class BN {
    constructor(value: string | number | BN);
    toNumber(): number;
    toString(): string;
    toJSON(): string;
    toBuffer(): Buffer;
    toArrayLike(ArrayType: any, endian?: string, length?: number): any;
  }

  export interface AnchorProvider {
    connection: any;
    wallet: any;
    opts: any;
  }

  export interface Program<IDL = any> {
    programId: any;
    provider: AnchorProvider;
    idl: IDL;
    coder: any;
    methods: any;
    account: any;
    rpc: any;
    instruction: any;
    transaction: any;
    simulate: any;
    addEventListener: any;
    removeEventListener: any;
  }
}
