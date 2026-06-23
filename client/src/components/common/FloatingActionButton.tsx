import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FloatingActionButtonProps {
  to: string;
  label: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-2xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all flex items-center space-x-2 group z-50"
    >
      <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
      <span className="font-semibold pr-2">{label}</span>
    </Link>
  );
};

export default FloatingActionButton;
