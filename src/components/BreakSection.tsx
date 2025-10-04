import Article from "./Article";
import type { ScheduledBreak } from "../types/types";
import { minutesToTime } from "../utils/utils";

interface BreakSectionProps {
  breaks: ScheduledBreak[];
}

const BreakSection = ({ breaks }: BreakSectionProps) => {
  // get current time in minutes since midnight
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  return (
    <section className="main__aside">
      <h2>Breaks</h2>
      <ul className="main__ul">
        {breaks.map((b, idx) => {
          const isPast = currentMinutes > b.endMinutes;

          return (
            <li key={idx}>
              <Article
                title={b.label}
                date={`${b.duration} minutes `}
                metaInfo={`${minutesToTime(b.startMinutes)} to ${minutesToTime(
                  b.endMinutes
                )}`}
                src={b.image ? b.image.src : "break-sm.png"}
                alt={b.image ? b.image.alt : "Break icon"}
                className={`${b.paid ? "paid_break" : "unpaid_break"} ${
                  isPast ? "break--past" : ""
                }`}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default BreakSection;
