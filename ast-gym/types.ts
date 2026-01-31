export interface ExerciseGuide {
  howTo: string;
  videoLinks: { title: string; uri: string }[];
}

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  notes?: string;
  guide?: ExerciseGuide;
}

export interface WorkoutDay {
  dayName: string;
  exercises: Exercise[];
}

export interface WorkoutProgram {
  id: string;
  programName: string;
  targetGoal: string;
  difficulty: string;
  days: WorkoutDay[];
  createdAt: string;
}

export interface WorkoutLogEntry {
  id: string;
  date: string;
  programName: string;
  dayName: string;
  exercisesCompleted: {
    name: string;
    weight: number;
    reps: number;
  }[];
}

export interface UserPhysicalStats {
  age: number;
  gender: 'male' | 'female';
  height: number; // cm
  weight: number; // kg
  waist: number; // cm
  neck: number; // cm
  hip?: number; // cm (optional for male, required for female usually)
}

export interface HealthAnalysis {
  bmi: number;
  bodyFatEstimate: string; // Range or approx number
  bodyType: string; // Ectomorph, Mesomorph etc.
  status: string; // Healthy, Overweight etc.
  feedback: string; // AI generated personalized feedback
}

export interface UserProfile {
  stats: UserPhysicalStats;
  analysis?: HealthAnalysis;
  name?: string;
}

export enum AppView {
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  GENERATOR = 'GENERATOR',
  LOGGER = 'LOGGER',
  HISTORY = 'HISTORY',
  AST_TRAINING = 'AST_TRAINING'
}