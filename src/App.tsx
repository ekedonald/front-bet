import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import AppProvider from '@/providers/AppProvider'
import Views from '@/views'

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<Views />} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
