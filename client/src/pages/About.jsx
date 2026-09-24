import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import CtaBand from "../components/sections/CtaBand";

const values = [
  { title: "Craft over speed", desc: "We don't rush the chair. Every cut is done right the first time." },
  { title: "Consistency", desc: "Same standard whether it's a Tuesday morning or a Saturday rush." },
  { title: "Respect", desc: "Everyone gets the same welcome, the same chair, the same care." },
];

export default function About() {
  return (
    <>
      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="About"
              title="Built on discipline. Sharpened by craft."
            />
            <div className="mt-8 space-y-5 text-lg text-muted">
              <p>
                Iron-Oaks started in 2016 in a small two-chair shop on Kloof Street. What began
                as one barber and a straight razor has grown into a team of three who still
                believe in the same thing: a proper cut, done with care.
              </p>
              <p>
                We're not a salon. We're a barbershop. Fades, scissor work, hot-towel shaves,
                beard sculpting — the classics, executed properly.
              </p>
              <p>
                Whether it's your first visit or your hundredth, you'll get the same welcome,
                the same consultation, and the same attention to detail.
              </p>
            </div>
          </div>

          <div className="aspect-4/5 overflow-hidden rounded-xl border border-line">
            <img
              src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80"
              alt="Inside the Iron-Oaks barbershop"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section border-t border-line bg-elevated">
        <div className="container-x">
          <SectionHeading eyebrow="Values" title="What we stand for." />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <Card key={v.title}>
                <h3 className="text-xl font-bold">{v.title}</h3>
                <p className="mt-2 text-muted">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="section border-t border-line">
        <div className="container-x grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            ["2016", "Established"],
            ["30k+", "Cuts delivered"],
            ["4.9★", "Google rating"],
            ["3", "Master barbers"],
          ].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="text-4xl sm:text-5xl font-black text-accent">{num}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}