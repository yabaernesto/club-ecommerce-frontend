import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'

// pages
import Home from './pages/home/home.page'
import ExplorePage from './pages/explore/explore.page'
import LoginPage from './pages/login/login.page'
import SignUpPage from './pages/sign-up/sign-up.page'

// utilities
import { auth, db } from './config/firebase.config'
import { userConverter } from './converters/firestore.converters'

// componentes
import Loading from './components/loading/loading.component'
import Cart from './components/cart/cart.component'
import Checkout from './components/checkout/checkout.component'
import PaymentConfirmation from './pages/payment-confirmation/payment-confirmation.component'
import CategoryDetailsPage from './pages/category-details/category-details.page'

import AuthenticationGuard from './guards/authentication.guards'

const App = () => {
  const [isInitializing, setIsInitialing] = useState(true)

  const dispatch = useDispatch()

  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  )

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const isSigningOut = isAuthenticated && !user

      if (isSigningOut) {
        dispatch({ type: 'LOGOUT_USER' })

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

        dispatch({ type: 'LOGIN_USER', payload: userFromFirestore })

        return setIsInitialing(false)
      }

      return setIsInitialing(false)
    })
  }, [dispatch])

  if (isInitializing) return <Loading />

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<ExplorePage />} />
        <Route path='/category/:id' element={<CategoryDetailsPage />} />
        <Route
          path='/checkout'
          element={
            <AuthenticationGuard>
              <Checkout />
            </AuthenticationGuard>
          }
        />
        <Route path='/payment-confirmation' element={<PaymentConfirmation />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
      </Routes>

      <Cart />
    </BrowserRouter>
  )
}

export default App
