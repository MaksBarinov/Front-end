import { skillsData } from '../data/skills'
import { SkillCategory, SkillItem } from '../types/Skill'

export const Skills = () => {
  const SkillCard = ({ name, level }: SkillItem) => (
    <div className='bg-gray-800 hover:scale-110 duration-200 shadow-2xl shadow-gray-700 rounded-b-2xl p-4'>
      <h3 className='text-2xl font-light mb-2'>{name}</h3>
      <div className='bg-gray-700 rounded-full h-2'>
        <div
          className='bg-blue-300 rounded-full h-2'
          style={{ width: `${level}%` }}
        />
      </div>
      <p className='text-xm mt-1'>{level}%</p>
    </div>
  )

  return (
    <div className='text-white py-24'>
      <div className='container mx-auto px-4'>
        <h1 className='text-center text-6xl font-semibold mb-8 text-black'>
          Мои навыки
        </h1>

        {skillsData.map((category: SkillCategory) => (
          <div key={category.title} className='mb-16'>
            <h2 className='text-black text-2xl font-light mb-6'>
              {category.title}
            </h2>
            <div className='px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {category.items.map(skill => (
                <SkillCard key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
