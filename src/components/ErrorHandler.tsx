
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorHandlerProps {
  error: string;
  onRetry?: () => void;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ error, onRetry }) => {
  return (
    <div className="bg-red-500/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-red-300/30 text-center">
      <div className="flex justify-center mb-4">
        <AlertTriangle className="w-16 h-16 text-red-300" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h3>
      <p className="text-white/90 mb-6">{error}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 font-semibold"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorHandler;
