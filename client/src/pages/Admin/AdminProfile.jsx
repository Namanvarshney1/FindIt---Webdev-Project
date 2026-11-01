
import { useRef, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Camera,
  Save,
  X,
  ShieldCheck,
} from "lucide-react";

import AdminLayout from "../../components/AdminLayout";
import { useProfile } from "../../context/useProfile";
import "../../styles/admin/AdminProfile.css";

const AdminProfile = () => {
  const {
    profile,
    setProfile,
    profileImage,
    setProfileImage,
  } = useProfile("admin");

  const [formData, setFormData] = useState({ ...profile });
  const [tempProfileImage, setTempProfileImage] = useState(profileImage);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (
      formData.phone.trim() &&
      !/^[6-9]\d{9}$/.test(formData.phone.trim())
    ) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const updatedProfile = {
      ...profile,
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      adminId: profile.adminId,
    };

    setProfile(updatedProfile);
    setProfileImage(tempProfileImage);
    setFormData(updatedProfile);

    setError("");
    setSuccess("Admin profile updated successfully.");
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setTempProfileImage(profileImage);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setError("");
    setSuccess("");
  };

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

  const handleRemovePhoto = () => {
    setTempProfileImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setError("");
    setSuccess("");
  };

  const avatarLetter =
    formData.name?.trim().charAt(0).toUpperCase() || "A";

  return (
    <AdminLayout>
      <div className="admin-profile-page">

        <div className="admin-profile-heading">
          <span>ADMINISTRATION</span>
          <h1>My Profile</h1>
          <p>Manage your administrator account information.</p>
        </div>

        <div className="admin-profile-card">

          <div className="admin-profile-card-heading">
            <h2>Personal Information</h2>
            <p>Update your administrator details below.</p>
          </div>

          <div className="admin-profile-divider" />

          {/* Profile Photo */}
          <div className="admin-profile-user">

            <div className="admin-profile-avatar">
              {tempProfileImage ? (
                <img
                  src={tempProfileImage}
                  alt="Admin profile"
                />
              ) : (
                avatarLetter
              )}
            </div>

            <div className="admin-profile-user-info">
              <h3>{profile.name || "Administrator"}</h3>
              <p>Administrator Account</p>

              <div className="admin-profile-photo-actions">

                <button
                  type="button"
                  className="admin-profile-upload"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera size={14} />
                  Upload Photo
                </button>

                {tempProfileImage && (
                  <button
                    type="button"
                    className="admin-profile-remove"
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

              <small>JPG, PNG or WEBP. Maximum 2 MB.</small>
            </div>

          </div>

          <form onSubmit={handleSave} noValidate>

            <div className="admin-profile-grid">

              <div className="admin-profile-field">
                <label htmlFor="admin-name">Full Name</label>

                <div className="admin-profile-input">
                  <User size={16} />
                  <input
                    id="admin-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="admin-profile-field">
                <label htmlFor="admin-id">Admin ID</label>

                <div className="admin-profile-input readonly">
                  <ShieldCheck size={16} />
                  <input
                    id="admin-id"
                    type="text"
                    value={profile.adminId || "ADM001"}
                    readOnly
                    disabled
                  />
                </div>
              </div>

              <div className="admin-profile-field">
                <label htmlFor="admin-email">Email Address</label>

                <div className="admin-profile-input">
                  <Mail size={16} />
                  <input
                    id="admin-email"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="admin-profile-field">
                <label htmlFor="admin-phone">Phone Number</label>

                <div className="admin-profile-input">
                  <Phone size={16} />
                  <input
                    id="admin-phone"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit phone number"
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="admin-profile-field full-width">
                <label htmlFor="admin-role">Account Role</label>

                <div className="admin-profile-input readonly">
                  <ShieldCheck size={16} />
                  <input
                    id="admin-role"
                    type="text"
                    value="Administrator"
                    readOnly
                    disabled
                  />
                </div>
                <small className="admin-profile-hint">
                  Account role cannot be changed here.
                </small>
              </div>

            </div>

            {error && (
              <div className="admin-profile-error" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="admin-profile-success" role="status">
                {success}
              </div>
            )}

            <div className="admin-profile-actions">

              <button
                type="button"
                className="admin-profile-cancel"
                onClick={handleCancel}
              >
                <X size={16} />
                Cancel
              </button>

              <button
                type="submit"
                className="admin-profile-save"
              >
                <Save size={16} />
                Save Changes
              </button>

            </div>

          </form>

        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
