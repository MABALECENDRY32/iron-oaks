/**
 * Builds calendar links / files for a confirmed booking.
 * Works with Google Calendar (URL) and Apple/Outlook (ICS download).
 */

const pad = (n) => String(n).padStart(2, "0");

/** Convert a JS Date to the Google/ICS UTC format: YYYYMMDDTHHMMSSZ */
function toICSDate(date) {
  return (
    date.getUTCFullYear() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    "T" +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    "Z"
  );
}

/**
 * @param {Object} booking
 * @param {string} booking.serviceName
 * @param {string} booking.barberName
 * @param {Date|string} booking.start  - JS Date OR ISO string OR "YYYY-MM-DDTHH:MM"
 * @param {number} booking.durationMin
 * @param {string} booking.location
 * @param {string} booking.notes
 * @param {string} booking.brandName
 * @param {string} booking.bookingId
 */
export function buildBookingCalendar({ serviceName, barberName, start, durationMin, location, notes, brandName, bookingId }) {
  const startDate = start instanceof Date ? start : new Date(start);
  if (isNaN(startDate.getTime())) throw new Error("Invalid start date");

  const endDate = new Date(startDate.getTime() + durationMin * 60 * 1000);

  const title = `${serviceName} @ ${brandName}`;
  const details = [
    `Service: ${serviceName}`,
    `Barber: ${barberName || "Any available"}`,
    `Duration: ${durationMin} minutes`,
    bookingId ? `Booking ref: ${bookingId}` : null,
    notes ? `Notes: ${notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  /* ---- Google Calendar URL ---- */
  const gParams = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${toICSDate(startDate)}/${toICSDate(endDate)}`,
    details,
    location: location || "",
  });
  const googleUrl = `https://calendar.google.com/calendar/render?${gParams.toString()}`;

  /* ---- ICS file content ---- */
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Iron-Oaks//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${bookingId || crypto.randomUUID()}@iron-oaks`,
    `DTSTAMP:${toICSDate(new Date())}`,
    `DTSTART:${toICSDate(startDate)}`,
    `DTEND:${toICSDate(endDate)}`,
    `SUMMARY:${escapeICS(title)}`,
    `DESCRIPTION:${escapeICS(details)}`,
    `LOCATION:${escapeICS(location || "")}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return { googleUrl, ics, title, startDate, endDate, details };
}

function escapeICS(s = "") {
  return String(s)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

/** Trigger browser download of an .ics file */
export function downloadICS(filename, icsContent) {
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}