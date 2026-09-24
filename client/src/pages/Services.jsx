import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import CtaBand from "../components/sections/CtaBand";
import { SERVICES } from "../lib/constants";

const packages = [
  {
    name: "The Full Works",
    price: 420,
    duration: 90,
    desc: "Signature cut, hot shave, beard groom and hot towel finish. The complete Iron-Oaks experience.",
    features: ["Signature cut", "Traditional hot shave", "Beard shape", "Hot towel + balm finish"],
    featured: true,
  },
  {
    name: "Father & Son",
    price: 320,
    duration: 75,
    desc: "Side-by-side cuts for dad and the young gentleman.",
    features: ["Adult signature cut", "Kids cut", "Two chairs, same time", "Saturday morning slots"],
  },
  {
    name: "Groom's Package",
    price: 650,
    duration: 120,
    desc: "Pre-wedding grooming for the big day, including trial.",
    features: ["Pre-event trial", "Day-of cut", "Beard sculpt", "Hot towel shave"],
  },
];

export default function Services() {
  return (
    <>
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Services"
            title="Our menu."
            subtitle="Every service includes a consultation. We take the time to get it right."
          />
        </div>
      </section>

      {/* Full price list */}
      <section className="section border-t border-line">
        <div className="container-x">
          <SectionHeading eyebrow="Cut & groom" title="Price list." />
          <div className="mt-12 divide-y divide-line border-y border-line">
            {SERVICES.map((s) => (
              <div key={s.id} className="grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <h3 className="text-lg font-bold">{s.name}</h3>
                  <p className="mt-1 text-sm text-muted">{s.desc}</p>
                </div>
                <div className="text-right sm:min-w-35">
                  <div className="text-2xl font-black text-accent">R{s.price}</div>
                  <div className="text-xs text-muted">{s.duration} min</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section border-t border-line bg-elevated">
        <div className="container-x">
          <SectionHeading eyebrow="Packages" title="Bundled for the occasion." />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {packages.map((p) => (
              <Card key={p.name} className={p.featured ? "border-accent" : ""}>
                {p.featured && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Most popular
                  </span>
                )}
                <h3 className="mt-2 text-2xl font-black">{p.name}</h3>
                <p className="mt-1 text-sm text-muted">{p.desc}</p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-accent">R{p.price}</span>
                  <span className="text-sm text-muted">· {p.duration} min</span>
                </div>
                <ul className="mt-6 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">✓</span>
                      <span className="text-muted">{f}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}