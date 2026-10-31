
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import "../../styles/student/Auth.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setError("Login UI is ready. Backend authentication will be connected next.");
  };

  return (
    <div className="auth-page">

      <header className="auth-navbar">
        <Link to="/" className="logo">
          find<span>it.</span>
        </Link>

        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </header>

      <main className="auth-container">

        <div className="auth-form-section">

          <span className="eyebrow">WELCOME BACK</span>

          <h1>Good to see you again.</h1>

          <p className="auth-subtitle">
            Sign in to manage your reports and find your belongings.
          </p>

          <form onSubmit={handleSubmit}>

            <label>College Email</label>

            <input
              type="email"
              placeholder="you@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="auth-options">
              <label className="remember-option">
                <input type="checkbox" />
                Remember me
              </label>

              <Link to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            {error && <p className="auth-message">{error}</p>}

            <button type="submit" className="auth-submit">
              Sign In <ArrowRight size={17} />
            </button>

          </form>

          <p className="auth-switch">
            Don't have an account?
            <Link to="/register"> Create account</Link>
          </p>

        </div>

        <div className="auth-side">

          <div>
            <span className="eyebrow">FINDIT · YOUR CAMPUS COMMUNITY</span>

            <h2>
              Every lost item
              <br />
              deserves a way
              <br />
              back home.
            </h2>

            <p>
              Report missing belongings, discover found items
              and reconnect with what matters.
            </p>
          </div>

          <span className="auth-side-footer">
            A little help goes a long way.
          </span>

        </div>

      </main>

    </div>
  );
}
