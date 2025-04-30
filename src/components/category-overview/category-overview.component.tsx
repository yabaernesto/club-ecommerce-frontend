import Category from '../../types/category.types'

import ProductItem from '../product-item/product-item.component'

import {
  CategoryContainer,
  CategoryTitle,
  ProductsContainer
} from './category-overview.styles'

interface CategoryOverview {
  category: Category
}

const CategoryOverview = ({ category }: CategoryOverview) => {
  return (
    <CategoryContainer>
      <CategoryTitle>{category.displayName}</CategoryTitle>

      <ProductsContainer>
        {category.products?.slice(0, 4).map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ProductsContainer>
    </CategoryContainer>
  )
}

export default CategoryOverview
