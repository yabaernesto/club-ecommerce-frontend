import { useContext, useEffect } from 'react'

import { CategoryContext } from '../../contexts/category.context'

import CategoryOverview from '../category-overview/category-overview.component'
import Loading from '../loading/loading.component'

import { Container } from './categories-overview.styles'

const CategoriesOverview = () => {
  const { categories, isLoading, fetchCategories } = useContext(CategoryContext)

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories()
    }
  }, [])

  if (isLoading) return <Loading />

  return (
    <Container>
      {categories.map((category) => (
        <CategoryOverview key={category.id} category={category} />
      ))}
    </Container>
  )
}

export default CategoriesOverview
