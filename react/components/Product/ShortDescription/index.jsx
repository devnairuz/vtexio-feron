import { useProduct } from 'vtex.product-context'

import styles from './ShortDescription.css'

const ShortDescription = () => {
  const { product } = useProduct()
  const productDescription = product?.description

  if (!productDescription) return null

  return (
    <div className={styles.shortDescription}>
      <div
        className={styles.shortDescriptionContent}
        dangerouslySetInnerHTML={{ __html: productDescription }}
      />
    </div>
  )
}

export default ShortDescription
