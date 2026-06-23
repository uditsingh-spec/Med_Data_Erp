import React, { memo } from 'react';
import { useBabies } from '../../hooks/useBabies';
import { Loader2, Download } from 'lucide-react';
import { downloadCSV } from '../../utils/exportUtils';

interface MetaDataObservationTableProps {
  searchQuery?: string;
}

const MetaDataObservationTable: React.FC<MetaDataObservationTableProps> = memo(({ searchQuery = '' }) => {
  const { data, isLoading, isError } = useBabies({
    page: 1,
    search: searchQuery,
    gender: '',
    isTwin: '',
    sort: 'oldest',
    limit: 10000
  });

  // Note: we fetch page 1, but we might want to fetch all. The API has pagination.
  // Assuming the user wants to see all, or at least the recent ones.
  // For a robust system, we might need a useAllBabies hook, or just show the paginated ones.
  // I will use a high limit if possible, or just the default. Let's use the hook as is.

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-sm border border-slate-100 mt-6">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-medium mt-6">
        Failed to load meta data. Please try again later.
      </div>
    );
  }

  // Locally filter by displayId to ensure we ONLY match Baby ID, even if backend matched motherName
  const babies = (data?.data || []).filter((baby: any) => {
    if (!searchQuery) return true;
    return baby.displayId?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (!babies.length) {
    return (
      <div className="bg-white p-6 text-center mt-6 border border-slate-300">
        <p className="text-slate-500">
          {searchQuery ? 'No babies found matching the Baby ID.' : 'No babies have been registered yet.'}
        </p>
      </div>
    );
  }

  const handleExportCSV = () => {
    const headers = ['Baby ID', 'Name', 'DOB', 'Gender', 'Weight', 'Term/Preterm', 'Gestational Age', 'Skin (Forehead)', 'Skin (Sternum)'];
    
    const rows = babies.map((baby: any) => {
      
      let dobStr = '-';
      if (baby.dob) {
         const dobObj = new Date(baby.dob);
         dobStr = dobObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      }

              const weightStr = baby.weight ? `${baby.weight} g` : '-';
      
      return [
        baby.displayId || '',
        baby.motherName || '',
        dobStr,
        baby.gender || 'Other',
        weightStr,
        baby.termStatus || 'Term',
        baby.gestationalAge || '-',
        baby.skinForehead ?? '-',
        baby.skinSternum ?? '-'
      ].map(val => `"${String(val).replace(/"/g, '""')}"`).join(',');
    });
    
    const csvContent = [headers.join(','), ...rows].join('\n');
    downloadCSV(csvContent, 'meta_data.csv');
  };

  return (
    <div className="bg-white mt-6 border border-slate-300 rounded-xl overflow-hidden shadow-sm">
      <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
        <h3 className="text-lg font-semibold text-slate-800">Meta Data Summary</h3>
        <button
          onClick={handleExportCSV}
          className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </button>
      </div>
      <style>{`
        .meta-table {
          border-collapse: collapse;
          width: 100%;
          font-family: Arial, sans-serif;
          font-size: 13px;
        }
        .meta-table th {
          background-color: #2c3e50;
          color: white;
          padding: 10px 8px;
          font-weight: bold;
          border: 1px solid #1a252f;
          position: sticky;
          top: 0;
          z-index: 10;
          text-align: left;
          white-space: nowrap;
        }
        .meta-table td {
          border: 1px solid #cbd5e0;
          padding: 8px;
          text-align: left;
        }
        .meta-table tr:nth-child(even) {
          background-color: #f8f9fa;
        }
        .table-container {
          overflow-x: auto;
          overflow-y: auto;
          max-height: 75vh;
        }
      `}</style>

      <div className="table-container">
        <table className="meta-table">
          <thead>
            <tr>
              <th>Baby ID</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Weight</th>
              <th>Term/Preterm</th>
              <th>Gestational Age</th>
              <th>Skin (Forehead)</th>
              <th>Skin (Sternum)</th>
            </tr>
          </thead>
          <tbody>
            {babies.map((baby: any) => {
              let dobStr = '-';
              if (baby.dob) {
                 const dobObj = new Date(baby.dob);
                 dobStr = dobObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
              }

                      const weightStr = baby.weight ? `${baby.weight} g` : '-';

              return (
                <tr key={baby._id}>
                  <td className="font-medium text-slate-900">{baby.displayId}</td>
                  <td>{baby.motherName}</td>
                  <td>{dobStr}</td>
                  <td>{baby.gender || 'Other'}</td>
                  <td>{weightStr}</td>
                  <td>{baby.termStatus || 'Term'}</td>
                  <td>{baby.gestationalAge || '-'}</td>
                  <td>{baby.skinForehead ?? '-'}</td>
                  <td>{baby.skinSternum ?? '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default MetaDataObservationTable;
