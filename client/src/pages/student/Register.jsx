
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Package } from "lucide-react";
import "../../styles/student/Auth.css";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    studentId: "",
    department: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(
      "Registration UI is ready. Backend integration will be added next."
    );
  };

  return (
    <div className="auth-page">

      {/* NAVBAR */}
      <header className="auth-navbar">

        <Link to="/" className="auth-logo">
          <Package size={27} />
          <span>
            FindIt<span className="auth-logo-dot">.</span>
          </span>
        </Link>

        <Link to="/" className="back-link">
          Back to Home
        </Link>

      </header>

      <main className="auth-container register-container">

        {/* REGISTRATION FORM */}
        <div className="auth-form-section">

          <span className="eyebrow">
            JOIN YOUR CAMPUS COMMUNITY
          </span>

          <h1>Create your account.</h1>

          <p className="auth-subtitle">
            Register to report and recover belongings on campus.
          </p>

          <form onSubmit={handleSubmit}>

            <label htmlFor="register-name">
              Full Name
            </label>

            <input
              id="register-name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="register-email">
              College Email
            </label>

            <input
              id="register-email"
              name="email"
              type="email"
              placeholder="you@college.edu"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="register-student-id">
              Student ID
            </label>

            <input
              id="register-student-id"
              name="studentId"
              type="text"
              placeholder="Enter your student ID"
              value={form.studentId}
              onChange={handleChange}
              required
            />

            <label htmlFor="register-department">
              Department
            </label>

            <select
              id="register-department"
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            >
              <option value="">Select department</option>
              <option value="CSE">Computer Science</option>
              <option value="IT">Information Technology</option>
              <option value="ECE">Electronics</option>
              <option value="ME">Mechanical</option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="register-password">
              Password
            </label>

            <div className="password-field">

              <input
                id="register-password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 8 characters"
                value={form.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

            <label htmlFor="register-confirm-password">
              Confirm Password
            </label>

            <input
              id="register-confirm-password"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

            {/* VALIDATION MESSAGE */}
            {error && (
              <p className="auth-message error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="auth-submit">
              Create Account
              <ArrowRight size={17} />
            </button>

          </form>

          <p className="auth-switch">
            Already registered?
            <Link to="/login"> Sign in</Link>
          </p>

        </div>

        {/* RIGHT SIDE PANEL */}
        <div className="auth-side">

          <div>

            <span className="eyebrow">
              WELCOME TO FINDIT
            </span>

            <h2>
              Your campus.
              <br />
              Your community.
              <br />
              Your belongings.
            </h2>

            <p>
              Be part of a community that helps students
              find what they've lost.
            </p>

          </div>

          <span className="auth-side-footer">
            FindIt · Campus Lost & Found
          </span>

        </div>

      </main>

    </div>
  );
}
