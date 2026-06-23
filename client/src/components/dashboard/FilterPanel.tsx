import React from 'react';

interface FilterPanelProps {
  genderFilter: string;
  setGenderFilter: (val: string) => void;
  twinFilter: string;
  setTwinFilter: (val: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ genderFilter, setGenderFilter, twinFilter, setTwinFilter }) => {
  
  const handleGenderToggle = (val: string) => {
    if (genderFilter === val) setGenderFilter('');
    else setGenderFilter(val);
  };

  const handleTwinToggle = (val: string) => {
    if (twinFilter === val) setTwinFilter('');
    else setTwinFilter(val);
  };

  const activeClass = "bg-blue-100 text-blue-800 border-blue-200";
  const inactiveClass = "bg-white text-slate-600 border-slate-200 hover:bg-slate-50";

  return (
    <div className="flex flex-wrap gap-2">
      <button 
        onClick={() => handleGenderToggle('Male')}
        className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${genderFilter === 'Male' ? activeClass : inactiveClass}`}
      >
        Male
      </button>
      <button 
        onClick={() => handleGenderToggle('Female')}
        className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${genderFilter === 'Female' ? activeClass : inactiveClass}`}
      >
        Female
      </button>
      <button 
        onClick={() => handleTwinToggle('true')}
        className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${twinFilter === 'true' ? activeClass : inactiveClass}`}
      >
        Twins Only
      </button>
    </div>
  );
};

export default FilterPanel;
