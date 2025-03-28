import { useState } from 'react'
import ContactImage from '../assets/image/Contact.jpg'

export const Contact = () => {
  // Состояния формы
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  // Проверка email
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  // Обработчик изменений
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // Отправка формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Валидация
    const newErrors = {
      name: formData.name ? '' : 'Имя обязательно',
      email: formData.email
        ? isValidEmail(formData.email)
          ? ''
          : 'Неверный формат email'
        : 'Email обязателен',
      message: formData.message ? '' : 'Сообщение обязательно',
    }

    setErrors(newErrors)

    // Если нет ошибок
    if (!Object.values(newErrors).some(error => error)) {
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    }
  }

  return (
    <div
      className='text-white py-24 h-screen'
      style={{
        backgroundImage: `url(${ContactImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='flex justify-center items-center h-full'>
        <div className='bg-opacity-50 p-8 w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2'>
          <h2 className='text-8xl font-bold text-center mb-6'>Напиши мне</h2>

          {isSubmitted && (
            <p className='text-green-500 text-xl text-center mb-4'>
              Спасибо за сообщение! Я отвечу в ближайшее время.
            </p>
          )}

          <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
            <div>
              <label className='block text-3xl font-medium mb-2 text-center'>
                Имя
              </label>
              <input
                type='text'
                name='name'
                className='w-full p-2 border rounded text-black bg-white'
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className='text-red-500 text-xl text-center'>
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className='block text-3xl font-medium mb-2 text-center'>
                Почта
              </label>
              <input
                type='email'
                name='email'
                className='w-full p-2 border rounded text-black bg-white'
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className='text-red-500 text-xl text-center'>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className='block text-3xl font-medium mb-2 text-center'>
                Сообщение
              </label>
              <textarea
                name='message'
                rows={6}
                className='w-full p-2 border rounded text-black bg-white'
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && (
                <p className='text-red-500 text-xl text-center'>
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type='submit'
              className='bg-blue-300 hover:bg-blue-400 text-black font-bold py-2 px-4 rounded mt-4 w-full transition-colors'
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
