import SectionHeading from "../ui/SectionHeading";
import { BARBERS } from "../../lib/constants";

export default function Barbers() {
  const team = BARBERS.filter((b) => b.id !== "any");
  return (
    <section className="section border-t border-line bg-elevated">
      <div className="container-x">
        <SectionHeading eyebrow="The team" title="Barbers who take pride in the craft." />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {team.map((b) => (
            <div key={b.id} className="group">
              <div className="aspect-4/5 overflow-hidden rounded-xl border border-line bg-base">
                {b.photo && (
                  <img
                    src={b.photo}
                    alt={b.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <h3 className="mt-4 text-xl font-bold">{b.name}</h3>
              <p className="text-sm text-accent">{b.role}</p>
              <p className="mt-2 text-sm text-muted">{b.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}