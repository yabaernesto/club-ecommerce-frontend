import { useContext } from 'react'
import { BsCartCheck } from 'react-icons/bs'

import CustomButton from '../custom-button/custom-button.component'

import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal
} from './cart.styles'

import { CartContext } from '../../contexts/cart.context'

const Cart = () => {
  const { isVisible, toggleCart } = useContext(CartContext)

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toggleCart} />
      <CartContent>
        <CartTitle>Seu carrinho</CartTitle>

        <CartTotal>Total: </CartTotal>

        <CustomButton startIcon={<BsCartCheck />}>
          Ir para o checkout
        </CustomButton>
      </CartContent>
    </CartContainer>
  )
}

export default Cart
