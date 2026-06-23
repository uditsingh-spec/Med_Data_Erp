import React, { useState, useCallback } from 'react';
import { Baby, Activity, Users, User, UserPlus } from 'lucide-react';

import { useDashboardStats } from '../hooks/useDashboardStats';
import { useBabies } from '../hooks/useBabies';

import StatsCard from '../components/dashboard/StatsCard';
import BabyCard from '../components/dashboard/BabyCard';
import SearchBar from '../components/dashboard/SearchBar';
import FilterPanel from '../components/dashboard/FilterPanel';
import SortDropdown from '../components/dashboard/SortDropdown';
import Pagination from '../components/dashboard/Pagination';
import DashboardSkeleton from '../components/dashboard/DashboardSkeleton';
import EmptyState from '../components/dashboard/EmptyState';
import FloatingActionButton from '../components/common/FloatingActionButton';

const Dashboard: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('');
  const [isTwin, setIsTwin] = useState('');
  const [sort, setSort] = useState('latest');

  const { data: stats, isLoading: statsLoading, isError: statsError } = useDashboardStats();
  const { data: babiesData, isLoading: babiesLoading, isError: babiesError } = useBabies({
    page,
    search,
    gender,
    isTwin,
    sort
  });

  // Reset page when filters change
  const handleSearch = useCallback((term: string) => {
    setSearch(term);
    setPage(1);
  }, []);

  const handleGender = useCallback((val: string) => {
    setGender(val);
    setPage(1);
  }, []);

  const handleTwin = useCallback((val: string) => {
    setIsTwin(val);
    setPage(1);
  }, []);

  const handleSort = useCallback((val: string) => {
    setSort(val);
    setPage(1);
  }, []);

  const groupedBabies = React.useMemo(() => {
    if (!babiesData?.data) return [];
    
    const groups: any[] = [];
    const processedIds = new Set();
    
    babiesData.data.forEach((baby: any) => {
      if (processedIds.has(baby._id)) return;
      
      if (baby.isTwin) {
        // Find sibling with same motherName and roughly same date
        const sibling = babiesData.data.find((b: any) => 
          b._id !== baby._id && 
          b.isTwin && 
          b.motherName.trim().toLowerCase() === baby.motherName.trim().toLowerCase() &&
          Math.abs(new Date(b.registeredAt).getTime() - new Date(baby.registeredAt).getTime()) < 1000 * 60 * 60 * 24 // Within 24 hours
        );
        
        if (sibling) {
          groups.push({
            isGroup: true,
            _id: `group-${baby._id}-${sibling._id}`,
            motherName: baby.motherName,
            motherImage: baby.motherImage,
            registeredAt: baby.registeredAt,
            // Strip the -A or -B from legacy twins, and -T1/-T2 or T1-/T2- from new twins
            displayId: baby.displayId.replace(/-T[12]$/, '').replace(/T[12]-/, '-').replace(/-[AB]$/, ''),
            twins: (baby.twinLabel === 'A' || baby.twinLabel === '1') ? [baby, sibling] : [sibling, baby],
          });
          processedIds.add(baby._id);
          processedIds.add(sibling._id);
          return;
        }
      }
      
      groups.push(baby);
      processedIds.add(baby._id);
    });
    
    return groups;
  }, [babiesData?.data]);

  if (statsLoading && babiesLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8 pb-12">
      
      {/* ERROR BANNER */}
      {(statsError || babiesError) && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
          Failed to load dashboard data. Please try refreshing the page.
        </div>
      )}

      {/* STATISTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard label="Total Babies" value={stats?.totalBabies || 0} icon={<Baby className="w-6 h-6" />} />
        <StatsCard label="Samples Today" value={stats?.totalSamplesToday || 0} icon={<Activity className="w-6 h-6" />} />
        <StatsCard label="Total Twins" value={stats?.totalTwins || 0} icon={<Users className="w-6 h-6" />} />
        <StatsCard label="Male Babies" value={stats?.maleBabies || 0} icon={<User className="w-6 h-6" />} />
        <StatsCard label="Female Babies" value={stats?.femaleBabies || 0} icon={<UserPlus className="w-6 h-6" />} />
      </div>

      {/* CONTROLS (Search, Filter, Sort) */}
      <div className="flex flex-col xl:flex-row gap-4 xl:items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1">
          <SearchBar onSearch={handleSearch} />
          <FilterPanel 
            genderFilter={gender} setGenderFilter={handleGender}
            twinFilter={isTwin} setTwinFilter={handleTwin}
          />
        </div>
        <div className="w-full xl:w-48">
          <SortDropdown sort={sort} setSort={handleSort} />
        </div>
      </div>

      {/* BABIES GRID */}
      {babiesLoading ? (
        <DashboardSkeleton />
      ) : babiesData?.data.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="flex flex-col gap-3 items-stretch">
            {groupedBabies.map((item: any) => (
              <BabyCard key={item._id} baby={item} />
            ))}
          </div>

          <Pagination 
            page={page} 
            totalPages={babiesData?.totalPages || 1} 
            setPage={setPage} 
          />
        </>
      )}

      {/* ADD BUTTON */}
      <FloatingActionButton to="/new-baby" label="NEW BABY" />

    </div>
  );
};

export default Dashboard;
