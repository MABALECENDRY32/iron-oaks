import { useMemo } from "react";
import { TIME_SLOTS } from "../../lib/constants";

function next14Days() {
  const out = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push(d);
  }
  return out;
}

export default function DateTimePicker({ date, time, onDate, onTime }) {
  const days = useMemo(() => next14Days(), []);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-muted mb-3">Choose a date</label>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
          {days.map((d) => {
            const iso = d.toISOString().slice(0, 10);
            const active = date === iso;
            const dayLabel = d.toLocaleDateString("en-ZA", { weekday: "short" });
            const dayNum = d.getDate();
            return (
              <button
                key={iso}
                type="button"
                onClick={() => onDate(iso)}
                className={`rounded-lg border py-3 text-center transition-colors ${
                  active ? "border-accent bg-elevated text-accent" : "border-line text-muted hover:border-accent/50"
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider">{dayLabel}</div>
                <div className="text-lg font-bold">{dayNum}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-muted mb-3">Choose a time</label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {TIME_SLOTS.map((t) => {
            const active = time === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => onTime(t)}
                className={`rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                  active ? "border-accent bg-elevated text-accent" : "border-line text-muted hover:border-accent/50"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}