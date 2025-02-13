import React from 'react';

interface GPAChartProps {
  gpa: number;
}

export const GPAChart: React.FC<GPAChartProps> = ({ gpa }) => {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Circle */}
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="10"
        />
      </svg>

      {/* GPA Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-medium text-gray-600">GPA</span>
        <span className="text-2xl font-bold text-blue-500">{gpa.toFixed(2)}</span>
      </div>
    </div>
  );
};