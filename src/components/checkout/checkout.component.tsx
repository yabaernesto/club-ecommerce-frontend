import { useContext, useState } from 'react'
import { BsBagCheck } from 'react-icons/bs'
import axios from 'axios'

import { CartContext } from '../../contexts/cart.context'

import {
  CheckoutContainer,
  CheckoutProducts,
  CheckoutTitle,
  CheckoutTotal
} from './checkout.styles'

import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'
import Loading from '../loading/loading.component'

import env from '../../config/env.config'

const Checkout = () => {
  const { products, productsTotalPrice } = useContext(CartContext)
  const [isLoading, setIsLoading] = useState(false)

  const handleFinishPurchaseClick = async () => {
    try {
      setIsLoading(true)

      const { data } = await axios.post(
        `${env.apiUrl}/create-checkout-session`,
        { products }
      )

      window.location.href = data.url
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CheckoutContainer>
      {isLoading && <Loading />}
      <CheckoutTitle>Checkout</CheckoutTitle>

      {products.length > 0 ? (
        <>
          <CheckoutProducts>
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </CheckoutProducts>

          <CheckoutTotal>Total: R${productsTotalPrice}</CheckoutTotal>

          <CustomButton
            startIcon={<BsBagCheck />}
            onClick={handleFinishPurchaseClick}
          >
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
