
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Bell,
  Lock,
  Save,
  ArrowLeft
} from "lucide-react";

import StudentLayout from "../../components/StudentLayout";
import "../../styles/student/Settings.css";

const defaultNotifications = {
  email: true,
  matches: true,
  claims: true,
  updates: false
};

const defaultPrivacy = {
  profile: true,
  contact: false
};

function getSavedSettings(key, defaults) {
  try {
    const saved = localStorage.getItem(key);

    return saved
      ? { ...defaults, ...JSON.parse(saved) }
      : defaults;
  } catch {
    return defaults;
  }
}

function Settings() {
  const [notifications, setNotifications] = useState(() =>
    getSavedSettings("findit_student_notifications", defaultNotifications)
  );

  const [privacy, setPrivacy] = useState(() =>
    getSavedSettings("findit_student_privacy", defaultPrivacy)
  );

  const [password, setPassword] = useState({
    current: "",
    newPassword: "",
    confirm: ""
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const handleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));

    setMessage("");
  };

  const handlePrivacy = (key) => {
    setPrivacy((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));

    setMessage("");
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPassword((prev) => ({
      ...prev,
      [name]: value
    }));

    setMessage("");
  };

  // Save notification and privacy preferences
  const saveSettings = () => {
    try {
      localStorage.setItem(
        "findit_student_notifications",
        JSON.stringify(notifications)
      );

      localStorage.setItem(
        "findit_student_privacy",
        JSON.stringify(privacy)
      );

      setMessageType("success");
      setMessage("Your preferences have been saved successfully.");
    } catch {
      setMessageType("error");
      setMessage("Unable to save preferences. Please try again.");
    }
  };

  // Validate password form
  const changePassword = (e) => {
    e.preventDefault();

    if (!password.current) {
      setMessageType("error");
      setMessage("Please enter your current password.");
      return;
    }

    if (password.newPassword.length < 8) {
      setMessageType("error");
      setMessage("New password must contain at least 8 characters.");
      return;
    }

    if (password.newPassword !== password.confirm) {
      setMessageType("error");
      setMessage("New password and confirm password do not match.");
      return;
    }

    setMessageType("success");
    setMessage(
      "Password form validated. Backend connection is required to change your actual password."
    );

    setPassword({
      current: "",
      newPassword: "",
      confirm: ""
    });
  };

  return (
    <StudentLayout>
      <main className="settings-main">

        {/* PAGE HEADER */}
        <header className="settings-header">
          <Link to="/dashboard" className="settings-back">
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>

          <h1>Settings</h1>
          <p>Manage your account preferences and privacy.</p>
        </header>

        {/* FEEDBACK MESSAGE */}
        {message && (
          <div
            className={`settings-message ${
              messageType === "error" ? "error" : ""
            }`}
            role="status"
          >
            {message}

            <button
              type="button"
              onClick={() => setMessage("")}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
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

          {[
            {
              key: "email",
              title: "Email Notifications",
              desc: "Receive important updates through email."
            },
            {
              key: "matches",
              title: "Possible Matches",
              desc: "Get notified when a matching item is found."
            },
            {
              key: "claims",
              title: "Claim Updates",
              desc: "Receive updates about your item claims."
            },
            {
              key: "updates",
              title: "Platform Updates",
              desc: "Receive announcements and platform news."
            }
          ].map((option) => (
            <div className="settings-option" key={option.key}>

              <div>
                <h3>{option.title}</h3>
                <p>{option.desc}</p>
              </div>

              <button
                type="button"
                className={`settings-toggle ${
                  notifications[option.key] ? "on" : ""
                }`}
                onClick={() => handleNotification(option.key)}
                aria-label={`Toggle ${option.title}`}
                aria-pressed={notifications[option.key]}
              >
                <span />
              </button>

            </div>
          ))}

        </section>

        {/* PRIVACY SETTINGS */}
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

          {[
            {
              key: "profile",
              title: "Show My Profile",
              desc: "Allow other students to view your basic profile."
            },
            {
              key: "contact",
              title: "Share Contact Information",
              desc: "Allow your contact details to be shared when needed."
            }
          ].map((option) => (
            <div className="settings-option" key={option.key}>

              <div>
                <h3>{option.title}</h3>
                <p>{option.desc}</p>
              </div>

              <button
                type="button"
                className={`settings-toggle ${
                  privacy[option.key] ? "on" : ""
                }`}
                onClick={() => handlePrivacy(option.key)}
                aria-label={`Toggle ${option.title}`}
                aria-pressed={privacy[option.key]}
              >
                <span />
              </button>

            </div>
          ))}

          <button
            type="button"
            className="settings-save-btn"
            onClick={saveSettings}
          >
            <Save size={17} />
            Save Preferences
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

          <form
            className="password-form"
            onSubmit={changePassword}
          >

            <div className="settings-field">
              <label htmlFor="current-password">
                Current Password
              </label>

              <input
                id="current-password"
                type="password"
                name="current"
                value={password.current}
                onChange={handlePasswordChange}
                required
                placeholder="Enter current password"
              />
            </div>

            <div className="settings-field">
              <label htmlFor="new-password">
                New Password
              </label>

              <input
                id="new-password"
                type="password"
                name="newPassword"
                value={password.newPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Enter new password"
              />
            </div>

            <div className="settings-field">
              <label htmlFor="confirm-password">
                Confirm New Password
              </label>

              <input
                id="confirm-password"
                type="password"
                name="confirm"
                value={password.confirm}
                onChange={handlePasswordChange}
                required
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="submit"
              className="settings-save-btn"
            >
              <Lock size={17} />
              Update Password
            </button>

          </form>

        </section>

        {/* FOOTER */}
        <div className="settings-bottom">
          <p>FindIt. Student Account Settings</p>
          <span>Version 1.0</span>
        </div>

      </main>
    </StudentLayout>
  );
}

export default Settings;
