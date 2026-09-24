import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import { BRAND, HOURS } from "../../lib/constants";

export default function LocationHours() {
  return (
    <section className="section border-t border-line bg-elevated">
      <div className="container-x grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Find us" title="Drop in. Sit down. Look sharp." />
          <div className="mt-8 space-y-4 text-muted">
            <p>{BRAND.address}</p>
            <p><a href={`tel:${BRAND.phone}`} className="hover:text-accent">{BRAND.phone}</a></p>
            <p><a href={`mailto:${BRAND.email}`} className="hover:text-accent">{BRAND.email}</a></p>
            <a
              href={BRAND.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-accent font-semibold hover:underline"
            >
              Get directions →
            </a>
          </div>
        </div>

        <Card>
          <h3 className="text-xl font-bold">Opening hours</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {HOURS.map((h) => (
              <li key={h.day} className="flex justify-between gap-4 border-b border-line pb-2 last:border-0">
                <span className="text-muted">{h.day}</span>
                <span className={h.time === "Closed" ? "text-muted" : "text-ink font-medium"}>{h.time}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}