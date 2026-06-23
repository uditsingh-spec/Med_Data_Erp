import React from 'react';

interface TwinSelectorProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const TwinSelector: React.FC<TwinSelectorProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`flex-1 py-2 px-4 rounded-xl border text-sm font-medium transition-colors ${
            value === true
              ? 'bg-purple-50 border-purple-500 text-purple-700'
              : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
          }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`flex-1 py-2 px-4 rounded-xl border text-sm font-medium transition-colors ${
            value === false
              ? 'bg-blue-50 border-blue-500 text-blue-700'
              : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
          }`}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default TwinSelector;
