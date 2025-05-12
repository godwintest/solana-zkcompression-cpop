import { Connection, PublicKey, Keypair, clusterApiUrl } from '@solana/web3.js';
import { Program, AnchorProvider, web3, setProvider, Idl } from '@project-serum/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

// This would be the actual program ID in a real implementation
export const PROGRAM_ID = new PublicKey('Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS');

// This would be the actual IDL in a real implementation
export const programIdl: Idl = {
  version: '0.1.0',
  name: 'cpop_program',
  instructions: [
    {
      name: 'initializeEvent',
      accounts: [
        {
          name: 'event',
          isMut: true,
          isSigner: true
        },
        {
          name: 'creator',
          isMut: true,
          isSigner: true
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: 'eventName',
          type: 'string'
        },
        {
          name: 'eventDescription',
          type: 'string'
        },
        {
          name: 'tokenSupply',
          type: 'u64'
        }
      ]
    },
    {
      name: 'claimToken',
      accounts: [
        {
          name: 'event',
          isMut: true,
          isSigner: false
        },
        {
          name: 'claimer',
          isMut: true,
          isSigner: true
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false
        }
      ],
      args: []
    },
    {
      name: 'deactivateEvent',
      accounts: [
        {
          name: 'event',
          isMut: true,
          isSigner: false
        },
        {
          name: 'creator',
          isMut: false,
          isSigner: true
        }
      ],
      args: []
    }
  ],
  accounts: [
    {
      name: 'event',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'creator',
            type: 'publicKey'
          },
          {
            name: 'eventName',
            type: 'string'
          },
          {
            name: 'eventDescription',
            type: 'string'
          },
          {
            name: 'tokenSupply',
            type: 'u64'
          },
          {
            name: 'tokensClaimed',
            type: 'u64'
          },
          {
            name: 'isActive',
            type: 'bool'
          },
          {
            name: 'createdAt',
            type: 'i64'
          }
        ]
      }
    }
  ],
  errors: [
    {
      code: 6000,
      name: 'EventInactive',
      msg: 'Event is not active'
    },
    {
      code: 6001,
      name: 'NoTokensLeft',
      msg: 'No tokens left to claim'
    },
    {
      code: 6002,
      name: 'Unauthorized',
      msg: 'Unauthorized operation'
    }
  ]
};

/**
 * Get the Anchor provider
 * @param connection Solana connection
 * @param wallet Anchor wallet
 * @returns Anchor provider
 */
export function getProvider(connection: Connection, wallet: any) {
  const provider = new AnchorProvider(
    connection,
    wallet,
    { preflightCommitment: 'processed' }
  );
  return provider;
}

/**
 * Get the Anchor program
 * @param connection Solana connection
 * @param wallet Anchor wallet
 * @returns Anchor program
 */
export function getProgram(connection: Connection, wallet: any) {
  const provider = getProvider(connection, wallet);
  setProvider(provider);
  return new Program(programIdl, PROGRAM_ID, provider);
}

/**
 * React hook to get the Anchor program
 * @returns Anchor program or null if wallet not connected
 */
export function useProgram() {
  const wallet = useAnchorWallet();
  
  if (!wallet) {
    return null;
  }
  
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  return getProgram(connection, wallet);
}
