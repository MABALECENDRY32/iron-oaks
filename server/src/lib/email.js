import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "Iron-Oaks <onboarding@resend.dev>";

function escapeHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ------------ util: format booking to calendar bits ------------ */
const pad = (n) => String(n).padStart(2, "0");
function toICSDate(date) {
  return (
    date.getUTCFullYear() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    "T" +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    "00Z"
  );
}

function buildGoogleCalendarUrl(booking) {
  const start = new Date(`${booking.booking_date}T${booking.booking_time}:00`);
  const end = new Date(start.getTime() + booking.duration_min * 60 * 1000);

  const title = `${booking.service_name} @ ${process.env.BRAND_NAME}`;
  const details = [
    `Service: ${booking.service_name}`,
    `Barber: ${booking.barber_name || "Any available"}`,
    `Duration: ${booking.duration_min} min`,
    `Booking ref: ${booking.id}`,
  ].join("\n");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${toICSDate(start)}/${toICSDate(end)}`,
    details,
    location: process.env.BRAND_ADDRESS || "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/* ------------ notify shop owner ------------ */
export async function sendShopNotification(booking) {
  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;background:#0A0A0A;color:#FAFAFA;padding:32px;border-radius:12px;max-width:560px;">
      <h1 style="margin:0 0 4px;font-size:22px;">New booking 🔔</h1>
      <p style="color:#A1A1AA;margin:0 0 24px;font-size:14px;">A new appointment was booked online.</p>
      <table style="width:100%;font-size:14px;border-collapse:collapse;">
        <tr><td style="color:#A1A1AA;padding:6px 0;width:130px;">Name</td><td>${escapeHtml(booking.name)}</td></tr>
        <tr><td style="color:#A1A1AA;padding:6px 0;">Email</td><td>${escapeHtml(booking.email)}</td></tr>
        <tr><td style="color:#A1A1AA;padding:6px 0;">Phone</td><td>${escapeHtml(booking.phone)}</td></tr>
        <tr><td style="color:#A1A1AA;padding:6px 0;">Service</td><td>${escapeHtml(booking.service_name)} (R${booking.service_price})</td></tr>
        <tr><td style="color:#A1A1AA;padding:6px 0;">Barber</td><td>${escapeHtml(booking.barber_name || "Any available")}</td></tr>
        <tr><td style="color:#A1A1AA;padding:6px 0;">When</td><td>${booking.booking_date} at ${booking.booking_time}</td></tr>
      </table>
      ${booking.notes ? `<div style="margin-top:20px;padding-top:20px;border-top:1px solid #262626;"><div style="color:#A1A1AA;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;">Notes</div><div>${escapeHtml(booking.notes)}</div></div>` : ""}
      <p style="margin-top:32px;color:#666;font-size:12px;">Booking ID: ${booking.id}</p>
    </div>
  `;
  return resend.emails.send({
    from: FROM,
    to: process.env.NOTIFY_EMAIL,
    replyTo: booking.email,
    subject: `New booking · ${booking.service_name} · ${booking.booking_date} ${booking.booking_time}`,
    html,
  });
}

/* ------------ confirm to customer ------------ */
export async function sendCustomerConfirmation(booking) {
  const gcalUrl = buildGoogleCalendarUrl(booking);
  const html = `
    <div style="font-family:Inter,system-ui,sans-serif;background:#0A0A0A;color:#FAFAFA;padding:32px;border-radius:12px;max-width:560px;">
      <h1 style="margin:0 0 4px;font-size:22px;">Booking confirmed ✓</h1>
      <p style="color:#A1A1AA;margin:0 0 24px;font-size:14px;">Thanks ${escapeHtml(booking.name)} — your chair is reserved.</p>
      <table style="width:100%;font-size:14px;border-collapse:collapse;">
        <tr><td style="color:#A1A1AA;padding:6px 0;width:130px;">Service</td><td>${escapeHtml(booking.service_name)} (R${booking.service_price})</td></tr>
        <tr><td style="color:#A1A1AA;padding:6px 0;">Barber</td><td>${escapeHtml(booking.barber_name || "Any available")}</td></tr>
        <tr><td style="color:#A1A1AA;padding:6px 0;">When</td><td>${booking.booking_date} at ${booking.booking_time}</td></tr>
        <tr><td style="color:#A1A1AA;padding:6px 0;">Where</td><td>${escapeHtml(process.env.BRAND_ADDRESS || "")}</td></tr>
        <tr><td style="color:#A1A1AA;padding:6px 0;">Ref</td><td>${booking.id}</td></tr>
      </table>
      <div style="margin-top:24px;">
        <a href="${gcalUrl}" style="display:inline-block;background:#F59E0B;color:#0A0A0A;padding:12px 20px;border-radius:8px;font-weight:600;text-decoration:none;">Add to Google Calendar</a>
      </div>
      <p style="margin-top:24px;color:#A1A1AA;font-size:13px;">If you need to cancel or reschedule, reply to this email or call us at ${escapeHtml(process.env.BRAND_PHONE || "")}.</p>
      <p style="margin-top:32px;color:#666;font-size:12px;">${escapeHtml(process.env.BRAND_NAME || "")} · ${escapeHtml(process.env.BRAND_ADDRESS || "")}</p>
    </div>
  `;
  return resend.emails.send({
    from: FROM,
    to: booking.email,
    replyTo: process.env.BRAND_EMAIL,
    subject: `Booking confirmed · ${booking.service_name} · ${booking.booking_date} ${booking.booking_time}`,
    html,
  });
}