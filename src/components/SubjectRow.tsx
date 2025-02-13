import React from 'react';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { GPA_GRADES_SYSTEM, SubjectGrade } from '../types';

interface SubjectRowProps {
  subject: SubjectGrade;
  index: number;
  onUpdate: (index: number, subject: SubjectGrade) => void;
  onDelete: (index: number) => void;
}

export function SubjectRow({ subject, index, onUpdate, onDelete }: SubjectRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-12 gap-4 items-center mb-3 px-4 py-2 rounded-lg hover:bg-gray-50"
    >
      <div className="col-span-1 text-gray-400 text-sm font-medium">{index + 1}</div>

      <div className="col-span-4">
        <input
          type="text"
          value={subject.name}
          placeholder="Course name"
          onChange={(e) => onUpdate(index, { ...subject, name: e.target.value })}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="col-span-3">
        <select
          value={subject.grade}
          onChange={(e) => onUpdate(index, { ...subject, grade: e.target.value as keyof typeof GPA_GRADES_SYSTEM })}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500"
        >
          {Object.keys(GPA_GRADES_SYSTEM).map((grade) => (
            <option key={grade} value={grade}>{grade}</option>
          ))}
        </select>
      </div>

      <div className="col-span-3">
        <input
          type="number"
          min="1"
          max="6"
          value={subject.credits || ''} // Show empty when zero
          onChange={(e) => onUpdate(index, { ...subject, credits: Number(e.target.value) || 0 })}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="col-span-1">
        <button
          onClick={() => onDelete(index)}
          className="p-2 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </motion.div>
  );
}
