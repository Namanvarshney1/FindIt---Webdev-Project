
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import "../../styles/admin/AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    // Temporary frontend demo login.
    // Real admin authentication will be connected to the backend.
    if (
      email === "admin@findit.com" &&
      password === "Admin@123"
    ) {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid admin credentials. Please try again.");
    }
  };

  return (
    <div className="admin-login-page">
      <Link to="/" className="admin-login-back">
        <ArrowLeft size={17} /> Back to Home
      </Link>

      <div className="admin-login-card">
        <div className="admin-login-icon">
          <ShieldCheck size={32} />
        </div>

        <div className="admin-login-heading">
          <span>FINDIT ADMINISTRATION</span>
          <h1>Admin Login</h1>
          <p>Sign in to manage your campus lost and found platform.</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="admin-login-field">
            <label>Admin Email</label>
            <div className="admin-login-input">
              <Mail size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                required
              />
            </div>
          </div>

          <div className="admin-login-field">
            <label>Password</label>
            <div className="admin-login-input">
              <Lock size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />

              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="admin-login-error">{error}</p>}

          <button type="submit" className="admin-login-button">
            Sign In to Admin Panel
          </button>
        </form>

        <div className="admin-login-security">
          <ShieldCheck size={16} />
          <span>Restricted access for authorised administrators only.</span>
        </div>

        <div className="admin-login-footer">
          FindIt. Campus Lost & Found Platform
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
