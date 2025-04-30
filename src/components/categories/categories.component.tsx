import { useContext, useEffect } from 'react'

import CategoryItem from '../category-item/category-item.component'
import Loading from '../loading/loading.component'

import { CategoriesContainer, CategoriesContent } from './categories.styles'

import { CategoryContext } from '../../contexts/category.context'

const Categories = () => {
  const { fetchCategories, categories, isLoading } = useContext(CategoryContext)

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <CategoriesContainer>
      {isLoading && <Loading />}
      <CategoriesContent>
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryItem category={category} />
          </div>
        ))}
      </CategoriesContent>
    </CategoriesContainer>
  )
}

export default Categories
