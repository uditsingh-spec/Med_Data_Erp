import React from 'react';

interface TermSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const TermSelector: React.FC<TermSelectorProps> = ({ label, value, onChange, error }) => {
  const uniqueName = React.useId();
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="flex space-x-6 h-10 items-center">
        {['Term', 'Preterm'].map((option) => (
          <label key={option} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name={uniqueName}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700">{option}</span>
          </label>
        ))}
      </div>
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default TermSelector;
