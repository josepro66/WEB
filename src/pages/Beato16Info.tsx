import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ControllerViewer from '../components/3d/ControllerViewer'
import ImageCarousel from '../components/ui/ImageCarousel'

const Beato16Info: React.FC = () => {
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
            <h1 className="text-7xl font-bold tracking-wider font-chakra bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ease-in-out hover:tracking-widest hover:scale-105" style={{ textShadow: '0 0 15px rgba(6, 182, 212, 0.5), 0 0 25px rgba(192, 38, 211, 0.3)' }}>BEATO16</h1>
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
                <ControllerViewer className="h-[500px] w-full scale-100" transparent={true} />
              </div>
            </div>

            {/* First Description Text */}
            <div className="w-1/2 pl-8">
              <p className="text-xl text-gray-300 font-gotham leading-relaxed">
                El nuevo Beato16 es un controlador MIDI diseñado para ofrecer una experiencia táctil y dinámica. Equipado con cuatro teclas táctiles estilo juego —perfectas para octavar, grabar o realizar funciones rápidas en su flujo de trabajo—, así como 16 botones arcade, un fader y cuatro perillas, ofrece una respuesta rápida y precisa para producción musical, presentaciones en vivo y otras aplicaciones interactivas.
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
                Su versatilidad no se limita a la música: también se puede utilizar como macro pad, optimizando flujos de trabajo en software como Ableton Live, Resolume, Unity o cualquier aplicación compatible con MIDI.
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
                Con una construcción robusta y un diseño intuitivo, el Beato16 es ideal para tocar la batería con los dedos y, más ampliamente, para creadores digitales que buscan un controlador flexible y potente que sea fácil de integrar en su configuración.
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
              <h3 className="text-xl font-bold text-cyan-400 mb-3">16 Botones RGB</h3>
              <p className="text-gray-300">Botones iluminados personalizables para máxima visibilidad en cualquier ambiente.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">4 Faders</h3>
              <p className="text-gray-300">Controladores deslizantes de alta precisión para mezcla y efectos en tiempo real.</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">4 Knobs</h3>
              <p className="text-gray-300">Perillas de control rotativas para ajustes finos de parámetros.</p>
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
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Diseño Premium</h3>
              <p className="text-gray-300">Construcción robusta con materiales de alta calidad para uso profesional.</p>
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
                  <li>• 16 botones RGB personalizables</li>
                  <li>• 4 faders de 60mm</li>
                  <li>• 4 knobs de control</li>
                  <li>• 4 botones de función</li>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Ir al configurador con parámetro de producto
                  window.location.href = '/configurator?product=beato16';
                }}
              >
                Configurar BEATO16
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

export default Beato16Info

