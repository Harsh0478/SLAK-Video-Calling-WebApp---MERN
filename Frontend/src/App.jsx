import React from "react";
import { Routes, Route, Navigate } from "react-router";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

import Auth from "./pages/Auth";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <>
      <SignedIn>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<Navigate to={"/"} replace />} />
        </Routes>
      </SignedIn>

      <SignedOut>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Navigate to={"/auth"} replace />} />
        </Routes>
      </SignedOut>
    </>
  );
}

export default App;
