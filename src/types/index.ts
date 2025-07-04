export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  userId: string;
}

export interface User {
  id: string;
  username: string;
  loginTime: string;
}

export type FilterType = 'all' | 'completed' | 'pending' | 'overdue';

export interface CategoryConfig {
  name: string;
  color: string;
  bgColor: string;
  darkBgColor: string;
}

export interface PriorityConfig {
  name: string;
  color: string;
  bgColor: string;
  darkBgColor: string;
  icon: string;
}