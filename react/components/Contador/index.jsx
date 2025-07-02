import React, { useState, useEffect } from 'react';
import "./contador.css";

const Contador = ({ dataFinal, textoPrefixo = "Termina em:", imagemPrefixo }) => {
  const [tempoRestante, setTempoRestante] = useState(calculaTempoRestante());

  useEffect(() => {
    const interval = setInterval(() => {
      setTempoRestante(calculaTempoRestante());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function calculaTempoRestante() {
    const dataAtual = new Date();
    const dataFinalDate = new Date(dataFinal);
    const diferenca = dataFinalDate - dataAtual;

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    return {
      dias,
      horas: padZero(horas),
      minutos: padZero(minutos),
      segundos: padZero(segundos),
    };
  }

  function padZero(value) {
    return value < 10 ? `0${value}` : value;
  }

  return (
    <div className="contador-simples">
      <div className="contador-prefixo-img">
        {imagemPrefixo && (
          <img
            src={imagemPrefixo}
            alt="Ícone do contador"
            className="contador-imagem"
          />
        )}
      </div>
      <div className="contador-prefixo-bloco-texto">
        <span className="contador-prefixo">{textoPrefixo}</span>
        <span className="contador-tempo">
          {`${tempoRestante.dias}D ${tempoRestante.horas}:${tempoRestante.minutos}:${tempoRestante.segundos}`}
        </span>
      </div>
    </div>
  );
};

Contador.schema = {
  title: "Contador com Dias",
  description: "Exibe dias, horas, minutos e segundos com texto prefixo e imagem configuráveis",
  type: "object",
  properties: {
    textoPrefixo: {
      title: "Texto antes do contador",
      type: "string",
      default: "Termina em:"
    },
    dataFinal: {
      title: "Data Final",
      description: "Formato: 2025-07-01T23:59:59",
      type: "string",
      default: "2025-07-01T23:59:59"
    },
    imagemPrefixo: {
      title: "Imagem antes do texto",
      description: "URL de uma imagem exibida antes do texto do contador",
      type: "string",
      widget: {
        "ui:widget": "image-uploader"
      },
      default: ""
    }
  }
};

export default Contador;
