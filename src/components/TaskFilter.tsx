import React from 'react';
import { FilterType } from '../types';
import { Clock, CheckCircle, Circle, AlertTriangle } from 'lucide-react';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    completed: number;
    pending: number;
    overdue: number;
  };
}

export const TaskFilter: React.FC<TaskFilterProps> = ({
  currentFilter,
  onFilterChange,
  counts,
}) => {
  const filters = [
    { 
      key: 'all' as const, 
      label: 'All Tasks', 
      count: counts.all,
      icon: Circle,
      color: 'slate'
    },
    { 
      key: 'pending' as const, 
      label: 'Pending', 
      count: counts.pending,
      icon: Clock,
      color: 'amber'
    },
    { 
      key: 'completed' as const, 
      label: 'Completed', 
      count: counts.completed,
      icon: CheckCircle,
      color: 'emerald'
    },
    { 
      key: 'overdue' as const, 
      label: 'Overdue', 
      count: counts.overdue,
      icon: AlertTriangle,
      color: 'red'
    },
  ];

  const getFilterStyles = (filter: typeof filters[0], isActive: boolean) => {
    const baseStyles = "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-3 border";
    
    if (isActive) {
      switch (filter.color) {
        case 'amber':
          return `${baseStyles} bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700 shadow-lg transform scale-105`;
        case 'emerald':
          return `${baseStyles} bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 shadow-lg transform scale-105`;
        case 'red':
          return `${baseStyles} bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700 shadow-lg transform scale-105`;
        default:
          return `${baseStyles} bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600 shadow-lg transform scale-105`;
      }
    }
    
    return `${baseStyles} bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md`;
  };

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = currentFilter === filter.key;
        
        return (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={getFilterStyles(filter, isActive)}
          >
            <Icon className="h-4 w-4" />
            <span>{filter.label}</span>
            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
              isActive
                ? 'bg-white/20 text-current'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
            }`}>
              {filter.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};