
import React from 'react';
import { Cloud } from 'lucide-react';

const Loader: React.FC = () => {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/30 text-center">
      <div className="flex justify-center mb-6">
        <Cloud className="w-16 h-16 text-white animate-pulse" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">Loading Weather Data</h3>
      <div className="flex justify-center space-x-2">
        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default Loader;
