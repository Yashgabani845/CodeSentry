import React from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeatureSection';
import HowItWorksSection from './HowItWorksSection';
import WhyTrustUsSection from './WhyTrustUsSection';
import CallToActionSection from './CallToActionSection';
import Navbar from '../Homepage/Navbar';
import Footer from '../Homepage/Footer';

function Landing() {
  return (
    <div className="min-h-screen">
    <Navbar/>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WhyTrustUsSection />
      <CallToActionSection />
      <Footer/>
    </div>
  );
}

export default Landing;