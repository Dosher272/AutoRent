import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/api'

<<<<<<< HEAD
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
=======
const BACKEND_URL = 'http://localhost:8000'
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b

function CarPage() {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/cars/${id}/`)
      .then(res => setCar(res.data))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111827] text-[#9ca3af] flex items-center justify-center">
        Загрузка...
      </div>
    )
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-[#111827] text-red-400 flex items-center justify-center">
        Автомобиль не найден
      </div>
    )
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#111827] text-[#e5e7eb] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
=======
    <div className="min-h-screen bg-[#111827] text-[#e5e7eb] px-6 py-10">
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
      <div className="max-w-5xl mx-auto">

        <Link
          to="/catalog"
          className="text-sm text-[#9ca3af] hover:text-white mb-4 inline-block"
        >
          ← Назад в каталог
        </Link>

        <div className="bg-[#1f2933] rounded-xl overflow-hidden">

         
          <img
            src={
              car.image
                ? `${BACKEND_URL}${car.image}`
                : '/placeholder.jpg'
            }
            alt={`${car.brand} ${car.model}`}
<<<<<<< HEAD
            className="w-full h-56 sm:h-80 object-cover"
          />

          <div className="p-5 sm:p-7 space-y-4">

            <h1 className="text-xl sm:text-2xl font-semibold">
=======
            className="w-full h-80 object-cover"
          />

          <div className="p-7 space-y-4">

            <h1 className="text-2xl font-semibold">
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
              {car.brand} {car.model}
            </h1>

            <p className="text-sm text-[#9ca3af]">
              {car.car_class_display} • {car.transmission_display} • {car.year}
            </p>

            <p className="text-xl font-semibold">
              {car.price_per_day} ₽ / день
            </p>

            {car.description && (
              <p className="text-sm text-[#9ca3af]">
                {car.description}
              </p>
            )}

            <Link
              to={`/booking/${car.id}`}
<<<<<<< HEAD
              className="inline-block w-full sm:w-auto text-center bg-[#374151] hover:bg-[#4b5563] transition px-6 py-3 rounded-lg text-sm font-medium"
=======
              className="inline-block bg-[#374151] hover:bg-[#4b5563] transition px-6 py-3 rounded-lg text-sm font-medium"
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
            >
              Забронировать
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CarPage
