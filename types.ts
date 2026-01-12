
export enum FocusMode {
  Classic = 'classic',
  DeepFocus = 'deep',
  Gentle = 'gentle',
}

export enum SessionType {
  Work = 'work',
  Break = 'break',
}

export interface FocusModeConfig {
  name: string;
  work: number;
  break: number;
}
