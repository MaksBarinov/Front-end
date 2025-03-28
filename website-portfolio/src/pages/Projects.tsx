import { useMemo, useState } from 'react'
import { projects } from '../data/projects'
import { Project } from '../types/Project'

export const Projects = () => {
  const [selectedTech, setSelectedTech] = useState<string>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Получаем все уникальные технологии
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>()
    projects.forEach(project => {
      project.technologies.forEach(tech => techs.add(tech))
    })
    return ['All', ...Array.from(techs).sort()]
  }, [])

  // Фильтруем проекты
  const filteredProjects = useMemo(() => {
    return selectedTech === 'All'
      ? projects
      : projects.filter(project => project.technologies.includes(selectedTech))
  }, [selectedTech])

  // Открытие модального окна
  const openModal = (project: Project) => {
    setSelectedProject(project)
    document.body.style.overflow = 'hidden'
  }

  // Закрытие модального окна
  const closeModal = () => {
    setSelectedProject(null)
    document.body.style.overflow = 'auto'
  }

  return (
    <div className='text-black py-24 min-h-screen px-4'>
      <h1 className='text-center text-6xl font-semibold mb-8'>Проекты</h1>

      {/* Фильтр по технологиям */}
      <div className='max-w-6xl mx-auto mb-12'>
        <div className='flex flex-wrap justify-center gap-4'>
          {allTechnologies.map(tech => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedTech === tech
                  ? 'bg-blue-300 text-black scale-105'
                  : 'bg-gray-200 hover:bg-gray-300 hover:scale-105'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Список проектов */}
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {filteredProjects.map((project: Project) => (
          <div
            key={project.id}
            onClick={() => openModal(project)}
            className='bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col h-full cursor-pointer group'
          >
            <div className='p-6 flex-grow'>
              <h2 className='text-2xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors'>
                {project.title}
              </h2>
              <p className='text-white mb-4'>{project.description}</p>
            </div>

            {/* Фиксированный блок внизу карточки */}
            <div className='p-6 border-t border-gray-700'>
              <div className='mb-4'>
                <h3 className='font-semibold mb-1 text-white'>Технологии:</h3>
                <div className='flex flex-wrap gap-2'>
                  {project.technologies.map((tech, index) => (
                    <span
                      key={`${project.id}-${tech}-${index}`}
                      className='bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
                onClick={e => e.stopPropagation()}
                className='block w-full bg-blue-300 hover:bg-blue-400 font-medium py-2 px-4 rounded transition-colors duration-300 text-center'
              >
                Перейти к проекту
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className='text-center text-xl text-gray-500 mt-12'>
          Проектов с выбранной технологией не найдено
        </div>
      )}

      {/* Модальное окно */}
      {selectedProject && (
        <div
          className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50'
          onClick={closeModal}
        >
          <div
            className='bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl'
            onClick={e => e.stopPropagation()}
          >
            <div className='p-6'>
              <div className='flex justify-between items-start mb-4'>
                <h2 className='text-3xl font-bold text-white'>
                  {selectedProject.title}
                </h2>
                <button
                  onClick={closeModal}
                  className='text-white hover:text-blue-300 text-3xl transition-colors'
                >
                  &times;
                </button>
              </div>

              <p className='text-white mb-6'>{selectedProject.description}</p>

              <div className='mb-6'>
                <h3 className='font-semibold text-xl mb-2 text-white'>
                  Технологии:
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={selectedProject.link}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-block bg-blue-300 hover:bg-blue-400 font-medium py-3 px-6 rounded transition-colors duration-300'
              >
                Перейти к проекту
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
