import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WavoLoadingScreenProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const WavoLoadingScreen: React.FC<WavoLoadingScreenProps> = ({ isVisible, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [startTime] = useState(Date.now());
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Progreso optimizado para fluidez
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / 4100) * 100, 100);
        
        // Solo actualizar si hay un cambio significativo
        setProgress(prevProgress => {
          if (Math.abs(prevProgress - newProgress) >= 1 || newProgress >= 100) {
            return newProgress;
          }
          return prevProgress;
        });
        
        if (newProgress >= 100) {
          clearInterval(interval);
          // Limpiar el video antes de completar
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
          onComplete?.();
        }
      }, 100);

      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isVisible, startTime]);

  // Control del video optimizado para fluidez
  useEffect(() => {
    if (videoRef.current && isVisible) {
      const video = videoRef.current;
      
      video.playbackRate = 1.0;
      video.volume = 0;
      
      const handleCanPlay = () => {
        console.log('🎬 Video puede reproducirse');
        setVideoLoaded(true);
        video.play().catch(error => {
          console.error('❌ Error reproduciendo video:', error);
          setVideoError(true);
        });
      };

      const handleError = (e: Event) => {
        console.error('❌ Error cargando video:', e);
        setVideoError(true);
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);

      video.load();

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
      };
    } else if (videoRef.current && !isVisible) {
      const video = videoRef.current;
      video.pause();
      video.currentTime = 0;
      setVideoLoaded(false);
      setVideoError(false);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            overflow: 'hidden'
          }}
        >
          {/* Video de fondo */}
          <video
            ref={videoRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -2
            }}
            muted
            loop
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
            autoPlay
          >
            <source src={`${import.meta.env.BASE_URL}videos/video.mp4`} type="video/mp4" />
            <img 
              src={`${import.meta.env.BASE_URL}textures/carga.jpg`} 
              alt="Loading background" 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </video>

          {/* Overlay para mejorar legibilidad */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: -1
            }}
          />

          {/* Logo WAVO */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              fontSize: '36px',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: '#00FFFF',
              textShadow: '0 0 20px #00FFFF, 0 0 40px #00FFFF',
              position: 'relative',
              zIndex: 1,
              letterSpacing: '4px'
            }}
          >
            WAVO
          </motion.div>

          {/* Subtítulo */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '40px',
              color: '#FFFFFF',
              textShadow: '0 0 15px #FFFFFF',
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
              maxWidth: '80%'
            }}
          >
            Features: Analog hybrid synthesizer with step sequencer and custom keybed.
          </motion.div>

          {/* Spinner animado */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{
              width: '100px',
              height: '100px',
              border: '6px solid rgba(0, 255, 255, 0.3)',
              borderTop: '6px solid #00FFFF',
              borderRadius: '50%',
              marginBottom: '40px',
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.8)',
              position: 'relative',
              zIndex: 1
            }}
          />
          
          {/* Texto de carga específico */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '20px',
              color: '#00FFFF',
              textShadow: '0 0 15px #00FFFF',
              position: 'relative',
              zIndex: 1
            }}
          >
            Cargando WAVO... {Math.round(progress)}%
          </motion.div>

          {/* Mensaje cuando está al 100% */}
          {progress >= 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{
                fontSize: '18px',
                color: '#00FF80',
                fontWeight: 'bold',
                marginBottom: '30px',
                textShadow: '0 0 15px #00FF80',
                position: 'relative',
                zIndex: 1
              }}
            >
              ¡WAVO listo para configurar!
            </motion.div>
          )}
          
          {/* Barra de progreso */}
          <motion.div
            style={{
              width: '400px',
              height: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
              marginBottom: '40px',
              position: 'relative',
              zIndex: 1
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, #00FFFF, #00CCFF, #00FFFF)',
                borderRadius: '4px',
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite'
              }}
            />
          </motion.div>

          {/* Puntos animados */}
          <motion.div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '20px',
              position: 'relative',
              zIndex: 1
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#00FFFF',
                  borderRadius: '50%',
                  boxShadow: '0 0 15px rgba(0, 255, 255, 0.8)'
                }}
              />
            ))}
          </motion.div>

          <style>{`
            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WavoLoadingScreen;
