import { useProduct } from 'vtex.product-context'

import styles from './product.model.css'

const ProductModel = () => {
  const { product } = useProduct()
  const properties = product?.properties

  if (!properties.length) return null

  const modelIndex = properties.findIndex(
    ({ name }) => name.toLowerCase() === 'modelo'
  )

  if (modelIndex === -1) return null

  return (
    <p className={styles.productModel}>
      Modelo: {properties[modelIndex].values[0]}
    </p>
  )
}

export default ProductModel
