import { create } from 'zustand'
import { Project } from '../types/Project'

interface ProjectState {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
}

const LOCAL_STORAGE_KEY = 'website-portfolio';

// Функция для загрузки из localStorage
const loadFromLocalStorage = (): Project[] => {
  try {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to parse projects from localStorage', error);
    return [];
  }
};

// Функция для сохранения в localStorage
const saveToLocalStorage = (projects: Project[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error('Failed to save projects to localStorage', error);
  }
};

export const useProjectStore = create<ProjectState>((set) => ({
  // Инициализируем состояние из localStorage
  projects: loadFromLocalStorage(),
  
  // Обновляем проекты и сохраняем в localStorage
  setProjects: (projects) => {
    saveToLocalStorage(projects);
    set({ projects });
  },
  
  // Добавляем проект и сохраняем в localStorage
  addProject: (project) => {
    set((state) => {
      const newProjects = [...state.projects, project];
      saveToLocalStorage(newProjects);
      return { projects: newProjects };
    });
  },
}));