import { useNavigate } from 'react-router-dom'

function About() {
  const navigate = useNavigate()

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#111827] text-[#e5e7eb] px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
=======
    <div className="min-h-screen bg-[#111827] text-[#e5e7eb] px-6 py-14">
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b

      <div className="max-w-6xl mx-auto space-y-14">

        
<<<<<<< HEAD
        <div className="bg-[#1f2933] rounded-xl p-5 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4">
=======
        <div className="bg-[#1f2933] rounded-xl p-8">
          <h1 className="text-2xl font-semibold mb-4">
>>>>>>> d5dffd4b4b2fb4c57af278d9e50c14d89e24127b
            О компании AutoRent
          </h1>

          <p className="text-[#9ca3af] leading-relaxed">
            AutoRent — сервис аренды автомобилей с прозрачными условиями,
            современным автопарком и удобным онлайн-бронированием.
            Мы предлагаем автомобили разных классов — от доступных городских
            до премиальных моделей.
          </p>

          <p className="text-[#9ca3af] leading-relaxed mt-4">
            Наша цель — сделать аренду автомобиля простой, быстрой
            и максимально комфортной.
          </p>
        </div>

        
        <div>
          <h2 className="text-xl font-semibold mb-6 text-center">
            Почему выбирают нас
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Современный автопарк',
                text: 'Только проверенные автомобили в отличном состоянии'
              },
              {
                title: 'Прозрачные цены',
                text: 'Без скрытых комиссий и неожиданных доплат'
              },
              {
                title: 'Удобное бронирование',
                text: 'Онлайн-оформление за пару минут'
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#1f2933] rounded-xl p-6"
              >
                <h3 className="font-medium mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#9ca3af]">
                  {item.text}
                </p>
              </div>
            ))}
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

export default About
