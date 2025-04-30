import { Fragment } from 'react'
import { useProduct } from 'vtex.product-context'

import { Bolt, Box, Equilizer, Power, Screen, Enc, Model, Cap, Comp, Pot, Tor } from '../../Icons'

import styles from './sku.specifications.css'

const SkuSpecifications = () => {
  const { product } = useProduct()
  const skuSpecifications = product?.properties

  if (!skuSpecifications?.length) return null

  const specificationsToShow = [
    {
      name: 'Energia',
      Icon: Bolt,
    },
    {
      name: 'Encaixe',
      Icon: Enc,
    },
    {
      name: 'Voltagem',
      Icon: Power,
    },
    {
      name: 'Bateria',
      Icon: Equilizer,
    },
    {
      name: 'Capacidade',
      Icon: Cap,
    },
    {
      name: 'Compatibilidade',
      Icon: Comp,
    },
    {
      name: 'Marca',
      Icon: Box,
    },
    {
      name: 'Modelo',
      Icon: Model,
    },
    {
      name: 'Potencia',
      Icon: Pot,
    },
    {
      name: 'Torque',
      Icon: Tor,
    },
    {
      name: 'Força',
      Icon: Screen,
    }
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
