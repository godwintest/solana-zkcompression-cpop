# cPOP: Compressed Proof-of-Participation Interface

A scalable and cost-effective platform that enables event organizers to mint compressed experience tokens on Solana and allows attendees to claim them by scanning QR codes. Leveraging zero-knowledge compression technology, cPOP significantly reduces the cost and improves the scalability of token distribution for events, conferences, and community engagement.

![Solana Accelerate](https://solana.com/src/images/solana-accelerate/accelerate-logo.svg)

*Submission for the Solana Accelerate Bounty*

## Features

- **For Creators**:
  - Create and manage events with secure transaction signing
  - Mint compressed tokens for airdrops with on-chain verification
  - Generate authenticated QR codes for token distribution
  - View comprehensive analytics on token claims and participant engagement
  - Verify token authenticity using on-chain metadata
  - Monitor claim rates and event performance metrics

- **For Attendees**:
  - Scan QR codes to claim tokens with wallet verification
  - View and share collected tokens in an interactive gallery
  - Connect wallet to securely sign transactions for token claims
  - Access detailed token information with educational content
  - Share achievements on social media platforms
  - Verify token authenticity with blockchain proofs

## Technology Stack

- **Blockchain**: Solana (Devnet)
- **Compression**: ZK Compression (State Compression with Zero-Knowledge Proofs)
- **Frontend**: Next.js, React, TailwindCSS, React Hooks
- **Data Visualization**: Chart.js, react-chartjs-2
- **Wallet Integration**: Solana Wallet Adapter with transaction signing
- **Authentication**: On-chain verification with wallet signatures
- **QR Code**: QRCodeSVG for generation, React-QR-Scanner for scanning
- **Social Sharing**: Twitter, Facebook, LinkedIn integration

## Benefits of ZK Compression

- **Cost Efficiency**: Up to 100x cheaper than traditional token minting
- **Scalability**: Ideal for large-scale airdrops and event token distribution
- **Privacy**: Enhanced privacy features through zero-knowledge proofs
- **Seamless Integration**: Works with existing Solana wallets and infrastructure
- **Environmental Impact**: Reduced on-chain storage requirements

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Solana CLI tools

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd cpop-interface

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Project Structure

- `/react-app` - React application with Vite
  - `/src/components` - Reusable UI components
  - `/src/context` - React context providers including TokenContext
  - `/src/hooks` - Custom React hooks including useAnchorWallet
  - `/src/pages` - Main application pages (Home, Creator, Claim, Gallery)
  - `/src/utils` - Utility functions and Solana connection helpers
- `/program` - Solana program for compressed token management
- `/scripts` - Utility scripts for deployment and testing

## Development

### Smart Contract Development

```bash
cd program
npm install
npm run build
npm run test
```

### Frontend Development

```bash
cd react-app
npm install
npm run dev
```

## Advanced Features

### Transaction Signing
All token operations (minting, claiming) require wallet signature verification to ensure security and authenticity. Event creators must sign transactions when creating events, and attendees must sign transactions when claiming tokens.

### Token Analytics
The platform provides comprehensive analytics for event organizers, including:
- Total tokens minted and claimed
- Unique events and participants
- Claim rates over time
- Token distribution visualization

### Token Verification
Users can verify the authenticity of tokens through on-chain metadata verification, ensuring that tokens are legitimate and have not been tampered with.

### Interactive Token Gallery
The gallery provides an interactive experience for viewing collected tokens, including:
- Detailed token information in modal views
- Social media sharing functionality
- Educational content about compressed tokens
- Visual statistics about the user's collection

### ZK Compression Benefits
The application leverages Solana's state compression with zero-knowledge proofs to achieve:
- Up to 100x cost reduction compared to traditional NFTs
- Scalability to millions of tokens without bloating the blockchain
- Cryptographic verification for token authenticity
- Reduced environmental impact through efficient storage

## License

MIT
