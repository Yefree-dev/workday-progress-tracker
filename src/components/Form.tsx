interface FormProps {
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  hourlyRate: number;
  setHourlyRate: (rate: number) => void;
}

const Form: React.FC<FormProps> = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  hourlyRate,
  setHourlyRate,
}) => {
  return (
    <section className="settings_section">
      <h2>Shift Settings</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="settings_form"
      >
        <label>
          Start Time:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>

        <label>
          End Time:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>

        <label>
          Hourly Rate ($):
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            min="0"
            step="0.01"
          />
        </label>
      </form>
    </section>
  );
};
export default Form;
