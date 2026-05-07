import { create } from 'zustand';
import { getMe } from './api';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isLoading: false,

  setUser: (user, token) => {
    localStorage.setItem('token', token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await getMe();
        set({ user: response.data.user, token });
      } catch (error) {
        localStorage.removeItem('token');
        set({ user: null, token: null });
      }
    }
  }
}));

export const useProjectStore = create((set) => ({
  projects: [],
  currentProject: null,
  isLoading: false,

  setProjects: (projects) => set({ projects }),
  setCurrentProject: (project) => set({ currentProject: project })
}));

export const useTaskStore = create((set) => ({
  tasks: [],
  myTasks: [],
  currentTask: null,
  isLoading: false,

  setTasks: (tasks) => set({ tasks }),
  setMyTasks: (tasks) => set({ myTasks: tasks }),
  setCurrentTask: (task) => set({ currentTask: task })
}));
