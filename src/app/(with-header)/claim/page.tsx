"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import { PublicKey } from '@solana/web3.js';
import { useProgram } from '@/utils/solana/anchor';
import { claimToken } from '@/utils/solana/program';
import Button from '@/components/Button';
import LoadingSpinner from '@/components/LoadingSpinner';

// Dynamically import QR Scanner to avoid SSR issues
const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false });

export default function ClaimPage() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const program = useProgram();
  const searchParams = useSearchParams();
  
  const [scanning, setScanning] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [claimError, setClaimError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    name: '',
    mint: ''
  });

  // Check if there are URL parameters for direct claiming
  useEffect(() => {
    const mintParam = searchParams?.get('mint');
    const eventParam = searchParams?.get('event');
    
    if (mintParam && eventParam) {
      setEventDetails({
        name: eventParam,
        mint: mintParam
      });
    }
  }, [searchParams]);

  const handleScan = (data: any) => {
    if (data && data.text) {
      setScanning(false);
      
      try {
        // Parse the QR code data
        const url = new URL(data.text);
        const mintParam = url.searchParams.get('mint');
        const eventParam = url.searchParams.get('event');
        
        if (mintParam && eventParam) {
          setEventDetails({
            name: eventParam,
            mint: mintParam
          });
        } else {
          setClaimError('Invalid QR code. Please try again.');
        }
      } catch (error) {
        console.error('Error parsing QR code:', error);
        setClaimError('Invalid QR code format. Please try again.');
      }
    }
  };

  const handleError = (err: any) => {
    console.error('QR Scanner error:', err);
    setClaimError('Error accessing camera. Please check permissions and try again.');
    setScanning(false);
  };

  const handleClaim = async () => {
    if (!connected || !publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    if (!program) {
      alert('Program not initialized. Please try again.');
      return;
    }

    if (!eventDetails.mint) {
      setClaimError('Invalid token information. Please scan a valid QR code.');
      return;
    }

    setIsLoading(true);
    setClaimError('');
    
    try {
      // Convert the mint string to a PublicKey
      const eventPubkey = new PublicKey(eventDetails.mint);
      
      // Call our Solana program to claim the compressed token
      await claimToken(program, publicKey, eventPubkey);
      
      setClaimed(true);
    } catch (error) {
      console.error('Error claiming token:', error);
      setClaimError('Failed to claim token. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetClaim = () => {
    setEventDetails({ name: '', mint: '' });
    setClaimed(false);
    setClaimError('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Claim Your Tokens</h1>
      
      {!connected ? (
        <div className="bg-gray-800 rounded-lg p-8 mb-8 text-center">
          <p className="text-xl mb-4">Connect your wallet to claim your compressed tokens</p>
          {claimError && (
            <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 mb-6 text-red-200">
              <p>{claimError}</p>
            </div>
          )}
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : claimed ? (
        <div className="bg-gray-800 rounded-lg p-8 mb-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-semibold mb-4 text-solana-green">Token Claimed Successfully!</h2>
          <p className="mb-6">You have successfully claimed your participation token for <strong>{eventDetails.name}</strong>.</p>
          <p className="text-sm text-gray-400 mb-6">Token mint: <span className="font-mono">{eventDetails.mint}</span></p>
          
          <button 
            onClick={resetClaim}
            className="bg-solana-purple hover:bg-purple-700 text-white py-2 px-6 rounded transition-colors"
          >
            Claim Another Token
          </button>
        </div>
      ) : eventDetails.mint ? (
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Claim Your Token</h2>
          
          <div className="mb-6">
            <p className="text-lg mb-2">Event: <span className="font-semibold">{eventDetails.name}</span></p>
            <p className="text-sm text-gray-400">Token mint: <span className="font-mono">{eventDetails.mint}</span></p>
          </div>
          
          {claimError && (
            <div className="bg-red-900/30 border border-red-700 text-red-200 p-4 rounded-lg mb-6">
              {claimError}
            </div>
          )}
          
          <button
            onClick={handleClaim}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded font-semibold ${isLoading ? 'bg-gray-600' : 'bg-solana-green hover:bg-green-600'} transition-colors`}
          >
            {isLoading ? 'Claiming Token...' : 'Claim Token'}
          </button>
          
          <button 
            onClick={resetClaim}
            className="w-full mt-4 py-2 px-4 rounded font-semibold bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            Scan Different QR Code
          </button>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Scan QR Code</h2>
          
          {claimError && (
            <div className="bg-red-900/30 border border-red-700 text-red-200 p-4 rounded-lg mb-6">
              {claimError}
            </div>
          )}
          
          {scanning ? (
            <div className="mb-6">
              <div className="relative max-w-md mx-auto">
                <QrScanner
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: '100%' }}
                  constraints={{
                    video: { facingMode: 'environment' }
                  }}
                />
                <div className="absolute inset-0 border-2 border-solana-green rounded-lg pointer-events-none"></div>
              </div>
              <p className="text-center mt-4 text-gray-300">Position the QR code within the frame</p>
              
              <button 
                onClick={() => setScanning(false)}
                className="w-full mt-4 py-2 px-4 rounded font-semibold bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                Cancel Scanning
              </button>
            </div>
          ) : (
            <button
              onClick={() => setScanning(true)}
              className="w-full py-3 px-4 rounded font-semibold bg-solana-blue hover:bg-blue-600 transition-colors"
            >
              Scan QR Code
            </button>
          )}
        </div>
      )}
      
      <div className="bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-solana-purple mb-2">1</div>
            <h3 className="text-xl font-semibold mb-2">Connect Wallet</h3>
            <p className="text-gray-300">Connect your Solana wallet to receive compressed tokens.</p>
          </div>
          
          <div className="p-4 border border-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-solana-blue mb-2">2</div>
            <h3 className="text-xl font-semibold mb-2">Scan QR Code</h3>
            <p className="text-gray-300">Scan the event's QR code using your device's camera.</p>
          </div>
          
          <div className="p-4 border border-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-solana-green mb-2">3</div>
            <h3 className="text-xl font-semibold mb-2">Claim Token</h3>
            <p className="text-gray-300">Confirm the claim to receive your compressed participation token.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
