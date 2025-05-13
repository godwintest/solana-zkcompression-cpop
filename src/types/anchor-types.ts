export type IdlAccount = {
  name: string;
  isMut: boolean;
  isSigner: boolean;
};

export type IdlArg = {
  name: string;
  type: string;
};

export type IdlInstruction = {
  name: string;
  accounts: IdlAccount[];
  args: IdlArg[];
};

export type IdlField = {
  name: string;
  type: string;
};

export type IdlTypeDefinition = {
  kind: 'struct';
  fields: IdlField[];
};

export type IdlAccountDefinition = {
  name: string;
  type: IdlTypeDefinition;
};

export type IdlError = {
  code: number;
  name: string;
  msg: string;
};

export type Idl = {
  version: string;
  name: string;
  instructions: IdlInstruction[];
  accounts: IdlAccountDefinition[];
  errors: IdlError[];
};
