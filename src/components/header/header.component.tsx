import { useNavigate } from 'react-router-dom'
import { BsCart3 } from 'react-icons/bs'

import {
  HeaderContainer,
  HeaderItems,
  HeaderItem,
  HeaderTitle
} from './header.styles'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase.config'

const Header = () => {
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSignUpClick = () => {
    navigate('/sign-up')
  }

  return (
    <HeaderContainer>
      <HeaderTitle>CLUB CLOTHING</HeaderTitle>
      <HeaderItems>
        <HeaderItem>Explorar</HeaderItem>
        <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
        <HeaderItem onClick={handleSignUpClick}>Criar Conta</HeaderItem>
        <HeaderItem onClick={() => signOut(auth)}>Sair</HeaderItem>
        <HeaderItem>
          {/* Forcando a tipagem do icone */}
          {(BsCart3 as unknown as React.FC<{ size?: number }>)({ size: 25 })}
          <p style={{ marginLeft: 5 }}>5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
