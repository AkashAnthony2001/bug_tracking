import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import "./index.css"

export default function App() {
  const token = localStorage.getItem('token')
  const path = token ? "/dashboard" : "/login"

  const navigate = useNavigate()

  useEffect(() => {
    navigate(path)
  }, [])

  return (
    <>
    <Outlet />
    </>
  )
}

