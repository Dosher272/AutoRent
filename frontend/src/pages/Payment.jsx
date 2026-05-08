import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/api'

function Payment() {
  const { bookingId } = useParams()
  const navigate = useNavigate()

  const [booking, setBooking] = useState(null)
  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  useEffect(() => {
    api.get('/bookings/my/')
      .then(res => {
        const foundBooking = res.data.find(item => String(item.id) === String(bookingId))

        if (!foundBooking) {
          navigate('/profile', { replace: true })
          return
        }

        setBooking(foundBooking)
      })
      .catch(() => navigate('/login', { replace: true }))
  }, [bookingId, navigate])

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4)

    if (digits.length <= 2) return digits
    return `${digits.slice(0, 2)}/${digits.slice(2)}`
  }

  const payBooking = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!cardNumber || !cardHolder || !expiry || !cvv) {
      setError('Пожалуйста, заполните все данные карты')
      return
    }

    if (cardNumber.replace(/\s/g, '').length < 16) {
      setError('Номер карты должен содержать 16 цифр')
      return
    }

    if (cardHolder.trim().length < 3) {
      setError('Введите имя владельца карты')
      return
    }

    if (expiry.length < 5) {
      setError('Введите срок действия карты в формате ММ/ГГ')
      return
    }

    if (cvv.length < 3) {
      setError('CVV должен содержать 3 цифры')
      return
    }

    setLoading(true)

    api.post(`/payments/${bookingId}/pay/`, {
      card_number: cardNumber,
      card_holder: cardHolder,
      expiry,
      cvv,
    })
      .then(res => {
        setSuccess(res.data.message || 'Услуга успешно оплачена')
        setShowSuccessModal(true)

        setTimeout(() => {
          navigate('/profile')
        }, 1800)
      })
      .catch(err => {
        const data = err.response?.data

        if (typeof data === 'string') {
          setError(data)
        } else if (data && typeof data === 'object') {
          const firstError = Object.values(data)[0]
          setError(Array.isArray(firstError) ? firstError[0] : firstError)
        } else {
          setError('Ошибка оплаты')
        }
      })
      .finally(() => setLoading(false))
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#111827] text-[#9ca3af] flex items-center justify-center px-4">
        Загрузка оплаты...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#111827] text-[#e5e7eb] px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-[#1f2933] border border-[#374151] rounded-xl p-5 sm:p-7 h-fit">
          <p className="text-sm text-[#9ca3af] mb-2">
            Оплата бронирования №{booking.id}
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            {booking.car_name}
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-[#9ca3af]">Период аренды</span>
              <span className="text-right">{booking.start_date} — {booking.end_date}</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-[#9ca3af]">Количество дней</span>
              <span>{booking.total_days}</span>
            </div>

            <div className="flex justify-between gap-4 text-base sm:text-lg font-semibold pt-4 border-t border-[#374151]">
              <span>К оплате</span>
              <span>{booking.total_price} ₽</span>
            </div>
          </div>

          <p className="text-xs text-[#9ca3af] mt-6 leading-relaxed">
            Это демонстрационная оплата для дипломного проекта. Деньги не списываются,
            данные карты никуда не отправляются и не сохраняются полностью.
          </p>
        </div>

        <form
          onSubmit={payBooking}
          className="bg-[#1f2933] border border-[#374151] rounded-xl p-5 sm:p-7 space-y-5"
        >
          <h3 className="text-lg font-semibold">
            Банковская карта
          </h3>

          <input
            type="text"
            inputMode="numeric"
            placeholder="Номер карты"
            value={cardNumber}
            onChange={e => setCardNumber(formatCardNumber(e.target.value))}
            className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-sm outline-none focus:border-green-500"
          />

          <input
            type="text"
            placeholder="Имя владельца"
            value={cardHolder}
            onChange={e => setCardHolder(e.target.value.toUpperCase())}
            className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-sm outline-none focus:border-green-500"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              inputMode="numeric"
              placeholder="ММ/ГГ"
              value={expiry}
              onChange={e => setExpiry(formatExpiry(e.target.value))}
              className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-sm outline-none focus:border-green-500"
            />

            <input
              type="password"
              inputMode="numeric"
              placeholder="CVV"
              value={cvv}
              onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
              className="w-full bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-sm outline-none focus:border-green-500"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {success && !showSuccessModal && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-300 rounded-lg px-4 py-3 text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 transition py-3 rounded-lg text-sm font-medium disabled:opacity-50"
          >
            {loading ? 'Оплата...' : `Оплатить ${booking.total_price} ₽`}
          </button>

          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="w-full bg-[#374151] hover:bg-[#4b5563] transition py-3 rounded-lg text-sm font-medium"
          >
            Вернуться в профиль
          </button>
        </form>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50">
          <div className="w-full max-w-sm bg-[#1f2933] border border-green-500/30 rounded-2xl p-6 text-center shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center text-3xl">
              ✅
            </div>

            <h3 className="text-xl font-semibold text-white mb-2">
              Оплата прошла успешно
            </h3>

            <p className="text-sm text-[#9ca3af] mb-4">
              Ваше бронирование успешно оплачено.
            </p>

            <div className="bg-[#111827] border border-[#374151] rounded-lg px-4 py-3 text-sm text-[#e5e7eb]">
              Сумма оплаты: <span className="font-semibold">{booking.total_price} ₽</span>
            </div>

            <p className="text-xs text-[#6b7280] mt-4">
              Сейчас вы будете перенаправлены в профиль...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Payment
