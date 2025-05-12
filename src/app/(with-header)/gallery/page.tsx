"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useTokens } from '@/context/TokenContext';
import TokenCard from '@/components/TokenCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import Button from '@/components/Button';
import TokenStats from '@/components/TokenStats';
import Link from 'next/link';

interface TokenCardProps {
  id: string;
  name: string;
  event: string;
  date: string;
  image: string;
  key?: string;
};

type Token = TokenCardProps;

// Helper functions for token statistics
const getUniqueEventCount = (tokens: Token[]) => {
  const uniqueEvents = new Set(tokens.map(token => token.event));
  return uniqueEvents.size;
};

const getOldestToken = (tokens: Token[]) => {
  if (tokens.length === 0) return undefined;
  
  // Assuming date is in a format that can be compared (e.g., ISO string or consistent format)
  const oldestToken = tokens.reduce((oldest, current) => {
    const oldestDate = new Date(oldest.date);
    const currentDate = new Date(current.date);
    return currentDate < oldestDate ? current : oldest;
  }, tokens[0]);
  
  return oldestToken.date;
};

const getNewestToken = (tokens: Token[]) => {
  if (tokens.length === 0) return undefined;
  
  const newestToken = tokens.reduce((newest, current) => {
    const newestDate = new Date(newest.date);
    const currentDate = new Date(current.date);
    return currentDate > newestDate ? current : newest;
  }, tokens[0]);
  
  return newestToken.date;
};

export default function GalleryPage() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const { tokens, isLoading, error, refreshTokens } = useTokens();
  const [refreshed, setRefreshed] = useState(false);

  useEffect(() => {
    if (connected && publicKey) {
      refreshTokens();
    }
  }, [connected, publicKey, refreshTokens]);

  const handleRefresh = () => {
    refreshTokens();
    setRefreshed(true);
    setTimeout(() => setRefreshed(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Token Gallery</h1>
        {connected && tokens.length > 0 && (
          <Button
            variant="secondary"
            onClick={handleRefresh}
            isLoading={isLoading}
          >
            Refresh Tokens
          </Button>
        )}
      </div>

      {!connected ? (
        <div className="bg-gray-800 rounded-lg p-8 mb-8 text-center">
          <p className="text-xl mb-4">Connect your wallet to view your compressed tokens</p>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : error ? (
        <div className="bg-red-900/30 border border-red-700 text-red-200 p-4 rounded-lg mb-6 text-center">
          {error}
        </div>
      ) : tokens.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-8 mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">No Tokens Found</h2>
          <p className="text-gray-300 mb-6">You haven't collected any compressed tokens yet.</p>
          <Button
            variant="primary"
            onClick={() => window.location.href = '/claim'}
          >
            Claim Your First Token
          </Button>
        </div>
      ) : (
        <>
          {refreshed && (
            <div className="bg-green-900/30 border border-green-700 text-green-200 p-4 rounded-lg mb-6 text-center">
              Successfully loaded {tokens.length} token{tokens.length !== 1 ? 's' : ''}!
            </div>
          )}
          
          {/* Token Statistics */}
          <TokenStats
            totalTokens={tokens.length}
            uniqueEvents={getUniqueEventCount(tokens)}
            oldestToken={getOldestToken(tokens)}
            newestToken={getNewestToken(tokens)}
          />
          
          <div className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tokens.map((token: Token) => (
                <TokenCard
                  key={token.id}
                  id={token.id}
                  name={token.name}
                  event={token.event}
                  date={token.date}
                  image={token.image}
                />
              ))}
            </div>
          </div>
        </>
      )}
      
      <div className="bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">About Compressed Tokens</h2>
        
        <div className="prose prose-invert max-w-none">
          <p>
            Compressed tokens on Solana use zero-knowledge proofs to achieve new levels of scalability while maintaining security and verifiability.
          </p>
          <p>
            Benefits of compressed tokens include:
          </p>
          <ul>
            <li>Significantly lower cost per token (up to 100x cheaper)</li>
            <li>Reduced on-chain storage requirements</li>
            <li>Improved scalability for large-scale token distributions</li>
            <li>Same security guarantees as regular Solana tokens</li>
          </ul>
          <p>
            These tokens serve as digital proof of your participation in various events and can be collected and displayed in this gallery.
          </p>
        </div>
      </div>
    </div>
  );
}
