import express from "express";
import { supabase } from "../lib/supabase.js";
import { sendShopNotification, sendCustomerConfirmation } from "../lib/email.js";

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function validate(body) {
  const errors = [];
  const {
    serviceId, serviceName, servicePrice, durationMin,
    barberId, barberName,
    date, time,
    name = "", email = "", phone = "", notes = "",
  } = body;

  if (!serviceId || !serviceName) errors.push("Service is required");
  if (!Number.isFinite(servicePrice)) errors.push("Service price is required");
  if (!Number.isFinite(durationMin)) errors.push("Service duration is required");
  if (!barberId) errors.push("Barber selection is required");
  if (!DATE_RE.test(date || "")) errors.push("Date must be YYYY-MM-DD");
  if (!TIME_RE.test(time || "")) errors.push("Time must be HH:MM");
  if (!name.trim() || name.trim().length < 2) errors.push("Name is required");
  if (!EMAIL_RE.test(email)) errors.push("Valid email is required");
  if (!phone.trim() || phone.trim().length < 6) errors.push("Phone is required");

  // Date must not be in the past
  if (DATE_RE.test(date || "")) {
    const d = new Date(`${date}T${time || "00:00"}:00`);
    if (d.getTime() < Date.now() - 60_000) errors.push("Booking must be in the future");
  }

  return {
    errors,
    clean: {
      service_id: serviceId,
      service_name: serviceName,
      service_price: servicePrice,
      duration_min: durationMin,
      barber_id: barberId,
      barber_name: barberName || null,
      booking_date: date,
      booking_time: time,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      notes: notes.trim() || null,
    },
  };
}

/* ---------- POST /api/bookings ---------- */
router.post("/", async (req, res, next) => {
  try {
    const { errors, clean } = validate(req.body);
    if (errors.length) return res.status(400).json({ errors });

    // Optional: block double-booking the same barber at the same date/time
    if (clean.barber_id !== "any") {
      const { data: clash } = await supabase
        .from("bookings")
        .select("id")
        .eq("barber_id", clean.barber_id)
        .eq("booking_date", clean.booking_date)
        .eq("booking_time", clean.booking_time)
        .eq("status", "confirmed")
        .maybeSingle();

      if (clash) {
        return res.status(409).json({ errors: ["That slot is already taken. Please pick another time."] });
      }
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert(clean)
      .select("*")
      .single();

    if (error) throw error;

    // Fire and forget — emails shouldn't block the response
    sendShopNotification(data).catch((e) => console.error("[notify shop]", e.message));
    sendCustomerConfirmation(data).catch((e) => console.error("[notify customer]", e.message));

    res.status(201).json({ ok: true, id: data.id });
  } catch (err) {
    next(err);
  }
});

/* ---------- GET /api/bookings (admin — protect later) ---------- */
router.get("/", async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("booking_date", { ascending: true })
      .order("booking_time", { ascending: true });

    if (error) throw error;
    res.json({ count: data.length, bookings: data });
  } catch (err) {
    next(err);
  }
});

export default router;