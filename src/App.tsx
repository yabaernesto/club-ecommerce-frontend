import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/header/header.component'
import Home from './components/pages/home/home.page'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
