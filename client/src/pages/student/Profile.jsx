
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User, Save, Mail, Phone, GraduationCap,
  IdCard, ArrowLeft
} from "lucide-react";
import StudentLayout from "../../components/StudentLayout";
import "../../styles/student/Profile.css";

function Profile() {
  const [profile, setProfile] = useState({
    name: "Student User",
    studentId: "STU2026001",
    email: "student@example.edu",
    department: "Computer Science",
    phone: "",
    bio: "I am a student interested in technology and innovation."
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value
    }));
    setMessage("");
  };

  const handleSave = (e) => {
    e.preventDefault();
    setMessage("Profile updated successfully!");
  };

  return (
    <StudentLayout>
      <main className="profile-main">
        <header className="profile-header">
          <div>
            <Link to="/dashboard" className="profile-back">
              <ArrowLeft size={17} /> Back to Dashboard
            </Link>
            <h1>My Profile</h1>
            <p>Manage your personal and college information.</p>
          </div>
        </header>

        <section className="profile-card">
          <div className="profile-card-heading">
            <div>
              <h2>Personal Information</h2>
              <p>Update your details below.</p>
            </div>
          </div>

          <div className="profile-photo-section">
            <div className="profile-large-avatar">
              {profile.name.trim().charAt(0).toUpperCase() || "S"}
            </div>
            <div>
              <h3>{profile.name}</h3>
              <p>Student Member</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="profile-form">
            <div className="profile-form-grid">
              <div className="profile-field">
                <label>Full Name</label>
                <div className="profile-input">
                  <User size={18} />
                  <input
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Student ID</label>
                <div className="profile-input">
                  <IdCard size={18} />
                  <input
                    name="studentId"
                    value={profile.studentId}
                    onChange={handleChange}
                    required
                    placeholder="Enter student ID"
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>College Email</label>
                <div className="profile-input">
                  <Mail size={18} />
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter college email"
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Phone Number</label>
                <div className="profile-input">
                  <Phone size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="profile-field profile-full-width">
                <label>Department</label>
                <div className="profile-input">
                  <GraduationCap size={18} />
                  <input
                    name="department"
                    value={profile.department}
                    onChange={handleChange}
                    placeholder="Enter department"
                  />
                </div>
              </div>

              <div className="profile-field profile-full-width">
                <label>About Me</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Write something about yourself..."
                />
              </div>
            </div>

            {message && <p className="profile-success">{message}</p>}

            <div className="profile-form-actions">
              <button type="submit" className="profile-save-btn">
                <Save size={17} /> Save Changes
              </button>
            </div>
          </form>
        </section>
      </main>
    </StudentLayout>
  );
}

export default Profile;
