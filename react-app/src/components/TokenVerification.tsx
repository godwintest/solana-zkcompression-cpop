import React, { useState } from 'react';
import { useTokens } from '../context/TokenContext';
import { PublicKey } from '@solana/web3.js';
import { shortenAddress } from '../utils/solana/connection';

interface TokenVerificationProps {
  tokenId?: string;
  className?: string;
}

export const TokenVerification: React.FC<TokenVerificationProps> = ({ 
  tokenId, 
  className = '' 
}) => {
  const { tokens, verifyTokenMetadata, isLoading, error } = useTokens();
  const [selectedTokenId, setSelectedTokenId] = useState<string>(tokenId || '');
  const [verificationResult, setVerificationResult] = useState<{
    verified: boolean;
    message: string;
  } | null>(null);

  // Find the selected token
  const selectedToken = tokens.find(token => token.id === selectedTokenId);

  const handleVerify = async () => {
    if (!selectedTokenId) return;
    
    try {
      const result = await verifyTokenMetadata(selectedTokenId);
      setVerificationResult({
        verified: result,
        message: result 
          ? 'Token verified successfully! The metadata is authentic.'
          : 'Token verification failed. The metadata may have been tampered with.'
      });
    } catch (error) {
      setVerificationResult({
        verified: false,
        message: 'Error during verification process.'
      });
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Token Verification</h2>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Verify the authenticity of your token's metadata on the Solana blockchain. 
          This ensures that the token has not been tampered with and is from a legitimate source.
        </p>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Token
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            value={selectedTokenId}
            onChange={(e) => {
              setSelectedTokenId(e.target.value);
              setVerificationResult(null);
            }}
          >
            <option value="">-- Select a token --</option>
            {tokens.map(token => (
              <option key={token.id} value={token.id}>
                {token.name} ({token.event})
              </option>
            ))}
          </select>
        </div>
        
        {selectedToken && (
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <h3 className="font-semibold text-lg mb-2">{selectedToken.name}</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Event:</span>
                <span className="ml-2">{selectedToken.event}</span>
              </div>
              <div>
                <span className="text-gray-500">Date:</span>
                <span className="ml-2">{selectedToken.date}</span>
              </div>
              <div>
                <span className="text-gray-500">Token ID:</span>
                <span className="ml-2">{shortenAddress(selectedToken.id, 6)}</span>
              </div>
              <div>
                <span className="text-gray-500">Status:</span>
                <span className="ml-2">
                  {selectedToken.verified ? (
                    <span className="text-green-600 font-medium">Verified</span>
                  ) : (
                    <span className="text-yellow-600 font-medium">Unverified</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        )}
        
        <button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out disabled:opacity-50"
          onClick={handleVerify}
          disabled={!selectedTokenId || isLoading}
        >
          {isLoading ? 'Verifying...' : 'Verify Token'}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {verificationResult && (
        <div 
          className={`${verificationResult.verified ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'} border-l-4 p-4`} 
          role="alert"
        >
          <p className="font-medium">
            {verificationResult.verified ? 'Verification Successful!' : 'Verification Failed'}
          </p>
          <p>{verificationResult.message}</p>
          
          {verificationResult.verified && (
            <div className="mt-2">
              <p className="text-sm">
                <span className="font-medium">ZK Proof:</span> This token uses zero-knowledge proofs for 
                compressed state on Solana, making it extremely efficient while maintaining security.
              </p>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-6 border-t pt-4">
        <h3 className="font-semibold mb-2">About Token Verification</h3>
        <p className="text-sm text-gray-600">
          cPOP tokens use Solana's state compression technology with zero-knowledge proofs to 
          significantly reduce on-chain storage costs while maintaining security and verifiability. 
          This verification process confirms that the token metadata matches what's stored on the 
          Solana blockchain, ensuring authenticity.
        </p>
      </div>
    </div>
  );
};

export default TokenVerification;
