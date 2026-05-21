import React, { useState, useEffect } from 'react';
import WavoLoadingScreen from './WavoLoadingScreen';
import WavoConfigurator from '../WavoConfigurator';

interface User {
  name: string;
  email: string;
}

interface WavoWithLoadingProps {
  className?: string;
  style?: React.CSSProperties;
  currentUser: User;
  onLogout: () => void;
}

const WavoWithLoading: React.FC<WavoWithLoadingProps> = ({
  className = '',
  style = {},
  currentUser,
  onLogout
}) => {
  const [ready, setReady] = useState(false);

  // Forzar exactamente 4.1 segundos de loading
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Tiempo mínimo de 4.1 segundos completado para WAVO');
      setReady(true);
    }, 4100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={className} style={style}>
      <WavoLoadingScreen isVisible={!ready} />

      <div
        style={{
          width: '100%',
          height: '100%',
          opacity: ready ? 1 : 0
        }}
      >
        <WavoConfigurator currentUser={currentUser} onLogout={onLogout} />
      </div>
    </div>
  );
};

export default WavoWithLoading;
