import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className={`flex flex-col space-y-1 ${className}`}>
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <input
          ref={ref}
          className={`px-3 py-2 border rounded-xl text-slate-900 bg-white focus:outline-none focus:ring-2 ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
