import { createContext, useState, ReactNode } from 'react'
import User from '../types/user.types'

interface IUserContext {
  currentUser: User | null
  isAuthenticated: boolean
  loginUser: (user: User) => void
  logout: () => void
}

export const UserContext = createContext<IUserContext>({
  currentUser: null,
  isAuthenticated: false,
  loginUser: () => {},
  logout: () => {}
})

interface UserContextProviderProps {
  children: ReactNode
}

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const isAuthenticated = currentUser !== null

  const loginUser = (user: User) => {
    setCurrentUser(user)
  }

  const logout = () => {
    setCurrentUser(null)
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        loginUser,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
