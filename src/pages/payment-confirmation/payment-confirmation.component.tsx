import { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineHome
} from 'react-icons/ai'

import Header from '../../components/header/header.component'

import {
  PaymentConfirmationContainer,
  PaymentConfirmationContent
} from './payment-confirmation.styles'

import Colors from '../../theme/theme.colors'
import CustomButton from '../../components/custom-button/custom-button.component'

import { CartContext } from '../../contexts/cart.context'

const PaymentConfirmation = () => {
  const { clearProducts } = useContext(CartContext)

  const [searchParams] = useSearchParams()

  const status = searchParams.get('success')
  const isCanceled = searchParams.get('canceled') === true

  useEffect(() => {
    if (status === 'true') {
      clearProducts()
    }
  }, [status])

  const navigate = useNavigate()

  const handleGoToHomeClick = () => {
    navigate('/')
  }

  return (
    <>
      <Header />

      <PaymentConfirmationContainer>
        <PaymentConfirmationContent>
          {status === 'true' && (
            <>
              <AiOutlineCheckCircle size={120} color={Colors.error} />
              <p>A sua compra foi finalizada com sucesso!</p>
            </>
          )}

          {(status === 'false' || isCanceled) && (
            <>
              <AiOutlineCloseCircle size={120} color={Colors.success} />
              <p>
                Ocorreu um erro ao finalizar sua compra. Por favor, tente
                novamente.
              </p>
            </>
          )}

          <CustomButton
            startIcon={<AiOutlineHome />}
            onClick={handleGoToHomeClick}
          >
            Ir para Pagina Inicial
          </CustomButton>
        </PaymentConfirmationContent>
      </PaymentConfirmationContainer>
    </>
  )
}

export default PaymentConfirmation
