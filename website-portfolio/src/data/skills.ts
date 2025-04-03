import { SkillCategory } from '../types/Skill'

export const skillsData: SkillCategory[] = [
  {
    title: 'Языки программирования',
    items: [
      { name: 'JavaScript', level: 40 },
      { name: 'Python', level: 45 },
      { name: 'C++', level: 25 },
      { name: 'C#', level: 35 },
      { name: '1C', level: 60 },
      { name: 'TypeScript', level: 40 },
    ]
  },
  {
    title: 'Фреймворки и библиотеки',
    items: [
      { name: 'React', level: 60 },
      { name: 'Tailwind CSS', level: 70 },
      { name: 'Node.js', level: 70 },
      { name: 'Bootstrap', level: 30 },
      { name: 'Pygame', level: 40 },
      { name: 'Flask', level: 40 }
    ]
  },
  {
    title: 'Инструменты',
    items: [
      { name: 'Git', level: 65 },
      { name: 'Photoshop', level: 65 },
      { name: 'Figma', level: 80 },
      { name: 'CorelDraw', level: 55 }
    ]
  }
];