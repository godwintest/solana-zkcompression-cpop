import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import QrReader from 'react-qr-scanner';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { useTokens } from '../context/TokenContext';

const ClaimPage: React.FC = () => {
  const { connected, publicKey, signTransaction } = useWallet();
  const { claimToken, isLoading, error, clearError } = useTokens();
  const [scanning, setScanning] = useState<boolean>(false);
  const [manualInput, setManualInput] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  // Clear success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Handle QR code scan
  const handleScan = async (data: any) => {
    if (data && data.text) {
      setScanning(false);
      await processEventId(data.text);
    }
  };

  // Handle QR code scan error
  const handleError = (err: any) => {
    console.error('QR scan error:', err);
  };

  // Toggle camera facing mode
  const toggleCamera = () => {
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
  };

  // Process event ID from QR code or manual input
  const processEventId = async (eventId: string) => {
    if (!connected || !publicKey || !signTransaction) {
      setSuccessMessage(null);
      return;
    }
    
    try {
      // The claimToken function now requires wallet signature
      // which is handled in the TokenContext
      const success = await claimToken(eventId);
      
      if (success) {
        setSuccessMessage('Token claimed successfully! The token has been added to your collection.');
        setManualInput('');
      }
    } catch (error) {
      console.error('Error claiming token:', error);
    }
  };

  // Handle manual claim button click
  const handleManualClaim = async () => {
    if (manualInput.trim()) {
      await processEventId(manualInput.trim());
    }
  };

  if (!connected || !publicKey) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-6">Claim Your Token</h1>
        <p className="text-xl mb-8">Connect your wallet to claim tokens</p>
        <div className="bg-purple-900 bg-opacity-50 max-w-md mx-auto p-4 rounded-lg mt-8">
          <h3 className="font-semibold text-purple-400 mb-2">Why Connect Your Wallet?</h3>
          <p className="text-gray-300 text-sm">
            Connecting your wallet allows you to:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300 text-sm">
            <li>Sign transactions to securely claim tokens</li>
            <li>Verify your identity as an event attendee</li>
            <li>Store your proof-of-participation tokens</li>
            <li>View your token collection in the Gallery</li>
          </ul>
        </div>
      </div>
    );
  }
  
  if (!signTransaction) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-6">Wallet Signature Required</h1>
        <p className="text-xl mb-8">Your wallet must support transaction signing to claim tokens</p>
        <p className="text-gray-400">Please use a wallet that supports transaction signing, such as Phantom or Solflare</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Claim Your Token</h1>
      <p className="text-lg text-gray-300 mb-8">
        Scan the QR code provided by the event organizer to claim your proof-of-participation token.
        <br />
        <span className="text-sm text-purple-400">You'll need to sign a transaction with your wallet to verify your identity.</span>
      </p>

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

      {/* QR Scanner */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Scan QR Code</h2>
        
        {scanning ? (
          <div className="mb-4">
            <div className="max-w-md mx-auto bg-black p-4 rounded-lg overflow-hidden">
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
                constraints={{
                  video: { facingMode }
                }}
              />
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <Button onClick={() => setScanning(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={toggleCamera}>
                Switch Camera
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-4">
            <Button 
              onClick={() => setScanning(true)} 
              disabled={isLoading}
              size="lg"
            >
              Start Scanning
            </Button>
          </div>
        )}

        <div className="text-center text-gray-400 my-4">OR</div>

        {/* Manual Input */}
        <div>
          <h3 className="text-lg font-medium mb-2">Enter Event ID Manually</h3>
          <div className="flex">
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Enter event ID"
              className="flex-grow px-4 py-2 bg-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isLoading}
            />
            <Button
              onClick={handleManualClaim}
              disabled={!manualInput.trim() || isLoading}
              className="rounded-l-none"
              loading={isLoading}
            >
              Claim
            </Button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">How to Claim Your Token</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-300">
          <li>Connect your Solana wallet</li>
          <li>Scan the QR code provided by the event organizer</li>
          <li>Sign the transaction in your wallet to verify your identity</li>
          <li>Wait for the blockchain confirmation (usually a few seconds)</li>
          <li>View your token in the Gallery</li>
        </ol>
        
        <div className="mt-6 p-4 bg-purple-900 bg-opacity-50 rounded-lg">
          <h3 className="font-semibold text-purple-400 mb-2">About Compressed Tokens</h3>
          <p className="text-gray-300 text-sm">
            The token you're claiming uses Solana's state compression technology with zero-knowledge proofs.
            This makes it:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300 text-sm">
            <li>More cost-effective than traditional NFTs</li>
            <li>Environmentally friendly due to reduced storage requirements</li>
            <li>Verifiable with cryptographic proofs for authenticity</li>
            <li>Permanently stored on the Solana blockchain</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClaimPage;
