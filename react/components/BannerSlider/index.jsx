import React, { useEffect, useRef, useState, useCallback } from 'react'

function ImageComponent({ imageItems }) {
  const swiperContainerRef = useRef(null)
  const [swiperInstance, setSwiperInstance] = useState(null)

  // Memoriza a função `initializeSwiper` para evitar sua recriação a cada renderização
  const initializeSwiper = useCallback(() => {
    // Só inicializa o Swiper se ele ainda não foi inicializado
    if (swiperContainerRef.current && !swiperInstance) {
      const swiper = new window.Swiper(swiperContainerRef.current, {
        spaceBetween: 0,
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 3000, // Tempo em ms entre as transições (3 segundos)
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
      })

      setSwiperInstance(swiper) // Armazena a instância do Swiper
    }
  }, [swiperContainerRef, swiperInstance]) // Adiciona as dependências corretas

  useEffect(() => {
    // Verifica se estamos no ambiente do navegador antes de usar `window` e `document`
    if (typeof window === 'undefined') return // Early return se não estiver no ambiente de navegador

    if (!window.Swiper) {
      const script = document.createElement('script')

      script.src = 'https://unpkg.com/swiper/swiper-bundle.min.js'
      script.async = true
      script.onload = () => {
        initializeSwiper()
      }

      document.body.appendChild(script)
    } else {
      // Se o Swiper já estiver carregado, inicializa
      initializeSwiper()
    }

    // Adiciona o link para o CSS do Swiper
    const link = document.createElement('link')

    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/swiper/swiper-bundle.min.css'
    document.head.appendChild(link)

    // Cleanup: remove o link e o script quando o componente for desmontado
    return () => {
      document.head.removeChild(
        document.querySelector(
          'link[href="https://unpkg.com/swiper/swiper-bundle.min.css"]'
        )
      )
      const scripts = document.querySelectorAll(
        'script[src="https://unpkg.com/swiper/swiper-bundle.min.js"]'
      )

      scripts.forEach(script => script.remove())
    }
  }, [initializeSwiper]) // Agora `initializeSwiper` está dentro do useCallback e é seguro como dependência

  // Observa mudanças de navegação e reinicializa o swiper se necessário
  useEffect(() => {
    const handlePageVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (swiperInstance) {
          swiperInstance.update() // Atualiza o swiper ao voltar à página
        }
      }
    }

    // Adiciona ouvinte para detectar quando a aba da página volta a ser visível
    document.addEventListener('visibilitychange', handlePageVisibilityChange)

    // Cleanup: remove o ouvinte quando o componente for desmontado
    return () => {
      document.removeEventListener(
        'visibilitychange',
        handlePageVisibilityChange
      )
    }
  }, [swiperInstance])

  return (
    <div>
      <style>{`
        .swiper-button-next, .swiper-button-prev {
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          display: none;
        }

        .swiper-container .swiper-pagination {
          position: absolute;
          bottom: 25px;
          left: 0;
          width: 100%;
          text-align: center;
        }

        .swiper-pagination-bullet {
          transition: all 0.3s ease-in-out;
          background: #d9d9d9;
          width: 32px !important;
          height: 5px !important;
          margin: 0 8px;
          border-radius: 5px;
          padding: 0;
          opacity: 1;
        }

        .swiper-pagination-bullet-active {
          background: #ed1a3b;
        }

        .swiper-wrapper {
          text-align: center;
        }

        .swiper-container {
          position: relative;
          width: 100%;
          height: auto;
          overflow: hidden;
          margin-top: -90px;
        }

        @media (max-width: 1025px) {
          .swiper-container {
            margin-top: -68px;
          }
        }

        @media (max-width: 991px) {
          .swiper-container .swiper-pagination {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .desktop {
            display: none;
          }
        }

        @media (min-width: 769px) {
          .mobile {
            display: none;
          }
        }
      `}</style>

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
                      />
                    </a>
                  </div>
                )}
              </div>
            ))}
        </div>

        <div className="swiper-button-next" />
        <div className="swiper-button-prev" />
        <div className="swiper-pagination" />
      </div>
    </div>
  )
}

ImageComponent.schema = {
  title: 'Banner Carrossel Tecfag',
  type: 'object',
  properties: {
    imageItems: {
      type: 'array',
      title: 'Image Items',
      description: 'Adicionar imagens no carrossel',
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
}

export default ImageComponent
