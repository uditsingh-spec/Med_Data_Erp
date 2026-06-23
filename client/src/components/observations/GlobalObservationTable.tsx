import React, { memo } from 'react';
import { Download, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { downloadCSV } from '../../utils/exportUtils';

interface Observation {
  _id: string;
  actualBabyId: string;
  displayId: string;
  motherName: string;
  weight?: number;
  day: number;
  shift: 'M' | 'E';
  mbj20_f?: number;
  mbj20_s?: number;
  jm103_s?: number;
  tsb?: number;
  f1_d4_f?: number; f2_d4_f?: number; f3_d4_f?: number; f4_d4_f?: number; f5_d4_f?: number; f6_d4_f?: number; f7_d4_f?: number; f8_d4_f?: number; f9_d4_f?: number; f10_d4_f?: number;
  f1_d4_s?: number; f2_d4_s?: number; f3_d4_s?: number; f4_d4_s?: number; f5_d4_s?: number; f6_d4_s?: number; f7_d4_s?: number; f8_d4_s?: number; f9_d4_s?: number; f10_d4_s?: number;
  f1_d6_f?: number; f2_d6_f?: number; f3_d6_f?: number; f4_d6_f?: number; f5_d6_f?: number; f6_d6_f?: number; f7_d6_f?: number; f8_d6_f?: number; f9_d6_f?: number; f10_d6_f?: number;
  f1_d6_s?: number; f2_d6_s?: number; f3_d6_s?: number; f4_d6_s?: number; f5_d6_s?: number; f6_d6_s?: number; f7_d6_s?: number; f8_d6_s?: number; f9_d6_s?: number; f10_d6_s?: number;
  recordedBy: {
    _id: string;
    name: string;
    employeeId: string;
  };
  recordedAt: string;
  sampleId?: any;
}

interface GlobalObservationTableProps {
  observations: Observation[];
  searchQuery?: string;
  dateQuery?: string;
}

const GlobalObservationTable: React.FC<GlobalObservationTableProps> = memo(({ observations, searchQuery = '', dateQuery = '' }) => {
  const navigate = useNavigate();
  const filteredObservations = React.useMemo(() => {
    const filtered = observations.filter(obs => {
      if (searchQuery && !obs.displayId?.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (dateQuery) {
        const d = new Date(obs.recordedAt);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const obsDate = `${y}-${m}-${day}`;
        if (obsDate !== dateQuery) return false;
      }
      return true;
    });
    
    // Sort oldest to newest based on recordedAt
    return filtered.sort((a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime());
  }, [observations, searchQuery, dateQuery]);

  if (!filteredObservations?.length) {
    return (
      <div className="bg-white p-6 text-center mt-6 border border-slate-300">
        <p className="text-slate-500">
          {(searchQuery || dateQuery) ? 'No observations found matching the criteria.' : 'No observations have been recorded yet.'}
        </p>
        {!(searchQuery || dateQuery) && <p className="text-sm text-slate-400 mt-2">Observations are automatically generated when samples are added.</p>}
      </div>
    );
  }

  const handleExportCSV = () => {
    const headers = ['Baby ID', 'Name', 'Date', 'Day', 'Current Weight', 'Device', 'Site', 'MBJ20', 'JM103', 'TSB', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10'];
    const csvRows: string[] = [];
    csvRows.push(headers.join(','));

    const groupedObservations: Record<string, Observation[]> = {};
    filteredObservations.forEach(obs => {
      const id = obs.displayId || 'Unknown';
      if (!groupedObservations[id]) groupedObservations[id] = [];
      groupedObservations[id].push(obs);
    });

    let globalObservationIndex = 0;

    Object.entries(groupedObservations).forEach(([babyId, obsGroup]) => {
      const nameStr = obsGroup[0].motherName || '-';
      const babyIdStr = obsGroup[0].displayId || '-';

      obsGroup.forEach(obs => {
        globalObservationIndex++;
        const currentSerialNo = globalObservationIndex.toString();
        // Compute ordinal day dynamically for CSV
        const uniqueDates = Array.from(new Set(obsGroup.map(o => new Date(o.recordedAt).toLocaleDateString('en-GB'))));
        const obsDateStr = new Date(obs.recordedAt).toLocaleDateString('en-GB');
        const ordinalDay = uniqueDates.indexOf(obsDateStr) + 1;

        const dateObj = new Date(obs.recordedAt);
        const formattedDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
        const dayDisplay = `Day ${ordinalDay} ${obs.shift}`;
                    const obsWeightStr = obs.weight ? `${obs.weight}g` : '-';
        
        const mbj20_f_str = obs.mbj20_f !== undefined ? obs.mbj20_f.toString() : '-';
        const mbj20_s_str = obs.mbj20_s !== undefined ? obs.mbj20_s.toString() : '-';
        const jm103_s_str = obs.jm103_s !== undefined ? obs.jm103_s.toString() : '-';
        const tsb_str = obs.tsb !== undefined ? obs.tsb.toString() : '-';

        const d4_f_arr = [obs.f1_d4_f, obs.f2_d4_f, obs.f3_d4_f, obs.f4_d4_f, obs.f5_d4_f, obs.f6_d4_f, obs.f7_d4_f, obs.f8_d4_f, obs.f9_d4_f, obs.f10_d4_f];
        const d4_s_arr = [obs.f1_d4_s, obs.f2_d4_s, obs.f3_d4_s, obs.f4_d4_s, obs.f5_d4_s, obs.f6_d4_s, obs.f7_d4_s, obs.f8_d4_s, obs.f9_d4_s, obs.f10_d4_s];
        const d6_f_arr = [obs.f1_d6_f, obs.f2_d6_f, obs.f3_d6_f, obs.f4_d6_f, obs.f5_d6_f, obs.f6_d6_f, obs.f7_d6_f, obs.f8_d6_f, obs.f9_d6_f, obs.f10_d6_f];
        const d6_s_arr = [obs.f1_d6_s, obs.f2_d6_s, obs.f3_d6_s, obs.f4_d6_s, obs.f5_d6_s, obs.f6_d6_s, obs.f7_d6_s, obs.f8_d6_s, obs.f9_d6_s, obs.f10_d6_s];

        const escapeCell = (val: string | number | undefined) => `"${String(val ?? '-').replace(/"/g, '""')}"`;

        if (obsIndex === 0) {
          csvRows.push([babyIdStr, nameStr, formattedDate, dayDisplay, obsWeightStr, 'D4', 'Forehead', mbj20_f_str, jm103_s_str, tsb_str, ...d4_f_arr].map(escapeCell).join(','));
        } else {
          csvRows.push(['', nameStr, formattedDate, dayDisplay, obsWeightStr, 'D4', 'Forehead', mbj20_f_str, jm103_s_str, tsb_str, ...d4_f_arr].map(escapeCell).join(','));
        }
        csvRows.push(['', '', '', '', '', 'D4', 'Sternum', mbj20_s_str, jm103_s_str, tsb_str, ...d4_s_arr].map(escapeCell).join(','));
        csvRows.push(['', '', '', '', '', 'D6', 'Forehead', mbj20_f_str, jm103_s_str, tsb_str, ...d6_f_arr].map(escapeCell).join(','));
        csvRows.push(['', '', '', '', '', 'D6', 'Sternum', mbj20_s_str, jm103_s_str, tsb_str, ...d6_s_arr].map(escapeCell).join(','));
      });
    });

    const csvContent = csvRows.join('\n');
    downloadCSV(csvContent, 'daily_data.csv');
  };

  return (
    <div className="bg-white mt-6 border border-slate-300 rounded-xl overflow-hidden shadow-sm">
      <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
        <h3 className="text-lg font-semibold text-slate-800">Daily Data Overview</h3>
        <button
          onClick={handleExportCSV}
          className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </button>
      </div>
      <style>{`
        .excel-table {
          border-collapse: collapse;
          width: max-content;
          min-width: 100%;
          font-family: Arial, sans-serif;
          font-size: 12px;
        }
        .excel-table th {
          background-color: #2c3e50;
          color: white;
          padding: 6px 4px;
          font-weight: bold;
          border: 1px solid #1a252f;
          position: sticky;
          top: 0;
          z-index: 10;
          text-align: center;
          white-space: nowrap;
        }
        .excel-table td {
          border: 1px solid #cbd5e0;
          padding: 4px 6px;
          height: 26px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .excel-table td.thick-border-bottom {
          border-bottom: 2px solid #000 !important;
        }
        .group-bg-even {
          background-color: #f4f0fd;
        }
        .group-bg-odd {
          background-color: #ffffff;
        }
        .table-container {
          overflow-x: auto;
          overflow-y: auto;
          max-height: 75vh;
        }
      `}</style>

    <div className="table-container">
      <table className="excel-table">
        <colgroup>
          <col style={{ width: '180px', minWidth: '180px' }} />
          <col style={{ width: '100px', minWidth: '100px' }} />
          <col style={{ width: '90px', minWidth: '90px' }} />
          <col style={{ width: '80px', minWidth: '80px' }} />
          <col style={{ width: '100px', minWidth: '100px' }} />
          <col style={{ width: '90px', minWidth: '90px' }} />
          <col style={{ width: '100px', minWidth: '100px' }} />
          <col style={{ width: '100px', minWidth: '100px' }} />
          <col style={{ width: '100px', minWidth: '100px' }} />
          <col style={{ width: '90px', minWidth: '90px' }} />
          <col style={{ width: '90px', minWidth: '90px' }} />
          <col style={{ width: '90px', minWidth: '90px' }} />
          <col style={{ width: '90px', minWidth: '90px' }} />
          <col style={{ width: '90px', minWidth: '90px' }} />
          <col style={{ width: '90px', minWidth: '90px' }} />
          <col style={{ width: '90px', minWidth: '90px' }} />
          <col style={{ width: '90px', minWidth: '90px' }} />
          <col style={{ width: '90px', minWidth: '90px' }} />
          <col style={{ width: '90px', minWidth: '90px' }} />
          <col style={{ width: '90px', minWidth: '90px' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Baby ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Day</th>
            <th>Current Weight</th>
            <th>Device</th>
            <th>Site</th>
            <th>MBJ20</th>
            <th>JM103</th>
            <th>TSB</th>
            <th>F1</th>
            <th>F2</th>
            <th>F3</th>
            <th>F4</th>
            <th>F5</th>
            <th>F6</th>
            <th>F7</th>
            <th>F8</th>
            <th>F9</th>
            <th>F10</th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            // Group observations by Baby ID
            const groupedObservations: Record<string, Observation[]> = {};
            filteredObservations.forEach(obs => {
              const id = obs.displayId || 'Unknown';
              if (!groupedObservations[id]) groupedObservations[id] = [];
              groupedObservations[id].push(obs);
            });

            let globalObservationIndex = 0;

            return Object.entries(groupedObservations).map(([babyId, obsGroup], groupIndex) => {
              const bgClass = groupIndex % 2 === 0 ? 'group-bg-even' : 'group-bg-odd';
              const nameStr = obsGroup[0].motherName || '-';
              const babyIdStr = obsGroup[0].displayId || '-';
              const totalRowsForBaby = obsGroup.length * 4;

              return (
                <React.Fragment key={babyId}>
                  {obsGroup.map((obs, obsIndex) => {
                    // Compute ordinal day dynamically
                    const uniqueDates = Array.from(new Set(obsGroup.map(o => new Date(o.recordedAt).toLocaleDateString('en-GB'))));
                    const obsDateStr = new Date(obs.recordedAt).toLocaleDateString('en-GB');
                    const ordinalDay = uniqueDates.indexOf(obsDateStr) + 1;

                    const dateObj = new Date(obs.recordedAt);
                    const formattedDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
                    const dayDisplay = `Day ${ordinalDay} ${obs.shift}`;
                    const isFirstObsInGroup = obsIndex === 0;
                    const obsWeightStr = obs.weight ? `${obs.weight} g` : '-';
                    const mbj20_f_str = obs.mbj20_f !== undefined ? obs.mbj20_f.toString() : '-';
                    const mbj20_s_str = obs.mbj20_s !== undefined ? obs.mbj20_s.toString() : '-';
                    const jm103_s_str = obs.jm103_s !== undefined ? obs.jm103_s.toString() : '-';
                    const tsb_str = obs.tsb !== undefined ? obs.tsb.toString() : '-';

                    const renderRow = (site: string, device: string, mbj20: string, jm103: string, tsb: string, f_arr: (number|undefined)[], isFirstRowInObs: boolean, isLastRowInObs: boolean) => {
                      const cellClass = isLastRowInObs ? 'thick-border-bottom' : '';
                      const isVeryFirstRow = isFirstObsInGroup && isFirstRowInObs;
                      return (
                        <tr className={bgClass} key={`${obs._id}-${device}-${site}`}>
                          {isVeryFirstRow && (
                            <td rowSpan={totalRowsForBaby} className="thick-border-bottom text-[13px] font-medium" title={babyIdStr}>{babyIdStr}</td>
                          )}
                          {isFirstRowInObs && (
                            <>
                              <td rowSpan={4} className="thick-border-bottom font-bold text-[13px]" title={nameStr}>{nameStr}</td>
                              <td rowSpan={4} className="thick-border-bottom">{formattedDate}</td>
                              <td rowSpan={4} className="thick-border-bottom">
                                <div className="flex items-center justify-center space-x-2">
                                  <span>{dayDisplay}</span>
                                  <button 
                                    onClick={() => {
                                      const sId = typeof obs.sampleId === 'object' ? obs.sampleId?._id : obs.sampleId;
                                      navigate(`/babies/${obs.actualBabyId}?editSampleId=${sId}`);
                                    }}
                                    title="Go to Baby Details to edit sample"
                                    className="text-indigo-600 hover:text-indigo-800 p-1 hover:bg-indigo-50 rounded-full transition-colors"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                              <td rowSpan={4} className="thick-border-bottom">{obsWeightStr}</td>
                            </>
                          )}
                          <td className={cellClass}>{device}</td>
                          <td className={cellClass}>{site}</td>
                          <td className={cellClass}>{mbj20}</td>
                          <td className={cellClass}>{jm103}</td>
                          <td className={cellClass}>{tsb}</td>
                          {f_arr.map((val, idx) => (
                            <td key={idx} className={cellClass}>{val ?? '-'}</td>
                          ))}
                        </tr>
                      );
                    };

                    const d4_f_arr = [obs.f1_d4_f, obs.f2_d4_f, obs.f3_d4_f, obs.f4_d4_f, obs.f5_d4_f, obs.f6_d4_f, obs.f7_d4_f, obs.f8_d4_f, obs.f9_d4_f, obs.f10_d4_f];
                    const d4_s_arr = [obs.f1_d4_s, obs.f2_d4_s, obs.f3_d4_s, obs.f4_d4_s, obs.f5_d4_s, obs.f6_d4_s, obs.f7_d4_s, obs.f8_d4_s, obs.f9_d4_s, obs.f10_d4_s];
                    const d6_f_arr = [obs.f1_d6_f, obs.f2_d6_f, obs.f3_d6_f, obs.f4_d6_f, obs.f5_d6_f, obs.f6_d6_f, obs.f7_d6_f, obs.f8_d6_f, obs.f9_d6_f, obs.f10_d6_f];
                    const d6_s_arr = [obs.f1_d6_s, obs.f2_d6_s, obs.f3_d6_s, obs.f4_d6_s, obs.f5_d6_s, obs.f6_d6_s, obs.f7_d6_s, obs.f8_d6_s, obs.f9_d6_s, obs.f10_d6_s];

                    return (
                      <React.Fragment key={obs._id}>
                        {renderRow('Forehead', 'D4', mbj20_f_str, jm103_s_str, tsb_str, d4_f_arr, true, false)}
                        {renderRow('Sternum', 'D4', mbj20_s_str, jm103_s_str, tsb_str, d4_s_arr, false, false)}
                        {renderRow('Forehead', 'D6', mbj20_f_str, jm103_s_str, tsb_str, d6_f_arr, false, false)}
                        {renderRow('Sternum', 'D6', mbj20_s_str, jm103_s_str, tsb_str, d6_s_arr, false, true)}
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            });
          })()}
        </tbody>
      </table>
    </div>
    </div>
  );
});

export default GlobalObservationTable;
