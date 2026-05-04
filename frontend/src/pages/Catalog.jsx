import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../api/api'

const BACKEND_URL = 'http://localhost:8000'

function Catalog() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)

  const [carClass, setCarClass] = useState('')
  const [transmission, setTransmission] = useState('')
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [sort, setSort] = useState('')
  const [onlyAvailable, setOnlyAvailable] = useState(false)

  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const loadCars = (params = {}) => {
    setLoading(true)

    api.get('/cars/', { params })
      .then(res => setCars(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const classFromUrl = searchParams.get('car_class')
    const transmissionFromUrl = searchParams.get('transmission')
    const minPriceFromUrl = searchParams.get('min_price')
    const maxPriceFromUrl = searchParams.get('max_price')
    const sortFromUrl = searchParams.get('sort')
    const statusFromUrl = searchParams.get('status')

    if (classFromUrl) setCarClass(classFromUrl)
    if (transmissionFromUrl) setTransmission(transmissionFromUrl)
    if (minPriceFromUrl) setPriceFrom(minPriceFromUrl)
    if (maxPriceFromUrl) setPriceTo(maxPriceFromUrl)
    if (sortFromUrl) setSort(sortFromUrl)
    if (statusFromUrl === 'available') setOnlyAvailable(true)

    loadCars({
      car_class: classFromUrl || undefined,
      transmission: transmissionFromUrl || undefined,
      min_price: minPriceFromUrl || undefined,
      max_price: maxPriceFromUrl || undefined,
      sort: sortFromUrl || undefined,
      status: statusFromUrl || undefined,
    })
  }, [])

  const handleApplyFilters = () => {
    const params = {}

    if (carClass) params.car_class = carClass
    if (transmission) params.transmission = transmission
    if (priceFrom) params.min_price = priceFrom
    if (priceTo) params.max_price = priceTo
    if (sort) params.sort = sort
    if (onlyAvailable) params.status = 'available'

    setSearchParams(params)
    loadCars(params)
  }

  const handleResetFilters = () => {
    setCarClass('')
    setTransmission('')
    setPriceFrom('')
    setPriceTo('')
    setSort('')
    setOnlyAvailable(false)
    setSearchParams({})
    loadCars({})
  }

  return (
    <div className="min-h-screen bg-[#111827] text-[#e5e7eb]">
      <div className="max-w-[1500px] mx-auto px-8 py-14 grid grid-cols-1 lg:grid-cols-5 gap-8">

        
        <div className="bg-[#1f2933] rounded-xl p-7 space-y-5">
          <h3 className="text-sm font-medium">Фильтры</h3>

          <select
            value={carClass}
            onChange={e => setCarClass(e.target.value)}
            className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-sm"
          >
            <option value="" hidden>Класс авто</option>
            <option value="economy">Низкий</option>
            <option value="middle">Средний</option>
            <option value="luxury">Люкс</option>
          </select>

          <select
            value={transmission}
            onChange={e => setTransmission(e.target.value)}
            className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-sm"
          >
            <option value="" hidden>Трансмиссия</option>
            <option value="manual">Механика</option>
            <option value="automatic">Автомат</option>
          </select>

          <input
            type="number"
            min="0"
            placeholder="Цена от, ₽"
            value={priceFrom}
            onChange={e => setPriceFrom(e.target.value)}
            className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-sm"
          />

          <input
            type="number"
            min="0"
            placeholder="Цена до, ₽"
            value={priceTo}
            onChange={e => setPriceTo(e.target.value)}
            className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-sm"
          />

          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-sm"
          >
            <option value="" hidden>Сортировка</option>
            <option value="price_asc">Цена по возрастанию</option>
            <option value="price_desc">Цена по убыванию</option>
            <option value="year_desc">Год (сначала новые)</option>
            <option value="year_asc">Год (сначала старые)</option>
          </select>

          <label className="flex items-center gap-3 text-xs text-[#9ca3af]">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={e => setOnlyAvailable(e.target.checked)}
              className="h-4 w-4 rounded border border-[#374151] bg-[#111827]"
            />
            Только доступные авто
          </label>

          <button
            onClick={handleApplyFilters}
            className="w-full bg-[#374151] hover:bg-[#4b5563] transition py-3 rounded-lg text-sm font-medium"
          >
            Применить
          </button>

          <button
            onClick={handleResetFilters}
            className="w-full border border-[#374151] hover:border-[#4b5563] transition py-3 rounded-lg text-sm font-medium"
          >
            Сбросить
          </button>
        </div>

        
        <div className="lg:col-span-4">
          {loading ? (
            <p className="text-sm text-[#9ca3af]">Загрузка...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {cars.map(car => (
                <div
                  key={car.id}
                  onClick={() => navigate(`/cars/${car.id}`)}
                  className="bg-[#1f2933] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-6px] transition"
                >
                  <img
                    src={car.image ? `${BACKEND_URL}${car.image}` : '/placeholder.jpg'}
                    alt={`${car.brand} ${car.model}`}
                    className="h-52 w-full object-cover"
                  />

                  <div className="p-5 space-y-1">
                    <h3 className="text-sm font-medium">
                      {car.brand} {car.model}
                    </h3>

                    <p className="text-xs text-[#9ca3af]">
                      {car.car_class_display} • {car.transmission_display}
                    </p>

                    <p className="text-sm font-semibold">
                      {car.price_per_day} ₽ / день
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Catalog
