import React, { useState } from 'react'

import styles from './HorizontalFilters.module.css'
import Category from './Category/Category'

const categories = [
  {
    id: 1,
    name: 'All items',
  },
  {
    id: 2,
    name: 'Art',
  },
  {
    id: 3,
    name: 'Photography',
  },
]

const HorizontalFilters = (): JSX.Element => {
  const [activeCategory, setActiveCategory] = useState<number | null>(1)

  const handleCategoryClick = (categoryId: number): void => {
    setActiveCategory(categoryId === activeCategory ? null : categoryId)
  }

  const renderCategories = (): React.ReactNode => {
    return categories.map(category => (
      <Category
        key={category.id}
        name={category.name}
        active={category.id === activeCategory}
        onClick={() => handleCategoryClick(category.id)}
      />
    ))
  }

  return <div className={styles.container}>{renderCategories()}</div>
}

export default HorizontalFilters
