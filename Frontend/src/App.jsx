import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import * as Sentry from "@sentry/react";
import Homepage from "./pages/Homepage";
import Auth from "./pages/Auth";
const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

function App() {
  return (
    <>
      <SignedIn>
        <SentryRoutes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<Navigate to={"/"} replace />} />
        </SentryRoutes>
      </SignedIn>

      <SignedOut>
        <SentryRoutes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Navigate to={"/auth"} replace />} />
        </SentryRoutes>
      </SignedOut>
    </>
  );
}

export default App;
