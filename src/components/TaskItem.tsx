import React, { useState } from 'react';
import { Check, Edit2, Trash2, Calendar, Flag, Tag, X, Save, Clock } from 'lucide-react';
import { Task } from '../types';
import { CATEGORY_CONFIGS, PRIORITY_CONFIGS, DEFAULT_CATEGORIES } from '../utils/constants';

interface TaskItemProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editCategory, setEditCategory] = useState(task.category);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggleComplete = () => {
    onUpdateTask({
      ...task,
      completed: !task.completed,
    });
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return;
    
    onUpdateTask({
      ...task,
      title: editTitle.trim(),
      description: editDescription.trim(),
      dueDate: editDueDate || undefined,
      priority: editPriority,
      category: editCategory || 'General',
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDueDate(task.dueDate || '');
    setEditPriority(task.priority);
    setEditCategory(task.category);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
    setShowDeleteConfirm(false);
  };

  // Get category config, fallback to General if category doesn't exist
  const categoryConfig = CATEGORY_CONFIGS[task.category] || {
    name: task.category,
    color: 'text-purple-700 dark:text-purple-300',
    bgColor: 'bg-purple-50 border-purple-200',
    darkBgColor: 'dark:bg-purple-900/20 dark:border-purple-700/30'
  };
  
  const priorityConfig = PRIORITY_CONFIGS[task.priority] || PRIORITY_CONFIGS['medium'];

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  const isDueSoon = task.dueDate && !task.completed && !isOverdue && 
    new Date(task.dueDate).getTime() - new Date().getTime() < 24 * 60 * 60 * 1000;

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-all duration-300 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 ${
      task.completed ? 'opacity-75' : ''
    } ${isOverdue ? 'ring-2 ring-red-200 dark:ring-red-800' : ''}`}>
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent dark:text-white text-lg font-medium"
            placeholder="Task title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent dark:text-white resize-none"
            placeholder="Task description"
            rows={3}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent dark:text-white"
            />
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as 'low' | 'medium' | 'high' | 'urgent')}
              className="px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent dark:text-white"
            >
              {Object.entries(PRIORITY_CONFIGS).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent dark:text-white"
              placeholder="Category"
            />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleSaveEdit}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 font-medium"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancelEdit}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-600 text-white rounded-xl hover:bg-slate-700 transition-all duration-200 font-medium"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Header with checkbox and title */}
          <div className="flex items-start space-x-4">
            <button
              onClick={handleToggleComplete}
              className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                task.completed
                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg'
                  : 'border-slate-300 dark:border-slate-600 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
              }`}
            >
              {task.completed && <Check className="h-4 w-4" />}
            </button>
            <div className="flex-1 min-w-0">
              <h3 className={`text-lg font-semibold leading-tight ${
                task.completed
                  ? 'line-through text-slate-500 dark:text-slate-400'
                  : 'text-slate-800 dark:text-slate-200'
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-2 leading-relaxed ${
                  task.completed
                    ? 'line-through text-slate-400 dark:text-slate-500'
                    : 'text-slate-600 dark:text-slate-400'
                }`}>
                  {task.description}
                </p>
              )}
            </div>
          </div>

          {/* Tags and metadata */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Priority */}
            <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold border ${priorityConfig.color} ${priorityConfig.bgColor} ${priorityConfig.darkBgColor}`}>
              <span className="mr-1">{priorityConfig.icon}</span>
              {priorityConfig.name}
            </span>

            {/* Category */}
            <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold border ${categoryConfig.color} ${categoryConfig.bgColor} ${categoryConfig.darkBgColor}`}>
              <Tag className="h-3 w-3 mr-1" />
              {categoryConfig.name}
            </span>

            {/* Due Date */}
            {task.dueDate && (
              <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold border ${
                isOverdue
                  ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-700/30 dark:text-red-300'
                  : isDueSoon
                  ? 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-700/30 dark:text-amber-300'
                  : 'bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-800/50 dark:border-slate-600/30 dark:text-slate-300'
              }`}>
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
                {isOverdue && <span className="ml-1 text-red-600 dark:text-red-400">Overdue</span>}
                {isDueSoon && <span className="ml-1 text-amber-600 dark:text-amber-400">Due Soon</span>}
              </span>
            )}
          </div>

          {/* Footer with creation date and actions */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
            <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="h-3 w-3" />
              <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all duration-200"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full border border-slate-200 dark:border-slate-700 shadow-2xl">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Delete Task
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Are you sure you want to delete "{task.title}"? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-medium shadow-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};