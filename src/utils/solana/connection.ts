import { Connection, clusterApiUrl, PublicKey, Commitment } from '@solana/web3.js';
import { AnchorProvider, Wallet as AnchorWallet } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';

// Use devnet for development
export const SOLANA_NETWORK = 'devnet';
export const SOLANA_ENDPOINT = clusterApiUrl(SOLANA_NETWORK);

// Connection options
export const commitment: Commitment = 'confirmed';
export const connectionConfig = {
  commitment,
  confirmTransactionInitialTimeout: 60000,
};

// Create a connection to the Solana cluster
export const connection = new Connection(SOLANA_ENDPOINT, connectionConfig);

// Get the provider from the wallet adapter
export const getProvider = (wallet: any) => {
  if (!wallet.publicKey) throw new Error('Wallet not connected');
  
  // Create an adapter that works with AnchorProvider
  const walletAdapter: AnchorWallet = {
    publicKey: wallet.publicKey,
    signTransaction: wallet.signTransaction,
    signAllTransactions: wallet.signAllTransactions as any,
    // Type cast to any to avoid TypeScript errors
    payer: wallet.payer as any,
  };
  
  const provider = new AnchorProvider(
    connection,
    walletAdapter,
    { preflightCommitment: commitment }
  );
  
  return provider;
};

// Create a provider from a wallet object (not a hook)
export const createAnchorProvider = (wallet: any) => {
  if (!wallet.publicKey || !wallet.signTransaction) {
    return null;
  }
  
  // Create a wallet adapter that works with AnchorProvider
  const walletAdapter: AnchorWallet = {
    publicKey: wallet.publicKey,
    signTransaction: wallet.signTransaction,
    signAllTransactions: wallet.signAllTransactions as any,
    // Type cast to any to avoid TypeScript errors
    payer: undefined as any,
  };
  
  return new AnchorProvider(
    connection,
    walletAdapter,
    { preflightCommitment: commitment }
  );
};

// Helper function to convert string to PublicKey
export const stringToPublicKey = (address: string): PublicKey => {
  try {
    // Validate if the address is a valid public key format
    if (!address || typeof address !== 'string' || address.length < 32) {
      // Return a dummy public key for demonstration purposes
      return new PublicKey('11111111111111111111111111111111');
    }
    return new PublicKey(address);
  } catch (error) {
    console.error('Invalid public key:', address);
    // Return a dummy public key instead of throwing an error
    return new PublicKey('11111111111111111111111111111111');
  }
};

// Helper function to shorten public key for display
export const shortenAddress = (address: string, chars = 4): string => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};
