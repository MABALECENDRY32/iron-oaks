import Button from "../ui/Button";
import { BRAND } from "../../lib/constants";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&q=80)" }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-base/60 via-base/80 to-base" />

      <div className="relative container-x section">
        <div className="max-w-3xl">
          <p className="eyebrow">Barbershop · Cape Town</p>
          <h1 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05]">
            Sharp cuts. <span className="text-accent">Timeless</span> craft.
          </h1>
          <p className="mt-6 text-lg text-muted max-w-xl">
            Iron-Oaks is a modern barbershop rooted in old-school discipline. Precision fades,
            hot-towel shaves and grooming that lasts beyond the chair.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button to="/booking">Book your chair</Button>
            <Button to="/services" variant="ghost">View services</Button>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-xs text-muted">
            <span>💈 Walk-ins welcome</span>
            <span>⏱ 45-min average cut</span>
            <span>⭐ 4.9 from 300+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}