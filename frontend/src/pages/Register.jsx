import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/api'
import { AuthContext } from '../context/AuthContext'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { reload } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    api.post('/users/register/', { username, password })
      .then(() => {
        return api.post('/users/login/', { username, password })
      })
      .then(() => {
        reload()
        navigate('/profile')
      })
      .catch(() => {
        setError('Ошибка регистрации')
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#1f2933] rounded-xl p-8">

        <h2 className="text-xl font-semibold text-[#e5e7eb] mb-6 text-center">
          Регистрация
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Логин"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-sm text-[#e5e7eb]"
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-sm text-[#e5e7eb]"
          />

          {error && (
            <p className="text-sm text-red-400 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#374151] hover:bg-[#4b5563] transition py-3 rounded-lg text-sm font-medium disabled:opacity-50"
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#9ca3af]">
          Уже есть аккаунт?{' '}
          <Link
            to="/login"
            className="text-[#e5e7eb] hover:underline"
          >
            Войти
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Register
