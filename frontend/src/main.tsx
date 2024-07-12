import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './Compon/Home/HomePage.tsx'
import './index.css'
import AddPage from './Compon/Form/AddPage.tsx'
import Login from './Compon/Form/Login.tsx'

const handleLoginSuccess = (token: string) => {
  localStorage.setItem('token', token);
  console.log('Login sucessful, token: ', token);
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
  },
  {
    path: '/add',
    element: <AddPage/>
  },
  {
    path: '/login',
    element: <Login onLoginSuccess={handleLoginSuccess}/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
