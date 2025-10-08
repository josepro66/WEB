import React, { useEffect, useRef } from 'react';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';

interface ImageCarouselProps {
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ className = '' }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainRef.current && thumbnailsRef.current) {
      const main = new Splide('#main-slider', {
        type: 'fade',
        heightRatio: 0.5,
        pagination: false,
        arrows: false,
        cover: true,
      });

      const thumbnails = new Splide('#thumbnail-slider', {
        rewind: true,
        fixedWidth: 104,
        fixedHeight: 58,
        isNavigation: true,
        gap: 10,
        focus: 'center',
        pagination: false,
        cover: true,
        dragMinThreshold: {
          mouse: 4,
          touch: 10,
        },
        breakpoints: {
          640: {
            fixedWidth: 66,
            fixedHeight: 38,
          },
        },
      });

      main.sync(thumbnails);
      main.mount();
      thumbnails.mount();

      return () => {
        main.destroy();
        thumbnails.destroy();
      };
    }
  }, []);

  const images = [
    {
      src: 'images/imagenesbeato16/mixogris 3-4.8.png',
      alt: 'Mixogris 3-4.8'
    },
    {
      src: 'images/imagenesbeato16/mixogris arriba.png',
      alt: 'Mixogris Arriba'
    },
    {
      src: 'images/imagenesbeato16/mixogris atras.png',
      alt: 'Mixogris Atrás'
    },
    {
      src: 'images/imagenesbeato16/mixogris frontal.png',
      alt: 'Mixogris Frontal'
    }
  ];

  return (
    <div className={className}>
      {/* Main Slider */}
      <div id="main-slider" className="splide mb-4" ref={mainRef} style={{ height: '500px' }}>
        <div className="splide__track">
          <ul className="splide__list">
            {images.map((image, index) => (
              <li key={index} className="splide__slide">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-lg"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Thumbnail Slider */}
      <div id="thumbnail-slider" className="splide" ref={thumbnailsRef}>
        <div className="splide__track">
          <ul className="splide__list">
            {images.map((image, index) => (
              <li key={index} className="splide__slide">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded cursor-pointer"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
