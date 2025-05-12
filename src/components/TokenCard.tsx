import React, { useState } from 'react';

interface TokenCardProps {
  id: string;
  name: string;
  event: string;
  date: string;
  image: string;
  key?: string;
}

const TokenCard = ({ id, name, event, date, image }: TokenCardProps) => {
  const [showModal, setShowModal] = useState(false);
  
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  
  // Format the ID for display (truncate if too long)
  const displayId = id.length > 12 ? `${id.substring(0, 6)}...${id.substring(id.length - 6)}` : id;
  
  // Handle social media sharing
  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const shareUrl = window.location.origin;
    const shareText = `Check out my '${name}' token from ${event} on cPOP! #SolanaCompressedTokens #ProofOfParticipation`;
    
    let shareLink = '';
    
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`;
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <>
      <div 
        className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-solana-purple transition-colors cursor-pointer transform hover:scale-[1.02] hover:shadow-lg"
        onClick={openModal}
      >
        <div className="aspect-square bg-gray-700 flex items-center justify-center p-6">
          <img 
            src={image} 
            alt={name} 
            className="max-h-full max-w-full object-contain"
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <p className="text-gray-300 mb-1"><span className="text-gray-400">Event:</span> {event}</p>
          <p className="text-gray-300 mb-1"><span className="text-gray-400">Date:</span> {date}</p>
          <p className="text-gray-300 text-sm"><span className="text-gray-400">ID:</span> <span className="font-mono">{displayId}</span></p>
        </div>
      </div>
      
      {/* Token Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div 
            className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start p-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold">{name}</h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-white focus:outline-none text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2 bg-gray-700 rounded-lg p-4 flex items-center justify-center">
                  <img 
                    src={image} 
                    alt={name} 
                    className="max-w-full max-h-64 object-contain"
                  />
                </div>
                
                <div className="md:w-1/2">
                  <div className="mb-4">
                    <h4 className="text-gray-400 text-sm mb-1">Event</h4>
                    <p className="text-white text-lg">{event}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-gray-400 text-sm mb-1">Date Issued</h4>
                    <p className="text-white text-lg">{date}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-gray-400 text-sm mb-1">Token Type</h4>
                    <p className="text-white text-lg">Compressed NFT (cNFT)</p>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-400 text-sm mb-1">Token ID</h4>
                    <p className="text-white break-all font-mono text-sm">{id}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h4 className="text-xl font-semibold mb-3">About Compressed Tokens</h4>
                <p className="text-gray-300 mb-3">
                  This token uses zero-knowledge compression technology on Solana, making it up to 100x cheaper than traditional NFTs while maintaining the same security guarantees.
                </p>
                <p className="text-gray-300">
                  Compressed tokens serve as digital proof of your participation in events and can be collected and displayed in your personal gallery.
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-700 flex justify-between items-center">
              <div className="flex space-x-3">
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 bg-[#1DA1F2] hover:bg-[#1a94df] text-white rounded-lg flex items-center justify-center"
                  title="Share on Twitter"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 bg-[#4267B2] hover:bg-[#3b5998] text-white rounded-lg flex items-center justify-center"
                  title="Share on Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 bg-[#0077B5] hover:bg-[#006699] text-white rounded-lg flex items-center justify-center"
                  title="Share on LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                </button>
              </div>
              
              <button 
                onClick={closeModal}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TokenCard;
