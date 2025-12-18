import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api/api'

const BACKEND_URL = 'http://localhost:8000'

function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [car, setCar] = useState(null)

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  
  useEffect(() => {
    api.get(`/cars/${id}/`)
      .then(res => setCar(res.data))
      .catch(() => navigate('/catalog'))
  }, [id, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!startDate || !endDate) {
      setError('Выберите даты бронирования')
      return
    }

    if (endDate < startDate) {
      setError('Дата окончания не может быть раньше даты начала')
      return
    }

    setLoading(true)

    api.post('/bookings/', {
      car: id,
      start_date: startDate,
      end_date: endDate,
    })
      .then(() => {
        navigate('/profile')
      })
      .catch(err => {
        setError(
          err.response?.data?.error ||
          'Автомобиль уже забронирован на выбранные даты'
        )
      })
      .finally(() => setLoading(false))
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-[#111827] text-[#9ca3af] flex items-center justify-center">
        Загрузка...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#111827] text-[#e5e7eb] px-6 py-14">
      <div className="max-w-lg mx-auto bg-[#1f2933] rounded-xl overflow-hidden">

        
        <img
          src={
            car.image
              ? `${BACKEND_URL}${car.image}`
              : '/placeholder.jpg'
          }
          alt={`${car.brand} ${car.model}`}
          className="w-full h-56 object-cover"
        />

        <div className="p-7 space-y-6">

          
          <div>
            <h2 className="text-xl font-semibold">
              {car.brand} {car.model}
            </h2>

            <p className="text-sm text-[#9ca3af]">
              {car.car_class_display} • {car.transmission_display}
            </p>

            <p className="text-lg font-semibold mt-2">
              {car.price_per_day} ₽ / день
            </p>
          </div>

          
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm text-[#9ca3af] mb-1">
                Дата начала
              </label>
              <input
                type="date"
                className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-sm"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-[#9ca3af] mb-1">
                Дата окончания
              </label>
              <input
                type="date"
                className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-sm"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#374151] hover:bg-[#4b5563] transition py-3 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {loading ? 'Бронирование...' : 'Забронировать'}
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Booking
