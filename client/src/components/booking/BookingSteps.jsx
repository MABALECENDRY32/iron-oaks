export default function BookingSteps({ current }) {
  const steps = ["Service", "Barber", "Date & Time", "Details"];
  return (
    <ol className="flex flex-wrap gap-3 text-xs uppercase tracking-wider">
      {steps.map((label, i) => {
        const n = i + 1;
        const state = n < current ? "done" : n === current ? "active" : "todo";
        return (
          <li
            key={label}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 ${
              state === "active"
                ? "border-accent text-accent"
                : state === "done"
                ? "border-accent/50 text-accent/70"
                : "border-line text-muted"
            }`}
          >
            <span className="font-bold">{state === "done" ? "✓" : n}</span>
            {label}
          </li>
        );
      })}
    </ol>
  );
}