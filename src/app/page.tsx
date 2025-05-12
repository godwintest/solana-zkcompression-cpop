import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-5xl w-full flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-solana-purple via-solana-blue to-solana-green inline-block text-transparent bg-clip-text">
            cPOP Interface
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl text-gray-200">
            Create and claim compressed proof-of-participation tokens on Solana using zero-knowledge compression technology
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link href="/creator" className="px-8 py-3 bg-solana-purple hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
              Create Tokens
            </Link>
            <Link href="/claim" className="px-8 py-3 bg-solana-green hover:bg-green-600 text-gray-900 rounded-lg font-semibold transition-colors">
              Claim Tokens
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-solana-purple transition-colors">
              <div className="w-12 h-12 bg-solana-purple/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-solana-purple">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Events</h3>
              <p className="text-gray-300">Event creators can mint compressed tokens for their events, significantly reducing costs compared to traditional NFTs.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-solana-blue transition-colors">
              <div className="w-12 h-12 bg-solana-blue/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-solana-blue">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Generate QR Codes</h3>
              <p className="text-gray-300">Share unique QR codes with event attendees, allowing them to easily claim their proof-of-participation tokens.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-solana-green transition-colors">
              <div className="w-12 h-12 bg-solana-green/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-solana-green">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Collect & Display</h3>
              <p className="text-gray-300">Attendees can claim and showcase their collection of compressed tokens in their personal gallery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ZK Compression Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Powered by ZK Compression</h2>
          <p className="text-xl text-gray-300 mb-8">
            cPOP uses zero-knowledge compression technology on Solana to create scalable and cost-effective proof-of-participation tokens.
          </p>
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-solana-purple">Benefits of ZK Compression</h3>
            <ul className="text-left text-gray-300 space-y-2 max-w-lg mx-auto">
              <li className="flex items-start">
                <span className="text-solana-green mr-2">✓</span> 
                <span>Reduced transaction costs (up to 100x cheaper than regular tokens)</span>
              </li>
              <li className="flex items-start">
                <span className="text-solana-green mr-2">✓</span> 
                <span>Increased scalability for large events and airdrops</span>
              </li>
              <li className="flex items-start">
                <span className="text-solana-green mr-2">✓</span> 
                <span>Enhanced privacy features through zero-knowledge proofs</span>
              </li>
              <li className="flex items-start">
                <span className="text-solana-green mr-2">✓</span> 
                <span>Seamless integration with existing Solana wallets</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Create your first event or claim your first token in minutes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <Link href="/creator" className="group rounded-lg border border-gray-700 px-5 py-8 transition-colors hover:border-solana-purple hover:bg-gray-800/30">
              <h2 className="mb-3 text-2xl font-semibold">
                For Creators{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </h2>
              <p className="text-gray-400">
                Create events and mint compressed tokens for your participants.
              </p>
            </Link>

            <Link href="/claim" className="group rounded-lg border border-gray-700 px-5 py-8 transition-colors hover:border-solana-green hover:bg-gray-800/30">
              <h2 className="mb-3 text-2xl font-semibold">
                For Attendees{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  →
                </span>
              </h2>
              <p className="text-gray-400">
                Scan QR codes to claim your participation tokens.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            Built with ZK Compression on Solana • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  );
}
