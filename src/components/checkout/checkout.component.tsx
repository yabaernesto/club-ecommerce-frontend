import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsBagCheck } from 'react-icons/bs'

import { CartContext } from '../../contexts/cart.context'

import {
  CheckoutContainer,
  CheckoutProducts,
  CheckoutTitle,
  CheckoutTotal
} from './checkout.styles'

import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'

const Checkout = () => {
  const { products, productsTotalPrice, toggleCart } = useContext(CartContext)

  const navigate = useNavigate()

  const handleGoToCheck = () => {
    navigate('/checkout')
    toggleCart()
  }

  return (
    <CheckoutContainer>
      <CheckoutTitle>Checkout</CheckoutTitle>

      {products.length > 0 ? (
        <>
          <CheckoutProducts>
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </CheckoutProducts>

          <CheckoutTotal>Total: R${productsTotalPrice}</CheckoutTotal>

          <CustomButton startIcon={<BsBagCheck />} onClick={handleGoToCheck}>
            Finalizar compra
          </CustomButton>
        </>
      ) : (
        <p>Seu carrinho esta vazio!</p>
      )}
    </CheckoutContainer>
  )
}

export default Checkout
