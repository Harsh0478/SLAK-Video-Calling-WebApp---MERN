import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import * as Sentry from "@sentry/react";
import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router";

import { Toaster } from "react-hot-toast";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./providers/AuthProvider.jsx";

const queryClient = new QueryClient();

Sentry.init({
  dsn: "https://dbd5745ef26083b4566cec1d0816c4d6@o4510878971068416.ingest.de.sentry.io/4510894495432784",
  integrations: [
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  tracesSampleRate: 1.0,
});

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AuthProvider>
        <BrowserRouter>
          {/* ✅ pass instance */}
          <QueryClientProvider client={queryClient}>
            <App />
            <Toaster position="top-right" />
          </QueryClientProvider>
        </BrowserRouter>
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>,
);
