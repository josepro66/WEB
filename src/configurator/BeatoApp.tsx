import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import MidiConfigurator from './BeatoConfigurator';

interface User {
  name: string;
  email: string;
}

const BeatoApp: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si hay un usuario logueado al cargar la app
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
    setIsLoading(false);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('beato_currentUser');
    setCurrentUser(null);
  };

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

  // Si hay usuario logueado, mostrar el configurador
  return <MidiConfigurator currentUser={currentUser} onLogout={handleLogout} />;
};

export default BeatoApp;


