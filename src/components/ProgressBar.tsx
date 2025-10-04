import type { Breakmarkers } from "../types/types";

interface ProgressBarProps {
  progress: number; // percentage (0-100)
  currentTime: string; // formatted current time (e.g., "10:30 AM")
  breakMarkers: Breakmarkers[]; // array of break markers
  startTime: string; // formatted start time (e.g., "9:00 AM")
  endTime: string; // formatted end time (e.g., "5:00 PM")
}

import { minutesToTime } from "../utils/utils";

const ProgressBar = ({
  progress,
  currentTime,
  breakMarkers,
  startTime,
  endTime,
}: ProgressBarProps) => {
  return (
    <div className="progress_wrapper">
      <div className="progress_container">
        <div className="progress_bar" style={{ width: `${progress}%` }}></div>
        <div className="progress_marker" style={{ left: `${progress}%` }}>
          <div className="marker_time">
            <span>{currentTime}</span>
          </div>
        </div>
        {/* Break Overlays */}
        {breakMarkers.map((br, idx) => (
          <div
            key={idx}
            className={`break_marker ${br.paid ? "paid" : "unpaid"}`}
            style={{
              left: `${br.startPercent}%`,
              width: `${br.endPercent - br.startPercent}%`,
            }}
            title={`${br.label}: ${minutesToTime(
              br.startMinutes
            )} → ${minutesToTime(br.endMinutes)} (${
              br.paid ? "Paid" : "Unpaid"
            })`}
          ></div>
        ))}
      </div>

      <div className="progress_labels">
        <span>{startTime}</span>
        <span>{endTime}</span>
      </div>
    </div>
  );
};
export default ProgressBar;
