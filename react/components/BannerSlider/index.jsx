import React, { useEffect, useRef, useState, useCallback } from 'react';

const SWIPER_CSS_PATH = 'https://cdn.jsdelivr.net/npm/swiper@8.0.6/swiper-bundle.min.css';
const SWIPER_JS_PATH = 'https://cdn.jsdelivr.net/npm/swiper@8.0.6/swiper-bundle.min.js';

function ImageComponent({ imageItems }) {
  const swiperContainerRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isSwiperInitialized, setIsSwiperInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    const images = document.querySelectorAll('.swiper-slide img');
    const loadedImages = Array.from(images).filter(img => img.complete);

    if (loadedImages.length === images.length) {
      setImagesLoaded(true);
    }
  };

  const initializeSwiper = useCallback(() => {
    if (swiperContainerRef.current && !swiperInstance) {
      const swiper = new window.Swiper(swiperContainerRef.current, {
        spaceBetween: 0,
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
      });

      setSwiperInstance(swiper);
      setIsSwiperInitialized(true);
      setLoading(false);
    }
  }, [swiperContainerRef, swiperInstance]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!window.Swiper) {
      const script = document.createElement('script');
      script.src = SWIPER_JS_PATH;
      script.async = true;
      script.onload = () => {
        initializeSwiper();
      };

      document.body.appendChild(script);
    } else {
      initializeSwiper();
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = SWIPER_CSS_PATH;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(
        document.querySelector(`link[href="${SWIPER_CSS_PATH}"]`)
      );
      const scripts = document.querySelectorAll(`script[src="${SWIPER_JS_PATH}"]`);
      scripts.forEach((script) => script.remove());
    };
  }, [initializeSwiper]);

  useEffect(() => {
    if (imagesLoaded) {
      initializeSwiper();
    }
  }, [imagesLoaded, initializeSwiper]);

  return (
    <div>
      <style>{`
        .vtex-render__container-id-main-slidernew {
          overflow: hidden;
        }

        .swiper-button-next, .swiper-button-prev {
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          display: none;
        }

        .swiper-container .swiper-pagination {
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 100%;
          text-align: center;
        }

        .swiper-pagination-bullet {
          transition: all 0.3s ease-in-out;
          background: #101010;
          width: 6px !important;
          height: 5px !important;
          border-radius: 5px;
          padding: 0;
          opacity: 1;
          position: relative;
        }

        .swiper-pagination-bullet-active {
          background: #EA5A1C;
          width: 66px !important;
        }

        .swiper-wrapper {
          text-align: center;
        }

        .swiper-container {
          position: relative;
          width: 100%;
          height: 400px;
          display: ${isSwiperInitialized ? 'block' : 'none'};
          transition: opacity 0.5s ease-in-out;
          opacity: ${loading ? '0' : '1'};
        }

        .single-banner {
          text-align: center;
          display: ${isSwiperInitialized ? 'none' : 'block'};
        }

        .swiper-container.loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 300px;
        }

        .loading-spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (min-width:1100px) {
          .render-route-store-home {
            overflow-x: hidden;
          }

          .desktop img {
            width: 1110px;
            height: 382px;
            border-radius: 12px;
          }
        }

        .single-banner img {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>

      {/* Exibe a primeira imagem antes do carrossel */}
      {!isSwiperInitialized && imageItems && imageItems.length > 0 && (
        <div className="single-banner">
          <a
            href={imageItems[0].linkDesktop}
            rel="noopener noreferrer"
          >
            <img
              src={imageItems[0].imageDesktop}
              alt={`Banner ${0}`}
              loading="eager"
            />
          </a>
        </div>
      )}

      {/* Swiper Container */}
      <div ref={swiperContainerRef} className="swiper-container">
        <div className="swiper-wrapper">
          {imageItems &&
            imageItems.length > 0 &&
            imageItems.map((item, index) => (
              <div className="swiper-slide" key={index}>
                {item.imageDesktop && (
                  <div className="desktop">
                    <a href={item.linkDesktop} rel="noopener noreferrer">
                      <img
                        src={item.imageDesktop}
                        alt={`Desktop Banner ${index}`}
                        loading="lazy"
                        onLoad={handleImageLoad}
                      />
                    </a>
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Paginação */}
        <div className="swiper-pagination" />
      </div>
    </div>
  );
}

ImageComponent.schema = {
  title: 'Feron Banner Carrossel',
  type: 'object',
  properties: {
    imageItems: {
      type: 'array',
      title: 'Image Items',
      description: 'Add images and links to the banner carousel.',
      items: {
        type: 'object',
        properties: {
          imageDesktop: {
            type: 'string',
            format: 'uri',
            title: 'Desktop Imagem URL',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          linkDesktop: {
            type: 'string',
            format: 'uri',
            title: 'Desktop Imagem Link',
          },
        },
        required: ['imageDesktop'],
      },
    },
  },
};

export default ImageComponent;
