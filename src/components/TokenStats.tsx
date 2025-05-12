import React from 'react';

interface TokenStatsProps {
  totalTokens: number;
  uniqueEvents: number;
  oldestToken?: string; // Date string
  newestToken?: string; // Date string
}

const TokenStats = ({ totalTokens, uniqueEvents, oldestToken, newestToken }: TokenStatsProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Collection Statistics</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-solana-purple mb-2">{totalTokens}</div>
          <div className="text-gray-300 text-sm">Total Tokens</div>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-solana-blue mb-2">{uniqueEvents}</div>
          <div className="text-gray-300 text-sm">Unique Events</div>
        </div>
        
        {oldestToken && (
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-solana-green mb-2">{oldestToken}</div>
            <div className="text-gray-300 text-sm">First Token</div>
          </div>
        )}
        
        {newestToken && (
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-xl font-bold text-solana-green mb-2">{newestToken}</div>
            <div className="text-gray-300 text-sm">Latest Token</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenStats;
