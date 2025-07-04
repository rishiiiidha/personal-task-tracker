import { CategoryConfig, PriorityConfig } from '../types';

export const CATEGORY_CONFIGS: Record<string, CategoryConfig> = {
  'Work': {
    name: 'Work',
    color: 'text-emerald-700 dark:text-emerald-300',
    bgColor: 'bg-emerald-50 border-emerald-200',
    darkBgColor: 'dark:bg-emerald-900/20 dark:border-emerald-700/30'
  },
  'Personal': {
    name: 'Personal',
    color: 'text-violet-700 dark:text-violet-300',
    bgColor: 'bg-violet-50 border-violet-200',
    darkBgColor: 'dark:bg-violet-900/20 dark:border-violet-700/30'
  },
  'Health': {
    name: 'Health',
    color: 'text-rose-700 dark:text-rose-300',
    bgColor: 'bg-rose-50 border-rose-200',
    darkBgColor: 'dark:bg-rose-900/20 dark:border-rose-700/30'
  },
  'Learning': {
    name: 'Learning',
    color: 'text-amber-700 dark:text-amber-300',
    bgColor: 'bg-amber-50 border-amber-200',
    darkBgColor: 'dark:bg-amber-900/20 dark:border-amber-700/30'
  },
  'Finance': {
    name: 'Finance',
    color: 'text-teal-700 dark:text-teal-300',
    bgColor: 'bg-teal-50 border-teal-200',
    darkBgColor: 'dark:bg-teal-900/20 dark:border-teal-700/30'
  },
  'Shopping': {
    name: 'Shopping',
    color: 'text-indigo-700 dark:text-indigo-300',
    bgColor: 'bg-indigo-50 border-indigo-200',
    darkBgColor: 'dark:bg-indigo-900/20 dark:border-indigo-700/30'
  },
  'General': {
    name: 'General',
    color: 'text-slate-700 dark:text-slate-300',
    bgColor: 'bg-slate-50 border-slate-200',
    darkBgColor: 'dark:bg-slate-800/50 dark:border-slate-600/30'
  },
  'Custom': {
    name: 'Custom',
    color: 'text-purple-700 dark:text-purple-300',
    bgColor: 'bg-purple-50 border-purple-200',
    darkBgColor: 'dark:bg-purple-900/20 dark:border-purple-700/30'
  }
};

export const PRIORITY_CONFIGS: Record<string, PriorityConfig> = {
  'low': {
    name: 'Low',
    color: 'text-emerald-700 dark:text-emerald-300',
    bgColor: 'bg-emerald-50 border-emerald-200',
    darkBgColor: 'dark:bg-emerald-900/20 dark:border-emerald-700/30',
    icon: '●'
  },
  'medium': {
    name: 'Medium',
    color: 'text-amber-700 dark:text-amber-300',
    bgColor: 'bg-amber-50 border-amber-200',
    darkBgColor: 'dark:bg-amber-900/20 dark:border-amber-700/30',
    icon: '●●'
  },
  'high': {
    name: 'High',
    color: 'text-orange-700 dark:text-orange-300',
    bgColor: 'bg-orange-50 border-orange-200',
    darkBgColor: 'dark:bg-orange-900/20 dark:border-orange-700/30',
    icon: '●●●'
  },
  'urgent': {
    name: 'Urgent',
    color: 'text-red-700 dark:text-red-300',
    bgColor: 'bg-red-50 border-red-200',
    darkBgColor: 'dark:bg-red-900/20 dark:border-red-700/30',
    icon: '🔥'
  }
};

export const DEFAULT_CATEGORIES = Object.keys(CATEGORY_CONFIGS);