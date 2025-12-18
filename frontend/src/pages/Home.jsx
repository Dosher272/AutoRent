import { useEffect, useState } from 'react'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [cars, setCars] = useState([])

  const [carClass, setCarClass] = useState('')
  const [transmission, setTransmission] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    api.get('/cars/')
      .then(res => setCars(res.data.slice(0, 5)))
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (carClass) params.append('car_class', carClass)
    if (transmission) params.append('transmission', transmission)

    navigate(`/catalog?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-[#111827] text-[#e5e7eb]">

      
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-4 gap-6">

        
        <div className="bg-[#243040] rounded-lg p-5 text-sm text-[#e5e7eb] space-y-3">
  <h3 className="font-medium text-center">
    О компании
  </h3>

  <p className="text-[#9ca3af] text-xs leading-relaxed">
    AutoRent — современный сервис аренды автомобилей для города и путешествий.
    Мы предлагаем только проверенные автомобили, прозрачные цены и удобное
    онлайн-бронирование без скрытых условий.
  </p>

  <ul className="text-xs text-[#9ca3af] space-y-1">
    <li>• Более 50 автомобилей в автопарке</li>
    <li>• Поддержка 24/7</li>
    <li>• Быстрое оформление</li>
    <li>• Честные цены без доплат</li>
  </ul>
</div>

        
        <div className="lg:col-span-2 bg-[#1f2933] rounded-lg p-7">
          <h2 className="bg-[#374151] text-center py-2 rounded font-medium mb-6">
            Поиск автомобиля
          </h2>

          <div className="space-y-3">

            
            <select
              value={carClass}
              onChange={e => setCarClass(e.target.value)}
              className="w-full bg-[#111827] border border-[#374151] rounded px-3 py-2 text-sm"
            >
              <option value="" hidden>Класс авто</option>
              <option value="economy">Низкий</option>
              <option value="middle">Средний</option>
              <option value="luxury">Люкс</option>
            </select>

            
            <select
              value={transmission}
              onChange={e => setTransmission(e.target.value)}
              className="w-full bg-[#111827] border border-[#374151] rounded px-3 py-2 text-sm"
            >
              <option value="" hidden>Трансмиссия</option>
              <option value="manual">Механика</option>
              <option value="automatic">Автомат</option>
            </select>

            <button
              onClick={handleSearch}
              className="w-full mt-4 bg-[#374151] hover:bg-[#4b5563] transition py-2 rounded text-sm font-medium"
            >
              Найти автомобиль
            </button>

          </div>
        </div>

        
        <div className="bg-[#243040] rounded-lg p-5 text-sm text-[#e5e7eb] space-y-4">
  <h3 className="font-medium text-center">
    Отзывы клиентов
  </h3>

  <div className="bg-[#1f2933] rounded p-3 text-xs">
    <p className="text-[#9ca3af]">
      «Брал авто на выходные — всё прошло идеально. Машина чистая, цены честные,
      поддержка отвечает быстро.»
    </p>
    <p className="mt-1 text-[#6b7280]">
      — Алексей
    </p>
  </div>

  <div className="bg-[#1f2933] rounded p-3 text-xs">
    <p className="text-[#9ca3af]">
      «Очень удобный сервис, оформила бронирование за 5 минут.
      Обязательно воспользуюсь снова.»
    </p>
    <p className="mt-1 text-[#6b7280]">
      — Мария
    </p>
  </div>

  <div className="bg-[#1f2933] rounded p-3 text-xs">
    <p className="text-[#9ca3af]">
      «Отличный выбор автомобилей, брал люкс-класс — состояние идеальное.»
    </p>
    <p className="mt-1 text-[#6b7280]">
      — Дмитрий
    </p>
  </div>
</div>

      </div>

      
      <div className="max-w-7xl mx-auto px-6 pb-14">
        <h2 className="text-center text-lg font-medium mb-7">
          Популярные автомобили
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {cars.map(car => (
            <div
              key={car.id}
              onClick={() => navigate(`/cars/${car.id}`)}
              className="bg-[#1f2933] rounded-lg overflow-hidden cursor-pointer hover:translate-y-[-4px] transition"
            >
              <img
                src={`http://localhost:8000${car.image}`}
                alt={`${car.brand} ${car.model}`}
                className="h-36 w-full object-cover"
              />

              <div className="p-3">
                <h3 className="text-sm font-medium">
                  {car.brand} {car.model}
                </h3>
                <p className="text-xs text-[#9ca3af]">
                  {car.price_per_day} ₽ / день
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Home
