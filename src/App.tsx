import "./App.css";
import { useState } from "react";

import { useWorkProgress } from "./customHooks/useWorkProgress";
import { useCurrentTime } from "./customHooks/useCurrentTime";
import { calculateBreaks, timeToMinutes, formatHM } from "./utils/utils";
import type { BreakDefinition } from "./types/types";
import Article from "./components/Article";
import BreakSection from "./components/BreakSection";
import ProgressBar from "./components/ProgressBar";
import Form from "./components/Form";

export default function WorkdayTracker() {
  // Default values
  const [startTime, setStartTime] = useState("07:00");
  const [endTime, setEndTime] = useState("15:00");
  const [hourlyRate, setHourlyRate] = useState(200); // dollars/hour

  const breakSchedule: BreakDefinition[] = [
    {
      label: "Morning Break",
      duration: 15,
      paid: true,
      image: {
        src: "morning-break-sm.png",
        alt: "Morning break icon",
      },
    },
    {
      label: "Lunch",
      duration: 30,
      paid: false,
      image: {
        src: "lunch-break-sm.png",
        alt: "Lunch break icon",
      },
    },
    {
      label: "Afternoon Break",
      duration: 15,
      paid: true,
      image: {
        src: "afternoon-break-sm.png",
        alt: "Afternoon break icon",
      },
    },
  ];

  const currentTime = useCurrentTime();
  const progress = useWorkProgress(startTime, endTime);
  const breaks = calculateBreaks(startTime, endTime, breakSchedule);

  // NEW: subtract unpaid breaks
  const unpaidMinutes = breakSchedule
    .filter((b) => !b.paid)
    .reduce((sum, b) => sum + b.duration, 0);

  const startMins = timeToMinutes(startTime);
  const endMins = timeToMinutes(endTime);
  const nowMins = new Date().getHours() * 60 + new Date().getMinutes();

  // total shift minutes
  const total = endMins - startMins;
  const elapsed = Math.max(0, Math.min(nowMins - startMins, total));
  const remaining = Math.max(0, endMins - nowMins);

  // billable shift length
  const billableTotal = total - unpaidMinutes;
  const billableElapsed = Math.max(0, Math.min(elapsed, billableTotal));
  // const billableRemaining = Math.max(0, billableTotal - billableElapsed);

  // money
  const totalPay = (billableTotal / 60) * hourlyRate;
  const earnedSoFar = (billableElapsed / 60) * hourlyRate;
  const remainingPay = Math.max(0, totalPay - earnedSoFar);

  const breakMarkers = breaks.map((b) => {
    const startPercent = ((b.startMinutes - startMins) / total) * 100;
    const endPercent = ((b.endMinutes - startMins) / total) * 100;
    return {
      ...b,
      startPercent,
      endPercent,
    };
  });

  return (
    <div className="page_wrapper">
      <main className="main">
        <section className="main__section">
          <header>
            <div className="user_info">
              <img src="avatar-neon.jpeg" alt="" />
              <div>
                <h1>y3fr33_xoxo</h1>
                <p>Time working: {formatHM(elapsed)}</p>
              </div>
            </div>
            <ProgressBar
              progress={progress}
              currentTime={currentTime}
              breakMarkers={breakMarkers}
              startTime={startTime}
              endTime={endTime}
            />
            <h2>Workday Progress</h2>
            <div className="time_info">
              <Article
                title="Total Shift"
                date="Today"
                metaInfo={formatHM(total)}
                src="total-shift-sm.png"
                alt="Total shift icon"
                style={{ color: "red" }}
              />
              <Article
                title="Completed"
                date="Progress"
                metaInfo={`${progress.toFixed(1)}%`}
                src="completed-sm.png"
                alt="Completed icon"
              />
            </div>
          </header>

          <section className="section_info">
            <div className="time_summary">
              <h2>Time summary</h2>
              <Article
                title="Billable"
                date="Today"
                metaInfo={formatHM(billableTotal)}
                src="billable-sm.png"
                alt="Billable icon"
              />
              <Article
                title="Completed"
                date="Today"
                metaInfo={formatHM(elapsed)}
                src="completed-time-sm.png"
                alt="Completed icon"
              />
              <Article
                title="Remaining"
                date="Today"
                metaInfo={formatHM(remaining)}
                src="remaining-time-sm.png"
                alt="Remaining icon"
              />
            </div>

            <div className="money_summary">
              <h2>Money summary</h2>
              <Article
                title="Total Pay"
                date="Today"
                metaInfo={`$${totalPay.toFixed(2)}`}
                src="total-pay-sm.png"
                alt="Total pay icon"
              />

              <Article
                title="Earned so far"
                date="Today"
                metaInfo={`$${earnedSoFar.toFixed(2)}`}
                src="earned-so-far-sm.png"
                alt="Earned so far icon"
              />
              <Article
                title="Remaining"
                date="Today"
                metaInfo={`$${remainingPay.toFixed(2)}`}
                src="remaining-sm.png"
                alt="Remaining icon"
              />
            </div>
          </section>
        </section>
        <BreakSection breaks={breaks} />
        <Form
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          hourlyRate={hourlyRate}
          setHourlyRate={setHourlyRate}
        />
      </main>
    </div>
  );
}
