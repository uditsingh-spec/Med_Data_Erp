import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBaby } from '../hooks/useBaby';
import { useSamples } from '../hooks/useSamples';
import BabyInfoCard from '../components/specific/baby-details/BabyInfoCard';
import SectionHeader from '../components/specific/baby-details/SectionHeader';
import SampleTable from '../components/specific/baby-details/SampleTable';
import BabyDetailsSkeleton from '../components/specific/baby-details/BabyDetailsSkeleton';
import AddSampleModal from '../components/specific/baby-details/AddSampleModal';
import Button from '../components/common/Button';

const BabyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isAddSampleModalOpen, setIsAddSampleModalOpen] = React.useState(false);
  
  const { 
    data: baby, 
    isLoading: isBabyLoading, 
    isError: isBabyError,
    error: babyError
  } = useBaby(id);
  
  const { 
    data: samples, 
    isLoading: isSamplesLoading, 
    isError: isSamplesError,
    error: samplesError
  } = useSamples(id);

  const handleBack = () => {
    navigate('/dashboard');
  };

  if (isBabyLoading || (baby && isSamplesLoading)) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <BabyDetailsSkeleton />
      </div>
    );
  }

  // Combined error handling for server unavailability or fetch failures
  if (isBabyError || isSamplesError) {
    const errorMsg = (babyError as any)?.response?.data?.message || (samplesError as any)?.response?.data?.message || 'Server unavailable or fetch failed';
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button 
          onClick={handleBack}
          className="flex items-center text-slate-500 hover:text-slate-800 transition-colors mb-6 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </button>
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-medium">
          Error: {errorMsg}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button 
        onClick={handleBack}
        className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-6 font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Dashboard
      </button>

      <BabyInfoCard baby={baby} />

      <div className="mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <SectionHeader 
            title="Sample History" 
            description="A complete chronological history of all samples collected."
          />
          <Button onClick={() => setIsAddSampleModalOpen(true)} className="sm:w-auto w-full">
            + ADD TODAY'S SAMPLE
          </Button>
        </div>
        
        {samples?.length === 0 ? (
          <SampleTable samples={samples} babyId={id!} onAddSample={() => setIsAddSampleModalOpen(true)} />
        ) : (
          <SampleTable samples={samples} babyId={id!} />
        )}
      </div>

      <AddSampleModal 
        isOpen={isAddSampleModalOpen} 
        onClose={() => setIsAddSampleModalOpen(false)} 
        babyId={id!}
        babyRegisteredAt={baby?.registeredAt}
      />
    </div>
  );
};

export default BabyDetails;
