import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";

const reviews = [
  { name: "Thabo M.", text: "Best fade I've had in years. Marcus takes his time and it shows." },
  { name: "James L.", text: "Proper barbershop vibe. Hot towel shave was unreal." },
  { name: "Sipho K.", text: "Booked online, walked in, out in 45 minutes looking sharp." },
];

export default function Testimonials() {
  return (
    <section className="section border-t border-line">
      <div className="container-x">
        <SectionHeading eyebrow="Reviews" title="What the chairs are saying." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <Card key={r.name}>
              <div className="text-accent">★★★★★</div>
              <p className="mt-4 text-muted italic">"{r.text}"</p>
              <p className="mt-4 text-sm font-semibold">— {r.name}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}