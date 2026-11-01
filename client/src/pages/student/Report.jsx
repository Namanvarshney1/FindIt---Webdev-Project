
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ArrowLeft,
  Upload,
  ImagePlus,
  MapPin,
  CalendarDays,
  CheckCircle,
  X
} from "lucide-react";
import StudentLayout from "../../components/StudentLayout";
import "../../styles/student/Report.css";

export default function Report() {
  const [type, setType] = useState("Lost");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  // Dynamically get today's date in YYYY-MM-DD format
  const today = new Date().toLocaleDateString("en-CA");

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    location: "",
    date: "",
    contact: ""
  });

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleImage(event) {
    const file = event.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
  }

  function removeImage() {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.category ||
      !form.description.trim() ||
      !form.location.trim() ||
      !form.date ||
      !form.contact.trim()
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    setMessage(
      `${type} item report submitted successfully! Backend connection will be added later.`
    );
  }

  function changeType(newType) {
    setType(newType);
    setMessage("");
  }

  return (
    <StudentLayout>
      <div className="report-page">
        <main className="report-container">

          {/* PAGE HEADING */}
          <div className="report-heading">
            <span className="report-eyebrow">
              HELP YOUR CAMPUS COMMUNITY
            </span>

            <h1>Report an Item</h1>

            <p>
              Share the details below so the right person can find
              their belongings.
            </p>
          </div>

          <section className="report-form-card">

            {/* LOST / FOUND SELECTION */}
            <div className="report-type-section">
              <label className="form-label">
                What would you like to report?
              </label>

              <div className="report-type-options">

                <button
                  type="button"
                  className={`type-option ${
                    type === "Lost" ? "selected lost-selected" : ""
                  }`}
                  onClick={() => changeType("Lost")}
                >
                  <span className="type-option-icon lost-icon">
                    <Package size={21} />
                  </span>

                  <span>
                    <strong>I Lost Something</strong>
                    <small>Report an item you cannot find</small>
                  </span>

                  {type === "Lost" && (
                    <CheckCircle
                      size={22}
                      className="choice-check"
                    />
                  )}
                </button>

                <button
                  type="button"
                  className={`type-option ${
                    type === "Found" ? "selected found-selected" : ""
                  }`}
                  onClick={() => changeType("Found")}
                >
                  <span className="type-option-icon found-icon">
                    <Package size={21} />
                  </span>

                  <span>
                    <strong>I Found Something</strong>
                    <small>Help someone recover their item</small>
                  </span>

                  {type === "Found" && (
                    <CheckCircle
                      size={22}
                      className="choice-check"
                    />
                  )}
                </button>

              </div>

              {/* DYNAMIC INFORMATION BANNER */}
              <div
                className={`report-mode-info ${
                  type === "Lost" ? "lost-mode" : "found-mode"
                }`}
              >
                <div className="mode-info-icon">
                  <Package size={22} />
                </div>

                <div>
                  <strong>
                    {type === "Lost"
                      ? "Lost Item Report"
                      : "Found Item Report"}
                  </strong>

                  <p>
                    {type === "Lost"
                      ? "Tell us what you lost and where you last remember seeing it."
                      : "Tell us what you found and where the item is currently located."}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>

              {/* SECTION 1 */}
              <div className="form-section-title">
                <span>01</span>

                <div>
                  <h3>Item Information</h3>
                  <p>Tell us about the item.</p>
                </div>
              </div>

              <div className="report-input-grid">

                <div className="report-field">
                  <label htmlFor="item-name">
                    Item Name *
                  </label>

                  <input
                    id="item-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Black leather wallet"
                    required
                  />
                </div>

                <div className="report-field">
                  <label htmlFor="item-category">
                    Category *
                  </label>

                  <select
                    id="item-category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    <option>Electronics</option>
                    <option>Bags & Wallets</option>
                    <option>Books & Notes</option>
                    <option>Accessories</option>
                    <option>Clothing</option>
                    <option>Documents</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="report-field full-width">
                  <label htmlFor="item-description">
                    Description *
                  </label>

                  <textarea
                    id="item-description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder={
                      type === "Lost"
                        ? "Describe your lost item, its colour, brand and identifying details..."
                        : "Describe the found item, its colour, brand and identifying details..."
                    }
                    rows="4"
                    required
                  />
                </div>

              </div>

              {/* SECTION 2 */}
              <div className="form-section-title second-section">
                <span>02</span>

                <div>
                  <h3>Location & Date</h3>

                  <p>
                    {type === "Lost"
                      ? "Where and when did you last see the item?"
                      : "Where and when did you find the item?"}
                  </p>
                </div>
              </div>

              <div className="report-input-grid">

                <div className="report-field">
                  <label htmlFor="item-location">
                    <MapPin size={14} />

                    {type === "Lost"
                      ? "Where did you last see it? *"
                      : "Where did you find it? *"}
                  </label>

                  <input
                    id="item-location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder={
                      type === "Lost"
                        ? "e.g. Where you last saw it"
                        : "e.g. Where you found it"
                    }
                    required
                  />
                </div>

                <div className="report-field">
                  <label htmlFor="item-date">
                    <CalendarDays size={14} />

                    {type === "Lost"
                      ? "Date Lost *"
                      : "Date Found *"}
                  </label>

                  <input
                    id="item-date"
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    max={today}
                    required
                  />
                </div>

              </div>

              {/* SECTION 3 */}
              <div className="form-section-title second-section">
                <span>03</span>

                <div>
                  <h3>Item Photo</h3>
                  <p>Add a photo to help identify the item.</p>
                </div>
              </div>

              <div className="image-upload-area">

                {preview ? (
                  <div className="image-preview">
                    <img src={preview} alt="Item preview" />

                    <button
                      type="button"
                      onClick={removeImage}
                      aria-label="Remove image"
                    >
                      <X size={17} />
                    </button>

                    <span>{image?.name}</span>
                  </div>
                ) : (
                  <label className="upload-label">
                    <ImagePlus size={30} />

                    <strong>Upload an item photo</strong>

                    <span>
                      PNG, JPG or JPEG · Maximum 5 MB
                    </span>

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handleImage}
                    />

                    <span className="upload-browse">
                      <Upload size={15} />
                      Choose Image
                    </span>
                  </label>
                )}

              </div>

              {/* SECTION 4 */}
              <div className="form-section-title second-section">
                <span>04</span>

                <div>
                  <h3>Contact Information</h3>
                  <p>
                    How can someone contact you about this item?
                  </p>
                </div>
              </div>

              <div className="report-field">
                <label htmlFor="contact">
                  Contact Email or Phone *
                </label>

                <input
                  id="contact"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="Enter your email or phone number"
                  required
                />
              </div>

              {/* MESSAGE */}
              {message && (
                <div className="report-message">
                  {message}
                </div>
              )}

              {/* SUBMIT BUTTONS */}
              <div className="report-submit-area">
                <Link to="/dashboard" className="cancel-report">
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="submit-report"
                >
                  Submit {type} Report
                  <ArrowLeft size={16} />
                </button>
              </div>

            </form>
          </section>
        </main>
      </div>
    </StudentLayout>
  );
}
