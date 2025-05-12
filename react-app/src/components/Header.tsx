import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

const Header: React.FC = () => {
  const location = useLocation();
  const { connected } = useWallet();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-purple-700' : 'bg-gray-800 hover:bg-gray-700';
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-white mr-8">cPOP</Link>
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className={`px-4 py-2 rounded text-white ${isActive('/')}`}>Home</Link>
            <Link to="/gallery" className={`px-4 py-2 rounded text-white ${isActive('/gallery')}`}>Gallery</Link>
            <Link to="/claim" className={`px-4 py-2 rounded text-white ${isActive('/claim')}`}>Claim</Link>
            {connected && (
              <Link to="/creator" className={`px-4 py-2 rounded text-white ${isActive('/creator')}`}>Creator</Link>
            )}
          </nav>
        </div>
        <div>
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700" />
        </div>
      </div>
    </header>
  );
};

export default Header;
