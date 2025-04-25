import React, { ReactNode } from 'react'
import { InputErrorMessageContainer } from './input-error-message.styles'

interface InputErrorMessageProps {
  children: ReactNode
}

const InputErrorMessage: React.FC<InputErrorMessageProps> = ({ children }) => {
  return <InputErrorMessageContainer>{children}</InputErrorMessageContainer>
}

export default InputErrorMessage
