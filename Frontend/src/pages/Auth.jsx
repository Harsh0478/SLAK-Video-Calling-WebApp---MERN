import React from "react";
import "../styles/Auth.css";
import { SignInButton } from "@clerk/clerk-react";

function Auth() {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-hero">
          <div className="brand-container">
            <img src="/logo.png" className="brand-logo" alt="brand-logo" />
            <span className="brand-name">Slack</span>
          </div>

          <h1 className="hero-title">Slack is where work happens</h1>

          <p className="hero-subtitle">
            Millions of people around the world use Slack to connect their
            teams, unify their systems, and drive their business forward.
          </p>

          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">💬</span>
              <span className="feature-text">Real-Time Messaging</span>
            </div>

            <div className="feature-item">
              <span className="feature-icon">🎥</span>
              <span className="feature-text">Video Calls & Meetings</span>
            </div>

            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span className="feature-text">Secure & Private</span>
            </div>
          </div>

          <SignInButton mode="modal">
            <button className="cta-button">
              Sign In with Slack <span className="button-arrow">→</span>
            </button>
          </SignInButton>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-image-container">
          <img
            src="/auth-i.png"
            alt="Team collaboration"
            className="auth-image"
          />
          <div className="image-overlay"></div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
