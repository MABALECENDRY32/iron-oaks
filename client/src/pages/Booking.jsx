import { useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import BookingSteps from "../components/booking/BookingSteps";
import ServiceSelect from "../components/booking/ServiceSelect";
import BarberSelect from "../components/booking/BarberSelect";
import DateTimePicker from "../components/booking/DateTimePicker";
import CustomerDetails from "../components/booking/CustomerDetails";
import Confirmation from "../components/booking/Confirmation";
import { submitBooking } from "../lib/api";

const initialCustomer = { name: "", email: "", phone: "", notes: "" };

export default function Booking() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState(null);
  const [barber, setBarber] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [customer, setCustomer] = useState(initialCustomer);
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [confirmed, setConfirmed] = useState(null);
  const [error, setError] = useState("");

  const canContinue = {
    1: !!service,
    2: !!barber,
    3: !!date && !!time,
    4: customer.name && customer.email && customer.phone,
  }[step];

  const handleCustomer = (e) => setCustomer({ ...customer, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setStatus("sending");
    setError("");
    try {
      const payload = {
        serviceId: service.id,
        serviceName: service.name,
        servicePrice: service.price,
        durationMin: service.duration,
        barberId: barber.id,
        barberName: barber.id === "any" ? null : barber.name,
        date,
        time,
        ...customer,
      };
      const res = await submitBooking(payload);
      setConfirmed({
        ...payload,
        barberName: payload.barberName || "Any available",
        bookingId: res.id,
      });
      setStatus("done");
    } catch (err) {
      console.error(err);
      setError(err.message || "Booking failed. Please try again.");
      setStatus("error");
    }
  };

  const restart = () => {
    setStep(1);
    setService(null);
    setBarber(null);
    setDate(null);
    setTime(null);
    setCustomer(initialCustomer);
    setStatus("idle");
    setConfirmed(null);
  };

  return (
    <section className="section">
      <div className="container-x max-w-4xl">
        <SectionHeading
          eyebrow="Booking"
          title="Reserve your chair."
          subtitle="Four quick steps. Pick your service, barber, time, and confirm."
        />

        {status !== "done" && (
          <div className="mt-10">
            <BookingSteps current={step} />
          </div>
        )}

        <Card className="mt-10 p-6 sm:p-8">
          {status === "done" && confirmed ? (
            <Confirmation booking={confirmed} onRestart={restart} />
          ) : (
            <>
              {step === 1 && (
                <>
                  <h2 className="text-2xl font-bold mb-6">Choose a service</h2>
                  <ServiceSelect value={service} onSelect={setService} />
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-2xl font-bold mb-6">Choose a barber</h2>
                  <BarberSelect value={barber} onSelect={setBarber} />
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="text-2xl font-bold mb-6">Pick a date & time</h2>
                  <DateTimePicker date={date} time={time} onDate={setDate} onTime={setTime} />
                </>
              )}

              {step === 4 && (
                <>
                  <h2 className="text-2xl font-bold mb-6">Your details</h2>
                  <CustomerDetails form={customer} onChange={handleCustomer} />

                  <div className="mt-8 rounded-lg border border-line bg-base p-4 text-sm">
                    <h3 className="font-bold text-ink">Booking summary</h3>
                    <ul className="mt-3 space-y-1.5 text-muted">
                      <li><span className="text-muted">Service:</span> {service?.name} · R{service?.price}</li>
                      <li><span className="text-muted">Barber:</span> {barber?.id === "any" ? "Any available" : barber?.name}</li>
                      <li><span className="text-muted">Date:</span> {date} at {time}</li>
                    </ul>
                  </div>

                  {status === "error" && (
                    <p className="mt-4 text-red-400 text-sm">{error}</p>
                  )}
                </>
              )}

              <div className="mt-10 flex flex-wrap gap-3 justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className="btn-ghost disabled:opacity-30"
                >
                  Back
                </button>

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canContinue}
                    className="btn-primary disabled:opacity-40"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canContinue || status === "sending"}
                    className="btn-primary disabled:opacity-40"
                  >
                    {status === "sending" ? "Booking..." : "Confirm booking"}
                  </button>
                )}
              </div>
            </>
          )}
        </Card>
      </div>
    </section>
  );
}