import React from 'react';
import { motion } from 'framer-motion';

interface GPAChartProps {
  gpa: number;
}

export const GPAChart: React.FC<GPAChartProps> = ({ gpa }) => {
  const maxGPA = 4.0;
  const strokeProgress = (gpa / maxGPA) * 283; 
  const strokeOpacity = gpa === 0 ? 0 : 1; 
  const minStrokeFill = 20; 

  const interpolateColor = (value: number) => {
    const r = Math.round(154 + (59 - 154) * value); 
    const g = Math.round(192 + (130 - 192) * value);
    const b = Math.round(255 + (246 - 255) * value)
    return `rgb(${r}, ${g}, ${b})`;
  };

  const strokeColor = gpa === 0 ? "transparent" : interpolateColor(gpa / maxGPA);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-32 h-32 flex items-center justify-center"
    >
      {/* Background Circle */}
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#d2e3ff"
          strokeWidth="10"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={strokeColor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="283"
          initial={{ strokeDashoffset: 283 }}
          animate={{
            strokeDashoffset: 283 - (gpa === 0 ? 0 : Math.max(strokeProgress, minStrokeFill)),
            strokeOpacity: strokeOpacity,
          }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </svg>

      {/* GPA Text with Animation */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <span className="text-sm font-medium text-gray-600">GPA</span>
        <span className="text-2xl font-bold text-blue-500">{gpa.toFixed(2)}</span>
      </motion.div>
    </motion.div>
  );
};
