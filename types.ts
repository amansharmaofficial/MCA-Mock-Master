
export enum Subject {
  Mathematics = 'Mathematics',
  ComputerAwareness = 'Computer Awareness',
  GeneralAptitude = 'General Aptitude',
}

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  subject: Subject;
  text: string;
  options: Option[];
  correctOptionId: string;
  explanation?: string;
  year?: number; // Added to support PYQs
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: string | null;
  timeSpent: number; // in seconds
}

export interface TestResult {
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  score: number;
  timeTaken: number;
  answers: UserAnswer[];
}

export type AppState = 'HOME' | 'TESTING' | 'RESULT' | 'PYQ_EXPLORER';
