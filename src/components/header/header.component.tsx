import {
  HeaderContainer,
  HeaderItems,
  HeaderItem,
  HeaderTitle
} from './header.styles'
import './header.styles.css'
import { BsCart3 } from 'react-icons/bs'

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>CLUB CLOTHING</HeaderTitle>
      <HeaderItems>
        <HeaderItem>Explorar</HeaderItem>
        <HeaderItem>Login</HeaderItem>
        <HeaderItem>Criar Conta</HeaderItem>
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
