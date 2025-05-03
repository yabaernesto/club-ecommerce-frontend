import { useContext, useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../contexts/user.context'

import Header from '../components/header/header.component'
import Loading from '../components/loading/loading.component'

interface AuthenticationGuardProps {
  children: ReactNode
}

const AuthenticationGuard = ({ children }: AuthenticationGuardProps) => {
  const { isAuthenticated } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <Loading
          message='
            Voce precisa estar logado para acessar esta pagina. 
            Voce sera redirecionado para pagina de login em instantes
          '
        />
      </>
    )
  }

  return <>{children}</>
}

export default AuthenticationGuard
