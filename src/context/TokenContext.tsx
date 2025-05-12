"use client";

import React, { createContext, useContext, useState, useEffect } from '@/utils/react-imports';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { mintCompressedTokens, claimCompressedToken, getCompressedTokens } from '@/utils/lightProtocol';

type Token = {
  id: string;
  name: string;
  event: string;
  date: string;
  image: string;
};

type TokenContextType = {
  tokens: Token[];
  isLoading: boolean;
  error: string | null;
  mintTokens: (eventName: string, eventDescription: string, supply: number) => Promise<string>;
  claimToken: (mintAddress: string) => Promise<boolean>;
  refreshTokens: () => Promise<void>;
  clearError: () => void;
};

const TokenContext = createContext({} as TokenContextType);

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [tokens, setTokens] = useState([] as Token[]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  useEffect(() => {
    if (connected && publicKey) {
      refreshTokens();
    } else {
      setTokens([]);
    }
  }, [connected, publicKey]);

  const refreshTokens = async () => {
    if (!connected || !publicKey) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const userTokens = await getCompressedTokens(connection, publicKey);
      setTokens(userTokens);
    } catch (error: any) {
      console.error('Error fetching tokens:', error);
      setError(error.message || 'Failed to fetch tokens');
    } finally {
      setIsLoading(false);
    }
  };

  const mintTokens = async (eventName: string, eventDescription: string, supply: number) => {
    if (!connected || !publicKey) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);
    try {
      const mintAddress = await mintCompressedTokens(
        connection,
        publicKey,
        eventName,
        eventDescription,
        supply
      );
      return mintAddress;
    } catch (error: any) {
      console.error('Error minting tokens:', error);
      setError(error.message || 'Failed to mint tokens');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const claimToken = async (mintAddress: string) => {
    if (!connected || !publicKey) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);
    try {
      await claimCompressedToken(connection, publicKey, mintAddress);
      await refreshTokens();
      return true;
    } catch (error: any) {
      console.error('Error claiming token:', error);
      setError(error.message || 'Failed to claim token');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TokenContext.Provider value={{ tokens, isLoading, error, mintTokens, claimToken, refreshTokens, clearError }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useTokens() {
  return useContext(TokenContext);
}
