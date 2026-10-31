
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield, Bell, Lock, Save, ArrowLeft
} from "lucide-react";
import StudentLayout from "../../components/StudentLayout";
import "../../styles/student/Settings.css";

function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    matches: true,
    claims: true,
    updates: false
  });

  const [privacy, setPrivacy] = useState({
    profile: true,
    contact: false
  });

  const [password, setPassword] = useState({
    current: "",
    newPassword: "",
    confirm: ""
  });

  const [message, setMessage] = useState("");

  const handleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacy = (key) => {
    setPrivacy((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const saveSettings = () => {
    setMessage("Your settings have been saved.");
  };

  const changePassword = (e) => {
    e.preventDefault();

    if (password.newPassword.length < 8) {
      setMessage("New password must contain at least 8 characters.");
      return;
    }

    if (password.newPassword !== password.confirm) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    setMessage("Password change request completed in this demo.");
    setPassword({ current: "", newPassword: "", confirm: "" });
  };

  return (
    <StudentLayout>
      <main className="settings-main">

        <header className="settings-header">
          <Link to="/dashboard" className="settings-back">
            <ArrowLeft size={17} /> Back to Dashboard
          </Link>
          <h1>Settings</h1>
          <p>Manage your account preferences and privacy.</p>
        </header>

        {message && (
          <div className="settings-message">{message}</div>
        )}

        {/* NOTIFICATIONS */}
        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-heading-icon">
              <Bell />
            </div>
            <div>
              <h2>Notifications</h2>
              <p>Choose which notifications you want to receive.</p>
            </div>
          </div>

          <div className="settings-option">
            <div>
              <h3>Email Notifications</h3>
              <p>Receive important updates through email.</p>
            </div>
            <button
              type="button"
              className={`settings-toggle ${notifications.email ? "on" : ""}`}
              onClick={() => handleNotification("email")}
              aria-label="Toggle email notifications"
              aria-pressed={notifications.email}
            >
              <span />
            </button>
          </div>

          <div className="settings-option">
            <div>
              <h3>Possible Matches</h3>
              <p>Get notified when a matching item is found.</p>
            </div>
            <button
              type="button"
              className={`settings-toggle ${notifications.matches ? "on" : ""}`}
              onClick={() => handleNotification("matches")}
              aria-label="Toggle possible match notifications"
              aria-pressed={notifications.matches}
            >
              <span />
            </button>
          </div>

          <div className="settings-option">
            <div>
              <h3>Claim Updates</h3>
              <p>Receive updates about your item claims.</p>
            </div>
            <button
              type="button"
              className={`settings-toggle ${notifications.claims ? "on" : ""}`}
              onClick={() => handleNotification("claims")}
              aria-label="Toggle claim notifications"
              aria-pressed={notifications.claims}
            >
              <span />
            </button>
          </div>

          <div className="settings-option">
            <div>
              <h3>Platform Updates</h3>
              <p>Receive announcements and platform news.</p>
            </div>
            <button
              type="button"
              className={`settings-toggle ${notifications.updates ? "on" : ""}`}
              onClick={() => handleNotification("updates")}
              aria-label="Toggle platform notifications"
              aria-pressed={notifications.updates}
            >
              <span />
            </button>
          </div>
        </section>

        {/* PRIVACY */}
        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-heading-icon">
              <Shield />
            </div>
            <div>
              <h2>Privacy Settings</h2>
              <p>Control how your information is shared.</p>
            </div>
          </div>

          <div className="settings-option">
            <div>
              <h3>Show My Profile</h3>
              <p>Allow other students to view your basic profile.</p>
            </div>
            <button
              type="button"
              className={`settings-toggle ${privacy.profile ? "on" : ""}`}
              onClick={() => handlePrivacy("profile")}
              aria-label="Toggle profile visibility"
              aria-pressed={privacy.profile}
            >
              <span />
            </button>
          </div>

          <div className="settings-option">
            <div>
              <h3>Share Contact Information</h3>
              <p>Allow your contact details to be shared when needed.</p>
            </div>
            <button
              type="button"
              className={`settings-toggle ${privacy.contact ? "on" : ""}`}
              onClick={() => handlePrivacy("contact")}
              aria-label="Toggle contact sharing"
              aria-pressed={privacy.contact}
            >
              <span />
            </button>
          </div>

          <button
            className="settings-save-btn"
            onClick={saveSettings}
          >
            <Save size={17} /> Save Preferences
          </button>
        </section>

        {/* CHANGE PASSWORD */}
        <section className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-heading-icon">
              <Lock />
            </div>
            <div>
              <h2>Change Password</h2>
              <p>Keep your account secure with a strong password.</p>
            </div>
          </div>

          <form className="password-form" onSubmit={changePassword}>
            <div className="settings-field">
              <label>Current Password</label>
              <input
                type="password"
                name="current"
                value={password.current}
                onChange={handlePasswordChange}
                required
                placeholder="Enter current password"
              />
            </div>

            <div className="settings-field">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={password.newPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Enter new password"
              />
            </div>

            <div className="settings-field">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirm"
                value={password.confirm}
                onChange={handlePasswordChange}
                required
                placeholder="Confirm new password"
              />
            </div>

            <button type="submit" className="settings-save-btn">
              <Lock size={17} /> Update Password
            </button>
          </form>
        </section>

        <div className="settings-bottom">
          <p>FindIt. Student Account Settings</p>
          <span>Version 1.0</span>
        </div>

      </main>
    </StudentLayout>
  );
}

export default Settings;
