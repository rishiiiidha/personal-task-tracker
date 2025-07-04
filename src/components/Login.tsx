import React, { useState } from 'react';
import { User, LogIn, Moon, Sun, CheckSquare2 } from 'lucide-react';
import { User as UserType } from '../types';
import { generateUserId } from '../utils/localStorage';

interface LoginProps {
  onLogin: (user: UserType) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, darkMode, onToggleDarkMode }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      const userId = generateUserId(username.trim());
      onLogin({
        id: userId,
        username: username.trim(),
        loginTime: new Date().toISOString(),
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 transition-all duration-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent)]"></div>
      
      {/* Dark Mode Toggle */}
      <button
        onClick={onToggleDarkMode}
        className="absolute top-6 right-6 p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-200 hover:scale-105"
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 w-full max-w-md transform transition-all duration-500 hover:scale-[1.02]">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-800 dark:from-slate-700 dark:to-slate-900 rounded-2xl mb-6 shadow-lg">
            <CheckSquare2 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent mb-2">
            TaskFlow Pro
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Professional Task Management
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-slate-600 to-slate-400 rounded-full mx-auto mt-3"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent dark:text-white transition-all duration-200 text-lg"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <>
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
            No registration required. Your tasks are saved locally and persist across sessions.
          </p>
        </div>
      </div>
    </div>
  );
};