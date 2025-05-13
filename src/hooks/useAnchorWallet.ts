import { useWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider } from '@project-serum/anchor';
import { connection } from '../utils/solana/connection';
import { Wallet as AnchorWallet } from '@project-serum/anchor';

// Custom hook to create an Anchor provider from the wallet adapter
export const useAnchorWallet = () => {
  const wallet = useWallet();
  
  if (!wallet.publicKey || !wallet.signTransaction) {
    return null;
  }
  
  // Create a wallet adapter that works with AnchorProvider
  const walletAdapter: AnchorWallet = {
    publicKey: wallet.publicKey,
    signTransaction: wallet.signTransaction,
    signAllTransactions: wallet.signAllTransactions || (async (txs) => txs),
    payer: undefined as any,
  };
  
  // Create and return the AnchorProvider
  return new AnchorProvider(
    connection,
    walletAdapter,
    { preflightCommitment: 'confirmed' }
  );
};
