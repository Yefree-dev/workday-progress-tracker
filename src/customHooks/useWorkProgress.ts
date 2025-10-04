// useWorkProgress.ts
import { useEffect, useState } from "react";
import { timeToMinutes, minutesToPercent } from "../utils/utils";

export function useWorkProgress(startTime: string, endTime: string): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = timeToMinutes(startTime);
    const end = timeToMinutes(endTime);

    function update() {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      let percent = minutesToPercent(currentMinutes, start, end);
      percent = Math.max(0, Math.min(100, percent)); // clamp
      setProgress(percent);
    }

    update();
    const interval = setInterval(update, 60 * 1000); // update every minute
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return progress;
}
