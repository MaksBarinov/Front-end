export const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-4 flex justify-between items-center px-20'>
      {/* Контактная информация */}
      <div className='text-left'>
        <div className='flex space-x-4'>
          <a
            href='mailto:klowis3@yandex.ru'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-blue-300'
          >
            klowis3@yandex.ru
          </a>
          <p>+79244825576</p>
        </div>
      </div>

      {/* Социальные сети */}
      <div className='text-right'>
        <div className='flex space-x-4'>
          <a
            href='https://t.me/Cheburashka234'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-blue-300'
          >
            Telegram
          </a>
          <a
            href='https://vk.com/avakadiko'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-blue-300'
          >
            VK
          </a>
          <a
            href='https://github.com/MaksBarinov'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-blue-300'
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
