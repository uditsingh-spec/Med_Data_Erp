import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  description?: string;
  showBack?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, showBack = false }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-4">
        {showBack && (
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {description && <p className="text-slate-500 mt-1">{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
