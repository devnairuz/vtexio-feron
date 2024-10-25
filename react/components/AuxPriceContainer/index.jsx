import React from 'react';
import { useProduct } from 'vtex.product-context';
import classes from './custom.price.css';
import { FormSolicitacao } from '../FormSolicitacao';

const AuxPriceContainer = ({ children }) => {
  const { product } = useProduct();
  const properties = product?.properties;

  // Verifica se há propriedades
  if (!properties || !properties.length) return null;

  // Filtra para encontrar a propriedade 'Produto sem preço'
  const priceHiddenProperty = properties.find(
    ({ name }) => name.toLowerCase() === 'produto sem preço'
  );

  // Obtém o path do link do produto e remove a barra inicial, se existir
  const productLink = product?.link?.replace(/https?:\/\/[^/]+/, '').replace(/^\/+/, ''); // Remove o domínio e a barra inicial

  // Renderiza o componente com base no valor da propriedade
  return (
    <div className={classes.controlesconde}>
      {priceHiddenProperty !== undefined ? (
        <>
          <span className={classes.textoconsultor}>Fale com um dos nossos consultores</span>
          <a
            href="https://api.whatsapp.com/send?phone=5514991054116"
            target="_blank"
            className={classes.btnorcamento}
            rel="noopener noreferrer" // Importante para segurança
          >
            Solicitar Orçamento
          </a>
          <FormSolicitacao 
            nome={product?.productName} 
            link={productLink} // Passa apenas o path do produto
            domain="www.tecfag.com.br" 
          />
        </>
      ) : (
        <>
          {children}
        </>
      )}
    </div>
  );
};

export { AuxPriceContainer };