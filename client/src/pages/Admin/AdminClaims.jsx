
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Package, ShieldCheck, Users, BarChart3,
  Settings, LogOut, Search, Check, X, Eye
} from "lucide-react";
import "../../styles/admin/AdminClaims.css";

const initialClaims = [
  {
    id: 1,
    student: "Aarav Sharma",
    studentId: "STU1001",
    item: "Black Leather Wallet",
    location: "Central Library",
    date: "30 Oct 2026",
    status: "Pending",
    reason: "I lost my black wallet near the library. It contains my college ID."
  },
  {
    id: 2,
    student: "Priya Singh",
    studentId: "STU1002",
    item: "Blue Notebook",
    location: "Block 7",
    date: "29 Oct 2026",
    status: "Pending",
    reason: "This notebook belongs to me. It has my name written on the first page."
  },
  {
    id: 3,
    student: "Rahul Verma",
    studentId: "STU1003",
    item: "Wireless Headphones",
    location: "Academic Block",
    date: "28 Oct 2026",
    status: "Approved",
    reason: "I can identify the headphones and their carrying case."
  },
  {
    id: 4,
    student: "Sneha Gupta",
    studentId: "STU1004",
    item: "Smart Watch",
    location: "Cafeteria",
    date: "27 Oct 2026",
    status: "Rejected",
    reason: "I believe this watch belongs to me."
  }
];

