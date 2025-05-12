import React from 'react';

import Navbar from "./Navbar";
import Footer from "./Footer";
import AISection from "./AISection";
import FeatureSection from "./FeatureSection";
import CTASection from "./CTASection";
import HeroSection from './HeroSection';
const Homepage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeatureSection />
        <AISection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;