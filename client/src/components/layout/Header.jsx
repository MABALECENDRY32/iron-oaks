import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { NAV_LINKS, BRAND } from "../../lib/constants";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/80 backdrop-blur">
      <nav className="container-x flex h-16 items-center justify-between">
      <Link to="/" className="flex items-center gap-2.5">
        <img src="/logo.svg" alt="Iron-Oaks" className="h-8 w-auto" />
      </Link> 

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? "text-accent" : "text-muted hover:text-ink"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link to="/booking" className="hidden md:inline-flex btn-primary text-sm py-2 px-4">
          Book Now
        </Link>

        <button
          className="md:hidden text-ink"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-line bg-base">
          <ul className="container-x flex flex-col py-4 gap-4">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block text-base font-medium ${isActive ? "text-accent" : "text-muted"}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <Link to="/booking" onClick={() => setOpen(false)} className="btn-primary w-full mt-2">
              Book Now
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
}