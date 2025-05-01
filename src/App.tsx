import { useContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'

import Home from './pages/home/home.page'
import ExplorePage from './pages/explore/explore.page'
import LoginPage from './pages/login/login.page'
import SignUpPage from './pages/sign-up/sign-up.page'

import { auth, db } from './config/firebase.config'

import { UserContext } from './contexts/user.context'
import { userConverter } from './converters/firestore.converters'

import Loading from './components/loading/loading.component'
import CategoryDetailsPage from './pages/category-details/category-details.page'

const App = () => {
  const [isInitializing, setIsInitialing] = useState(true)

  const { isAuthenticated, loginUser, logout } = useContext(UserContext)

  onAuthStateChanged(auth, async (user) => {
    const isSigningOut = isAuthenticated && !user

    if (isSigningOut) {
      logout()
      return setIsInitialing(false)
    }

    const isSigningIn = !isAuthenticated && user

    if (isSigningIn) {
      const querySnapshot = await getDocs(
        query(
          collection(db, 'users').withConverter(userConverter),
          where('id', '==', user.uid)
        )
      )

      const userFromFirestore = querySnapshot.docs[0]?.data()

      loginUser(userFromFirestore)
      return setIsInitialing(false)
    }

    return setIsInitialing(false)
  })

  if (isInitializing) return <Loading />

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<ExplorePage />} />
        <Route path='/category/:id' element={<CategoryDetailsPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
