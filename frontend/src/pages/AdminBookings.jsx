import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'

function AdminBookings() {
  const [bookings, setBookings] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = () => {
    api.get('/bookings/admin/')
      .then(res => setBookings(res.data))
      .catch(() => navigate('/', { replace: true }))
  }

  const approveBooking = (id) => {
    api.post(`/bookings/${id}/approve/`)
      .then(loadBookings)
      .catch(() => alert('Ошибка подтверждения'))
  }

  const cancelBooking = (id) => {
    api.post(`/bookings/${id}/cancel/`)
      .then(loadBookings)
      .catch(() => alert('Ошибка отмены'))
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return { text: 'На подтверждении', color: 'text-yellow-400' }
      case 'approved':
        return { text: 'Подтверждено', color: 'text-green-400' }
      case 'cancelled':
        return { text: 'Отменено', color: 'text-red-400' }
      default:
        return { text: status, color: 'text-gray-400' }
    }
  }

  if (bookings === null) {
    return (
      <div className="min-h-screen bg-[#111827] text-[#9ca3af] flex items-center justify-center">
        Загрузка бронирований...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#111827] text-[#e5e7eb] px-6 py-14">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-xl font-semibold mb-8">
          Админка — бронирования
        </h2>

        {bookings.length === 0 ? (
          <p className="text-sm text-[#9ca3af]">
            Бронирований нет
          </p>
        ) : (
          <div className="space-y-4">
            {bookings.map(b => {
              const status = getStatusLabel(b.status)

              return (
                <div
                  key={b.id}
                  className="bg-[#1f2933] border border-[#374151] rounded-xl p-5 text-sm"
                >
                  <div className="flex justify-between items-start gap-4">

                    <div>
                      <div className="font-medium mb-1">
                        {b.car_name}
                      </div>

                      <div className="text-[#9ca3af]">
                        {b.start_date} — {b.end_date}
                      </div>

                      <div className="mt-1">
                        Статус:{' '}
                        <span className={`font-medium ${status.color}`}>
                          {status.text}
                        </span>
                      </div>
                    </div>

                    {b.status === 'pending' && (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => approveBooking(b.id)}
                          className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded-lg text-xs font-medium"
                        >
                          Подтвердить
                        </button>

                        <button
                          onClick={() => cancelBooking(b.id)}
                          className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg text-xs font-medium"
                        >
                          Отменить
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}

export default AdminBookings