function AdminClaims() {
  const [claims, setClaims] = useState(initialClaims);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedClaim, setSelectedClaim] = useState(null);

  const updateStatus = (id, status) => {
    setClaims(prev =>
      prev.map(claim =>
        claim.id === id ? { ...claim, status } : claim
      )
    );

    setSelectedClaim(null);
  };

  const claimStats = useMemo(() => ({
    total: claims.length,
    pending: claims.filter(c => c.status === "Pending").length,
    approved: claims.filter(c => c.status === "Approved").length,
    rejected: claims.filter(c => c.status === "Rejected").length
  }), [claims]);

  const filteredClaims = useMemo(() => {
    const searchText = search.toLowerCase();

    return claims.filter(claim => {
      const matchesSearch =
        claim.student.toLowerCase().includes(searchText) ||
        claim.item.toLowerCase().includes(searchText) ||
        claim.studentId.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || claim.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [claims, search, statusFilter]);

  return (
    <div className="admin-claims-layout">

      <aside className="admin-claims-sidebar">
        <div className="admin-claims-brand">Find<span>It.</span></div>

        <div className="admin-claims-user">
          <div className="admin-claims-avatar">A</div>
          <div>
            <h3>Administrator</h3>
            <p>Admin Account</p>
          </div>
        </div>

        <div className="admin-claims-nav-label">MAIN MENU</div>

        <nav className="admin-claims-nav">
          <Link to="/admin/dashboard"><LayoutDashboard /> Overview</Link>
          <Link to="/admin/items"><Package /> Manage Items</Link>
          <Link to="/admin/claims" className="active"><ShieldCheck /> Manage Claims</Link>
          <Link to="/admin/users"><Users /> Students</Link>
          <Link to="/admin/analytics"><BarChart3 /> Analytics</Link>
          <Link to="/admin/settings"><Settings /> Settings</Link>
        </nav>

        <Link to="/" className="admin-claims-logout">
          <LogOut /> Back to Home
        </Link>
      </aside>

      <main className="admin-claims-main">

        <header className="admin-claims-header">
          <span>ADMINISTRATION</span>
          <h1>Manage Claims</h1>
          <p>Review student requests to claim lost and found items.</p>
        </header>

        {/* STATISTICS */}
        <section className="admin-claims-stats">
          <div>
            <span>Total Claims</span>
            <h2>{claimStats.total}</h2>
          </div>
          <div>
            <span>Pending</span>
            <h2>{claimStats.pending}</h2>
          </div>
          <div>
            <span>Approved</span>
            <h2>{claimStats.approved}</h2>
          </div>
          <div>
            <span>Rejected</span>
            <h2>{claimStats.rejected}</h2>
          </div>
        </section>

        {/* CLAIMS TABLE */}
        <section className="admin-claims-panel">

          <div className="admin-claims-panel-heading">
            <div>
              <h2>All Claim Requests</h2>
              <p>Check the details before approving a claim.</p>
            </div>
          </div>

          <div className="admin-claims-filters">
            <div className="admin-claims-search">
              <Search size={18} />
              <input
                placeholder="Search student, ID or item..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              aria-label="Filter claims by status"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="admin-claims-table-wrapper">
            <table className="admin-claims-table">
              <thead>
                <tr>
                  <th>STUDENT</th>
                  <th>ITEM</th>
                  <th>REQUEST DATE</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {filteredClaims.map(claim => (
                  <tr key={claim.id}>
                    <td>
                      <strong>{claim.student}</strong>
                      <small>{claim.studentId}</small>
                    </td>

                    <td>{claim.item}</td>
                    <td>{claim.date}</td>

                    <td>
                      <span className={`admin-claim-status ${claim.status.toLowerCase()}`}>
                        {claim.status}
                      </span>
                    </td>

                    <td>
                      <div className="admin-claim-actions">
                        <button
                          className="admin-claim-view"
                          title="View details"
                          onClick={() => setSelectedClaim(claim)}
                        >
                          <Eye size={16} />
                        </button>

                        {claim.status === "Pending" && (
                          <>
                            <button
                              className="admin-claim-approve"
                              title="Approve"
                              onClick={() => updateStatus(claim.id, "Approved")}
                            >
                              <Check size={16} />
                            </button>

                            <button
                              className="admin-claim-reject"
                              title="Reject"
                              onClick={() => updateStatus(claim.id, "Rejected")}
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredClaims.length === 0 && (
                  <tr>
                    <td colSpan="5" className="admin-claims-empty">
                      No claims found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="admin-claims-footer-count">
            Showing {filteredClaims.length} of {claims.length} claims
          </div>
        </section>

        {/* CLAIM DETAILS MODAL */}
        {selectedClaim && (
          <div
            className="admin-claim-modal-overlay"
            onClick={() => setSelectedClaim(null)}
          >
            <div
              className="admin-claim-modal"
              onClick={e => e.stopPropagation()}
            >
              <div className="admin-claim-modal-heading">
                <div>
                  <span>CLAIM DETAILS</span>
                  <h2>{selectedClaim.item}</h2>
                </div>

                <button onClick={() => setSelectedClaim(null)}>
                  <X size={20} />
                </button>
              </div>

              <div className="admin-claim-detail-row">
                <span>Student Name</span>
                <strong>{selectedClaim.student}</strong>
              </div>

              <div className="admin-claim-detail-row">
                <span>Student ID</span>
                <strong>{selectedClaim.studentId}</strong>
              </div>

              <div className="admin-claim-detail-row">
                <span>Item Location</span>
                <strong>{selectedClaim.location}</strong>
              </div>

              <div className="admin-claim-detail-row">
                <span>Request Date</span>
                <strong>{selectedClaim.date}</strong>
              </div>

              <div className="admin-claim-reason">
                <h3>Claim Reason</h3>
                <p>{selectedClaim.reason}</p>
              </div>

              <div className="admin-claim-modal-actions">
                {selectedClaim.status === "Pending" ? (
                  <>
                    <button
                      className="admin-claim-approve"
                      onClick={() => updateStatus(selectedClaim.id, "Approved")}
                    >
                      <Check size={16} /> Approve Claim
                    </button>

                    <button
                      className="admin-claim-reject"
                      onClick={() => updateStatus(selectedClaim.id, "Rejected")}
                    >
                      <X size={16} /> Reject Claim
                    </button>
                  </>
                ) : (
                  <p>Current status: {selectedClaim.status}</p>
                )}
              </div>
            </div>
          </div>
        )}

        <footer className="admin-claims-bottom">
          <span>FindIt. Administration Panel</span>
          <span>Version 1.0</span>
        </footer>

      </main>
    </div>
  );
}

export default AdminClaims;
