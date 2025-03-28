import ImageNow from '../assets/image/now.jpg'

export const About = () => {
  return (
    <div className='text-black py-24'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-center mb-16 space-x-20'>
          <img
            src={ImageNow}
            alt='Profile'
            className='rounded-2xl w-2/6 object-cover hover:scale-110 transition-normal duration-200'
          />
          <div className='text-center w-3/5 space-y-20'>
            <h1 className=' text-9xl font-extrabold flex justify-center mb-30'>
              Обо мне
            </h1>
            <p className='text-2xl text-left font-extralight'>
              <span className='hover:bg-pink-300 transition-colors duration-300'>
                Сейчас я учусь на третьем курсе ДВФУ по направлению
              </span>{' '}
              <span className=' text-black bg-blue-300'>
                "Прикладная математика и информатика",
              </span>{' '}
              <span className='hover:bg-yellow-300 transition-colors duration-300'>
                активно осваивая различные области разработки.
              </span>{' '}
              <span className='hover:bg-indigo-400 transition-colors duration-300'>
                В студенческие годы я пробовал себя в разных сферах,
              </span>{' '}
              <span className='hover:bg-rose-300 transition-colors duration-300'>
                от фотографии до сапсерфинга,
              </span>
              <span className='hover:bg-gray-300 transition-colors duration-300'>
                что помогло мне расширить кругозор и завести много новых
                знакомств.
              </span>
            </p>
            <p className='text-xl text-left font-semibold'>
              <span className='hover:bg-lime-300 transition-colors duration-300'>
                Этот сайт-портфолио —
              </span>{' '}
              <span className='hover:bg-red-300 transition-colors duration-300'>
                {' '}
                мой первый шаг к тому,
              </span>{' '}
              <span className='hover:bg-purple-300 transition-colors duration-300'>
                чтобы продемонстрировать
              </span>{' '}
              <span className='hover:bg-amber-300 transition-colors duration-300'>
                свои навыки и проекты
              </span>{' '}
              <span className='hover:bg-fuchsia-300 transition-colors duration-300'>
                в области разработки и программирования.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
