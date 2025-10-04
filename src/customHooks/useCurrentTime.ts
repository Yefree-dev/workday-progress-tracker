// customHooks/useCurrentTime.ts
import { useEffect, useState } from "react";
import { minutesToTime } from "../utils/utils";

export function useCurrentTime() {
  const [time, setTime] = useState(
    minutesToTime(new Date().getHours() * 60 + new Date().getMinutes())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(minutesToTime(now.getHours() * 60 + now.getMinutes()));
    }, 60 * 1000); // update every minute
    return () => clearInterval(interval);
  }, []);

  return time;
}
