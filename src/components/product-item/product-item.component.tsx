import { useDispatch } from 'react-redux'

import { BsCartPlus } from 'react-icons/bs'

import Product from '../../types/product.types'
import CustomButton from '../custom-button/custom-button.component'

// styles
import {
  ProductContainer,
  ProductImage,
  ProductInfo
} from './product-item.styles'

import { addProductToCart } from '../../store/cart/cart.action'

interface ProductItemProps {
  product: Product
}

const ProductItem = ({ product }: ProductItemProps) => {
  const dispatch = useDispatch()

  const handleAddToCartClick = () => {
    dispatch(addProductToCart(product))
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
