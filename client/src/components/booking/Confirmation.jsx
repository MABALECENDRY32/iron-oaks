import { buildBookingCalendar, downloadICS } from "../../lib/calendar";
import { BRAND } from "../../lib/constants";

export default function Confirmation({ booking, onRestart }) {
  // booking: { serviceName, barberName, date, time, durationMin, customerName, email, phone, notes, bookingId }
  const startDate = new Date(`${booking.date}T${booking.time}:00`);
  const calendar = buildBookingCalendar({
    serviceName: booking.serviceName,
    barberName: booking.barberName,
    start: startDate,
    durationMin: booking.durationMin,
    location: BRAND.address,
    notes: booking.notes,
    brandName: BRAND.name,
    bookingId: booking.bookingId,
  });

  const handleICS = () => {
    downloadICS(`iron-oaks-${booking.bookingId || "booking"}.ics`, calendar.ics);
  };

  return (
    <div className="text-center py-8">
      <div className="text-accent text-5xl">✓</div>
      <h2 className="mt-4 text-3xl font-black">Booking confirmed</h2>
      <p className="mt-2 text-muted">
        We've received your booking and will email you shortly at {booking.email}.
      </p>

      <div className="mt-8 rounded-xl border border-line bg-elevated p-6 text-left max-w-md mx-auto">
        <dl className="space-y-3 text-sm">
          <Row k="Service" v={booking.serviceName} />
          <Row k="Barber" v={booking.barberName || "Any available"} />
          <Row k="Date" v={startDate.toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} />
          <Row k="Time" v={startDate.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })} />
          <Row k="Location" v={BRAND.address} />
          {booking.bookingId && <Row k="Booking ref" v={booking.bookingId} />}
        </dl>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <a
          href={calendar.googleUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
        >
          Add to Google Calendar
        </a>
        <button type="button" onClick={handleICS} className="btn-ghost">
          Download .ics (Apple / Outlook)
        </button>
      </div>

      <div className="mt-10">
        <button type="button" onClick={onRestart} className="text-sm text-muted hover:text-accent">
          Make another booking
        </button>
      </div>
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
      <dt className="text-muted">{k}</dt>
      <dd className="text-right font-medium">{v}</dd>
    </div>
  );
}