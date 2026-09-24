export const BRAND = {
  name: "Iron-Oaks",
  tagline: "Sharp cuts. Timeless craft.",
  phone: "+27 21 555 0123",
  email: "hello@iron-oaks.co.za",
  address: "127 Kloof Street, Gardens, Cape Town, 8001",
  mapsUrl: "https://maps.google.com/?q=127+Kloof+Street+Cape+Town",
};

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/booking", label: "Booking" },
];

export const HOURS = [
  { day: "Monday",     time: "Closed" },
  { day: "Tuesday",    time: "09:00 – 18:00" },
  { day: "Wednesday",  time: "09:00 – 18:00" },
  { day: "Thursday",   time: "09:00 – 20:00" },
  { day: "Friday",     time: "09:00 – 20:00" },
  { day: "Saturday",   time: "08:00 – 17:00" },
  { day: "Sunday",     time: "10:00 – 14:00" },
];

export const SOCIALS = {
  instagram: "https://instagram.com/ironoaks",
  facebook: "https://facebook.com/ironoaks",
  tiktok: "https://tiktok.com/@ironoaks",
};

export const SERVICES = [
  { id: "signature-cut",   name: "Signature Cut",     price: 220, duration: 45, desc: "Consultation, precision cut, hot towel finish and style." },
  { id: "skin-fade",       name: "Skin Fade",         price: 180, duration: 40, desc: "Sharp fade down to the skin, blended clean." },
  { id: "beard-trim",      name: "Beard Trim & Shape",price: 120, duration: 30, desc: "Sculpted, lined and conditioned beard." },
  { id: "cut-beard",       name: "Cut & Beard Combo", price: 300, duration: 60, desc: "Our signature cut paired with a full beard groom." },
  { id: "kids-cut",        name: "Kids Cut (u/12)",   price: 130, duration: 30, desc: "Patient, friendly cuts for the young gentlemen." },
  { id: "hot-shave",       name: "Traditional Hot Shave", price: 160, duration: 40, desc: "Straight razor shave with hot towels and balm." },
];

export const BARBERS = [
  {
    id: "any",
    name: "Any Available",
    role: "First available barber",
    bio: "We'll match you with the next available barber.",
    photo: null,
  },
  {
    id: "marcus",
    name: "Marcus Reid",
    role: "Master Barber · Owner",
    bio: "15 years behind the chair. Known for crisp skin fades and classic scissor work.",
    photo: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80",
  },
  {
    id: "siya",
    name: "Siya Ndlovu",
    role: "Senior Barber",
    bio: "Specialises in textured crops, afro shaping and beard sculpting.",
    photo: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80",
  },
  {
    id: "daniel",
    name: "Daniel Fourie",
    role: "Barber",
    bio: "Precision fades, modern styling, and a killer playlist.",
    photo: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=600&q=80",
  },
];

export const TIME_SLOTS = [
  "09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","12:30","13:00","13:30","14:00","14:30",
  "15:00","15:30","16:00","16:30","17:00","17:30",
];