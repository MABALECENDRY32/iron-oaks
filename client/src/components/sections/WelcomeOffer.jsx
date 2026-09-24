import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../ui/Modal";

const STORAGE_KEY = "iron-oaks-offer-seen";

export default function WelcomeOffer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="text-center">
        <div className="eyebrow">First visit</div>
        <h3 className="mt-3 text-3xl font-black">20% off your first cut</h3>
        <p className="mt-3 text-muted">
          New to Iron-Oaks? Your first visit is on the house — 20% off any service.
          Just book online and mention <span className="text-accent font-semibold">FIRST20</span>.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link to="/booking" onClick={() => setOpen(false)} className="btn-primary w-full">
            Book now
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-sm text-muted hover:text-accent"
          >
            No thanks
          </button>
        </div>
      </div>
    </Modal>
  );
}