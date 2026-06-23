import React, { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import { useAllObservations } from '../hooks/useAllObservations';
import GlobalObservationTable from '../components/observations/GlobalObservationTable';
import MetaDataObservationTable from '../components/observations/MetaDataObservationTable';

import SearchBar from '../components/dashboard/SearchBar';

const ObservationsDashboard: React.FC = () => {
  const { data: observations, isLoading, isError } = useAllObservations();
  const [activeTab, setActiveTab] = useState<'daily' | 'meta'>('daily');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateQuery, setDateQuery] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center">
            <ClipboardList className="w-7 h-7 mr-3 text-indigo-600" />
            Daily Observations Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            A comprehensive overview of all recorded observations across all babies. Data is automatically populated from Samples.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex space-x-2 border-b border-slate-200 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeTab === 'daily' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Daily Data
          </button>
          <button
            onClick={() => setActiveTab('meta')}
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeTab === 'meta' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Meta Data
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-center">
          {activeTab === 'daily' && (
            <input
              type="date"
              max={new Date().toISOString().split('T')[0]}
              value={dateQuery}
              onChange={(e) => setDateQuery(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto h-[42px]"
              title="Filter by observation date"
            />
          )}
          <div className="w-full sm:w-72">
            <SearchBar onSearch={setSearchQuery} placeholder="Search by Baby ID..." />
          </div>
        </div>
      </div>

      {activeTab === 'daily' ? (
        <>
          {isLoading ? (
            <div className="bg-white rounded-[16px] shadow-sm border border-slate-100 p-6 animate-pulse mt-6">
              <div className="flex justify-between mb-6">
                <div className="w-1/3 h-8 bg-slate-200 rounded-lg"></div>
                <div className="w-32 h-10 bg-slate-200 rounded-xl"></div>
              </div>
              <div className="space-y-4">
                <div className="h-12 bg-slate-100 rounded-lg"></div>
                <div className="h-12 bg-slate-100 rounded-lg"></div>
                <div className="h-12 bg-slate-100 rounded-lg"></div>
              </div>
            </div>
          ) : isError ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-medium mt-6">
              Failed to load observations. Please try again later.
            </div>
          ) : (
            <GlobalObservationTable observations={observations || []} searchQuery={searchQuery} dateQuery={dateQuery} />
          )}
        </>
      ) : (
        <MetaDataObservationTable searchQuery={searchQuery} />
      )}
    </div>
  );
};

export default ObservationsDashboard;
