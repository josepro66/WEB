import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FullscreenToggle: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si estamos en pantalla completa al cargar
    const checkFullscreen = () => {
      const fullscreenElement = document.fullscreenElement || 
                               (document as any).webkitFullscreenElement || 
                               (document as any).mozFullScreenElement || 
                               (document as any).msFullscreenElement;
      setIsFullscreen(!!fullscreenElement);
    };

    // Mostrar el botón después de 2 segundos
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Verificar estado inicial
    checkFullscreen();

    // Escuchar cambios de pantalla completa
    const events = [
      'fullscreenchange',
      'webkitfullscreenchange', 
      'mozfullscreenchange',
      'MSFullscreenChange'
    ];

    events.forEach(event => {
      document.addEventListener(event, checkFullscreen);
    });

    return () => {
      clearTimeout(showTimer);
      events.forEach(event => {
        document.removeEventListener(event, checkFullscreen);
      });
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        // Entrar a pantalla completa
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        } else if ((document.documentElement as any).webkitRequestFullscreen) {
          await (document.documentElement as any).webkitRequestFullscreen();
        } else if ((document.documentElement as any).mozRequestFullScreen) {
          await (document.documentElement as any).mozRequestFullScreen();
        } else if ((document.documentElement as any).msRequestFullscreen) {
          await (document.documentElement as any).msRequestFullscreen();
        }
      } else {
        // Salir de pantalla completa
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          await (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      }
    } catch (error) {
      console.log('Error al cambiar pantalla completa:', error);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-4 right-4 z-50"
        >
          <motion.button
            onClick={toggleFullscreen}
            className="group relative p-3 bg-black/20 backdrop-blur-sm border border-cyan-400/30 rounded-lg hover:bg-black/40 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Icono */}
            <div className="relative z-10">
              {isFullscreen ? (
                // Icono para salir de pantalla completa
                <svg 
                  className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5" 
                  />
                </svg>
              ) : (
                // Icono para entrar a pantalla completa
                <svg 
                  className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" 
                  />
                </svg>
              )}
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullscreenToggle;