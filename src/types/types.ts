// types.ts
export interface BreakDefinition {
  label: string;
  duration: number; // in minutes
  paid: boolean; // new property
  image?: {
    src: string;
    alt: string;
  };
}

export interface ScheduledBreak extends BreakDefinition {
  startMinutes: number;
  endMinutes: number;
  percent: number;
}

export interface Breakmarkers {
  label: string;
  startMinutes: number;
  endMinutes: number;
  startPercent: number;
  endPercent: number;
  paid: boolean;
}
