import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { isEmail } from 'validator'
import {
  AuthErrorCodes,
  signInWithEmailAndPassword,
  signInWithPopup,
  AuthError
} from 'firebase/auth'
import { auth, db, googleProvider } from '../../config/firebase.config'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'

import CustomButton from '../../components/custom-button/custom-button.component'
import Header from '../../components/header/header.component'
import CustomInput from '../../components/cunstom-input/custom-input.component'
import InputErrorMessage from '../../components/input-error-message/input-error-message.component'

import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle
} from './login.styles'

interface LoginForm {
  email: string
  password: string
}

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit
  } = useForm<LoginForm>()

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      console.log({ userCredentials })
    } catch (error) {
      const _error = error as AuthError

      if (_error.code === AuthErrorCodes.INVALID_PASSWORD) {
        return setError('password', { type: 'mismatch' })
      }

      if (_error.code === AuthErrorCodes.USER_DELETED) {
        return setError('email', { type: 'notFound' })
      }
    }
  }

  const handleSignInWithGooglePress = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider)

      const querySnapshot = await getDocs(
        query(
          collection(db, 'users'),
          where('id', '==', userCredential.user.uid)
        )
      )

      const user = querySnapshot.docs[0]?.data()

      if (!user) {
        const firstName = userCredential.user.displayName?.split(' ')[0]
        const lastName = userCredential.user.displayName?.split(' ')[1]

        await addDoc(collection(db, 'users'), {
          id: userCredential.user.uid,
          email: userCredential.user.email,
          firstName,
          lastName,
          provider: 'google'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header />

      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>

          <CustomButton
            startIcon={<BsGoogle size={18} />}
            onClick={handleSignInWithGooglePress}
          >
            Entrar com o Google
          </CustomButton>

          <LoginSubtitle>ou entre com o seu email</LoginSubtitle>

          <LoginInputContainer>
            <p>E-mail</p>
            <CustomInput
              hasError={!!errors?.email}
              placeholder='Digite seu e-mail'
              {...register('email', {
                required: true,
                validate: (value) => {
                  return isEmail(value)
                }
              })}
            />

            {errors?.email?.type === 'required' && (
              <InputErrorMessage>O e-mail e obrigatória.</InputErrorMessage>
            )}

            {errors?.email?.type === 'validate' && (
              <InputErrorMessage>
                Por favor insira um e-mail valido.
              </InputErrorMessage>
            )}

            {errors?.email?.type === 'notFound' && (
              <InputErrorMessage>O e-mail nao encontrado.</InputErrorMessage>
            )}
          </LoginInputContainer>

          <LoginInputContainer>
            <p>Senha</p>
            <CustomInput
              hasError={!!errors?.password}
              placeholder='Digite sua senha'
              type='password'
              {...register('password', { required: true })}
            />

            {errors?.password?.type === 'required' && (
              <InputErrorMessage>A senha e obrigatória.</InputErrorMessage>
            )}

            {errors?.email?.type === 'mismatch' && (
              <InputErrorMessage>A senha e invalida.</InputErrorMessage>
            )}
          </LoginInputContainer>

          <CustomButton
            startIcon={<FiLogIn size={18} />}
            onClick={() => handleSubmit(handleSubmitPress)}
          >
            Entrar
          </CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  )
}

export default LoginPage
