import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

function Profile() {
  const [user, setUser] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const statusStyles = {
    pending: 'text-yellow-400',
    approved: 'text-green-400',
    cancelled: 'text-red-400',
  }

<<<<<<< HEAD
  const paymentStyles = {
    not_paid: 'text-red-400',
    pending: 'text-yellow-400',
    succeeded: 'text-green-400',
    canceled: 'text-red-400',
  }

=======
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
  useEffect(() => {
    Promise.all([
      api.get('/users/profile/'),
      api.get('/bookings/my/')
    ])
      .then(([profileRes, bookingsRes]) => {
        setUser(profileRes.data)
        setBookings(bookingsRes.data)
      })
      .catch(() => {
        navigate('/login', { replace: true })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [navigate])

  const changePassword = () => {
    setMessage('')

    api.post('/users/change-password/', {
      old_password: oldPassword,
      new_password: newPassword
    })
      .then(res => {
        setMessage(res.data.message)
        setOldPassword('')
        setNewPassword('')
      })
      .catch(err => {
        setMessage(err.response?.data?.error || 'Ошибка смены пароля')
      })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111827] text-[#9ca3af] flex items-center justify-center">
        Загрузка профиля...
      </div>
    )
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#111827] text-[#e5e7eb] px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        
        <div className="lg:col-span-2 bg-[#1f2933] rounded-xl p-5 sm:p-7">
=======
    <div className="min-h-screen bg-[#111827] text-[#e5e7eb] px-6 py-14">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        
        <div className="lg:col-span-2 bg-[#1f2933] rounded-xl p-7">
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
          <h3 className="text-sm font-medium mb-4">
            Мои бронирования
          </h3>

          {bookings.length === 0 ? (
            <p className="text-sm text-[#9ca3af]">
              У вас пока нет бронирований
            </p>
          ) : (
            <div className="space-y-4">
              {bookings.map(b => (
                <div
                  key={b.id}
<<<<<<< HEAD
                  className="bg-[#111827] border border-[#374151] rounded-lg p-4 text-sm break-words"
=======
                  className="bg-[#111827] border border-[#374151] rounded-lg p-4 text-sm"
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
                >
                  <div className="font-medium">
                    {b.car_name}
                  </div>

                  <div className="text-[#9ca3af]">
                    {b.start_date} — {b.end_date}
                  </div>

                  <div className="mt-1">
                    Статус:{' '}
                    <span className={`font-medium ${statusStyles[b.status]}`}>
                      {b.status_display}
                    </span>
                  </div>
<<<<<<< HEAD

                  <div className="mt-1">
                    Оплата:{' '}
                    <span className={`font-medium ${paymentStyles[b.payment_status]}`}>
                      {b.payment_status_display}
                    </span>
                  </div>

                  <div className="mt-1 text-[#9ca3af]">
                    Сумма: {b.total_price} ₽
                  </div>

                  {b.payment_status !== 'succeeded' && b.status !== 'cancelled' && (
                    <button
                      onClick={() => navigate(`/payment/${b.id}`)}
                      className="mt-3 bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded-lg text-xs font-medium"
                    >
                      Оплатить
                    </button>
                  )}
=======
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
                </div>
              ))}
            </div>
          )}
        </div>

        
<<<<<<< HEAD
        <div className="bg-[#1f2933] rounded-xl p-5 sm:p-7 space-y-5">
=======
        <div className="bg-[#1f2933] rounded-xl p-7 space-y-5">
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b

          <div className="text-sm text-[#9ca3af]">
            Пользователь:{' '}
            <span className="text-[#e5e7eb] font-medium">
              @{user.username}
            </span>
          </div>

          <input
            type="password"
            placeholder="Текущий пароль"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-sm"
          />

          <input
            type="password"
            placeholder="Новый пароль"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-sm"
          />

          <button
            onClick={changePassword}
            className="w-full bg-[#374151] hover:bg-[#4b5563] transition py-3 rounded-lg text-sm font-medium"
          >
            Сменить пароль
          </button>

          {message && (
            <p className="text-sm text-center text-[#9ca3af]">
              {message}
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default Profile
