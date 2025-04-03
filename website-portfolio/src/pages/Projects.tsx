import { useMemo, useState } from 'react'
import { useProjectStore } from '../store/useProjectStore'
import { Project } from '../types/Project'

export const Projects = () => {
  const { projects, addProject } = useProjectStore()
  const [selectedTech, setSelectedTech] = useState<string>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)

  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    technologies: [],
    link: '',
  })
  const [tempTech, setTempTech] = useState('')

  const allTechnologies = useMemo(() => {
    const techs = new Set<string>()
    projects.forEach(project => {
      project.technologies.forEach(tech => techs.add(tech))
    })
    return ['All', ...Array.from(techs).sort()]
  }, [projects])

  const filteredProjects = useMemo(() => {
    return selectedTech === 'All'
      ? projects
      : projects.filter(project => project.technologies.includes(selectedTech))
  }, [selectedTech, projects])

  const handleAddProject = () => {
    if (!newProject.title || !newProject.description) return

    const projectToAdd: Project = {
      ...newProject,
      id: Date.now(),
    }

    addProject(projectToAdd)
    setNewProject({
      title: '',
      description: '',
      technologies: [],
      link: '',
    })
    setIsAddFormOpen(false)
  }

  const addTechnology = () => {
    if (tempTech && !newProject.technologies.includes(tempTech)) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, tempTech],
      })
      setTempTech('')
    }
  }

  const removeTechnology = (techToRemove: string) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter(
        tech => tech !== techToRemove
      ),
    })
  }

  const openModal = (project: Project) => {
    setSelectedProject(project)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedProject(null)
    setIsAddFormOpen(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <div className='text-black py-24 min-h-screen px-4'>
      <h1 className='text-center text-6xl font-semibold mb-8'>Проекты</h1>

      <div className='max-w-6xl mx-auto mb-6 flex justify-end'>
        <button
          onClick={() => setIsAddFormOpen(true)}
          className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors'
        >
          Добавить проект
        </button>
      </div>

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

      {isAddFormOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50'>
          <div
            className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl p-6'
            onClick={e => e.stopPropagation()}
          >
            <div className='flex justify-between items-start mb-4'>
              <h2 className='text-2xl font-bold'>Добавить новый проект</h2>
              <button
                onClick={closeModal}
                className='text-gray-500 hover:text-black text-2xl'
              >
                &times;
              </button>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Название*
                </label>
                <input
                  type='text'
                  value={newProject.title}
                  onChange={e =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  className='w-full p-2 border rounded'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  Описание*
                </label>
                <textarea
                  value={newProject.description}
                  onChange={e =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  className='w-full p-2 border rounded'
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>Ссылка</label>
                <input
                  type='url'
                  value={newProject.link}
                  onChange={e =>
                    setNewProject({ ...newProject, link: e.target.value })
                  }
                  className='w-full p-2 border rounded'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  Технологии
                </label>
                <div className='flex gap-2 mb-2'>
                  <input
                    type='text'
                    value={tempTech}
                    onChange={e => setTempTech(e.target.value)}
                    className='flex-1 p-2 border rounded'
                    placeholder='Введите технологию'
                  />
                  <button
                    onClick={addTechnology}
                    className='bg-blue-500 text-white px-4 rounded'
                  >
                    Добавить
                  </button>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {newProject.technologies.map(tech => (
                    <div
                      key={tech}
                      className='bg-gray-200 px-3 py-1 rounded-full flex items-center'
                    >
                      {tech}
                      <button
                        onClick={() => removeTechnology(tech)}
                        className='ml-2 text-red-500'
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='flex justify-end gap-4 mt-6'>
              <button
                onClick={closeModal}
                className='px-4 py-2 border rounded hover:bg-gray-100'
              >
                Отмена
              </button>
              <button
                onClick={handleAddProject}
                disabled={!newProject.title || !newProject.description}
                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300'
              >
                Сохранить проект
              </button>
            </div>
          </div>
        </div>
      )}

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
                  className='text-white hover:text-blue-300 text-3xl'
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
