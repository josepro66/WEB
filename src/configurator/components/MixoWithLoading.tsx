import React, { useState, useEffect } from 'react';
import MixoLoadingScreen from './MixoLoadingScreen';
import MixoConfigurator from '../MixoConfigurator';

interface User {
  name: string;
  email: string;
}

interface MixoWithLoadingProps {
  className?: string;
  style?: React.CSSProperties;
  currentUser: User;
  onLogout: () => void;
}

const MixoWithLoading: React.FC<MixoWithLoadingProps> = ({
  className = '',
  style = {},
  currentUser,
  onLogout
}) => {
  const [ready, setReady] = useState(false);
  const [startTime] = useState(Date.now());

  // Forzar exactamente 4.1 segundos de loading
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Tiempo mínimo de 4.1 segundos completado para MIXO');
      setReady(true);
    }, 4100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={className} style={style}>
      <MixoLoadingScreen isVisible={!ready} />

      <div
        style={{
          width: '100%',
          height: '100%',
          opacity: ready ? 1 : 0
        }}
      >
        <MixoConfigurator currentUser={currentUser} onLogout={onLogout} />
      </div>
    </div>
  );
};

export default MixoWithLoading;
