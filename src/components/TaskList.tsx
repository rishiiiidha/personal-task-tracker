import React from 'react';
import { Task } from '../types';
import { TaskItem } from './TaskItem';
import { CheckCircle2, Search, Plus } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onUpdateTask,
  onDeleteTask,
  onAddTask,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-3xl p-12 max-w-md mx-auto">
          <div className="bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
            No tasks found
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            Start organizing your workflow by creating your first task
          </p>
          <button
            onClick={onAddTask}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 font-medium shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Create First Task</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};