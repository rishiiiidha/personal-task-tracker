import React from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  placeholder = "Search tasks...",
}) => {
  return (
    <div className="relative group">
      <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-slate-600 dark:group-focus-within:text-slate-300 transition-colors duration-200" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent dark:text-white transition-all duration-200 text-lg shadow-sm hover:shadow-md focus:shadow-lg"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};