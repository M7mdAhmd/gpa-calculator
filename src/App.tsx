import React, { useState, useEffect, useRef } from 'react';
import { PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SubjectGrade } from './types';
import { calculateGPA } from './utils/calculator';
import { SubjectRow } from './components/SubjectRow';
import { GPAChart } from './components/GPAChart';

function App() {
  const [subjects, setSubjects] = useState<SubjectGrade[]>([
    { name: '', grade: 'A', credits: 3 },
    { name: '', grade: 'A', credits: 3 },
    { name: '', grade: 'A', credits: 3 }
  ]);

  const lastSubjectRef = useRef<HTMLDivElement | null>(null);
  const prevLength = useRef(subjects.length);

  useEffect(() => {
    if (subjects.length > prevLength.current && lastSubjectRef.current) {
      lastSubjectRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    prevLength.current = subjects.length;
  }, [subjects.length]);

  const addSubject = () => {
    setSubjects([...subjects, { name: '', grade: 'A', credits: 3 }]);
  };

  const updateSubject = (index: number, subject: SubjectGrade) => {
    const newSubjects = [...subjects];
    newSubjects[index] = subject;
    setSubjects(newSubjects);
  };

  const deleteSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const gpa = calculateGPA(subjects);
  const totalCredits = subjects.reduce((acc, subject) => acc + subject.credits, 0);

  return (
    <div className="min-h-screen bg-image flex flex-col">
      <div className="flex-1 py-4 px-2 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden flex-1"
          >
            <div className="bg-gradient-to-r from-blue-700 to-cyan-500 p-4 sm:p-6 text-white text-center">
              <h1 className="text-2xl sm:text-4xl font-bold">GPA Calculator</h1>
            </div>

            <div className="p-3 sm:p-6">
              <div className="grid grid-cols-12 font-semibold text-gray-600 mb-4 px-2">
                <div className="col-span-1"></div>
                <div className="col-span-4 pl-2 sm:pl-4">Course</div>
                <div className="col-span-3 pl-2 sm:pl-3">Grade</div>
                <div className="col-span-3 pl-2 sm:pl-3">Credits</div>
                <div className="col-span-1"></div>
              </div>

              <div className="mb-6">
                <div className="max-h-[calc(100vh-24rem)] md:max-h-[calc(100vh-20rem)] overflow-y-auto custom-scrollbar">
                  <AnimatePresence>
                    {subjects.map((subject, index) => (
                      <div key={index} ref={index === subjects.length - 1 ? lastSubjectRef : null}>
                        <SubjectRow
                          subject={subject}
                          index={index}
                          onUpdate={updateSubject}
                          onDelete={deleteSubject}
                        />
                      </div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addSubject}
                className="w-full flex items-center justify-center px-4 py-2.5 sm:py-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200"
              >
                <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="font-medium">Add Course</span>
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-row md:flex-col items-center justify-center md:w-64 gap-6 md:gap-0"
          >
            <GPAChart gpa={gpa} />
            <div className="flex flex-col items-center">
              <div className="text-base sm:text-lg mt-5 font-semibold text-gray-700">Total Credits</div>
              <div className="text-3xl font-bold text-blue-500">{totalCredits}</div>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="w-full text-center py-2  mt-auto">
        <p className="font-medium text-gray-600 text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} Mohamed Elsoraky. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;