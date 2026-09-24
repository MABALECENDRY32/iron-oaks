import { BARBERS } from "../../lib/constants";

export default function BarberSelect({ value, onSelect }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {BARBERS.map((b) => {
        const active = value?.id === b.id;
        return (
          <button
            key={b.id}
            type="button"
            onClick={() => onSelect(b)}
            className={`rounded-xl border p-4 text-left transition-colors ${
              active ? "border-accent bg-elevated" : "border-line bg-elevated hover:border-accent/50"
            }`}
          >
            <div className="aspect-square overflow-hidden rounded-lg bg-base border border-line">
              {b.photo ? (
                <img src={b.photo} alt={b.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-muted text-xs text-center px-3">
                  First available
                </div>
              )}
            </div>
            <h3 className="mt-3 font-bold">{b.name}</h3>
            <p className="text-xs text-accent">{b.role}</p>
          </button>
        );
      })}
    </div>
  );
}