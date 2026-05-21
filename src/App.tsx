import React, { useLayoutEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './components/hero/Hero';
import Newbeato16 from './sections/Newbeato16';
import ProductsPage from './components/products/ProductsPage';
import KeyDataSection from './components/sections/KeyDataSection';
import TimelineSection from './components/sections/TimelineSection';
import Footer from './components/sections/Footer';
import GlobalParallax from './components/parallax/GlobalParallax';
import FullscreenToggle from './components/ui/FullscreenToggle';
import Navbar from './components/layout/Navbar';
import ConfiguratorApp from './configurator/App';
import Beato16Info from './pages/Beato16Info';
import Beato8Info from './pages/Beato8Info';
import MixoInfo from './pages/MixoInfo';
import FadoInfo from './pages/FadoInfo';
import KnoboInfo from './pages/KnoboInfo';
import LoopoInfo from './pages/LoopoInfo';
import WavoInfo from './pages/WavoInfo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

// Main layout for the original single-page content
const MainLayout = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 0.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -15 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    // Use only the gsap ticker — avoids double RAF update
    const onTick = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(onTick);
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
      gsap.ticker.remove(onTick);
      lenis.destroy();
      snapTriggers.forEach(trigger => trigger?.kill());
    };
  }, []);

  return (
    <div className="relative bg-dark-900 text-white">
      <GlobalParallax />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 plasma-bg" />
      </div>
      <Navbar />
      <FullscreenToggle />
      <div ref={containerRef}>
        <section id="inicio" className="section-snap relative h-screen w-full overflow-hidden"><Hero /></section>
        <section id="beato16" className="section-snap relative h-screen w-full overflow-hidden"><Newbeato16 /></section>
        <section id="productos" className="section-snap relative h-screen w-full overflow-hidden"><ProductsPage /></section>
        <section id="numeros" className="section-snap relative h-screen w-full overflow-hidden"><KeyDataSection /></section>
        <section id="eventos" className="section-snap relative h-[200vh] w-full overflow-hidden"><TimelineSection /></section>
        <section id="contacto" className="section-snap relative h-screen w-full overflow-hidden"><Footer /></section>
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
      <Route path="/wavoinfo" element={<WavoInfo />} />
    </Routes>
  );
}

export default App;
