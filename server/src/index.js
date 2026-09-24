import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookings from "./routes/bookings.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      const ok =
        origin === "http://localhost:5173" ||
        /^https:\/\/iron-oaks(-[a-z0-9]+)*\.vercel\.app$/.test(origin) ||
        /^https:\/\/iron-oaks.*\.vercel\.app$/.test(origin);
      cb(ok ? null : new Error("CORS blocked"), ok);
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/", (_, res) => res.json({ service: "iron-oaks-api", status: "ok" }));
app.get("/api/health", (_, res) => res.json({ ok: true, service: "iron-oaks-api" }));

app.use("/api/bookings", bookings);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Iron-Oaks API running on http://localhost:${PORT}`);
});