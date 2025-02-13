export interface SubjectGrade {
  name: string;
  grade: keyof typeof GPA_GRADES_SYSTEM;
  credits: number;
}

export const GPA_GRADES_SYSTEM = {
  "A+": 4.00,
  "A": 4.00,
  "A-": 3.70,
  "B+": 3.30,
  "B": 3.00,
  "B-": 2.70,
  "C+": 2.30,
  "C": 2.00,
  "C-": 1.70,
  "D+": 1.30,
  "D": 1.00,
  "F": 0.00,
} as const;