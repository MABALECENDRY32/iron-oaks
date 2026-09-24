import SectionHeading from "../components/ui/SectionHeading";
import { BRAND } from "../lib/constants";

export default function Terms() {
  return (
    <section className="section">
      <div className="container-x max-w-3xl">
        <SectionHeading eyebrow="Legal" title="Terms & Conditions" />
        <p className="mt-6 text-sm text-muted">Last updated: {new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}</p>

        <div className="mt-10 space-y-8 text-muted leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-ink">1. About these terms</h2>
            <p className="mt-3">
              These Terms & Conditions govern your use of the {BRAND.name} website and any
              services booked through it. By making a booking or using the site, you agree to
              be bound by these terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">2. Bookings</h2>
            <p className="mt-3">
              Bookings made through this website are subject to availability and confirmation.
              When you submit a booking, you will receive an on-screen confirmation and the
              option to add the appointment to your calendar. A booking is only guaranteed once
              confirmed by our team.
            </p>
            <p className="mt-3">
              You are responsible for ensuring that the contact details you provide (name, email,
              phone) are accurate so we can reach you if needed.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">3. Cancellations & late arrivals</h2>
            <p className="mt-3">
              We ask for at least 4 hours notice if you need to cancel or reschedule. Late
              cancellations or repeated no-shows may affect your ability to book future
              appointments.
            </p>
            <p className="mt-3">
              If you arrive more than 15 minutes late, we may not be able to complete your
              full service or may need to reschedule to avoid delaying other clients.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">4. Pricing & payment</h2>
            <p className="mt-3">
              Prices displayed on the website are in South African Rand and are subject to
              change without notice. Payment is due in full at the time of service. We accept
              card and cash.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">5. Services</h2>
            <p className="mt-3">
              All services are performed by trained barbers using professional products. If you
              have a scalp condition, allergy, or skin sensitivity, please tell your barber
              before your service begins.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">6. Website use</h2>
            <p className="mt-3">
              You may use this website for lawful purposes only. You may not attempt to disrupt,
              scrape, or misuse the site. All content — including text, images, and branding —
              is the property of {BRAND.name} unless otherwise stated.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">7. Privacy</h2>
            <p className="mt-3">
              We collect only the information necessary to process your booking (name, email,
              phone, and appointment details). This information is stored securely and is not
              shared with third parties for marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">8. Changes to these terms</h2>
            <p className="mt-3">
              We may update these terms from time to time. Any changes take effect once posted
              on this page. Continued use of the site constitutes acceptance of the updated
              terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">9. Contact</h2>
            <p className="mt-3">
              Questions about these terms? Email us at{" "}
              <a href={`mailto:${BRAND.email}`} className="text-accent hover:underline">
                {BRAND.email}
              </a>{" "}
              or call{" "}
              <a href={`tel:${BRAND.phone}`} className="text-accent hover:underline">
                {BRAND.phone}
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}