import React from 'react';

interface FormCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const FormCard: React.FC<FormCardProps> = ({ title, description, children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
      </div>
      <div className="p-6 space-y-6">
        {children}
      </div>
    </div>
  );
};

export default FormCard;
