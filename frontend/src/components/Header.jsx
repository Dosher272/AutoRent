import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import api from '../api/api'

function Header() {
  const { user, reload } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    api.post('/users/logout/')
      .then(() => {
        reload()
        navigate('/')
      })
  }

  return (
    <header className="bg-[#111827] border-b border-[#1f2933]">
      <div className="max-w-[1500px] mx-auto px-8 py-5 flex items-center justify-between">

        
        <Link
          to="/"
          className="text-lg font-semibold tracking-wide text-[#e5e7eb] hover:text-white transition"
        >
          AutoRent
        </Link>

        
        <nav className="flex items-center gap-8 text-sm text-[#9ca3af]">

          <Link to="/catalog" className="hover:text-white transition">
            Каталог
          </Link>

          <Link to="/about" className="hover:text-white transition">
            О компании
          </Link>

          <Link to="/contacts" className="hover:text-white transition">
            Контакты
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="hover:text-white transition">
                Профиль
              </Link>

              {user.role === 'admin' && (
                <Link
                  to="/admin/bookings"
                  className="text-[#f87171] hover:text-[#ef4444] transition font-medium"
                >
                  Админка
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="ml-4 px-5 py-2 rounded-lg bg-[#374151] hover:bg-[#4b5563] text-[#e5e7eb] transition"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-white transition">
                Вход
              </Link>

              <Link
                to="/register"
                className="ml-4 px-5 py-2 rounded-lg bg-[#374151] hover:bg-[#4b5563] text-[#e5e7eb] transition"
              >
                Регистрация
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
