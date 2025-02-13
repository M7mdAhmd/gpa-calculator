import React from 'react';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface GPAChartProps {
  gpa: number;
}

export function GPAChart({ gpa }: GPAChartProps) {
  const maxGPA = 4.0;
  const percentage = (gpa / maxGPA) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.8, ease: 'easeOut' }} 
      className="flex flex-col items-center justify-center w-28 sm:w-40 h-28 sm:h-40"
    >
      <div className="relative w-24 sm:w-32 h-24 sm:h-32">
        <CircularProgressbar
          value={percentage}
          text={gpa.toFixed(2)}
          styles={buildStyles({
            textSize: '16px',
            pathColor: `rgba(58, 129, 246, ${percentage / 100})`,
            trailColor: '#D8EFF5',
            textColor: '#3A81F6',
            strokeLinecap: 'round',
          })}
        />
      </div>

      <motion.div 
        initial={{ y: 10, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.5, duration: 0.6 }} 
        className="text-base sm:text-lg font-semibold text-gray-700 mt-2"
      >
        GPA
      </motion.div>
    </motion.div>
  );
}