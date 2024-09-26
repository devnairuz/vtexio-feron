import { Fragment } from 'react'
import { useProduct } from 'vtex.product-context'

import { Bolt, Box, Equilizer, Power, Screen, Weight } from '../../Icons'

import styles from './sku.specifications.css'

const SkuSpecifications = () => {
  const { product } = useProduct()
  const skuSpecifications = product?.properties

  if (!skuSpecifications?.length) return null

  const specificationsToShow = [
    {
      name: 'Alimentação',
      Icon: Power,
    },
    {
      name: 'Potência',
      Icon: Bolt,
    },
    {
      name: 'Produtividade',
      Icon: Equilizer,
    },
    {
      name: 'Tipo de Produto',
      Icon: Box,
    },
    {
      name: 'Tamanho',
      Icon: Screen,
    },
    {
      name: 'Peso',
      Icon: Weight,
    },
  ]

  return (
    <section className={styles.specificationsContainer}>
      {specificationsToShow.map(({ name, Icon }) => (
        <Fragment key={name}>
          {skuSpecifications.map(
            (specification, index) =>
              specification.name === name && (
                <div key={index} className={styles.specificationItem}>
                  <Icon />
                  <p className={styles.specificationInfo}>
                    <strong className={styles.specificationTitle}>
                      {specification.name}
                    </strong>
                    <span className={styles.specificationValue}>
                      {specification.values[0]}
                    </span>
                  </p>
                </div>
              )
          )}
        </Fragment>
      ))}
    </section>
  )
}

export default SkuSpecifications
