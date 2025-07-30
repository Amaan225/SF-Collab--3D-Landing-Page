'use client';

import React, { useState } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';

import Hero from './sections/Hero';
import Navbar from './components/Navbar';
import Preloader from './sections/Preloader';
import CursorOverlay from './components/CursorOverlay';
import Works from './sections/Works';
import Footer from './sections/Footer';
import Gallery from './sections/Gallery';
import Explore from './sections/Explore';
import Vertical from './components/Vertical/Vertical'
import Roadmap from './sections/Roadmap';
import MonetizationModel from './sections/MonetizationModel';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ReactLenis root>
      {isLoading ? (
        <Preloader onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <CursorOverlay />
          <Navbar />
          <main className="flex flex-col gap-10 overflow-hidden">
            <Hero />
            <Works />
            <Gallery />
            <Vertical/>
            <Explore/>
            <MonetizationModel/>
            <Roadmap/>
          </main>


          <Footer />
        </>
      )}
    </ReactLenis>
  );
};

export default App;
