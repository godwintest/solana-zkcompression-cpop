import React, { useState } from 'react';
import { useTokens } from '../context/TokenContext';
import { useWallet } from '@solana/wallet-adapter-react';
import { QRCodeSVG } from 'qrcode.react';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import TokenAnalytics from '../components/TokenAnalytics';
import TokenVerification from '../components/TokenVerification';
import DevnetFaucet from '../components/DevnetFaucet';

const CreatorPage: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const { mintToken, isLoading, error, clearError, generateQRCode } = useTokens();
  
  const [eventName, setEventName] = useState<string>('');
  const [eventDescription, setEventDescription] = useState<string>('');
  const [tokenSupply, setTokenSupply] = useState<number>(100);
  const [eventCreated, setEventCreated] = useState<boolean>(false);
  const [eventId, setEventId] = useState<string | null>(null);
  const [mintError, setMintError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [showAnalytics, setShowAnalytics] = useState<boolean>(false);
  const [showVerification, setShowVerification] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Mint the token with transaction signing
      const result = await mintToken(eventName, eventDescription, tokenSupply);
      if (result) {
        setEventId(result);
        setEventCreated(true);
        setSuccessMessage('Event created successfully!');
        
        // Generate QR code with transaction signing
        const qrUrl = await generateQRCode(result);
        setQrCodeUrl(qrUrl);
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      }
    } catch (error: any) {
      setMintError(error.message || 'Failed to create event');
    }
  };

  // Reset form
  const resetForm = () => {
    setEventName('');
    setEventDescription('');
    setTokenSupply(100);
    setEventCreated(false);
    setEventId(null);
    setMintError(null);
  };

  // Download QR code as PNG
  const downloadQRCode = () => {
    if (!eventId) return;
    
    const canvas = document.getElementById('event-qr-code');
    if (!canvas) return;
    
    const svg = canvas.querySelector('svg');
    if (!svg) return;
    
    // Convert SVG to canvas
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas2 = document.createElement('canvas');
    const ctx = canvas2.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas2.width = img.width;
      canvas2.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      // Download as PNG
      const a = document.createElement('a');
      a.download = `${eventName.replace(/\s+/g, '-')}-qr-code.png`;
      a.href = canvas2.toDataURL('image/png');
      a.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  if (!connected) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-6">Create Event</h1>
        <p className="text-xl mb-8">Connect your wallet to create events and mint tokens</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Event</h1>
      <p className="text-lg text-gray-300 mb-8">
        Create an event and mint compressed tokens for your attendees. Generate a QR code that attendees can scan to claim their tokens.
      </p>
      
      {/* Devnet Faucet */}
      {connected && publicKey && (
        <DevnetFaucet walletAddress={publicKey.toString()} />
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-600 text-white p-4 rounded-lg mb-6">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {(error || mintError) && (
        <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
          {error || mintError}
          <button 
            onClick={() => { clearError(); setMintError(null); }} 
            className="ml-4 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Navigation tabs for Creator features */}
      <div className="flex mb-6 border-b border-gray-700">
        <button 
          className={`py-2 px-4 ${!showAnalytics && !showVerification ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-400'}`}
          onClick={() => { setShowAnalytics(false); setShowVerification(false); }}
        >
          Create Event
        </button>
        <button 
          className={`py-2 px-4 ${showAnalytics ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-400'}`}
          onClick={() => { setShowAnalytics(true); setShowVerification(false); }}
        >
          Analytics
        </button>
        <button 
          className={`py-2 px-4 ${showVerification ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-400'}`}
          onClick={() => { setShowAnalytics(false); setShowVerification(true); }}
        >
          Verification
        </button>
      </div>
      
      {/* Analytics View */}
      {showAnalytics && (
        <TokenAnalytics className="mb-8" />
      )}
      
      {/* Verification View */}
      {showVerification && (
        <TokenVerification className="mb-8" />
      )}
      
      {/* Event Creation View */}
      {!showAnalytics && !showVerification && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Event Creation Form */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {eventCreated ? 'Event Created' : 'Event Details'}
            </h2>
          
          {!eventCreated ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="eventName" className="block text-sm font-medium text-gray-300 mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  id="eventName"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter event name"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-300 mb-1">
                  Event Description
                </label>
                <textarea
                  id="eventDescription"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter event description"
                  rows={4}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="tokenSupply" className="block text-sm font-medium text-gray-300 mb-1">
                  Token Supply
                </label>
                <input
                  type="number"
                  id="tokenSupply"
                  value={tokenSupply}
                  onChange={(e) => setTokenSupply(parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  min="1"
                  max="10000"
                  required
                  disabled={isLoading}
                />
                <p className="text-sm text-gray-400 mt-1">
                  Maximum number of tokens that can be claimed
                </p>
              </div>
              
              <Button
                type="submit"
                fullWidth
                loading={isLoading}
                disabled={isLoading || !eventName || !eventDescription || tokenSupply < 1}
              >
                Create Event
              </Button>
            </form>
          ) : (
            <div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-400">Event Name</p>
                <p className="text-lg">{eventName}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-400">Event Description</p>
                <p className="text-lg">{eventDescription}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-400">Token Supply</p>
                <p className="text-lg">{tokenSupply}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-400">Event ID</p>
                <p className="text-lg font-mono break-all">{eventId}</p>
              </div>
              
              <Button
                onClick={resetForm}
                fullWidth
                variant="outline"
              >
                Create Another Event
              </Button>
            </div>
          )}
        </div>
        
        {/* QR Code Display */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">QR Code</h2>
          
          {eventCreated && eventId ? (
            <div className="text-center">
              <div 
                id="event-qr-code" 
                className="bg-white p-4 rounded-lg inline-block mb-4"
              >
                <QRCodeSVG
                  value={qrCodeUrl || eventId || ''}
                  size={200}
                  level="H"
                  includeMargin
                />
              </div>
              
              <p className="text-gray-300 mb-4">
                Share this QR code with your event attendees. They can scan it to claim their proof-of-participation token.
                <br />
                <span className="text-purple-400 text-sm">This QR code is signed with your wallet to ensure authenticity.</span>
              </p>
              
              <Button
                onClick={downloadQRCode}
                variant="secondary"
              >
                Download QR Code
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              {isLoading ? (
                <LoadingSpinner size="lg" />
              ) : (
                <p>Fill out the form and create an event to generate a QR code</p>
              )}
            </div>
          )}
        </div>
      </div>
      )}
      
      {/* Instructions */}
      {!showAnalytics && !showVerification && (
        <div className="bg-gray-800 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Fill out the event details and create your event</li>
            <li>Sign the transaction with your wallet to authenticate the event</li>
            <li>A QR code will be generated for your event</li>
            <li>Share this QR code with your event attendees</li>
            <li>Attendees can scan the QR code to claim their proof-of-participation token</li>
            <li>Each attendee will need to connect their Solana wallet and sign a transaction to claim their token</li>
            <li>Use the Analytics tab to track token distribution and claim rates</li>
            <li>Use the Verification tab to verify token authenticity</li>
          </ol>
          
          <div className="mt-6 p-4 bg-purple-900 bg-opacity-50 rounded-lg">
            <h3 className="font-semibold text-purple-400 mb-2">ZK Compression Benefits</h3>
            <p className="text-gray-300">
              Your tokens use Solana's state compression with zero-knowledge proofs, making them:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
              <li>Up to 100x cheaper to mint and transfer than traditional NFTs</li>
              <li>Scalable to millions of tokens without bloating the blockchain</li>
              <li>Verifiable with cryptographic proofs for authenticity</li>
              <li>Environmentally friendly due to reduced storage requirements</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorPage;
