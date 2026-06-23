import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  let bgColor = 'bg-blue-50 border-blue-100 text-blue-800';
  let iconColor = 'text-blue-500';
  
  if (type === 'success') {
    bgColor = 'bg-emerald-50 border-emerald-100 text-emerald-800';
    iconColor = 'text-emerald-500';
  } else if (type === 'error') {
    bgColor = 'bg-red-50 border-red-100 text-red-800';
    iconColor = 'text-red-500';
  } else if (type === 'warning') {
    bgColor = 'bg-amber-50 border-amber-100 text-amber-800';
    iconColor = 'text-amber-500';
  }

  return (
    <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`flex items-center p-4 border rounded-[16px] shadow-lg ${bgColor}`}>
        {type === 'success' && (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-3 ${iconColor} shrink-0`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )}
        {type === 'error' && (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-3 ${iconColor} shrink-0`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )}
        {type === 'warning' && (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-3 ${iconColor} shrink-0`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )}
        {type === 'info' && (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-3 ${iconColor} shrink-0`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        )}
        <span className="font-medium text-sm break-words">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
