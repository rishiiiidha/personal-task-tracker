import React from 'react';
import { Task } from '../types';
import { CheckCircle2, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

interface TaskStatsProps {
  tasks: Task[];
}

export const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const overdueTasks = tasks.filter(task => 
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
  ).length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: TrendingUp,
      color: 'slate',
      bgColor: 'bg-slate-50 dark:bg-slate-800/50',
      textColor: 'text-slate-700 dark:text-slate-300',
      iconColor: 'text-slate-600 dark:text-slate-400'
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle2,
      color: 'emerald',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      textColor: 'text-emerald-700 dark:text-emerald-300',
      iconColor: 'text-emerald-600 dark:text-emerald-400'
    },
    {
      label: 'Pending',
      value: pendingTasks,
      icon: Clock,
      color: 'amber',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      textColor: 'text-amber-700 dark:text-amber-300',
      iconColor: 'text-amber-600 dark:text-amber-400'
    },
    {
      label: 'Overdue',
      value: overdueTasks,
      icon: AlertTriangle,
      color: 'red',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      textColor: 'text-red-700 dark:text-red-300',
      iconColor: 'text-red-600 dark:text-red-400'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`${stat.bgColor} rounded-2xl p-6 border border-slate-200 dark:border-slate-700 transition-all duration-200 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stat.textColor} opacity-80`}>
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold ${stat.textColor} mt-1`}>
                  {stat.value}
                </p>
                {stat.label === 'Completed' && totalTasks > 0 && (
                  <p className={`text-xs ${stat.textColor} opacity-60 mt-1`}>
                    {completionRate}% complete
                  </p>
                )}
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor} border border-current/10`}>
                <Icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};