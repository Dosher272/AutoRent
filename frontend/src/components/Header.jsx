import { Link, useNavigate } from 'react-router-dom'
<<<<<<< HEAD
import { useContext, useState } from 'react'
=======
import { useContext } from 'react'
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
import { AuthContext } from '../context/AuthContext'
import api from '../api/api'

function Header() {
  const { user, reload } = useContext(AuthContext)
  const navigate = useNavigate()
<<<<<<< HEAD
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)
=======
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b

  const handleLogout = () => {
    api.post('/users/logout/')
      .then(() => {
        reload()
<<<<<<< HEAD
        closeMenu()
=======
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
        navigate('/')
      })
  }

  return (
<<<<<<< HEAD
    <header className="bg-[#111827] border-b border-[#1f2933] sticky top-0 z-40">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-lg sm:text-xl font-semibold tracking-wide text-[#e5e7eb] hover:text-white transition"
=======
    <header className="bg-[#111827] border-b border-[#1f2933]">
      <div className="max-w-[1500px] mx-auto px-8 py-5 flex items-center justify-between">

        
        <Link
          to="/"
          className="text-lg font-semibold tracking-wide text-[#e5e7eb] hover:text-white transition"
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
        >
          AutoRent
        </Link>

<<<<<<< HEAD
        <nav className="hidden md:flex items-center gap-6 text-sm text-[#9ca3af]">
          <Link to="/catalog" className="hover:text-white transition">Каталог</Link>
          <Link to="/about" className="hover:text-white transition">О компании</Link>
          <Link to="/contacts" className="hover:text-white transition">Контакты</Link>

          {user ? (
            <>
              <Link to="/profile" className="hover:text-white transition">Профиль</Link>
=======
        
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
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b

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
<<<<<<< HEAD
                className="px-4 py-2 rounded-lg bg-[#374151] hover:bg-[#4b5563] text-[#e5e7eb] transition"
=======
                className="ml-4 px-5 py-2 rounded-lg bg-[#374151] hover:bg-[#4b5563] text-[#e5e7eb] transition"
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
              >
                Выйти
              </button>
            </>
          ) : (
            <>
<<<<<<< HEAD
              <Link to="/login" className="hover:text-white transition">Вход</Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-[#374151] hover:bg-[#4b5563] text-[#e5e7eb] transition"
=======
              <Link to="/login" className="hover:text-white transition">
                Вход
              </Link>

              <Link
                to="/register"
                className="ml-4 px-5 py-2 rounded-lg bg-[#374151] hover:bg-[#4b5563] text-[#e5e7eb] transition"
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
              >
                Регистрация
              </Link>
            </>
          )}
        </nav>
<<<<<<< HEAD

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#e5e7eb] text-2xl leading-none"
          aria-label="Открыть меню"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#1f2933] bg-[#111827] px-4 pb-4 shadow-xl">
          <div className="flex flex-col gap-3 text-sm text-[#9ca3af] pt-4">
            <Link to="/catalog" onClick={closeMenu} className="hover:text-white transition py-1">Каталог</Link>
            <Link to="/about" onClick={closeMenu} className="hover:text-white transition py-1">О компании</Link>
            <Link to="/contacts" onClick={closeMenu} className="hover:text-white transition py-1">Контакты</Link>

            {user ? (
              <>
                <Link to="/profile" onClick={closeMenu} className="hover:text-white transition py-1">Профиль</Link>

                {user.role === 'admin' && (
                  <Link
                    to="/admin/bookings"
                    onClick={closeMenu}
                    className="text-[#f87171] hover:text-[#ef4444] transition font-medium py-1"
                  >
                    Админка
                  </Link>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full mt-2 px-4 py-3 rounded-lg bg-[#374151] hover:bg-[#4b5563] text-[#e5e7eb] transition text-left"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="hover:text-white transition py-1">Вход</Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="w-full mt-2 px-4 py-3 rounded-lg bg-[#374151] hover:bg-[#4b5563] text-[#e5e7eb] transition text-center"
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      )}
=======
      </div>
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
    </header>
  )
}

export default Header
