import { GPA_GRADES_SYSTEM, SubjectGrade } from '../types';

export const calculateGPA = (subjects: SubjectGrade[]): number => {
  const gpaPoints = subjects.reduce((acc, subject) => {
    return acc + GPA_GRADES_SYSTEM[subject.grade] * subject.credits;
  }, 0);

  const totalCredits = subjects.reduce((acc, subject) => acc + subject.credits, 0);

  return totalCredits === 0 ? 0 : Number((gpaPoints / totalCredits).toFixed(2));
};