
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  GraduationCap,
  IdCard,
  Save,
  X,
  Camera,
} from "lucide-react";

import StudentLayout from "../../components/StudentLayout";
import { useProfile } from "../../context/useProfile";
import "../../styles/student/Profile.css";

const Profile = () => {
  const {
    profile,
    setProfile,
    profileImage,
    setProfileImage,
  } = useProfile("student");

  // Temporary form data - does not update the sidebar
  const [formData, setFormData] = useState({ ...profile });

  // Temporary photo - saved globally only after submission
  const [tempProfileImage, setTempProfileImage] = useState(profileImage);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fileInputRef = useRef(null);

  // Handle form changes without updating global profile
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // Validate student details
  const validateProfile = () => {
    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid college email address.");
      return false;
    }

    if (
      formData.phone.trim() &&
      !/^[6-9]\d{9}$/.test(formData.phone.trim())
    ) {
      setError("Please enter a valid 10-digit mobile number.");
      return false;
    }

    return true;
  };

  // Save all changes globally
  const handleSave = (e) => {
    e.preventDefault();

    if (!validateProfile()) return;

    const updatedProfile = {
      ...profile,
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      bio: formData.bio.trim(),

      // These fields cannot be changed by students
      department: profile.department,
      studentId: profile.studentId,
    };

    setProfile(updatedProfile);
    setProfileImage(tempProfileImage);

    setFormData(updatedProfile);
    setError("");
    setSuccess("Your profile has been updated successfully.");
  };

  // Restore last saved details
  const handleCancel = () => {
    setFormData({ ...profile });
    setTempProfileImage(profileImage);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setError("");
    setSuccess("");
  };

  // Select and preview profile picture
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WEBP image.");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Profile picture must be smaller than 2 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setTempProfileImage(reader.result);
      setError("");
      setSuccess("");
    };

    reader.onerror = () => {
      setError("Unable to read this image. Please try another.");
    };

    reader.readAsDataURL(file);
  };

  // Remove temporary profile picture
  const handleRemovePhoto = () => {
    setTempProfileImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setError("");
    setSuccess("");
  };

    profile.name?.trim().charAt(0).toUpperCase() || "S";

  const formAvatarLetter =
    formData.name?.trim().charAt(0).toUpperCase() || "S";

  return (
    <StudentLayout>
      <div className="profile-page">

        {/* Back to Dashboard */}
        <Link to="/dashboard" className="profile-back-link">
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        {/* Page Heading */}
        <div className="profile-page-header">
          <h1>My Profile</h1>
          <p>Manage your personal and college information.</p>
        </div>

        {/* Profile Card */}
        <div className="profile-card">

          <div className="profile-card-heading">
            <h2>Personal Information</h2>
            <p>Update your details below.</p>
          </div>

          <div className="profile-divider" />

          {/* Profile Picture Section */}
          <div className="profile-user-section">

            <div className="profile-large-avatar">
              {tempProfileImage ? (
                <img
                  src={tempProfileImage}
                  alt="Student profile"
                />
              ) : (
                formAvatarLetter
              )}
            </div>

            <div className="profile-user-info">

              {/* This name updates only after Save */}
              <h3>{profile.name || "Student User"}</h3>

              <p>Student Member</p>

              <div className="profile-photo-actions">

                <button
                  type="button"
                  className="profile-upload-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera size={14} />
                  Upload Photo
                </button>

                {tempProfileImage && (
                  <button
                    type="button"
                    className="profile-remove-btn"
                    onClick={handleRemovePhoto}
                  >
                    Remove Photo
                  </button>
                )}

              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                hidden
                onChange={handlePhotoChange}
              />

              <span className="profile-photo-hint">
                JPG, PNG or WEBP. Maximum 2 MB.
              </span>

            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSave} noValidate>

            <div className="profile-form-grid">

              {/* Full Name */}
              <div className="profile-field">
                <label htmlFor="profile-name">
                  Full Name
                </label>

                <div className="profile-input-wrapper">
                  <User size={16} />

                  <input
                    id="profile-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Student ID */}
              <div className="profile-field">
                <label htmlFor="profile-student-id">
                  Student ID
                </label>

                <div className="profile-input-wrapper profile-readonly">
                  <IdCard size={16} />

                  <input
                    id="profile-student-id"
                    type="text"
                    value={profile.studentId}
                    readOnly
                    disabled
                  />
                </div>
              </div>

              {/* Email */}
              <div className="profile-field">
                <label htmlFor="profile-email">
                  College Email
                </label>

                <div className="profile-input-wrapper">
                  <Mail size={16} />

                  <input
                    id="profile-email"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your college email"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="profile-field">
                <label htmlFor="profile-phone">
                  Phone Number
                </label>

                <div className="profile-input-wrapper">
                  <Phone size={16} />

                  <input
                    id="profile-phone"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit phone number"
                    maxLength={10}
                  />
                </div>
              </div>

              {/* Department - Read Only */}
              <div className="profile-field profile-full-width">
                <label htmlFor="profile-department">
                  Department
                </label>

                <div className="profile-input-wrapper profile-readonly">
                  <GraduationCap size={17} />

                  <input
                    id="profile-department"
                    type="text"
                    value={profile.department}
                    readOnly
                    disabled
                  />
                </div>

                <small className="profile-field-hint">
                  Department cannot be changed by students.
                </small>
              </div>

              {/* About Me */}
              <div className="profile-field profile-full-width">
                <label htmlFor="profile-bio">
                  About Me
                </label>

                <textarea
                  id="profile-bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us something about yourself"
                  rows={4}
                />
              </div>

            </div>

            {/* Validation and Success Messages */}
            {error && (
              <div className="profile-error" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="profile-success" role="status">
                {success}
              </div>
            )}

            {/* Action Buttons */}
            <div className="profile-form-actions">

              <button
                type="button"
                className="profile-cancel-btn"
                onClick={handleCancel}
              >
                <X size={16} />
                Cancel
              </button>

              <button
                type="submit"
                className="profile-save-btn"
              >
                <Save size={16} />
                Save Changes
              </button>

            </div>

          </form>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Profile;
