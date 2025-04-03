import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className='fixed top-0 left-0 w-screen z-50'>
      {/* Верхняя часть хедера */}
      <div className='bg-black flex justify-center items-center h-12'>
        <div className='space-x-10'>
          <Link
            to='/'
            className='hover:text-blue-300 transition-colors duration-300'
          >
            Home
          </Link>
          <Link
            to='/about'
            className='hover:text-blue-300 transition-colors duration-300'
          >
            About
          </Link>
          <Link
            to='/skills'
            className='hover:text-blue-300 transition-colors duration-300'
          >
            Skills
          </Link>
          <Link
            to='/projects'
            className='hover:text-blue-300 transition-colors duration-300'
          >
            Projects
          </Link>
          <Link
            to='/contact'
            className='hover:text-blue-300 transition-colors duration-300'
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  )
}
