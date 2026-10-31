
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Package, Search, ShieldCheck, Users,
  BarChart3, Settings, LogOut, MapPin, Check, X, Trash2
} from "lucide-react";
import "../../styles/admin/AdminItems.css";

const initialItems = [
  { id: 1, name: "Black Leather Wallet", category: "Bags & Wallets", type: "Found", location: "Central Library", date: "30 Oct 2026", status: "Pending" },
  { id: 2, name: "Wireless Headphones", category: "Electronics", type: "Lost", location: "Academic Block", date: "29 Oct 2026", status: "Approved" },
  { id: 3, name: "Blue Notebook", category: "Books & Notes", type: "Found", location: "Block 7", date: "28 Oct 2026", status: "Pending" },
  { id: 4, name: "Smart Watch", category: "Electronics", type: "Lost", location: "Cafeteria", date: "27 Oct 2026", status: "Rejected" },
  { id: 5, name: "Student ID Card", category: "Accessories", type: "Found", location: "Main Gate", date: "26 Oct 2026", status: "Pending" }
];

function AdminItems() {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const updateStatus = (id, status) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, status } : item
    ));
  };

  const deleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const stats = useMemo(() => ({
    total: items.length,
    lost: items.filter(i => i.type === "Lost").length,
    found: items.filter(i => i.type === "Found").length,
    pending: items.filter(i => i.status === "Pending").length
  }), [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        typeFilter === "All" || item.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [items, search, typeFilter, statusFilter]);

  return (
    <div className="admin-items-layout">

      <aside className="admin-items-sidebar">
        <div className="admin-items-brand">Find<span>It.</span></div>

        <div className="admin-items-user">
          <div className="admin-items-avatar">A</div>
          <div>
            <h3>Administrator</h3>
            <p>Admin Account</p>
          </div>
        </div>

        <div className="admin-items-nav-label">MAIN MENU</div>

        <nav className="admin-items-nav">
          <Link to="/admin/dashboard"><LayoutDashboard /> Overview</Link>
          <Link to="/admin/items" className="active"><Package /> Manage Items</Link>
          <Link to="/admin/claims"><ShieldCheck /> Manage Claims</Link>
          <Link to="/admin/users"><Users /> Students</Link>
          <Link to="/admin/analytics"><BarChart3 /> Analytics</Link>
          <Link to="/admin/settings"><Settings /> Settings</Link>
        </nav>

        <Link to="/" className="admin-items-logout">
          <LogOut /> Back to Home
        </Link>
      </aside>

      <main className="admin-items-main">

        <header className="admin-items-header">
          <div>
            <span className="admin-items-eyebrow">ADMINISTRATION</span>
            <h1>Manage Items</h1>
            <p>Review and manage all lost and found reports.</p>
          </div>
        </header>

        <section className="admin-items-stats">
          <div>
            <span>Total Reports</span>
            <h2>{stats.total}</h2>
          </div>
          <div>
            <span>Lost Items</span>
            <h2>{stats.lost}</h2>
          </div>
          <div>
            <span>Found Items</span>
            <h2>{stats.found}</h2>
          </div>
          <div>
            <span>Pending Review</span>
            <h2>{stats.pending}</h2>
          </div>
        </section>

        <section className="admin-items-panel">

          <div className="admin-items-panel-heading">
            <div>
              <h2>All Reports</h2>
              <p>Review, approve or reject student submissions.</p>
            </div>
          </div>

          <div className="admin-items-filters">
            <div className="admin-items-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search item or location..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              aria-label="Filter by report type"
            >
              <option value="All">All Types</option>
              <option value="Lost">Lost Items</option>
              <option value="Found">Found Items</option>
            </select>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="admin-items-table-wrapper">
            <table className="admin-items-table">
              <thead>
                <tr>
                  <th>ITEM DETAILS</th>
                  <th>TYPE</th>
                  <th>LOCATION</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {filteredItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.name}</strong>
                      <small>{item.category}</small>
                    </td>

                    <td>
                      <span className={`admin-item-type ${item.type.toLowerCase()}`}>
                        {item.type}
                      </span>
                    </td>

                    <td>
                      <span className="admin-item-location">
                        <MapPin size={13} /> {item.location}
                      </span>
                    </td>

                    <td>{item.date}</td>

                    <td>
                      <span className={`admin-item-status ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="admin-item-actions">
                        {item.status === "Pending" && (
                          <>
                            <button
                              className="admin-approve"
                              title="Approve"
                              onClick={() => updateStatus(item.id, "Approved")}
                            >
                              <Check size={16} />
                            </button>

                            <button
                              className="admin-reject"
                              title="Reject"
                              onClick={() => updateStatus(item.id, "Rejected")}
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}

                        <button
                          className="admin-delete"
                          title="Delete"
                          onClick={() => deleteItem(item.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan="6" className="admin-items-empty">
                      No reports found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="admin-items-table-footer">
            Showing {filteredItems.length} of {items.length} reports
          </div>

        </section>

        <footer className="admin-items-footer">
          <span>FindIt. Administration Panel</span>
          <span>Version 1.0</span>
        </footer>

      </main>
    </div>
  );
}

export default AdminItems;
