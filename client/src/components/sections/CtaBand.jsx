import Button from "../ui/Button";

export default function CtaBand() {
  return (
    <section className="section border-t border-line">
      <div className="container-x text-center">
        <h2 className="text-4xl sm:text-5xl font-black max-w-3xl mx-auto">
          Your chair is waiting.
        </h2>
        <p className="mt-4 text-muted max-w-xl mx-auto">
          Book online in under a minute. Pick your barber, your time, your service.
        </p>
        <div className="mt-8">
          <Button to="/booking">Book Now</Button>
        </div>
      </div>
    </section>
  );
}