import React, { useState } from 'react'
import ContactImage from '../assets/image/Contact.jpg'

interface ContactFormState {
  name: string
  email: string
  message: string
}

interface ContactFormErrors {
  name: string
  email: string
  message: string
}

const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const Contact = () => {
  const [formState, setFormState] = useState<ContactFormState>({
    name: '',
    email: '',
    message: '',
  })

  const [formErrors, setFormErrors] = useState<ContactFormErrors>({
    name: '',
    email: '',
    message: '',
  })

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false) // Новое состояние для сообщения об успешной отправке

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }))
    setFormErrors(prevState => ({
      ...prevState,
      [name]: '', // Clear error when typing
    }))
    setIsSubmitted(false) // Скрыть сообщение об успешной отправке при изменении полей
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let isValid = true
    const newErrors: ContactFormErrors = { name: '', email: '', message: '' }

    if (!formState.name) {
      newErrors.name = 'Name is required'
      isValid = false
    }

    if (!formState.email) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!validateEmail(formState.email)) {
      newErrors.email = 'Invalid email format'
      isValid = false
    }

    if (!formState.message) {
      newErrors.message = 'Message is required'
      isValid = false
    }

    setFormErrors(newErrors)

    if (isValid) {
      setIsSubmitted(true) // Установить состояние успешной отправки
      setFormState({ name: '', email: '', message: '' }) // Очистить поля формы
      setFormErrors({ name: '', email: '', message: '' }) // Очистить ошибки
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
              Спасибо за отправленное сообщение! В ближайшее время я обязательно
              отвечу.
            </p>
          )}
          <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
            <div>
              <label
                htmlFor='name'
                className='block text-3xl font-medium mb-2 text-center'
              >
                Имя
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='w-full p-2 border rounded text-black bg-white'
                placeholder='Your Name'
                value={formState.name}
                onChange={handleChange}
              />
              {formErrors.name && (
                <p className='text-red-500 text-xl text-center'>
                  {formErrors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-3xl font-medium mb-2 text-center'
              >
                Почта
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='w-full p-2 border rounded text-black bg-white'
                placeholder='Your Email'
                value={formState.email}
                onChange={handleChange}
              />
              {formErrors.email && (
                <p className='text-red-500 text-xl text-center'>
                  {formErrors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='message'
                className='block text-3xl font-medium mb-2 text-center'
              >
                Сообщение
              </label>
              <textarea
                id='message'
                name='message'
                rows={6}
                className='w-full p-2 border rounded text-black bg-white'
                placeholder='Your Message'
                value={formState.message}
                onChange={handleChange}
              />
              {formErrors.message && (
                <p className='text-red-500 text-xl text-center'>
                  {formErrors.message}
                </p>
              )}
            </div>

            <button
              type='submit'
              className='bg-blue-300 hover:bg-blue-400 text-black font-bold py-2 px-4 rounded mt-4 w-full'
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
