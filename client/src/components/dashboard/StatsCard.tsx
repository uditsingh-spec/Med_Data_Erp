import React from 'react';

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
