import './header.styles.css'
import { BsCart3 } from 'react-icons/bs'

const Header = () => {
  return (
    <div className='header-container'>
      <h2 className='header-title'>CLUB CLOTHING</h2>
      <div className='header-items'>
        <div className='header-item'>Explorar</div>
        <div className='header-item'>Login</div>
        <div className='header-item'>Criar Conta</div>
        <div className='header-item'>
          {/* Forcando a tipagem do icone */}
          {(BsCart3 as unknown as React.FC<{ size?: number }>)({ size: 25 })}
          <p style={{ marginLeft: 5 }}>5</p>
        </div>
      </div>
    </div>
  )
}

export default Header
