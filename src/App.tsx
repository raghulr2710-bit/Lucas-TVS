import ReactLenis from 'lenis/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NewHome from './pages/NewHome'
import Home2 from './pages/Home2'

export default function App() {
  return (
    <ReactLenis root>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-home" element={<NewHome />} />
          <Route path="/home2" element={<Home2 />} />
        </Routes>
      </BrowserRouter>
    </ReactLenis>
  )
}
