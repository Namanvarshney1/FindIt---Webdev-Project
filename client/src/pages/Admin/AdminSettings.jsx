
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Package, ShieldCheck, Users, BarChart3,
  Settings, LogOut, User, Lock, Bell, Shield, Eye, EyeOff,
  Save, CheckCircle
} from "lucide-react";
import "../../styles/admin/AdminSettings.css";

function AdminSettings() {
  const [profile, setProfile] = useState({
    name: "Administrator",
    email: "admin@findit.com",
    phone: ""
  });

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

  const updateProfile = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const updateSecurity = (e) => {
    const { name, value } = e.target;
    setSecurity(prev => ({ ...prev, [name]: value }));
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const saveProfile = (e) => {
    e.preventDefault();
    setMessage("Profile settings saved successfully.");
  };

  const saveNotifications = () => {
    setMessage("Notification preferences saved successfully.");
  };

  const changePassword = (e) => {
    e.preventDefault();

    if (!security.currentPassword || !security.newPassword || !security.confirmPassword) {
      setMessage("Please fill in all password fields.");
      return;
    }

    if (security.newPassword.length < 8) {
      setMessage("New password must contain at least 8 characters.");
      return;
    }

    if (security.newPassword !== security.confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    setMessage("Password form validated. Backend connection is required to change your actual password.");

    setSecurity({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  return (
    <div className="admin-settings-layout">

      <aside className="admin-settings-sidebar">
        <div className="admin-settings-brand">Find<span>It.</span></div>

        <div className="admin-settings-user">
          <div className="admin-settings-avatar">A</div>
          <div>
            <h3>Administrator</h3>
            <p>Admin Account</p>
          </div>
        </div>

        <div className="admin-settings-label">MAIN MENU</div>

        <nav className="admin-settings-nav">
          <Link to="/admin/dashboard"><LayoutDashboard /> Overview</Link>
          <Link to="/admin/items"><Package /> Manage Items</Link>
          <Link to="/admin/claims"><ShieldCheck /> Manage Claims</Link>
          <Link to="/admin/users"><Users /> Students</Link>
          <Link to="/admin/analytics"><BarChart3 /> Analytics</Link>
          <Link to="/admin/settings" className="active"><Settings /> Settings</Link>
        </nav>

        <Link to="/" className="admin-settings-logout">
          <LogOut /> Back to Home
        </Link>
      </aside>

      <main className="admin-settings-main">

        <header className="admin-settings-header">
          <div>
            <span>ADMINISTRATION</span>
            <h1>Settings</h1>
            <p>Manage your administrator account and preferences.</p>
          </div>
        </header>

        {message && (
          <div className="admin-settings-message">
            <CheckCircle size={17} />
            {message}
            <button onClick={() => setMessage("")} aria-label="Dismiss message">×</button>
          </div>
        )}

        {/* PROFILE SETTINGS */}
        <section className="admin-settings-card">
          <div className="admin-settings-card-heading">
            <div className="admin-settings-icon"><User /></div>
            <div>
              <h2>Administrator Profile</h2>
              <p>Update your account information.</p>
            </div>
          </div>

          <form onSubmit={saveProfile}>
            <div className="admin-settings-form-grid">
              <label>
                Full Name
                <input
                  name="name"
                  value={profile.name}
                  onChange={updateProfile}
                  required
                />
              </label>

              <label>
                Email Address
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={updateProfile}
                  required
                />
              </label>

              <label>
                Phone Number
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={updateProfile}
                  placeholder="Enter phone number"
                />
              </label>

              <label>
                Account Role
                <input value="Administrator" disabled />
              </label>
            </div>

            <button className="admin-settings-save" type="submit">
              <Save size={16} /> Save Profile
            </button>
          </form>
        </section>

        {/* PASSWORD SETTINGS */}
        <section className="admin-settings-card">
          <div className="admin-settings-card-heading">
            <div className="admin-settings-icon"><Lock /></div>
            <div>
              <h2>Change Password</h2>
              <p>Keep your administrator account secure.</p>
            </div>
          </div>

          <form onSubmit={changePassword}>
            {[
              { name: "currentPassword", label: "Current Password" },
              { name: "newPassword", label: "New Password" },
              { name: "confirmPassword", label: "Confirm New Password" }
            ].map(field => (
              <label className="admin-settings-password-field" key={field.name}>
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
                    onClick={() => setShowPasswords(!showPasswords)}
                    aria-label="Toggle password visibility"
                  >
                    {showPasswords ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </label>
            ))}

            <button className="admin-settings-save" type="submit">
              <Lock size={16} /> Update Password
            </button>
          </form>
        </section>

        {/* NOTIFICATION SETTINGS */}
        <section className="admin-settings-card">
          <div className="admin-settings-card-heading">
            <div className="admin-settings-icon"><Bell /></div>
            <div>
              <h2>Notification Preferences</h2>
              <p>Choose which platform updates you want to receive.</p>
            </div>
          </div>

          <div className="admin-settings-options">
            {[
              { key: "newReports", title: "New Reports", desc: "When a student submits a lost or found report." },
              { key: "newClaims", title: "New Claims", desc: "When a student submits an item claim." },
              { key: "newStudents", title: "New Student Registrations", desc: "When a new student creates an account." },
              { key: "weeklySummary", title: "Weekly Summary", desc: "Receive a weekly platform activity summary." }
            ].map(option => (
              <div className="admin-settings-option" key={option.key}>
                <div>
                  <h3>{option.title}</h3>
                  <p>{option.desc}</p>
                </div>

                <button
                  type="button"
                  className={`admin-settings-toggle ${notifications[option.key] ? "enabled" : ""}`}
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
            className="admin-settings-save"
            onClick={saveNotifications}
          >
            <Save size={16} /> Save Preferences
          </button>
        </section>

        {/* SECURITY */}
        <section className="admin-settings-card">
          <div className="admin-settings-card-heading">
            <div className="admin-settings-icon"><Shield /></div>
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

        <footer className="admin-settings-footer">
          FindIt. Administration Panel <span>Version 1.0</span>
        </footer>

      </main>
    </div>
  );
}

export default AdminSettings;
