import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = 'Search by Mother Name or ID' }) => {
  const [term, setTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(term);
    }, 300); // 300ms debounce

    return () => clearTimeout(handler);
  }, [term, onSearch]);

  return (
    <div className="relative w-full md:w-96">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
        placeholder={placeholder}
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
