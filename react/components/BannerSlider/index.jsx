import React, { useEffect, useRef, useState, useCallback } from 'react';

// Definindo constantes para os caminhos dos arquivos CSS e JS
const SWIPER_CSS_PATH = 'https://cdn.jsdelivr.net/npm/swiper@8.0.6/swiper-bundle.min.css';
const SWIPER_JS_PATH = 'https://cdn.jsdelivr.net/npm/swiper@8.0.6/swiper-bundle.min.js';

function ImageComponent({ imageItems }) {
  const swiperContainerRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false); // Estado para controlar o carregamento das imagens
  const [isSwiperInitialized, setIsSwiperInitialized] = useState(false); // Verifica se o Swiper foi inicializado
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento do swiper

  // Função para verificar se todas as imagens foram carregadas
  const handleImageLoad = () => {
    const images = document.querySelectorAll('.swiper-slide img');
    const loadedImages = Array.from(images).filter(img => img.complete);

    // Verifica se todas as imagens foram carregadas
    if (loadedImages.length === images.length) {
      setImagesLoaded(true); // Todas as imagens foram carregadas
    }
  };

  // Memoriza a função `initializeSwiper` para evitar sua recriação a cada renderização
  const initializeSwiper = useCallback(() => {
    if (swiperContainerRef.current && !swiperInstance) {
      const swiper = new window.Swiper(swiperContainerRef.current, {
        spaceBetween: 0,
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 5000, // Tempo em ms entre as transições (5 segundos)
          disableOnInteraction: false, // Permite que o autoplay continue após interação do usuário
          pauseOnMouseEnter: true, // Pausa o autoplay ao passar o mouse sobre o carrossel
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
          enabled: true, // Habilita a navegação por teclado
          onlyInViewport: true, // A navegação por teclado só funcionará quando o swiper estiver visível
        },
      });

      setSwiperInstance(swiper); // Armazena a instância do Swiper
      setIsSwiperInitialized(true); // Marca o Swiper como inicializado
      setLoading(false); // Finaliza o carregamento
    }
  }, [swiperContainerRef, swiperInstance]);

  useEffect(() => {
    // Verifica se estamos no ambiente do navegador antes de usar `window` e `document`
    if (typeof window === 'undefined') return;

    if (!window.Swiper) {
      const script = document.createElement('script');

      // Utilizando a constante para o caminho do JS
      script.src = SWIPER_JS_PATH;  // Caminho correto para o script JS
      script.async = true;
      script.onload = () => {
        initializeSwiper();
      };

      document.body.appendChild(script);
    } else {
      initializeSwiper();
    }

    // Adiciona o link para o CSS do Swiper
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = SWIPER_CSS_PATH; // Caminho correto para o CSS

    document.head.appendChild(link);

    // Cleanup: remove o link e o script quando o componente for desmontado
    return () => {
      document.head.removeChild(
        document.querySelector(`link[href="${SWIPER_CSS_PATH}"]`)
      );
      const scripts = document.querySelectorAll(`script[src="${SWIPER_JS_PATH}"]`);
      scripts.forEach((script) => script.remove());
    };
  }, [initializeSwiper]);

  // Inicializa o Swiper somente após as imagens terem sido carregadas
  useEffect(() => {
    if (imagesLoaded) {
      initializeSwiper(); // Inicializa o Swiper quando todas as imagens estiverem carregadas
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
          opacity: ${loading ? '0' : '1'}; /* Transição suave de opacidade */
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

        @media (max-width: 768px) {
          .desktop {
            display: none;
          }
          .swiper-container {
            margin-top: 20px; /* Ajusta a margem para dispositivos menores */
            height: 100%;
          }
          .swiper-slide a img {
            width: 90%;
            margin: auto;
          }
          .vtex-render__container-id-main-slidernew {
            padding-bottom: 13px;
          }  
          .swiper-container .swiper-pagination {
            bottom: -11px;
          }
          .mobile img {
            width: 388px;
            height: 466px;
            border-radius: 12px;
          }
        }

        @media (min-width: 769px) {
          .mobile {
            display: none;
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
            href={imageItems[0].linkDesktop || imageItems[0].linkMobile}
            rel="noopener noreferrer"
          >
            <img
              src={imageItems[0].imageDesktop || imageItems[0].imageMobile}
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
                        onLoad={handleImageLoad} // Escuta o evento de carregamento
                      />
                    </a>
                  </div>
                )}

                {item.imageMobile && (
                  <div className="mobile">
                    <a href={item.linkMobile} rel="noopener noreferrer">
                      <img
                        src={item.imageMobile}
                        alt={`Mobile Banner ${index}`}
                        loading="lazy"
                        onLoad={handleImageLoad} // Escuta o evento de carregamento
                      />
                    </a>
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Paginação, Navegação */}
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
          imageMobile: {
            type: 'string',
            format: 'uri',
            title: 'Mobile Imagem URL',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          linkMobile: {
            type: 'string',
            format: 'uri',
            title: 'Mobile Imagem Link',
          },
        },
        required: ['imageDesktop'],
      },
    },
  },
};

export default ImageComponent;