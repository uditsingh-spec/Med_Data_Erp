import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, setPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <span className="text-sm font-medium text-slate-700">
        Page {page} of {totalPages}
      </span>
      
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
