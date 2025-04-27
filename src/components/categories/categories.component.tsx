import { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'

// Utilities
import Category from '../../types/category.types'
import CategoryItem from '../category-item/category-item.component'

// styles
import { CategoriesContainer, CategoriesContent } from './categories.styles'
import { db } from '../../config/firebase.config'
import { categoryConverters } from '../../converters/firestore.converters'

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  const fetchCategories = async () => {
    try {
      const categoriesFromFireStore: Category[] = []
      const querySnapshot = await getDocs(
        collection(db, 'categories').withConverter(categoryConverters)
      )

      querySnapshot.forEach((doc) => {
        categoriesFromFireStore.push(doc.data)
      })

      setCategories(categoriesFromFireStore)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <CategoriesContainer>
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
