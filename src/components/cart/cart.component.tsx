import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { BsCartCheck } from 'react-icons/bs'

import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'

import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal
} from './cart.styles'

import { useAppSelector } from '../../hooks/redux.hooks'
import { toggleCart } from '../../store/cart/cart.action'
import {
  selectProductsCount,
  selectProductsTotalPrice
} from '../../store/cart/cart.selectors'

const Cart = () => {
  const { isVisible, products } = useAppSelector((state) => state.cartReducer)

  const productsTotalPrice = useAppSelector(selectProductsTotalPrice)
  const productsCount = useAppSelector(selectProductsCount)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleGoToCheckoutClick = () => {
    navigate('/checkout')
  }

  const handleEscapeAreaClick = () => {
    dispatch(toggleCart())
  }

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={handleEscapeAreaClick} />
      <CartContent>
        <CartTitle>Seu carrinho</CartTitle>

        {products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}

        {productsCount > 0 ? (
          <>
            <CartTotal>Total: R${productsTotalPrice}</CartTotal>

            <CustomButton
              startIcon={<BsCartCheck />}
              onClick={handleGoToCheckoutClick}
            >
              Ir para o checkout
            </CustomButton>
          </>
        ) : (
          <>{productsCount === 0 && <p>Seu carrinho esta vazio!</p>}</>
        )}
      </CartContent>
    </CartContainer>
  )
}

export default Cart
