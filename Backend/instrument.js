import * as Sentry from "@sentry/node";
import dotenv from "dotenv";

dotenv.config();

Sentry.init({
  dsn: process.env.SENTRY_DSN,   // ✅ fixed typo
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  environment: process.env.NODE_ENV || "development",
  includeLocalVariables: true,

  // Sends user info like IP (optional)
  sendDefaultPii: true,
});
