import Header from '../../components/header/header.component'
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle
} from './login.styles'

const LoginPage = () => {
  return (
    <>
      <Header />
      <LoginContainer>
        <LoginContent></LoginContent>
        <LoginHeadline>Entre com a sua conta</LoginHeadline>

        <LoginSubtitle>ou entre com o seu email</LoginSubtitle>
        <LoginInputContainer></LoginInputContainer>
        <LoginInputContainer></LoginInputContainer>
      </LoginContainer>
    </>
  )
}

export default LoginPage
