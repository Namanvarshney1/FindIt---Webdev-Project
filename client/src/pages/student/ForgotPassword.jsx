
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, CheckCircle, KeyRound } from "lucide-react";
import "../../styles/student/ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your registered email address.");
      return;
    }

    setSubmitted(true);
    setMessage("Password reset functionality will be available after backend integration.");
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">

        <Link to="/login" className="forgot-back-link">
          <ArrowLeft size={17} /> Back to Login
        </Link>

        <div className="forgot-brand">
          Find<span>It.</span>
        </div>

        <div className="forgot-icon">
          {submitted ? <CheckCircle size={28} /> : <KeyRound size={28} />}
        </div>

        <h1>{submitted ? "Request Received" : "Forgot Password?"}</h1>

        <p className="forgot-description">
          {submitted
            ? "Your request has been recorded in this demo."
            : "Enter your registered college email address to reset your password."}
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="forgot-email">College Email Address</label>

            <div className="forgot-input-wrapper">
              <Mail size={18} />
              <input
                id="forgot-email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage("");
                }}
                required
              />
            </div>

            <button type="submit" className="forgot-submit-btn">
              Send Reset Link
            </button>
          </form>
        ) : (
          <button
            className="forgot-submit-btn"
            onClick={() => {
              setSubmitted(false);
              setEmail("");
              setMessage("");
            }}
          >
            Try Another Email
          </button>
        )}

        {message && (
          <div className="forgot-message">
            {message}
          </div>
        )}

        <div className="forgot-login-link">
          Remember your password? <Link to="/login">Login</Link>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;
