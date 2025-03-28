import ContactImage from '../assets/image/Contact.jpg'

export const Contact = () => {
  return (
    <div
      className='text-white h-screen flex justify-center items-center'
      style={{
        backgroundImage: `url(${ContactImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='bg-gray-800 rounded-2xl p-8 w-1/2'>
        <h2 className='text-4xl font-bold text-center'>Contact Me</h2>
      </div>
    </div>
  )
}
