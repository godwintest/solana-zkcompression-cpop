"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-800">
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-solana-purple via-solana-blue to-solana-green inline-block text-transparent bg-clip-text">
          cPOP
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link 
            href="/creator" 
            className={`${pathname?.startsWith('/creator') ? 'text-solana-green' : 'text-gray-300'} hover:text-solana-blue transition-colors`}
          >
            Creator Dashboard
          </Link>
          <Link 
            href="/claim" 
            className={`${pathname?.startsWith('/claim') ? 'text-solana-green' : 'text-gray-300'} hover:text-solana-blue transition-colors`}
          >
            Claim Tokens
          </Link>
          <Link 
            href="/gallery" 
            className={`${pathname?.startsWith('/gallery') ? 'text-solana-green' : 'text-gray-300'} hover:text-solana-blue transition-colors`}
          >
            Token Gallery
          </Link>
        </nav>
      </div>
      <WalletMultiButton />
    </header>
  );
};
