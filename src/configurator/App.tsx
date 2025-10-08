import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import BeatoLoadingScreen from './components/BeatoLoadingScreen';
import SkeletonLoader from './components/SkeletonLoader';
import ErrorBoundary from './components/ErrorBoundary';
import LoginPage from './LoginPage';
import { useModelReady } from './hooks/useModelReady';
import { usePrefetch } from './hooks/usePrefetch';

// Imports lazy para componentes pesados
import {
  PagoFinalizado,
  ConfiguratorWrapper
} from './lazy/components';

// Imports para componentes con pantallas de carga específicas
import Beato8WithLoading from './components/Beato8WithLoading';
import Beato16WithLoading from './components/Beato16WithLoading';
import KnoboWithLoading from './components/KnoboWithLoading';
import MixoWithLoading from './components/MixoWithLoading';
import LoopoWithLoading from './components/LoopoWithLoading';
import FadoWithLoading from './components/FadoWithLoading';

interface User {
  name: string;
  email: string;
}

function App() {
  const [currentProduct, setCurrentProduct] = useState<'beato8' | 'knobo' | 'mixo' | 'beato16' | 'loopo' | 'fado'>('beato8');
  console.log('Current product state:', currentProduct);
  const [showPaymentResult, setShowPaymentResult] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoading: modelLoading } = useModelReady();
  const { prefetchOnHover, prefetchOnIntersection } = usePrefetch();
  
  // Ref para el botón de configurar (para prefetch en viewport)
  const configButtonRef = useRef<HTMLButtonElement>(null);

  // Verificar si hay un usuario logueado al cargar la app y leer parámetros URL
  useEffect(() => {
    const savedUser = localStorage.getItem('beato_currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
      } catch (e) {
        console.error('Error parsing saved user:', e);
        localStorage.removeItem('beato_currentUser');
      }
    }
    
    // Verificar parámetros de URL al cargar
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get('product');
    console.log('URL params:', window.location.search);
    console.log('Product param:', productParam);
    if (productParam && ['beato8', 'knobo', 'mixo', 'beato16', 'loopo', 'fado'].includes(productParam)) {
      console.log('Setting product to:', productParam);
      setCurrentProduct(productParam as 'beato8' | 'knobo' | 'mixo' | 'beato16' | 'loopo' | 'fado');
    }
    
    setIsLoading(false);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('beato_currentUser');
    setCurrentUser(null);
  };

  // Verificar si estamos en la página de pago finalizado
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hasPaymentParams = urlParams.has('referenceCode') || urlParams.has('reference_sale') || 
                            urlParams.has('status') || urlParams.has('state_pol');
    
    if (hasPaymentParams) {
      setShowPaymentResult(true);
      setPaymentData({
        referenceCode: urlParams.get('referenceCode') || urlParams.get('reference_sale'),
        status: urlParams.get('status') || urlParams.get('state_pol'),
        amount: urlParams.get('amount') || urlParams.get('value'),
        currency: urlParams.get('currency'),
        description: urlParams.get('description'),
        transactionId: urlParams.get('transaction_id') || urlParams.get('transactionId')
      });
    }
  }, []);

  // Detección de móvil y orientación
  useEffect(() => {
    const checkDeviceAndOrientation = () => {
      const userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const screenSize = window.innerWidth <= 768;
      setIsMobile(userAgent || screenSize);
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    
    checkDeviceAndOrientation();
    window.addEventListener('resize', checkDeviceAndOrientation);
    window.addEventListener('orientationchange', checkDeviceAndOrientation);
    
    return () => {
      window.removeEventListener('resize', checkDeviceAndOrientation);
      window.removeEventListener('orientationchange', checkDeviceAndOrientation);
    };
  }, []);

  // Prefetch del configurador cuando el botón entra en viewport
  useEffect(() => {
    if (configButtonRef.current) {
      prefetchOnIntersection(() => import('./components/Beato8WithLoading'), configButtonRef.current);
    }
  }, [prefetchOnIntersection]);

  // Escuchar evento personalizado para cambiar producto
  useEffect(() => {
    const handleSetProduct = (event: CustomEvent) => {
      const product = event.detail;
      if (['beato8', 'knobo', 'mixo', 'beato16', 'loopo', 'fado'].includes(product)) {
        setCurrentProduct(product as 'beato8' | 'knobo' | 'mixo' | 'beato16' | 'loopo' | 'fado');
      }
    };

    window.addEventListener('setProduct', handleSetProduct as EventListener);
    
    return () => {
      window.removeEventListener('setProduct', handleSetProduct as EventListener);
    };
  }, []);

  const handleProductChange = (product: 'beato8' | 'knobo' | 'mixo' | 'beato16' | 'loopo' | 'fado') => {
    setCurrentProduct(product);
  };

  // Función para prefetch específico según el producto
  const handleProductHover = (product: 'beato8' | 'knobo' | 'mixo' | 'beato16' | 'loopo' | 'fado') => {
    const lazyImports = {
      beato8: () => import('./components/Beato8WithLoading'),
      beato16: () => import('./components/Beato16WithLoading'),
      knobo: () => import('./components/KnoboWithLoading'),
      mixo: () => import('./components/MixoWithLoading'),
      loopo: () => import('./components/LoopoWithLoading'),
      fado: () => import('./components/FadoWithLoading')
    };
    
    prefetchOnHover(lazyImports[product], {} as React.MouseEvent);
  };

  const menuItems = [
    { id: 'beato8', name: 'BEATO8', icon: 'textures/beato.png', isImage: true },
    { id: 'beato16', name: 'BEATO16', icon: 'textures/beato16.png', isImage: true },
    { id: 'knobo', name: 'KNOBO', icon: 'textures/knobo.png', isImage: true },
    { id: 'mixo', name: 'MIXO', icon: 'textures/mixo.png', isImage: true },
    { id: 'loopo', name: 'LOOPO', icon: 'textures/loopo.png', isImage: true },
    { id: 'fado', name: 'FADO', icon: 'textures/fado.png', isImage: true }
  ] as const;

  // Mostrar loading mientras se verifica el usuario
  if (isLoading) {
    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, #0b1220 0%, #1a1a2e 50%, #16213e 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div 
            style={{
              width: '50px',
              height: '50px',
              border: '3px solid #a259ff',
              borderTop: '3px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}
          />
          <p style={{ fontSize: '1.2rem', color: '#e5e7eb' }}>Cargando...</p>
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  // Si no hay usuario logueado, mostrar página de login
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Si estamos en la página de pago finalizado, mostrar solo esa página con lazy loading
  if (showPaymentResult) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<SkeletonLoader type="payment" />}>
          <PagoFinalizado />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return (
    <div className={`App ${isMobile ? 'mobile-device' : ''}`}>
      {/* Pantalla de rotación para móviles */}
      {isMobile && !isLandscape && (
        <div className="rotate-screen-overlay">
          <div className="rotate-screen-content">
            <div className="rotate-icon">📱</div>
            <h2>Gira tu dispositivo</h2>
            <p>Para una mejor experiencia, usa el configurador en modo horizontal</p>
            <div className="rotate-arrow">↻</div>
          </div>
        </div>
      )}

      {/* Pantalla de carga global */}
      <BeatoLoadingScreen isVisible={modelLoading} />

      {/* Navigation Menu */}
      <div className="product-menu">
        {menuItems.map((item) => (
          <button 
            className="product-menu-item"
            key={item.id}
            onClick={() => handleProductChange(item.id)}
            ref={item.id === 'beato8' ? configButtonRef : undefined}
            style={{
              backgroundColor: currentProduct === item.id ? 'rgba(4, 19, 19, 0.3)' : 'transparent',
              background: currentProduct === item.id ? 'linear-gradient(135deg, rgba(0, 255, 255, 0.3) 0%, rgba(0, 128, 255, 0.2) 100%)' : 'transparent',
              border: currentProduct === item.id ? '1px solid #00FFFF' : '1px solid rgba(0, 255, 255, 0.3)',
              color: currentProduct === item.id ? '#00FFFF' : '#ffffff',
              boxShadow: currentProduct === item.id ? '0 0 8px 2px rgba(0, 255, 255, 0.4)' : 'none'
            }}
            onMouseEnter={(e) => {
              // Prefetch del configurador cuando el usuario hace hover
              handleProductHover(item.id);
              
              if (currentProduct !== item.id) {
                e.currentTarget.style.backgroundColor = 'rgba(0, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateX(3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 255, 255, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentProduct !== item.id) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateX(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {item.isImage ? (
              <img 
                src={item.icon} 
                alt={item.name}
                style={{ 
                  width: '30px', 
                  height: '30px', 
                  objectFit: 'contain',
                  filter: currentProduct === item.id ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' : 'none'
                }}
                onError={(e) => {
                  console.error('Error loading image:', item.icon);
                  console.log('Attempted to load:', item.icon);
                  // Mostrar un icono por defecto si la imagen falla
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <span style={{ fontSize: '14px', filter: currentProduct === item.id ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' : 'none' }}>
                {item.icon}
              </span>
            )}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '8px', fontWeight: 'bold', marginBottom: '1px' }}>
                {item.name}
              </div>
            </div>
            {currentProduct === item.id && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '2px',
                height: '50%',
                backgroundColor: '#00FFFF',
                borderRadius: '1px',
                boxShadow: '0 0 4px 1px rgba(6, 27, 27, 0.6)'
              }} />
            )}
          </button>
        ))}
      </div>

      {/* Main Content con lazy loading */}
      <main className="canvas-wrap">
        <ErrorBoundary>
          <Suspense fallback={<SkeletonLoader type="configurator" />}>
            <ConfiguratorWrapper>
              {currentProduct === 'beato8' && <Beato8WithLoading currentUser={currentUser} onLogout={handleLogout} />}
              {currentProduct === 'knobo' && <KnoboWithLoading currentUser={currentUser} onLogout={handleLogout} />}
              {currentProduct === 'mixo' && <MixoWithLoading currentUser={currentUser} onLogout={handleLogout} />}
              {currentProduct === 'beato16' && <Beato16WithLoading currentUser={currentUser} onLogout={handleLogout} />}
              {currentProduct === 'loopo' && <LoopoWithLoading currentUser={currentUser} onLogout={handleLogout} />}
              {currentProduct === 'fado' && <FadoWithLoading currentUser={currentUser} onLogout={handleLogout} />}
            </ConfiguratorWrapper>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;