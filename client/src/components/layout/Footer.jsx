import { Link } from "react-router-dom";
import { NAV_LINKS, BRAND, HOURS, SOCIALS } from "../../lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-elevated">
      <div className="container-x py-16 grid gap-12 md:grid-cols-4">
        <div>
          <Link to="/" className="text-lg font-black tracking-tight">
            IRON<span className="text-accent">-</span>OAKS
          </Link>
          <p className="mt-4 text-sm text-muted max-w-xs">
            {BRAND.tagline}
          </p>
          <div className="mt-6 flex gap-4 text-sm">
            <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" className="text-muted hover:text-accent">Instagram</a>
            <a href={SOCIALS.facebook} target="_blank" rel="noreferrer" className="text-muted hover:text-accent">Facebook</a>
            <a href={SOCIALS.tiktok} target="_blank" rel="noreferrer" className="text-muted hover:text-accent">TikTok</a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">Navigate</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-accent">{l.label}</Link></li>
            ))}
            <li><Link to="/terms" className="hover:text-accent">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">Visit</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>{BRAND.address}</li>
            <li><a href={`tel:${BRAND.phone}`} className="hover:text-accent">{BRAND.phone}</a></li>
            <li><a href={`mailto:${BRAND.email}`} className="hover:text-accent">{BRAND.email}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">Hours</h4>
          <ul className="mt-4 space-y-1 text-sm text-muted">
            {HOURS.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x py-6 text-xs text-muted flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
          <Link to="/terms" className="hover:text-accent">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}