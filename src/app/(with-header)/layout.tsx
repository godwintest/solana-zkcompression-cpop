"use client";

import React from 'react';
import WalletProvider from '@/components/WalletProvider';
import { Header } from '@/components/Header';
import { TokenProvider } from '@/context/TokenContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WalletProvider>
      <TokenProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </TokenProvider>
    </WalletProvider>
  );
}
