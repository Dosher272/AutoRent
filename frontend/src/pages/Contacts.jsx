import { useNavigate } from 'react-router-dom'

function Contacts() {
  const navigate = useNavigate()

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#111827] text-[#e5e7eb] px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
=======
    <div className="min-h-screen bg-[#111827] text-[#e5e7eb] px-6 py-14">
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b

      <div className="max-w-6xl mx-auto space-y-14">

        
<<<<<<< HEAD
        <div className="bg-[#1f2933] rounded-xl p-5 sm:p-8 text-center">
          <h1 className="text-xl sm:text-2xl font-semibold mb-3">
=======
        <div className="bg-[#1f2933] rounded-xl p-8 text-center">
          <h1 className="text-2xl font-semibold mb-3">
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
            Контакты AutoRent
          </h1>
          <p className="text-[#9ca3af]">
            Мы всегда на связи и готовы помочь вам
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-[#1f2933] rounded-xl p-6">
            <h3 className="font-medium mb-2">
              📍 Адрес
            </h3>
            <p className="text-sm text-[#9ca3af]">
              г. Ульяновск, ул. Комсомольский пер.,16
            </p>
          </div>

          <div className="bg-[#1f2933] rounded-xl p-6">
            <h3 className="font-medium mb-2">
              📞 Телефон
            </h3>
            <p className="text-sm text-[#9ca3af]">
              +7 (900) 737 73-73
            </p>
          </div>

          <div className="bg-[#1f2933] rounded-xl p-6">
            <h3 className="font-medium mb-2">
              ✉️ Email
            </h3>
            <p className="text-sm text-[#9ca3af]">
              support@autorent.ru
            </p>
          </div>

        </div>

        
<<<<<<< HEAD
        <div className="bg-[#1f2933] rounded-xl p-5 sm:p-8">
=======
        <div className="bg-[#1f2933] rounded-xl p-8">
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
          <h2 className="text-lg font-medium mb-4">
            Часы работы
          </h2>

          <div className="text-sm text-[#9ca3af] space-y-2">
            <p>Понедельник — Пятница: 09:00 – 20:00</p>
            <p>Суббота: 10:00 – 18:00</p>
            <p>Воскресенье: выходной</p>
          </div>
        </div>

        
        <div className="text-center">
          <button
            onClick={() => navigate('/catalog')}
<<<<<<< HEAD
            className="w-full sm:w-auto bg-[#374151] hover:bg-[#4b5563] transition px-8 py-3 rounded-lg text-sm font-medium"
=======
            className="bg-[#374151] hover:bg-[#4b5563] transition px-8 py-3 rounded-lg text-sm font-medium"
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
          >
            Перейти в каталог автомобилей
          </button>
        </div>

      </div>
    </div>
  )
}

export default Contacts
