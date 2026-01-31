import { WorkoutProgram, WorkoutLogEntry, UserProfile } from '../types';

const KEYS = {
  PROGRAM: 'gym_ai_program',
  LOGS: 'gym_ai_logs',
  USER: 'gym_ai_user_profile_v1'
};

export const saveProgram = (program: WorkoutProgram): void => {
  localStorage.setItem(KEYS.PROGRAM, JSON.stringify(program));
};

export const getProgram = (): WorkoutProgram | null => {
  const data = localStorage.getItem(KEYS.PROGRAM);
  return data ? JSON.parse(data) : null;
};

export const saveLog = (log: WorkoutLogEntry): void => {
  const existingLogs = getLogs();
  const newLogs = [log, ...existingLogs];
  localStorage.setItem(KEYS.LOGS, JSON.stringify(newLogs));
};

export const getLogs = (): WorkoutLogEntry[] => {
  const data = localStorage.getItem(KEYS.LOGS);
  return data ? JSON.parse(data) : [];
};

export const saveUserProfile = (profile: UserProfile): void => {
  localStorage.setItem(KEYS.USER, JSON.stringify(profile));
};

export const getUserProfile = (): UserProfile | null => {
  const data = localStorage.getItem(KEYS.USER);
  return data ? JSON.parse(data) : null;
};

export const clearProgram = (): void => {
  localStorage.removeItem(KEYS.PROGRAM);
};