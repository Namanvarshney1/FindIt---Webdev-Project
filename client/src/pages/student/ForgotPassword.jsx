
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, KeyRound, Mail, Package } from "lucide-react";
import "../../styles/student/ForgotPassword.css";
import "../../styles/student/Auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!email.trim()) {
      setMessage("Please enter your college email address.");
      setMessageType("error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    setMessage("Password reset will be available after backend integration.");
    setMessageType("info");
  };

  const clearMessage = () => {
    setMessage("");
    setMessageType("");
  };

  return (
    <div className="forgot-page">

      <div className="forgot-card">

        {/* BACK TO LOGIN */}
        <Link to="/login" className="forgot-back">
          <ArrowLeft size={16} />
          Back to Login
        </Link>

        {/* FINDIT LOGO */}
        <Link to="/" className="forgot-logo">
          <Package size={25} />
          <span>
            FindIt<span className="forgot-logo-dot">.</span>
          </span>
        </Link>

        {/* ICON */}
        <div className="forgot-icon">
          <KeyRound size={27} />
        </div>

        {/* HEADING */}
        <h1>Forgot Password?</h1>

        <p className="forgot-description">
          Enter your registered college email address to reset your
          password.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} noValidate>

          <label htmlFor="forgot-email">
            College Email Address
          </label>

          <div className="forgot-input">
            <Mail size={18} />

            <input
              id="forgot-email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearMessage();
              }}
              autoComplete="email"
            />
          </div>

          {/* VALIDATION MESSAGE */}
          {message && (
            <div
              className={`auth-message ${messageType}`}
              role="alert"
            >
              {message}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button type="submit" className="forgot-submit">
            Send Reset Link
          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="forgot-footer">
          Remember your password?
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </div>
  );
}
