
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
  FileText
} from "lucide-react";
import StudentLayout from "../../components/StudentLayout";

import wallet from "../../assets/wallet.jpg";
import headphones from "../../assets/headphones.jpg";
import notebook from "../../assets/notebook.jpg";
import smartwatch from "../../assets/smartwatch.jpg";

import "../../styles/student/MyReports.css";

const reports = [
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

const totalLostCount = reports.filter((r) => r.type === "Lost").length;
const totalFoundCount = reports.filter((r) => r.type === "Found").length;

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export default function MyReports() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        report.name.toLowerCase().includes(search.toLowerCase()) ||
        report.location.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "All" || report.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" || report.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [search, typeFilter, statusFilter]);

  return (
    <StudentLayout>
      <div className="my-reports-page">
        <main className="my-reports-container">

        <div className="my-reports-heading">
          <span>YOUR ACTIVITY</span>
          <h1>My Reports</h1>
          <p>Keep track of the items you have reported on campus.</p>
        </div>

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

          <div className="my-reports-filters">

            <div className="my-reports-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by item or location..."
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

          <div className="my-reports-list">

            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <article className="my-report-card" key={report.id}>

                  <img src={report.image} alt={report.name} />

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
                        <MapPin size={14} /> {report.location}
                      </span>
                      <span>
                        <CalendarDays size={14} /> {formatDate(report.date)}
                      </span>
                    </div>
                  </div>

                  <button
                    className="my-report-view"
                    type="button"
                    onClick={() => setSelectedReport(report)}
                  >
                    <Eye size={16} /> View Details
                  </button>

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

            <img src={selectedReport.image} alt={selectedReport.name} />

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
              <span><MapPin size={16} /> {selectedReport.location}</span>
              <span><CalendarDays size={16} /> {formatDate(selectedReport.date)}</span>
              <span><Package size={16} /> {selectedReport.category}</span>
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

      </div>
    </StudentLayout>
  );
}
