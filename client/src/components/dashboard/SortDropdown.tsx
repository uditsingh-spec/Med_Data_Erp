import React from 'react';

interface SortDropdownProps {
  sort: string;
  setSort: (val: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sort, setSort }) => {
  return (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      className="block w-full pl-3 pr-10 py-2 text-sm border border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl bg-white"
    >
      <option value="latest">Latest First</option>
      <option value="oldest">Oldest First</option>
    </select>
  );
};

export default SortDropdown;
