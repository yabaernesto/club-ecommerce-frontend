import { useContext, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { isEmail } from 'validator'
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  AuthError
} from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

import CustomInput from '../../components/custom-input/custom-input.component'
import CustomButton from '../../components/custom-button/custom-button.component'
import InputErrorMessage from '../../components/input-error-message/input-error-message.component'
import Header from '../../components/header/header.component'
import Loading from '../../components/loading/loading.component'

import {
  SignUpContainer,
  SignUpContent,
  SignUpHeadline,
  SignUpInputContainer
} from './sign-up.stales'

import { auth, db } from '../../config/firebase.config'
import { UserContext } from '../../contexts/user.context'

interface SignUpForm {
  name: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
}

const SignUpPage = () => {
  const {
    register,
    formState: { errors },
    watch,
    setError,
    handleSubmit
  } = useForm<SignUpForm>()

  const watchPassword = watch('password')

  const [isLoading, setIsLoading] = useState(false)

  const { isAuthenticated } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const handleSubmitPress = async (data: SignUpForm) => {
    try {
      setIsLoading(true)

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      await addDoc(collection(db, 'users'), {
        id: userCredentials.user.uid,
        firstName: data.name,
        lastName: data.lastName,
        email: userCredentials.user.email,
        provider: 'firebase'
      })
    } catch (error) {
      const _error = error as AuthError

      if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
        return setError('email', { type: 'alreadyInUse' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />

      {isLoading && <Loading />}

      <SignUpContainer>
        <SignUpContent>
          <SignUpHeadline>Crie sua conta</SignUpHeadline>

          <SignUpInputContainer>
            <p>Nome</p>
            <CustomInput
              placeholder='Digite seu nome'
              hasError={!!errors?.name}
              {...register('name', { required: true })}
            />

            {errors?.name?.type === 'required' && (
              <InputErrorMessage>O nome obrigatória.</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Sobrenome</p>
            <CustomInput
              placeholder='Digite seu sobrenome'
              hasError={!!errors?.lastName}
              {...register('lastName', { required: true })}
            />

            {errors?.lastName?.type === 'required' && (
              <InputErrorMessage>O sobrenome e obrigatória.</InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>e-mail</p>
            <CustomInput
              placeholder='Digite seu e-mail'
              hasError={!!errors?.email}
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

            {errors?.email?.type === 'alreadyInUse' && (
              <InputErrorMessage>
                Este e-mail ja esta sendo utilizado.
              </InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Senha</p>
            <CustomInput
              placeholder='Digite sua senha'
              type='password'
              hasError={!!errors?.password}
              {...register('password', { required: true, minLength: 6 })}
            />

            {errors?.password?.type === 'required' && (
              <InputErrorMessage>A senha e obrigatória.</InputErrorMessage>
            )}

            {errors?.password?.type === 'minLength' && (
              <InputErrorMessage>
                A senha precisa ter no mínimo 6 caracteres.
              </InputErrorMessage>
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Confirmação de senha</p>
            <CustomInput
              placeholder='Digite novamente sua senha'
              type='password'
              hasError={!!errors?.passwordConfirmation}
              {...register('passwordConfirmation', {
                required: true,
                minLength: 6,
                validate: (value) => {
                  return value === watchPassword
                }
              })}
            />

            {errors?.passwordConfirmation?.type === 'required' && (
              <InputErrorMessage>
                Confirmar a senha e obrigatória.
              </InputErrorMessage>
            )}

            {errors?.passwordConfirmation?.type === 'validate' && (
              <InputErrorMessage>
                A confirmação de senha precisa ser igual a senha.
              </InputErrorMessage>
            )}

            {errors?.passwordConfirmation?.type === 'minLength' && (
              <InputErrorMessage>
                A confirmação de senha precisa ter no mínimo 6 caracteres.
              </InputErrorMessage>
            )}
          </SignUpInputContainer>

          <CustomButton
            startIcon={<FiLogIn size={18} />}
            onClick={() => handleSubmit(handleSubmitPress)}
          >
            Criar conta
          </CustomButton>
        </SignUpContent>
      </SignUpContainer>
    </>
  )
}

export default SignUpPage
