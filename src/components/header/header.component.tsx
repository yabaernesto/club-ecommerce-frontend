import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from 'firebase/auth'

import { BsCart3 } from 'react-icons/bs'

import {
  HeaderContainer,
  HeaderItems,
  HeaderItem,
  HeaderTitle
} from './header.styles'

// utilities
import { auth } from '../../config/firebase.config'
import { logoutUser } from '../../store/reducers/user/user.actions'
import { CartContext } from '../../contexts/cart.context'

const Header = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  )
  const { productsCount, toggleCart } = useContext(CartContext)

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSignUpClick = () => {
    navigate('/sign-up')
  }

  const handleExploreClick = () => {
    navigate('/explore')
  }

  const handleSignOutClick = () => {
    dispatch(logoutUser())
    signOut(auth)
  }

  return (
    <HeaderContainer>
      <HeaderTitle onClick={handleLogoClick}>CLUB CLOTHING</HeaderTitle>
      <HeaderItems>
        <HeaderItem onClick={handleExploreClick}>Explorar</HeaderItem>
        {!isAuthenticated && (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSignUpClick}>Criar Conta</HeaderItem>
          </>
        )}
        {isAuthenticated && (
          <HeaderItem onClick={handleSignOutClick}>Sair</HeaderItem>
        )}
        <HeaderItem onClick={toggleCart}>
          {/* Forcando a tipagem do icone */}
          {(BsCart3 as unknown as React.FC<{ size?: number }>)({ size: 25 })}
          <p style={{ marginLeft: 5 }}>{productsCount}</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
