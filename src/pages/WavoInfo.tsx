import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import WavoViewer from '../components/3d/WavoViewer';
import ImageCarousel from '../components/ui/ImageCarousel';

const WavoInfo: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Header */}
      <header className="relative z-10 p-4">
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
      <section className="relative pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-7xl font-bold tracking-wider font-chakra bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ease-in-out hover:tracking-widest hover:scale-105" style={{ textShadow: '0 0 15px rgba(6, 182, 212, 0.5), 0 0 25px rgba(192, 38, 211, 0.3)' }}>WAVO</h1>
          </motion.div>

          {/* Product 3D Viewer and First Description Side by Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-8"
          >
            {/* 3D Model */}
            <div className="relative w-full lg:w-1/2">
              <div className="pointer-events-none absolute -inset-10 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-2xl" />
              <div className="relative rounded-3xl border border-white/10 bg-transparent p-2 backdrop-blur-xl">
                <WavoViewer className="h-[500px] w-full scale-100" />
              </div>
            </div>

            {/* First Description Text */}
            <div className="w-full lg:w-1/2 pl-0 lg:pl-8">
              <p className="text-xl text-gray-300 font-gotham leading-relaxed">
                Wavo es un sintetizador híbrido analógico-digital de última generación diseñado para productores, músicos y diseñadores sonoros que buscan una identidad acústica única. Con un motor sonoro potente y controles interactivos en tiempo real, Wavo te permite modular ondas, programar secuencias complejas y experimentar con un keybed ultra responsivo. Todo esto alojado en un chasis robusto de metal completamente personalizable en colores de carcasa, perillas, botones y teclas, adaptándose visualmente a tu estudio o presentación en vivo.
              </p>
            </div>
          </motion.div>

          {/* Text and Image Carousel Side by Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-8"
          >
            {/* Text Content */}
            <div className="w-full lg:w-1/2 pr-0 lg:pr-8">
              <h2 className="text-3xl font-bold mb-6 text-cyan-400">Síntesis Dinámica e Intuitiva</h2>
              <p className="text-xl text-gray-300 font-gotham leading-relaxed">
                Modula y esculpe tus frecuencias favoritas al instante. Su interfaz física maximiza la ergonomía y reduce la latencia creativa. Desde cálidos bajos analógicos hasta pads digitales expansivos, Wavo responde fielmente a cada pulsación de su teclado y ajuste de sus potenciómetros de alta calidad.
              </p>
            </div>
            
            {/* Image Carousel */}
            <div className="w-full lg:w-1/2">
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
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Síntesis Híbrida</h3>
              <p className="text-gray-300">Combinación perfecta de osciladores analógicos robustos y motores digitales versátiles.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Secuenciador Integrado</h3>
              <p className="text-gray-300">Secuenciador por pasos integrado para crear loops rítmicos y melódicos al instante.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Teclado Personalizado</h3>
              <p className="text-gray-300">Keybed interactivo de alta calidad con respuesta táctil y feedback visual ajustable.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Conexión Profesional</h3>
              <p className="text-gray-300">Conectores MIDI por USB-C y salidas analógicas TRS listas para cualquier consola o tarjeta de sonido.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Totalmente Personalizable</h3>
              <p className="text-gray-300">Personaliza los colores del chasis, potenciómetros, pulsadores y teclas a través de nuestro configurador 3D.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Pantalla Interactiva</h3>
              <p className="text-gray-300">Monitorea oscilaciones, ondas y configuraciones del sintetizador en su panel retroiluminado.</p>
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
                <h3 className="text-xl font-semibold mb-4 text-cyan-300">Generación de Sonido</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Osciladores analógicos duales (Saw, Square, Triangle)</li>
                  <li>• Oscilador digital de tabla de ondas</li>
                  <li>• Filtro resonante analógico y sección VCA dedicada</li>
                  <li>• LFO multifunción y envolvente ADSR asignables</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-cyan-300">Hardware y Chasis</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Chasis metálico de alta resistencia</li>
                  <li>• Teclado dinámico de perfil bajo</li>
                  <li>• 7 botones arcade integrados y 7 potenciómetros</li>
                  <li>• Conectores TRS Audio Out, MIDI In/Out y USB-C</li>
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
            <div className="mb-6">
              <p className="text-5xl font-bold text-white">$2.000.000 COP</p>
              <p className="text-sm text-gray-400 mt-1">(El envío no está incluido en el precio)</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.location.href = '/configurator?product=wavo';
                }}
              >
                Configurar WAVO
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

export default WavoInfo;
