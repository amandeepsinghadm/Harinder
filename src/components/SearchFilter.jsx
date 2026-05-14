import React from 'react';
import { Search, Filter } from 'lucide-react';

const SearchFilter = ({ searchQuery, setSearchQuery, filterCategory, setFilterCategory, categories }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-center max-w-4xl mx-auto">
      <div className="relative w-full md:w-2/3 group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, symbol, or atomic number..."
          className="w-full bg-surface/50 border border-glass-border rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-600 glass"
        />
      </div>

      <div className="relative w-full md:w-1/3">
        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <select 
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full bg-surface/50 border border-glass-border rounded-2xl py-4 pl-12 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none glass cursor-pointer"
        >
          <option value="All">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l border-glass-border pl-2">
          <div className="w-2 h-2 border-r-2 border-b-2 border-gray-500 rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
