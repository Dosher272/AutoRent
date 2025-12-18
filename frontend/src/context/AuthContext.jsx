import { createContext, useEffect, useState } from 'react'
import api from '../api/api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadUser = () => {
    api.get('/users/profile/')
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading, reload: loadUser }}>
      {children}
    </AuthContext.Provider>
  )
}
