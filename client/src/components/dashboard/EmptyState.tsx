import React from 'react';
import FloatingActionButton from '../common/FloatingActionButton';
import { FileQuestion } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="bg-blue-50 p-6 rounded-full mb-6">
        <FileQuestion className="w-16 h-16 text-blue-300" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">No babies found</h3>
      <p className="text-slate-500 max-w-sm mx-auto">
        There are no babies registered yet, or none match your current search filters.
      </p>
      
      <FloatingActionButton to="/new-baby" label="NEW BABY" />
    </div>
  );
};

export default EmptyState;
