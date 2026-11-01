
import { useState } from "react";
import {
  Lock,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Save,
  CheckCircle
} from "lucide-react";

import AdminLayout from "../../components/AdminLayout";
import "../../styles/admin/AdminSettings.css";

function AdminSettings() {
  const [notifications, setNotifications] = useState({
    newReports: true,
    newClaims: true,
    newStudents: false,
    weeklySummary: true
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPasswords, setShowPasswords] = useState(false);
  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState("success");

  const updateSecurity = (e) => {
    const { name, value } = e.target;

    setSecurity(prev => ({
      ...prev,
      [name]: value
    }));

    setMessage("");
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const saveNotifications = () => {
    setMessageType("success");
    setMessage("Notification preferences saved successfully.");
  };

  const changePassword = (e) => {
    e.preventDefault();

    if (
      !security.currentPassword ||
      !security.newPassword ||
      !security.confirmPassword
    ) {
      setMessageType("error");
      setMessage("Please fill in all password fields.");
      return;
    }

    if (security.newPassword.length < 8) {
      setMessageType("error");
      setMessage("New password must contain at least 8 characters.");
      return;
    }

    if (security.newPassword !== security.confirmPassword) {
      setMessageType("error");
      setMessage("New passwords do not match.");
      return;
    }

    setMessageType("success");

    setMessage(
      "Password form validated. Backend connection is required to change your actual password."
    );

    setSecurity({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  return (
    <AdminLayout>
      <main className="admin-settings-main">

        {/* Page Header */}
        <header className="admin-settings-header">
          <div>
            <span>ADMINISTRATION</span>
            <h1>Settings</h1>
            <p>Manage your administrator preferences and security.</p>
          </div>
        </header>

        {/* Notification Message */}
        {message && (
          <div
            className={`admin-settings-message ${
              messageType === "error" ? "error" : ""
            }`}
            role="status"
          >
            {messageType === "success" ? (
              <CheckCircle size={17} />
            ) : (
              <Shield size={17} />
            )}

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

        {/* PASSWORD SETTINGS */}
        <section className="admin-settings-card">

          <div className="admin-settings-card-heading">
            <div className="admin-settings-icon">
              <Lock />
            </div>

            <div>
              <h2>Change Password</h2>
              <p>Keep your administrator account secure.</p>
            </div>
          </div>

          <form onSubmit={changePassword}>

            {[
              {
                name: "currentPassword",
                label: "Current Password"
              },
              {
                name: "newPassword",
                label: "New Password"
              },
              {
                name: "confirmPassword",
                label: "Confirm New Password"
              }
            ].map(field => (
              <label
                className="admin-settings-password-field"
                key={field.name}
              >
                {field.label}

                <div className="admin-settings-password-input">

                  <input
                    type={showPasswords ? "text" : "password"}
                    name={field.name}
                    value={security[field.name]}
                    onChange={updateSecurity}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords(!showPasswords)
                    }
                    aria-label="Toggle password visibility"
                  >
                    {showPasswords ? <EyeOff /> : <Eye />}
                  </button>

                </div>
              </label>
            ))}

            <button
              className="admin-settings-save"
              type="submit"
            >
              <Lock size={16} />
              Update Password
            </button>

          </form>
        </section>

        {/* NOTIFICATION SETTINGS */}
        <section className="admin-settings-card">

          <div className="admin-settings-card-heading">
            <div className="admin-settings-icon">
              <Bell />
            </div>

            <div>
              <h2>Notification Preferences</h2>
              <p>Choose which platform updates you want to receive.</p>
            </div>
          </div>

          <div className="admin-settings-options">

            {[
              {
                key: "newReports",
                title: "New Reports",
                desc: "When a student submits a lost or found report."
              },
              {
                key: "newClaims",
                title: "New Claims",
                desc: "When a student submits an item claim."
              },
              {
                key: "newStudents",
                title: "New Student Registrations",
                desc: "When a new student creates an account."
              },
              {
                key: "weeklySummary",
                title: "Weekly Summary",
                desc: "Receive a weekly platform activity summary."
              }
            ].map(option => (
              <div
                className="admin-settings-option"
                key={option.key}
              >

                <div>
                  <h3>{option.title}</h3>
                  <p>{option.desc}</p>
                </div>

                <button
                  type="button"
                  className={`admin-settings-toggle ${
                    notifications[option.key] ? "enabled" : ""
                  }`}
                  onClick={() => toggleNotification(option.key)}
                  aria-label={`Toggle ${option.title}`}
                  aria-pressed={notifications[option.key]}
                >
                  <span />
                </button>

              </div>
            ))}

          </div>

          <button
            type="button"
            className="admin-settings-save"
            onClick={saveNotifications}
          >
            <Save size={16} />
            Save Preferences
          </button>

        </section>

        {/* SECURITY INFORMATION */}
        <section className="admin-settings-card">

          <div className="admin-settings-card-heading">
            <div className="admin-settings-icon">
              <Shield />
            </div>

            <div>
              <h2>Security Information</h2>
              <p>Basic information about administrator access.</p>
            </div>
          </div>

          <div className="admin-settings-security-info">

            <div>
              <span>Account Type</span>
              <strong>Administrator</strong>
            </div>

            <div>
              <span>Access Level</span>
              <strong>Full Platform Access</strong>
            </div>

            <div>
              <span>Authentication</span>
              <strong>Frontend Demo</strong>
            </div>

          </div>

        </section>

        {/* Footer */}
        <footer className="admin-settings-footer">
          FindIt. Administration Panel
          <span>Version 1.0</span>
        </footer>

      </main>
    </AdminLayout>
  );
}

export default AdminSettings;
