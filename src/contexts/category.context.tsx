import { createContext, ReactNode, useState } from 'react'

import { collection, getDocs } from 'firebase/firestore'
import { categoryConverters } from '../converters/firestore.converters'

import Category from '../types/category.types'
import { db } from '../config/firebase.config'

interface ICategoryContext {
  categories: Category[]
  isLoading: boolean
  fetchCategories: () => Promise<void>
}

export const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  isLoading: false,
  fetchCategories: () => Promise.resolve()
})

interface CategoryContextProviderProps {
  children: ReactNode
}

const CategoryContextProvider = ({
  children
}: CategoryContextProviderProps) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchCategories = async () => {
    try {
      setIsLoading(true)

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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CategoryContext.Provider
      value={{ categories, isLoading, fetchCategories }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContextProvider
