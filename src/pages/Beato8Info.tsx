import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Beato8ControllerViewer from '../components/3d/Beato8ControllerViewer'
import ImageCarousel from '../components/ui/ImageCarousel'

const Beato8Info: React.FC = () => {
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
            <h1 className="text-7xl font-bold tracking-wider font-chakra bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ease-in-out hover:tracking-widest hover:scale-105" style={{ textShadow: '0 0 15px rgba(6, 182, 212, 0.5), 0 0 25px rgba(192, 38, 211, 0.3)' }}>BEATO8</h1>
            <p className="text-xl text-gray-300 font-gotham">
              Controlador MIDI Compacto y Potente
            </p>
          </motion.div>

          {/* Product 3D Viewer and First Description Side by Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center justify-between mb-8"
          >
            {/* 3D Model */}
            <div className="relative w-1/2 -ml-16">
              <div className="pointer-events-none absolute -inset-10 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-fuchsia-500/20 blur-2xl" />
              <div className="relative rounded-3xl border border-white/10 bg-transparent p-2 backdrop-blur-xl">
                <Beato8ControllerViewer className="h-[500px] w-full scale-100" transparent={true} />
              </div>
            </div>

            {/* First Description Text */}
            <div className="w-1/2 pl-8">
              <p className="text-xl text-gray-300 font-gotham leading-relaxed">
                El BEATO8 es un controlador MIDI compacto y potente diseñado para productores que buscan versatilidad en un formato reducido. Con 8 botones arcade de alta calidad y 4 knobs asignables, ofrece un control preciso y expresivo para cualquier flujo de trabajo musical.
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
                Su construcción metálica robusta y diseño ergonómico lo hacen ideal para uso en estudio y presentaciones en vivo, proporcionando la confiabilidad que necesitas para tus proyectos más importantes.
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
              <h2 className="text-3xl font-bold mb-6 text-cyan-400">Diseño y Construcción</h2>
              <p className="text-xl text-gray-300 font-gotham leading-relaxed">
                Con una construcción metálica robusta y un diseño compacto, el BEATO8 es perfecto para productores que necesitan un controlador confiable y portátil que se integre perfectamente en cualquier configuración de estudio.
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
              <h3 className="text-xl font-bold text-cyan-400 mb-3">8 Botones Arcade</h3>
              <p className="text-gray-300">Botones de alta calidad con respuesta táctil precisa para máxima expresividad.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">4 Knobs Asignables</h3>
              <p className="text-gray-300">Perillas de control rotativas para ajustes finos de parámetros en tiempo real.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Cuerpo Metálico</h3>
              <p className="text-gray-300">Construcción robusta con materiales de alta calidad para uso profesional.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">USB-C</h3>
              <p className="text-gray-300">Conexión MIDI a través de un puerto USB-C moderno y reversible.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Plug & Play</h3>
              <p className="text-gray-300">Compatible con todos los DAWs principales sin necesidad de drivers.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Diseño Compacto</h3>
              <p className="text-gray-300">Formato reducido perfecto para espacios de trabajo limitados.</p>
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
                <h3 className="text-xl font-semibold mb-4 text-cyan-300">Controles</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• 8 botones arcade de alta calidad</li>
                  <li>• 4 knobs asignables</li>
                  <li>• Cuerpo metálico robusto</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-cyan-300">Conectividad</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Conexión MIDI por USB-C</li>
                  <li>• Compatible con Windows, Mac, Linux</li>
                  <li>• Plug & Play con todos los DAWs</li>
                  <li>• Latencia ultra-baja</li>
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
              <p className="text-5xl font-bold text-white">$750.000 COP</p>
              <p className="text-sm text-gray-400 mt-1">(El envío no está incluido en el precio)</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Ir al configurador con parámetro de producto
                  window.location.href = '/configurator?product=beato8';
                }}
              >
                Configurar BEATO8
              </motion.button>
              
              <motion.button
                className="px-8 py-4 bg-gray-800/50 backdrop-blur-sm text-white font-semibold rounded-full border border-cyan-500/50 hover:border-cyan-400 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Ir a la página principal y hacer scroll a la sección de productos
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
  )
}

export default Beato8Info
