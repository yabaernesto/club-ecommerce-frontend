import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/home/home.page'
import LoginPage from './pages/login/login.page'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
