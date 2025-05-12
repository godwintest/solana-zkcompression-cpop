import React, { useState } from 'react';

interface TokenCardProps {
  id: string;
  name: string;
  event: string;
  date: string;
  image?: string;
}

const TokenCard: React.FC<TokenCardProps> = ({ id, name, event, date, image }) => {
  const [showModal, setShowModal] = useState(false);
  
  // Truncate long token IDs for better display
  const displayId = id.length > 12 ? `${id.substring(0, 6)}...${id.substring(id.length - 6)}` : id;
  
  // Open modal with token details
  const openModal = () => setShowModal(true);
  
  // Close modal
  const closeModal = () => setShowModal(false);
  
  // Share token on social media
  const shareToken = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const shareUrl = window.location.href;
    const shareText = `Check out my '${name}' token from ${event} on cPOP! #SolanaCompressedTokens #ProofOfParticipation`;
    
    let shareLink = '';
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <div 
        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1 cursor-pointer"
        onClick={openModal}
      >
        <div className="h-48 bg-purple-900 flex items-center justify-center">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-6xl">🏆</div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <p className="text-gray-400 mb-2">{event}</p>
          <p className="text-gray-400 mb-2">{date}</p>
          <p className="text-sm text-gray-500 truncate">ID: {displayId}</p>
        </div>
      </div>

      {/* Token Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{name}</h2>
                <button 
                  onClick={(e) => { e.stopPropagation(); closeModal(); }}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  &times;
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <div className="h-64 bg-purple-900 flex items-center justify-center rounded-lg mb-4">
                    {image ? (
                      <img src={image} alt={name} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <div className="text-8xl">🏆</div>
                    )}
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm">Event</p>
                    <p className="text-xl font-semibold">{event}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm">Date</p>
                    <p className="text-xl">{date}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm">Token ID</p>
                    <p className="text-sm font-mono break-all">{id}</p>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-gray-400 text-sm">Description</p>
                    <p className="text-sm">
                      This token certifies your participation in the {event}. 
                      It's a compressed NFT stored efficiently on the Solana blockchain 
                      using zero-knowledge technology.
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-gray-400 text-sm mb-2">Share this achievement</p>
                    <div className="flex space-x-3">
                      <button 
                        onClick={(e) => { e.stopPropagation(); shareToken('twitter'); }}
                        className="p-2 bg-blue-600 hover:bg-blue-500 rounded-full"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); shareToken('facebook'); }}
                        className="p-2 bg-blue-800 hover:bg-blue-700 rounded-full"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); shareToken('linkedin'); }}
                        className="p-2 bg-blue-900 hover:bg-blue-800 rounded-full"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TokenCard;
