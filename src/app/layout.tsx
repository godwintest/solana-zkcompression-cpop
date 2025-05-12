import type { Metadata } from 'next';
import './globals.css';

// Using CSS import instead of Next.js font system to avoid nanoid dependency

export const metadata: Metadata = {
  title: 'cPOP - Compressed Proof of Participation',
  description: 'Mint and claim compressed tokens for event participation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
