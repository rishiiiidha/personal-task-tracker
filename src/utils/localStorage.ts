import { Task, User } from '../types';

const TASKS_KEY = 'taskTracker_tasks';
const USER_KEY = 'taskTracker_user';
const DARK_MODE_KEY = 'taskTracker_darkMode';

export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

export const loadTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem(TASKS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

export const getTasksForUser = (userId: string): Task[] => {
  const allTasks = loadTasks();
  return allTasks.filter(task => task.userId === userId);
};

export const saveUser = (user: User): void => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const loadUser = (): User | null => {
  try {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading user:', error);
    return null;
  }
};

export const clearUser = (): void => {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Error clearing user:', error);
  }
};

export const saveDarkMode = (isDark: boolean): void => {
  try {
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDark));
  } catch (error) {
    console.error('Error saving dark mode:', error);
  }
};

export const loadDarkMode = (): boolean => {
  try {
    const stored = localStorage.getItem(DARK_MODE_KEY);
    return stored ? JSON.parse(stored) : false;
  } catch (error) {
    console.error('Error loading dark mode:', error);
    return false;
  }
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const generateUserId = (username: string): string => {
  // Create a more robust user ID that's consistent
  return btoa(username.toLowerCase().trim()).replace(/[^a-zA-Z0-9]/g, '');
};