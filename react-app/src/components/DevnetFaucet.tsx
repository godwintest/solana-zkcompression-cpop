import React, { useState } from 'react';
import Button from './Button';

interface DevnetFaucetProps {
  walletAddress: string | null;
}

const DevnetFaucet: React.FC<DevnetFaucetProps> = ({ walletAddress }) => {
  const [showIframe, setShowIframe] = useState(false);
  
  const toggleIframe = () => {
    setShowIframe(!showIframe);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Devnet SOL Faucet</h2>
      <p className="text-gray-300 mb-4">
        You need Devnet SOL to create events and mint tokens. Use the faucet to claim some free Devnet SOL.
      </p>
      
      {walletAddress ? (
        <div>
          <p className="text-sm font-mono bg-gray-700 p-2 rounded mb-4 break-all">
            Your wallet address: {walletAddress}
          </p>
          
          <div className="flex flex-col space-y-4">
            <Button 
              onClick={toggleIframe} 
              variant="secondary"
            >
              {showIframe ? 'Hide Faucet' : 'Show Devnet Faucet'}
            </Button>
            
            {showIframe && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">
                  1. Copy your wallet address above
                  <br />
                  2. Paste it in the faucet below and request SOL
                  <br />
                  3. Wait a few seconds for the transaction to complete
                </p>
                <div className="bg-white rounded-lg overflow-hidden">
                  <iframe 
                    src="https://solfaucet.com/" 
                    title="Solana Devnet Faucet"
                    className="w-full h-96 border-0"
                  />
                </div>
              </div>
            )}
            
            <a 
              href="https://solfaucet.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 text-sm hover:text-purple-300 transition-colors"
            >
              Or open the faucet in a new tab
            </a>
          </div>
        </div>
      ) : (
        <p className="text-yellow-400">
          Please connect your wallet to use the faucet.
        </p>
      )}
    </div>
  );
};

export default DevnetFaucet;
