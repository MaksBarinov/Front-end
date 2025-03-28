import profileImage from '../assets/image/test.jpg'

export const Home = () => {
  return (
    <div className='h-screen w-full flex'>
      <div className='w-1/2 flex flex-col justify-end items-start p-10 text-black'>
        <h1 className='text-9xl font-semibold'>Баринов Максим</h1>
        <p className='text-lg mt-6'>
          На этом сайте портфолио вы найдете мои проекты и достижения в области
          разработки.
        </p>
      </div>
      <div
        className='w-1/2 bg-cover bg-center'
        style={{
          backgroundImage: `url(${profileImage})`,
        }}
      />
    </div>
  )
}
