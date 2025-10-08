import React, { useEffect } from 'react';

const GlobalParallax: React.FC = () => {
  useEffect(() => {
    console.log('Parallax disabled temporarily');
    
    // Parallax temporalmente deshabilitado debido a problemas de importación
    // TODO: Reinstalar simple-parallax-js correctamente
    
    return () => {
      console.log('Parallax cleanup completed');
    };
  }, []);

  return (
    <style>{`
      /* Estilos para mejorar el efecto parallax */
      .hero-3d-model,
      .hero-text,
      .hero-buttons,
      .beato16-3d,
      .beato16-text,
      .beato16-buttons,
      .product-card,
      .products-title,
      .bg-grid,
      .plasma-bg {
        will-change: transform;
        backface-visibility: hidden;
        transform-style: preserve-3d;
      }
    `}</style>
  );
};

export default GlobalParallax;