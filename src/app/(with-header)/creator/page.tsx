"use client";

import React from 'react';
const { useState } = React;
type FormEvent<T = Element> = React.FormEvent<T>;
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { QRCodeSVG } from 'qrcode.react';
import { useProgram } from '@/utils/solana/anchor';
import { initializeEvent } from '@/utils/solana/program';
import { PublicKey } from '@solana/web3.js';
import Button from '@/components/Button';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function CreatorPage() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const program = useProgram();
  
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [tokenSupply, setTokenSupply] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');
  const [mintAddress, setMintAddress] = useState('');
  const [eventPubkey, setEventPubkey] = useState<any | null>(null);
  const [mintError, setMintError] = useState('');
  const [eventCreated, setEventCreated] = useState(false);

  const handleCreateEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!connected || !publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    if (!program) {
      alert('Program not initialized. Please try again.');
      return;
    }

    setIsLoading(true);
    try {
      // Call our Solana program to initialize an event and mint compressed tokens
      const result = await initializeEvent(
        program,
        publicKey,
        eventName,
        eventDescription,
        tokenSupply
      );
      
      // Set the event public key and mint address
      setEventPubkey(result.eventPubkey);
      setMintAddress(result.eventPubkey.toString());
      
      // Create QR code data with the event public key
      const claimUrl = `${window.location.origin}/claim?mint=${result.eventPubkey.toString()}&event=${encodeURIComponent(eventName)}`;
      setQrCodeData(claimUrl);
      
      setMintSuccess(true);
      setEventCreated(true);
    } catch (error) {
      console.error('Error creating event:', error);
      setMintError('Failed to create event. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEventName('');
    setEventDescription('');
    setTokenSupply(100);
    setMintSuccess(false);
    setQrCodeData('');
    setMintAddress('');
    setEventCreated(false);
    setMintError('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Creator Dashboard</h1>
      
      {!connected ? (
        <div className="bg-gray-800 rounded-lg p-8 mb-8 text-center">
          <p className="text-xl mb-4">Connect your wallet to create events and mint compressed tokens</p>
        </div>
      ) : mintSuccess ? (
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-solana-green">Event Created Successfully!</h2>
          <p className="mb-4">Your compressed tokens have been minted. Share this QR code with your attendees:</p>
          
          <div className="flex flex-col md:flex-row items-center gap-8 my-8">
            <div className="bg-white p-4 rounded-lg">
              <QRCodeSVG value={qrCodeData} size={200} />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{eventName}</h3>
              <p className="text-gray-300 mb-4">{eventDescription}</p>
              <p className="mb-2"><span className="text-gray-400">Supply:</span> {tokenSupply}</p>
              <p className="mb-4"><span className="text-gray-400">Mint Address:</span> <span className="text-xs md:text-sm font-mono">{mintAddress}</span></p>
              
              <button 
                onClick={() => {
                  // In a real app, this would download the QR code
                  alert('QR code download functionality would be implemented here');
                }}
                className="bg-solana-blue hover:bg-blue-600 text-white py-2 px-4 rounded mr-4 transition-colors"
              >
                Download QR
              </button>
              
              <button 
                onClick={resetForm}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors"
              >
                Create Another Event
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Create New Event</h2>
          
          {mintError && (
            <div className="bg-red-900/30 border border-red-700 text-red-200 p-4 rounded-lg mb-6">
              {mintError}
            </div>
          )}
          
          <form onSubmit={handleCreateEvent}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2" htmlFor="eventName">Event Name</label>
              <input
                id="eventName"
                type="text"
                value={eventName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEventName(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 text-white focus:outline-none focus:border-solana-purple"
                placeholder="Enter event name"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2" htmlFor="eventDescription">Event Description</label>
              <textarea
                id="eventDescription"
                value={eventDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEventDescription(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 text-white focus:outline-none focus:border-solana-purple"
                placeholder="Enter event description"
                rows={4}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2" htmlFor="tokenSupply">Token Supply</label>
              <input
                id="tokenSupply"
                type="number"
                min="1"
                max="10000"
                value={tokenSupply}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenSupply(parseInt(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 text-white focus:outline-none focus:border-solana-purple"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded font-semibold ${isLoading ? 'bg-gray-600' : 'bg-solana-purple hover:bg-purple-700'} transition-colors`}
            >
              {isLoading ? 'Creating Event...' : 'Create Event & Mint Tokens'}
            </button>
          </form>
        </div>
      )}
      
      <div className="bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-solana-purple mb-2">1</div>
            <h3 className="text-xl font-semibold mb-2">Create Event</h3>
            <p className="text-gray-300">Fill out the form with your event details and token parameters.</p>
          </div>
          
          <div className="p-4 border border-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-solana-blue mb-2">2</div>
            <h3 className="text-xl font-semibold mb-2">Share QR Code</h3>
            <p className="text-gray-300">Display the generated QR code at your event for attendees to scan.</p>
          </div>
          
          <div className="p-4 border border-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-solana-green mb-2">3</div>
            <h3 className="text-xl font-semibold mb-2">Attendees Claim</h3>
            <p className="text-gray-300">Attendees scan the QR code and receive their compressed tokens.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
