import Card from "../ui/Card";
import { SERVICES } from "../../lib/constants";

export default function ServiceSelect({ value, onSelect }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {SERVICES.map((s) => {
        const active = value?.id === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s)}
            className={`text-left rounded-xl border p-5 transition-colors ${
              active
                ? "border-accent bg-elevated"
                : "border-line bg-elevated hover:border-accent/50"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold">{s.name}</h3>
              <div className="text-right">
                <div className="text-accent font-black">R{s.price}</div>
                <div className="text-xs text-muted">{s.duration} min</div>
              </div>
            </div>
            <p className="mt-2 text-sm text-muted">{s.desc}</p>
          </button>
        );
      })}
    </div>
  );
}