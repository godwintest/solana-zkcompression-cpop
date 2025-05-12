import React from 'react';

interface Token {
  id: string;
  name: string;
  event: string;
  date: string;
  createdAt: number;
}

interface TokenStatsProps {
  tokens: Token[];
}

const TokenStats: React.FC<TokenStatsProps> = ({ tokens }) => {
  // Calculate unique events
  const uniqueEvents = () => {
    const events = new Set(tokens.map(token => token.event));
    return events.size;
  };

  // Find oldest token
  const oldestToken = () => {
    if (tokens.length === 0) return 'None';
    const oldest = tokens.reduce((prev, current) => 
      (prev.createdAt < current.createdAt) ? prev : current
    );
    return formatDate(oldest.date);
  };

  // Find newest token
  const newestToken = () => {
    if (tokens.length === 0) return 'None';
    const newest = tokens.reduce((prev, current) => 
      (prev.createdAt > current.createdAt) ? prev : current
    );
    return formatDate(newest.date);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (error) {
      return dateString; // Return original string if parsing fails
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Your Token Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Total Tokens</p>
          <p className="text-2xl font-bold">{tokens.length}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Unique Events</p>
          <p className="text-2xl font-bold">{uniqueEvents()}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Oldest Token</p>
          <p className="text-2xl font-bold">{oldestToken()}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Newest Token</p>
          <p className="text-2xl font-bold">{newestToken()}</p>
        </div>
      </div>
    </div>
  );
};

export default TokenStats;
