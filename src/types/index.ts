export interface User {
  id: string;
  email: string;
  isPaid: boolean;
  freeWorksheetsUsed: number;
  maxFreeWorksheets: number;
}

export interface Question {
  id: string;
  question: string;
  answer: string;
  workingSteps?: string[];
}

export interface Worksheet {
  id: string;
  title: string;
  level: string;
  topic: string;
  difficulty: string;
  questions: Question[];
  createdAt: Date;
}

export type Level = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6';
export type Topic = 'Addition' | 'Subtraction' | 'Multiplication' | 'Division' | 'Fractions' | 'Decimals' | 'Geometry' | 'Word Problems';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';
