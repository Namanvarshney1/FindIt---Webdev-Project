
import { useMemo, useState } from "react";
import {
  Package,
  Search,
  MapPin,
  CalendarDays,
  Eye,
  X,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import StudentLayout from "../../components/StudentLayout";

import wallet from "../../assets/wallet.jpg";
import headphones from "../../assets/headphones.jpg";
import smartwatch from "../../assets/smartwatch.jpg";

import "../../styles/student/MyClaims.css";

const claims = [
  {
    id: 1,
    item: "Black Leather Wallet",
    category: "Bags & Wallets",
    location: "Central Library",
    date: "2026-10-30",
    claimDate: "2026-10-30",
    status: "Pending",
    image: wallet,
    description: "Black leather wallet with a small mark on the front.",
    message: "This wallet belongs to me. I can identify the contents."
  },
  {
    id: 2,
    item: "Wireless Headphones",
    category: "Electronics",
    location: "Academic Block",
    date: "2026-10-29",
    claimDate: "2026-10-29",
    status: "Approved",
    image: headphones,
    description: "Black wireless headphones with a charging case.",
    message: "I lost these headphones near the academic block."
  },
  {
    id: 3,
    item: "Smart Watch",
    category: "Electronics",
    location: "Cafeteria",
    date: "2026-10-27",
    claimDate: "2026-10-28",
    status: "Rejected",
    image: smartwatch,
    description: "A smartwatch with a dark strap.",
    message: "I believe this is my missing smartwatch."
  }
];

const pendingClaimsCount = claims.filter((c) => c.status === "Pending").length;
const approvedClaimsCount = claims.filter((c) => c.status === "Approved").length;
const rejectedClaimsCount = claims.filter((c) => c.status === "Rejected").length;

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function getStatusIcon(status) {
  if (status === "Approved") return <CheckCircle size={14} />;
  if (status === "Rejected") return <AlertCircle size={14} />;
  return <Clock size={14} />;
}

export default function MyClaims() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedClaim, setSelectedClaim] = useState(null);

  const filteredClaims = useMemo(() => {
    return claims.filter((claim) => {
      const matchesSearch =
        claim.item.toLowerCase().includes(search.toLowerCase()) ||
        claim.location.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || claim.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <StudentLayout>
      <div className="my-claims-page">
        <main className="my-claims-container">

        <div className="my-claims-heading">
          <span>YOUR REQUESTS</span>
          <h1>My Claims</h1>
          <p>
            Track the items you have claimed and check their latest status.
          </p>
        </div>

        <section className="claims-summary">
          <div>
            <MessageSquare size={21} />
            <span>Total Claims</span>
            <strong>{claims.length}</strong>
          </div>

          <div>
            <Clock size={21} />
            <span>Pending</span>
            <strong>{pendingClaimsCount}</strong>
          </div>

          <div>
            <CheckCircle size={21} />
            <span>Approved</span>
            <strong>{approvedClaimsCount}</strong>
          </div>

          <div>
            <AlertCircle size={21} />
            <span>Rejected</span>
            <strong>{rejectedClaimsCount}</strong>
          </div>
        </section>

        <section className="claims-panel">

          <div className="claims-panel-heading">
            <div>
              <h2>Your Submitted Claims</h2>
              <p>Review your claim requests and their status.</p>
            </div>
          </div>

          <div className="claims-filters">
            <div className="claims-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by item or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter claims by status"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="claims-list">
            {filteredClaims.length > 0 ? (
              filteredClaims.map((claim) => (
                <article className="claim-card" key={claim.id}>
                  <img src={claim.image} alt={claim.item} />

                  <div className="claim-details">
                    <span className={`claim-status ${claim.status.toLowerCase()}`}>
                      {getStatusIcon(claim.status)}
                      {claim.status}
                    </span>

                    <h3>{claim.item}</h3>
                    <span className="claim-category">{claim.category}</span>

                    <div className="claim-meta">
                      <span>
                        <MapPin size={14} /> {claim.location}
                      </span>
                      <span>
                        <CalendarDays size={14} /> Claimed: {formatDate(claim.claimDate)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="claim-view-btn"
                    onClick={() => setSelectedClaim(claim)}
                  >
                    <Eye size={16} /> View Details
                  </button>
                </article>
              ))
            ) : (
              <div className="claims-empty">
                <MessageSquare size={38} />
                <h3>No claims found</h3>
                <p>Try changing your search or status filter.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        <div className="claims-note">
          <AlertCircle size={17} />
          <p>
            Claim status is updated by the administrator after reviewing
            your request.
          </p>
        </div>

      </main>

      {selectedClaim && (
        <div
          className="claim-modal-overlay"
          onClick={() => setSelectedClaim(null)}
        >
          <div
            className="claim-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="claim-modal-close"
              onClick={() => setSelectedClaim(null)}
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            <img src={selectedClaim.image} alt={selectedClaim.item} />

            <span className={`claim-status ${selectedClaim.status.toLowerCase()}`}>
              {getStatusIcon(selectedClaim.status)}
              {selectedClaim.status}
            </span>

            <h2>{selectedClaim.item}</h2>
            <p className="claim-modal-description">
              {selectedClaim.description}
            </p>

            <div className="claim-modal-info">
              <span><MapPin size={16} /> {selectedClaim.location}</span>
              <span><CalendarDays size={16} /> Item reported: {formatDate(selectedClaim.date)}</span>
              <span><CalendarDays size={16} /> Claim submitted: {formatDate(selectedClaim.claimDate)}</span>
              <span><Package size={16} /> {selectedClaim.category}</span>
            </div>

            <div className="claim-message">
              <strong>Your claim message</strong>
              <p>{selectedClaim.message}</p>
            </div>

            <button
              type="button"
              className="claim-modal-done"
              onClick={() => setSelectedClaim(null)}
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
