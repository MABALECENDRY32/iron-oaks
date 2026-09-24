import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import { SERVICES } from "../../lib/constants";

export default function ServicesPreview() {
  const top = SERVICES.slice(0, 4);
  return (
    <section className="section border-t border-line">
      <div className="container-x">
        <SectionHeading eyebrow="What we do" title="Grooming, done properly." />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {top.map((s) => (
            <Card key={s.id} className="hover:border-accent transition-colors">
              <h3 className="text-lg font-bold">{s.name}</h3>
              <p className="mt-2 text-sm text-muted">{s.desc}</p>
              <p className="mt-4 text-accent font-black text-xl">R{s.price}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <Link to="/services" className="text-accent font-semibold hover:underline">
            View full menu & pricing →
          </Link>
        </div>
      </div>
    </section>
  );
}