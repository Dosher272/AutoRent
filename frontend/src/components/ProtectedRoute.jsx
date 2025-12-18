import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return <p>Загрузка...</p>
  }

  //  не авторизован — редирект
  if (!user) {
    return <Navigate to="/login" replace />
  }

  //  авторизован
  return children
}

export function AdminRoute({ children }) {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return <p>Загрузка...</p>
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}
