import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/Home';
import GalleryPage from './pages/Gallery';
import ClaimPage from './pages/Claim';
import CreatorPage from './pages/Creator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/claim" element={<ClaimPage />} />
          <Route path="/creator" element={<CreatorPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
