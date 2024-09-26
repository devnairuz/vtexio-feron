import { useState, useEffect } from 'react'
import { useProduct } from 'vtex.product-context'

import { daysBetweenTodayAndFuture } from '../../../tools/daysBetweenTodayAndFuture'

import styles from './product.tags.css'

const ProductTags = () => {
  const [productTags, setProductTags] = useState([])
  const { product } = useProduct()
  const releaseDate = product.releaseDate

  useEffect(() => {
    const remainingDays = daysBetweenTodayAndFuture(releaseDate)

    if (remainingDays > 0) {
      setProductTags(prevTags => [
        ...prevTags,
        { title: 'Lançamentos', className: 'release' },
      ])
    }
  }, [product.cacheId])

  if (!productTags.length) return null

  return (
    <div className={styles.tagsContainer}>
      {productTags.map((tag, index) => (
        <p key={index} className={`${styles.tag} ${styles[tag.className]}`}>
          {tag.title}
        </p>
      ))}
    </div>
  )
}

export default ProductTags
