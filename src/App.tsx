import React, { useLayoutEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from './components/hero/Hero';
import Newbeato16 from './sections/Newbeato16';
import ProductsPage from './components/products/ProductsPage';
import KeyDataSection from './components/sections/KeyDataSection';
import TimelineSection from './components/sections/TimelineSection';
import Footer from './components/sections/Footer';
import GlobalParallax from './components/parallax/GlobalParallax';
import FullscreenToggle from './components/ui/FullscreenToggle';
import ConfiguratorApp from './configurator/App'; // Import the configurator
import Beato16Info from './pages/Beato16Info'; // Import the BEATO16 info page
import Beato8Info from './pages/Beato8Info'; // Import the BEATO8 info page
import MixoInfo from './pages/MixoInfo'; // Import the MIXO info page
import FadoInfo from './pages/FadoInfo';
import KnoboInfo from './pages/KnoboInfo';
import LoopoInfo from './pages/LoopoInfo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

// Main layout for the original single-page content
const MainLayout = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 0.3, // Más rápido
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -15 * t)), // Más responsivo
      wheelMultiplier: 1, // Scroll más rápido con la rueda
      touchMultiplier: 1, // Scroll más rápido en móvil
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 0.5);
    });
    gsap.ticker.lagSmoothing(0);

    const sections: HTMLElement[] = gsap.utils.toArray('.section-snap');
    
    let snapTriggers = sections.map((section, i) => {
      if (i === 2 || i === 4) {
        return null;
      }
      
      return ScrollTrigger.create({
        trigger: section,
        start: "top top",
        snap: {
          snapTo: 1,
          duration: 0.4, // Snap más rápido
          ease: 'power2.out', // Easing más rápido
          delay: 0.05, // Menos delay
          directional: false,
        }
      });
    }).filter(Boolean);

    return () => {
      lenis.destroy();
      snapTriggers.forEach(trigger => trigger?.kill());
    };
  }, []);

  return (
    <div className="relative bg-dark-900 text-white">
      <GlobalParallax />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid opacity-20 bg-grid" />
        <div className="absolute inset-0 plasma-bg plasma-bg" />
      </div>
      <FullscreenToggle />
      <div ref={containerRef}>
        <section className="section-snap relative h-screen w-full overflow-hidden"><Hero /></section>
        <section className="section-snap relative h-screen w-full overflow-hidden"><Newbeato16 /></section>
        <section className="section-snap relative h-screen w-full overflow-hidden"><ProductsPage /></section>
        <section className="section-snap relative h-screen w-full overflow-hidden"><KeyDataSection /></section>
        <section className="section-snap relative h-[200vh] w-full overflow-hidden"><TimelineSection /></section>
        <section className="section-snap relative h-screen w-full overflow-hidden"><Footer /></section>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/configurator" element={<ConfiguratorApp />} />
      <Route path="/beato16info" element={<Beato16Info />} />
      <Route path="/beato8info" element={<Beato8Info />} />
      <Route path="/mixoinfo" element={<MixoInfo />} />
      <Route path="/fadoinfo" element={<FadoInfo />} />
      <Route path="/knoboinfo" element={<KnoboInfo />} />
      <Route path="/loopoinfo" element={<LoopoInfo />} />
    </Routes>
  );
}

export default App;
