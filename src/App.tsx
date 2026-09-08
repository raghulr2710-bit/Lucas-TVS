import ReactLenis from 'lenis/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NewHome from './pages/NewHome'

export default function App() {
  return (
    <ReactLenis root>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-home" element={<NewHome />} />
        </Routes>
      </BrowserRouter>
    </ReactLenis>
  )
}
