import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Login'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
