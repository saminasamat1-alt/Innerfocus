
import { FocusMode, FocusModeConfig } from './types';

export const FOCUS_MODES: Record<FocusMode, FocusModeConfig> = {
  [FocusMode.Classic]: { name: 'Classic', work: 25, break: 5 },
  [FocusMode.DeepFocus]: { name: 'Deep Focus', work: 50, break: 10 },
  [FocusMode.Gentle]: { name: 'Gentle', work: 15, break: 5 },
};

export const MOTIVATIONAL_QUOTES: string[] = [
  "You did great. Small steps matter.",
  "You are investing in yourself.",
  "Focus without pressure.",
  "One task at a time.",
  "Well done. Rest is productive too.",
  "Progress, not perfection.",
  "The journey of a thousand miles begins with a single step.",
];
