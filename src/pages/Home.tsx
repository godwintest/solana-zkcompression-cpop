import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import Button from '../components/Button';

const HomePage: React.FC = () => {
  const { connected } = useWallet();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Compressed Proof of Participation
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Create and collect compressed tokens for event participation on Solana
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {connected ? (
            <>
              <Link to="/creator">
                <Button variant="primary" size="lg">
                  Create Event
                </Button>
              </Link>
              <Link to="/gallery">
                <Button variant="secondary" size="lg">
                  View My Tokens
                </Button>
              </Link>
            </>
          ) : (
            <div className="text-center">
              <p className="mb-4 text-lg">Connect your wallet to get started</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-10 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-4xl mb-4 text-purple-500">ud83cudf89</div>
            <h3 className="text-xl font-semibold mb-2">For Event Organizers</h3>
            <p className="text-gray-300">
              Create events and mint compressed tokens for your attendees. Generate QR codes for easy distribution.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-4xl mb-4 text-green-500">ud83dudcf8</div>
            <h3 className="text-xl font-semibold mb-2">For Attendees</h3>
            <p className="text-gray-300">
              Scan QR codes to claim your proof-of-participation tokens. Build your collection of event memories.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-4xl mb-4 text-blue-500">ud83dudcbc</div>
            <h3 className="text-xl font-semibold mb-2">For Everyone</h3>
            <p className="text-gray-300">
              Share your achievements on social media. Showcase your participation in the Solana ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* ZK Compression Benefits */}
      <section className="py-12 bg-gray-800 rounded-lg p-8 my-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Benefits of ZK Compression</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">Cost Efficiency</h3>
            <p className="text-gray-300 mb-4">
              Compressed tokens are up to 100x cheaper to create and transfer compared to traditional NFTs, making them perfect for large-scale events.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Scalability</h3>
            <p className="text-gray-300">
              ZK compression allows for millions of tokens to be created without bloating the blockchain, ensuring the system remains fast and responsive.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Environmental Impact</h3>
            <p className="text-gray-300 mb-4">
              Reduced on-chain storage means less energy consumption, making compressed tokens a more sustainable choice for digital collectibles.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Seamless Experience</h3>
            <p className="text-gray-300">
              Despite the technical complexity behind the scenes, users experience the same ownership benefits as with traditional NFTs.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Connect your wallet and start creating or collecting compressed proof-of-participation tokens today.
        </p>
        {connected ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/creator">
              <Button variant="primary" size="lg">
                Create Event
              </Button>
            </Link>
            <Link to="/claim">
              <Button variant="secondary" size="lg">
                Claim Token
              </Button>
            </Link>
          </div>
        ) : (
          <p className="text-lg">Connect your wallet using the button in the top right</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
