import React from 'react';
import { useState, useEffect } from 'react'
import classes from './custom.price.css'
import { useProduct } from 'vtex.product-context'
import { FormSolicitacao } from '../FormSolicitacao';

const AuxPriceContainer = ({children}) => {
  const { product } = useProduct();
  console.log(product);
  const properties = product?.properties;

  // Verifica se há propriedades
  if (!properties || !properties.length) return null;

  // Filtra para encontrar a propriedade 'Produto sem preço'
  const priceHiddenProperty = properties.find(
    ({ name }) => name.toLowerCase() === 'produto sem preço'
  );

  // Renderiza o componente com base no valor da propriedade
  return (
    <div className={classes.controlesconde}>
      {priceHiddenProperty !==undefined? (
        <>
          <span className={classes.textoconsultor}> Fale com um dos nossos consultores </span>
          <a
            href="https://api.whatsapp.com/send?phone=5514991054116"
            target="_blank"
            className={classes.btnorcamento}
            rel="noopener noreferrer" // Importante para segurança
          >
            Solicitar Orçamento
          </a>
          <FormSolicitacao nome={product?.productName} link={product?.link}/> 
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