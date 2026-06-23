import React, { memo } from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = memo(({ title, description, action }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
      <div>
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
});

export default SectionHeader;
