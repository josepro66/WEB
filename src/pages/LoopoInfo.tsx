import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LoopoViewer from '../components/3d/LoopoViewer';
import ImageCarousel from '../components/ui/ImageCarousel';

const LoopoInfo: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Header */}
      <header className="relative z-10 p-1">
        <Link 
          to="/" 
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al inicio
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative pb-20 px-1">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-7xl font-bold tracking-wider font-chakra bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ease-in-out hover:tracking-widest hover:scale-105" style={{ textShadow: '0 0 15px rgba(6, 182, 212, 0.5), 0 0 25px rgba(192, 38, 211, 0.3)' }}>LOOPO</h1>
          </motion.div>

          {/* Product 3D Viewer and First Description Side by Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center justify-between mb-8"
          >
            {/* 3D Model */}
            <div className="relative w-1/2 -ml-8">
              <div className="pointer-events-none absolute -inset-10 rounded-3xl bg-gradient-to-tr from-green-500/20 to-teal-500/20 blur-2xl" />
              <div className="relative rounded-3xl border border-white/10 bg-transparent p-2 backdrop-blur-xl">
                <LoopoViewer className="h-[500px] w-full scale-100" />
              </div>
            </div>

            {/* First Description Text */}
            <div className="w-1/2 pl-8">
              <p className="text-xl text-gray-300 font-gotham leading-relaxed">
                Loopo es la herramienta definitiva para la creación de loops y performance en vivo. Captura, reproduce y manipula audio en tiempo real con una interfaz diseñada para la máxima creatividad y un flujo de trabajo ininterrumpido.
              </p>
            </div>
          </motion.div>

          {/* Second Description Text Below */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-16"
          >
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-300 font-gotham leading-relaxed">
                Construye paisajes sonoros evolutivos, desde ritmos de beatbox crudos hasta texturas ambientales etéreas. Con Loopo, el poder de esculpir el sonido capa por capa reside en la punta de tus dedos, transformando ideas fugaces en complejas sinfonías sónicas.
              </p>
            </div>
          </motion.div>

          {/* Text and Image Carousel Side by Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center justify-between mb-16"
          >
            {/* Text Content */}
            <div className="w-1/2 pr-8">
              <h2 className="text-3xl font-bold mb-6 text-cyan-400">Creatividad sin Límites</h2>
              <p className="text-xl text-gray-300 font-gotham leading-relaxed">
                Con múltiples pistas de loop, efectos integrados y opciones de sincronización avanzadas, Loopo se integra perfectamente con tu DAW o puede funcionar como una unidad independiente para jamming y experimentación.
              </p>
            </div>
            
            {/* Image Carousel */}
            <div className="w-1/2">
              <ImageCarousel className="w-full" />
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">8 Pistas de Loop</h3>
              <p className="text-gray-300">Graba y reproduce hasta 8 loops estéreo de forma independiente o sincronizada.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Efectos Integrados</h3>
              <p className="text-gray-300">Añade reverb, delay, stutter y otros efectos a tus loops en tiempo real.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Sincronización MIDI</h3>
              <p className="text-gray-300">Mantén tus loops perfectamente sincronizados con otros equipos y software.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Almacenamiento SD</h3>
              <p className="text-gray-300">Guarda y carga tus sesiones de looping en una tarjeta SD.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Batería Recargable</h3>
              <p className="text-gray-300">Crea en cualquier lugar gracias a su batería interna de larga duración.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Construcción Robusta</h3>
              <p className="text-gray-300">Diseñado para soportar la intensidad de las presentaciones en vivo.</p>
            </div>
          </motion.div>

          {/* Specifications */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-lg border border-cyan-500/20 mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">Especificaciones Técnicas</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-cyan-300">Funcionalidad</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• 8 pistas estéreo simultáneas</li>
                  <li>• Tiempo de grabación de hasta 3 horas</li>
                  <li>• 99 memorias de frases</li>
                  <li>• Overdubbing ilimitado</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-cyan-300">Conectividad</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Entradas y salidas estéreo (L/R)</li>
                  <li>• USB-C para audio y MIDI</li>
                  <li>• MIDI In/Out/Thru</li>
                  <li>• Ranura para tarjeta SD</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.location.href = '/configurator?product=loopo';
                }}
              >
                Configurar LOOPO
              </motion.button>
              
              <motion.button
                className="px-8 py-4 bg-gray-800/50 backdrop-blur-sm text-white font-semibold rounded-full border border-cyan-500/50 hover:border-cyan-400 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.location.href = '/#productos';
                }}
              >
                Ver todos los productos
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default LoopoInfo;