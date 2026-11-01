
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Search,
  Plus,
  MapPin,
  CalendarDays,
  Eye,
  X,
  FileText,
  Pencil,
  Trash2
} from "lucide-react";

import StudentLayout from "../../components/StudentLayout";

import wallet from "../../assets/wallet.jpg";
import headphones from "../../assets/headphones.jpg";
import notebook from "../../assets/notebook.jpg";
import smartwatch from "../../assets/smartwatch.jpg";

import "../../styles/student/MyReports.css";

const initialReports = [
  {
    id: 1,
    name: "Black Leather Wallet",
    category: "Bags & Wallets",
    location: "Central Library",
    date: "2026-10-30",
    type: "Found",
    status: "Submitted",
    image: wallet,
    description: "A black leather wallet found near the Central Library."
  },
  {
    id: 2,
    name: "Wireless Headphones",
    category: "Electronics",
    location: "Academic Block",
    date: "2026-10-29",
    type: "Lost",
    status: "Searching",
    image: headphones,
    description: "Black wireless headphones with a charging case."
  },
  {
    id: 3,
    name: "Blue Notebook",
    category: "Books & Notes",
    location: "Block 7",
    date: "2026-10-28",
    type: "Found",
    status: "Returned",
    image: notebook,
    description: "A blue notebook with handwritten class notes."
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    location: "Cafeteria",
    date: "2026-10-27",
    type: "Lost",
    status: "Searching",
    image: smartwatch,
    description: "A smartwatch with a dark strap."
  }
];

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export default function MyReports() {
  const [reports, setReports] = useState(initialReports);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedReport, setSelectedReport] = useState(null);
  const [editingReport, setEditingReport] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const totalLostCount = reports.filter(
    (report) => report.type === "Lost"
  ).length;

  const totalFoundCount = reports.filter(
    (report) => report.type === "Found"
  ).length;

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const searchTerm = search.trim().toLowerCase();

      const matchesSearch =
        report.name.toLowerCase().includes(searchTerm) ||
        report.location.toLowerCase().includes(searchTerm) ||
        report.category.toLowerCase().includes(searchTerm) ||
        report.description.toLowerCase().includes(searchTerm) ||
        report.type.toLowerCase().includes(searchTerm) ||
        report.status.toLowerCase().includes(searchTerm);

      const matchesType =
        typeFilter === "All" || report.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" || report.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [reports, search, typeFilter, statusFilter]);

  // Open edit form
  const handleEdit = (report) => {
    setEditingReport({ ...report });
    setSelectedReport(null);
  };

  // Save edited report
  const handleSave = (e) => {
    e.preventDefault();

    setReports((previousReports) =>
      previousReports.map((report) =>
        report.id === editingReport.id ? editingReport : report
      )
    );

    setEditingReport(null);
  };

  // Open custom delete confirmation
  const handleDelete = (report) => {
    setSelectedReport(null);
    setDeleteConfirmation(report);
  };

  // Confirm report deletion
  const confirmDelete = () => {
    if (!deleteConfirmation) return;

    setReports((previousReports) =>
      previousReports.filter(
        (report) => report.id !== deleteConfirmation.id
      )
    );

    setSelectedReport(null);
    setEditingReport(null);
    setDeleteConfirmation(null);
  };

  return (
    <StudentLayout>
      <div className="my-reports-page">

        <main className="my-reports-container">

          {/* Page Heading */}
          <div className="my-reports-heading">
            <span>YOUR ACTIVITY</span>
            <h1>My Reports</h1>
            <p>Keep track of the items you have reported on campus.</p>
          </div>

          {/* Summary Cards */}
          <section className="my-reports-summary">

            <div>
              <FileText size={21} />
              <span>Total Reports</span>
              <strong>{reports.length}</strong>
            </div>

            <div>
              <Search size={21} />
              <span>Lost Items</span>
              <strong>{totalLostCount}</strong>
            </div>

            <div>
              <Package size={21} />
              <span>Found Items</span>
              <strong>{totalFoundCount}</strong>
            </div>

          </section>

          {/* Reports Panel */}
          <section className="my-reports-panel">

            <div className="my-reports-panel-heading">

              <div>
                <h2>Your Submitted Reports</h2>
                <p>View and track your reported items.</p>
              </div>

              <Link to="/report">
                <Plus size={16} /> Add Report
              </Link>

            </div>

            {/* Search and Filters */}
            <div className="my-reports-filters">

              <div className="my-reports-search">
                <Search size={18} />

                <input
                  type="text"
                  placeholder="Search item, location, Lost or Found..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                aria-label="Filter by report type"
              >
                <option value="All">All Types</option>
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter by report status"
              >
                <option value="All">All Statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="Searching">Searching</option>
                <option value="Returned">Returned</option>
              </select>

            </div>

            {/* Reports List */}
            <div className="my-reports-list">

              {filteredReports.length > 0 ? (

                filteredReports.map((report) => (

                  <article className="my-report-card" key={report.id}>

                    <img
                      src={report.image}
                      alt={report.name}
                    />

                    <div className="my-report-details">

                      <div className="my-report-badges">

                        <span className={`my-report-type ${report.type.toLowerCase()}`}>
                          {report.type}
                        </span>

                        <span className={`my-report-status ${report.status.toLowerCase()}`}>
                          {report.status}
                        </span>

                      </div>

                      <h3>{report.name}</h3>

                      <span className="my-report-category">
                        {report.category}
                      </span>

                      <div className="my-report-meta">

                        <span>
                          <MapPin size={14} />
                          {report.location}
                        </span>

                        <span>
                          <CalendarDays size={14} />
                          {formatDate(report.date)}
                        </span>

                      </div>

                    </div>

                    {/* Report Action Buttons */}
                    <div className="my-report-actions">

                      <button
                        className="my-report-view"
                        type="button"
                        onClick={() => setSelectedReport(report)}
                      >
                        <Eye size={16} />
                        View Details
                      </button>

                      <button
                        type="button"
                        className="my-report-edit"
                        onClick={() => handleEdit(report)}
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        type="button"
                        className="my-report-delete"
                        onClick={() => handleDelete(report)}
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>

                    </div>

                  </article>

                ))

              ) : (

                <div className="my-reports-empty">

                  <Package size={38} />

                  <h3>No reports found</h3>

                  <p>Try changing your search or filters.</p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setTypeFilter("All");
                      setStatusFilter("All");
                    }}
                  >
                    Clear Filters
                  </button>

                </div>

              )}

            </div>

          </section>

        </main>

        {/* View Details Modal */}
        {selectedReport && (

          <div
            className="my-report-modal-overlay"
            onClick={() => setSelectedReport(null)}
          >

            <div
              className="my-report-modal"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                type="button"
                className="my-report-modal-close"
                onClick={() => setSelectedReport(null)}
                aria-label="Close details"
              >
                <X size={20} />
              </button>

              <img
                src={selectedReport.image}
                alt={selectedReport.name}
              />

              <div className="my-report-modal-badges">

                <span className={`my-report-type ${selectedReport.type.toLowerCase()}`}>
                  {selectedReport.type}
                </span>

                <span className={`my-report-status ${selectedReport.status.toLowerCase()}`}>
                  {selectedReport.status}
                </span>

              </div>

              <h2>{selectedReport.name}</h2>

              <p className="my-report-modal-description">
                {selectedReport.description}
              </p>

              <div className="my-report-modal-info">

                <span>
                  <MapPin size={16} />
                  {selectedReport.location}
                </span>

                <span>
                  <CalendarDays size={16} />
                  {formatDate(selectedReport.date)}
                </span>

                <span>
                  <Package size={16} />
                  {selectedReport.category}
                </span>

              </div>

              <div className="my-report-modal-actions">

                <button
                  type="button"
                  className="my-report-edit"
                  onClick={() => handleEdit(selectedReport)}
                >
                  <Pencil size={16} />
                  Edit Report
                </button>

                <button
                  type="button"
                  className="my-report-delete"
                  onClick={() => handleDelete(selectedReport)}
                >
                  <Trash2 size={16} />
                  Delete Report
                </button>

              </div>

              <button
                type="button"
                className="my-report-modal-done"
                onClick={() => setSelectedReport(null)}
              >
                Close
              </button>

            </div>

          </div>

        )}

        {/* Edit Report Modal */}
        {editingReport && (

          <div
            className="my-report-modal-overlay"
            onClick={() => setEditingReport(null)}
          >

            <div
              className="my-report-edit-modal"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                type="button"
                className="my-report-modal-close"
                onClick={() => setEditingReport(null)}
                aria-label="Close edit form"
              >
                <X size={20} />
              </button>

              <h2>Edit Report</h2>

              <p>Update your reported item details.</p>

              <form onSubmit={handleSave}>

                <label>Item Name</label>

                <input
                  type="text"
                  required
                  value={editingReport.name}
                  onChange={(e) =>
                    setEditingReport({
                      ...editingReport,
                      name: e.target.value
                    })
                  }
                />

                <label>Report Type</label>

                <select
                  value={editingReport.type}
                  onChange={(e) =>
                    setEditingReport({
                      ...editingReport,
                      type: e.target.value
                    })
                  }
                >
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>

                <label>Category</label>

                <input
                  type="text"
                  required
                  value={editingReport.category}
                  onChange={(e) =>
                    setEditingReport({
                      ...editingReport,
                      category: e.target.value
                    })
                  }
                />

                <label>Location</label>

                <input
                  type="text"
                  required
                  value={editingReport.location}
                  onChange={(e) =>
                    setEditingReport({
                      ...editingReport,
                      location: e.target.value
                    })
                  }
                />

                <label>Date</label>

                <input
                  type="date"
                  required
                  value={editingReport.date}
                  onChange={(e) =>
                    setEditingReport({
                      ...editingReport,
                      date: e.target.value
                    })
                  }
                />

                <label>Status</label>

                <select
                  value={editingReport.status}
                  onChange={(e) =>
                    setEditingReport({
                      ...editingReport,
                      status: e.target.value
                    })
                  }
                >
                  <option value="Submitted">Submitted</option>
                  <option value="Searching">Searching</option>
                  <option value="Returned">Returned</option>
                </select>

                <label>Description</label>

                <textarea
                  required
                  rows="3"
                  value={editingReport.description}
                  onChange={(e) =>
                    setEditingReport({
                      ...editingReport,
                      description: e.target.value
                    })
                  }
                />

                <div className="my-report-edit-actions">

                  <button
                    type="button"
                    className="my-report-cancel"
                    onClick={() => setEditingReport(null)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="my-report-save"
                  >
                    Save Changes
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

        {/* Custom Delete Confirmation Modal */}
        {deleteConfirmation && (

          <div
            className="my-report-modal-overlay"
            onClick={() => setDeleteConfirmation(null)}
          >

            <div
              className="my-report-delete-modal"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                type="button"
                className="my-report-modal-close"
                onClick={() => setDeleteConfirmation(null)}
                aria-label="Close confirmation"
              >
                <X size={20} />
              </button>

              <div className="my-report-delete-icon">
                <Trash2 size={25} />
              </div>

              <h2>Delete Report?</h2>

              <p>
                Are you sure you want to delete
                <strong> "{deleteConfirmation.name}"</strong>?
                This action cannot be undone.
              </p>

              <div className="my-report-delete-actions">

                <button
                  type="button"
                  className="my-report-cancel"
                  onClick={() => setDeleteConfirmation(null)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="my-report-confirm-delete"
                  onClick={confirmDelete}
                >
                  <Trash2 size={16} />
                  Delete Report
                </button>

              </div>

            </div>

          </div>

        )}

      </div>
    </StudentLayout>
  );
}
