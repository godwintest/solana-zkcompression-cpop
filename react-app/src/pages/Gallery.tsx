import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import TokenCard from '../components/TokenCard';
import TokenStats from '../components/TokenStats';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';
import { useTokens } from '../context/TokenContext';

const GalleryPage: React.FC = () => {
  const { connected } = useWallet();
  const { tokens, isLoading, error, fetchTokens, clearError } = useTokens();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Clear success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Handle refresh button click
  const handleRefresh = async () => {
    await fetchTokens();
    setSuccessMessage('Tokens refreshed successfully!');
  };

  if (!connected) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-6">Your Token Gallery</h1>
        <p className="text-xl mb-8">Connect your wallet to view your tokens</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Token Gallery</h1>
        <Button onClick={handleRefresh} disabled={isLoading}>
          Refresh Tokens
        </Button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-600 text-white p-4 rounded-lg mb-6">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
          {error}
          <button 
            onClick={clearError} 
            className="ml-4 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <>
          {tokens.length > 0 ? (
            <>
              {/* Token Statistics */}
              <TokenStats tokens={tokens} />
              
              {/* Token Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tokens.map((token) => (
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
            </>
          ) : (
            <div className="text-center py-12 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">No Tokens Found</h2>
              <p className="text-gray-300 mb-6">
                You don't have any tokens yet. Attend events and scan QR codes to collect tokens.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GalleryPage;
