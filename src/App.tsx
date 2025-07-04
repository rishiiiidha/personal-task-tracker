import React, { useState, useEffect, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Login } from './components/Login';
import { Header } from './components/Header';
import { Search } from './components/Search';
import { TaskFilter } from './components/TaskFilter';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskStats } from './components/TaskStats';
import { Task, User, FilterType } from './types';
import { 
  saveTasks, 
  loadTasks, 
  saveUser, 
  loadUser, 
  clearUser, 
  getTasksForUser,
  saveDarkMode,
  loadDarkMode
} from './utils/localStorage';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load data on mount
  useEffect(() => {
    const savedUser = loadUser();
    const savedTasks = loadTasks();
    const savedDarkMode = loadDarkMode();
    
    console.log('Loading data:', { savedUser, tasksCount: savedTasks.length, savedDarkMode });
    
    if (savedUser) setUser(savedUser);
    setAllTasks(savedTasks);
    setDarkMode(savedDarkMode);
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveDarkMode(darkMode);
  }, [darkMode]);

  // Save tasks when they change
  useEffect(() => {
    if (allTasks.length > 0 || user) {
      console.log('Saving tasks:', allTasks.length);
      saveTasks(allTasks);
    }
  }, [allTasks, user]);

  const handleLogin = (userData: User) => {
    console.log('User logging in:', userData);
    setUser(userData);
    saveUser(userData);
    
    // Load existing tasks for this user
    const existingTasks = loadTasks();
    setAllTasks(existingTasks);
  };

  const handleLogout = () => {
    console.log('User logging out, preserving tasks');
    setUser(null);
    clearUser();
    setSearchTerm('');
    setFilter('all');
    setShowTaskForm(false);
    // Don't clear tasks - they should persist for when user logs back in
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleAddTask = (task: Task) => {
    console.log('Adding task:', task);
    setAllTasks(prev => {
      const newTasks = [task, ...prev];
      console.log('New tasks array:', newTasks.length);
      return newTasks;
    });
  };

  const handleUpdateTask = (updatedTask: Task) => {
    console.log('Updating task:', updatedTask);
    setAllTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    console.log('Deleting task:', taskId);
    setAllTasks(prev => prev.filter(task => task.id !== taskId));
  };

  // Get tasks for current user
  const userTasks = useMemo(() => {
    if (!user) return [];
    const tasks = allTasks.filter(task => task.userId === user.id);
    console.log('User tasks:', tasks.length, 'for user:', user.username);
    return tasks;
  }, [allTasks, user]);

  const filteredTasks = useMemo(() => {
    let filtered = userTasks;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    switch (filter) {
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      case 'pending':
        filtered = filtered.filter(task => !task.completed);
        break;
      case 'overdue':
        filtered = filtered.filter(task => 
          task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
        );
        break;
      default:
        break;
    }

    // Sort by priority and creation date
    return filtered.sort((a, b) => {
      // First, sort by completion status (incomplete tasks first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      // Then by priority
      const priorityWeight = { urgent: 4, high: 3, medium: 2, low: 1 };
      const aPriority = priorityWeight[a.priority];
      const bPriority = priorityWeight[b.priority];
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      // Finally by creation date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [userTasks, searchTerm, filter]);

  const taskCounts = useMemo(() => ({
    all: userTasks.length,
    completed: userTasks.filter(task => task.completed).length,
    pending: userTasks.filter(task => !task.completed).length,
    overdue: userTasks.filter(task => 
      task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
    ).length,
  }), [userTasks]);

  if (!user) {
    return (
      <Login 
        onLogin={handleLogin} 
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.02),transparent)] pointer-events-none"></div>
      
      <Header
        user={user}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onLogout={handleLogout}
      />

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Stats Section */}
          <TaskStats tasks={userTasks} />

          {/* Search and Filter Section */}
          <div className="space-y-6">
            <Search
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search tasks by title, description, or category..."
            />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <TaskFilter
                currentFilter={filter}
                onFilterChange={setFilter}
                counts={taskCounts}
              />
              <button
                onClick={() => setShowTaskForm(true)}
                className="flex items-center justify-center space-x-3 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white px-6 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl"
              >
                <Plus className="h-5 w-5" />
                <span>Add New Task</span>
              </button>
            </div>
          </div>

          {/* Task List */}
          <TaskList
            tasks={filteredTasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onAddTask={() => setShowTaskForm(true)}
          />
        </div>
      </main>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={showTaskForm}
        onClose={() => setShowTaskForm(false)}
        onAddTask={handleAddTask}
        userId={user.id}
      />
    </div>
  );
}

export default App;