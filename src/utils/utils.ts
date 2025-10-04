// utils.ts
import type { BreakDefinition, ScheduledBreak } from "../types/types";

export function timeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

export function minutesToPercent(
  min: number,
  start: number,
  end: number
): number {
  return ((min - start) / (end - start)) * 100;
}

export function minutesToTime(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// utils/utils.ts
export function formatHM(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

/**
 * Distributes breaks evenly across a workday
 * @param startTime e.g. "08:00"
 * @param endTime e.g. "17:00"
 * @param breaks array of { label, duration }
 */
export function calculateBreaks(
  startTime: string,
  endTime: string,
  breaks: BreakDefinition[]
): ScheduledBreak[] {
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);
  const total = end - start;

  const segment = total / (breaks.length + 1);

  return breaks.map((b, i) => {
    const breakStart = Math.round(start + segment * (i + 1));
    const breakEnd = breakStart + b.duration;

    return {
      ...b,
      startMinutes: breakStart,
      endMinutes: breakEnd,
      percent: minutesToPercent(breakStart, start, end),
    };
  });
}
