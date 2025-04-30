import { useContext, useEffect, useState } from 'react'

import { CategoryContext } from '../../contexts/category.context'

import { Container } from './categories-overview.styles'

const CategoriesOverview = () => {
  const { categories, fetchCategories } = useContext(CategoryContext)

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories()
    }
  }, [])

  return (
    <Container>
      {categories.map((category) => (
        <p key={category.id}>{category.displayName}</p>
      ))}
    </Container>
  )
}

export default CategoriesOverview
