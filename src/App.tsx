import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import SignUpPage from './pages/sign-up/sign-up.page'

import { auth, db } from './config/firebase.config'

import { useContext, useEffect } from 'react'
import { UserContext } from './contexts/user.context'

const App = () => {
  const { isAuthenticated, loginUser, logout } = useContext(UserContext)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const isSigningOut = isAuthenticated && !user

      if (isSigningOut) {
        return logout()
      }

      const isSigningIn = !isAuthenticated && user

      if (isSigningIn) {
        const querySnapshot = await getDocs(
          query(collection(db, 'users'), where('id', '==', user.uid))
        )

        const userFromFirestore = querySnapshot.docs[0]?.data()

        return loginUser(userFromFirestore as any)
      }
    })
  }, [isAuthenticated, loginUser, logout])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
