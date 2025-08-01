import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import CheckAuth from './components/CheckAuth'
import Tickets from './pages/Tickets'
import TicketDetailsPage from './pages/Ticket'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Admin from './pages/Admin'



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>

<Routes>

  <Route
    path="/"
    element={
      <CheckAuth protected={true}>
        <Tickets />
      </CheckAuth>
    }
  />

  <Route
    path="/tickets/:id"
    element={
      <CheckAuth protected={true}>
        <TicketDetailsPage />
      </CheckAuth>
    }
  />

  <Route
    path="/login"
    element={
      <CheckAuth protected={false}>
        <Login />
      </CheckAuth>
    }
  />

  <Route
    path="/signup"
    element={
      <CheckAuth protected={false}>
        <Signup />
      </CheckAuth>
    }
  />

  <Route
    path="/admin"
    element={
      <CheckAuth protected={true}>
        <Admin />
      </CheckAuth>
    }
  />

</Routes>


  </BrowserRouter>

  </StrictMode>,
)
