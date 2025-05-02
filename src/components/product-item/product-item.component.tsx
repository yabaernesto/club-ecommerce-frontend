import { useContext } from 'react'
import { BsCartPlus } from 'react-icons/bs'

import Product from '../../types/product.types'
import CustomButton from '../custom-button/custom-button.component'

import { CartContext } from '../../contexts/cart.context'

import {
  ProductContainer,
  ProductImage,
  ProductInfo
} from './product-item.styles'

interface ProductItemProps {
  product: Product
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { addProductToCart } = useContext(CartContext)

  const handleAddToCartClick = () => {
    addProductToCart(product)
  }

  return (
    <ProductContainer>
      <ProductImage imageUrl={product.imageUrl}>
        <CustomButton startIcon={<BsCartPlus />} onClick={handleAddToCartClick}>
          Adicionar ao carrinho
        </CustomButton>
      </ProductImage>

      <ProductInfo>
        <p>{product.name}</p>
        <p>{product.price}</p>
      </ProductInfo>
    </ProductContainer>
  )
}

export default ProductItem
