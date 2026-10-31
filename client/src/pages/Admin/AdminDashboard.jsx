
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Package, Search, ShieldCheck, Users,
  BarChart3, Settings, LogOut, Bell, ArrowUpRight,
  Clock, CheckCircle, Eye
} from "lucide-react";
import "../../styles/admin/AdminDashboard.css";

const stats = [
  { title: "Total Reports", value: "248", icon: Package, note: "All submitted reports" },
  { title: "Lost Items", value: "96", icon: Search, note: "Items reported lost" },
  { title: "Found Items", value: "152", icon: CheckCircle, note: "Items reported found" },
  { title: "Pending Claims", value: "18", icon: Clock, note: "Awaiting review" }
];

const reports = [
  { id: "FI-1001", name: "Black Leather Wallet", type: "Found", location: "Central Library", date: "30 Oct 2026", status: "Pending" },
  { id: "FI-1002", name: "Wireless Headphones", type: "Lost", location: "Academic Block", date: "29 Oct 2026", status: "Approved" },
  { id: "FI-1003", name: "Blue Notebook", type: "Found", location: "Block 7", date: "28 Oct 2026", status: "Pending" },
  { id: "FI-1004", name: "Smart Watch", type: "Lost", location: "Cafeteria", date: "27 Oct 2026", status: "Rejected" }
];

const claims = [
  { name: "Aarav Sharma", item: "Black Leather Wallet", date: "30 Oct 2026", status: "Pending" },
  { name: "Priya Singh", item: "Blue Notebook", date: "29 Oct 2026", status: "Pending" },
  { name: "Rahul Verma", item: "Wireless Headphones", date: "28 Oct 2026", status: "Approved" }
];

function AdminDashboard() {
  return (
    <div className="admin-dashboard-layout">

      <aside className="admin-dashboard-sidebar">
        <div className="admin-dashboard-brand">Find<span>It.</span></div>

        <div className="admin-dashboard-user">
          <div className="admin-dashboard-avatar">A</div>
          <div>
            <h3>Administrator</h3>
            <p>Admin Account</p>
          </div>
        </div>

        <div className="admin-nav-label">MAIN MENU</div>

        <nav className="admin-dashboard-nav">
          <Link to="/admin/dashboard" className="active">
            <LayoutDashboard /> Overview
          </Link>
          <Link to="/admin/items">
            <Package /> Manage Items
          </Link>
          <Link to="/admin/claims">
            <ShieldCheck /> Manage Claims
          </Link>
          <Link to="/admin/users">
            <Users /> Students
          </Link>
          <Link to="/admin/analytics">
            <BarChart3 /> Analytics
          </Link>
          <Link to="/admin/settings">
            <Settings /> Settings
          </Link>
        </nav>

        <Link to="/" className="admin-dashboard-logout">
          <LogOut /> Back to Home
        </Link>
      </aside>

      <main className="admin-dashboard-main">

        <header className="admin-dashboard-header">
          <div>
            <span className="admin-dashboard-eyebrow">ADMINISTRATION</span>
            <h1>Dashboard Overview</h1>
            <p>Monitor and manage your campus lost and found platform.</p>
          </div>

          <div className="admin-header-actions">
            <button className="admin-notification-btn" aria-label="Notifications">
              <Bell size={19} />
            </button>
            <div className="admin-header-avatar">A</div>
          </div>
        </header>

        {/* STATISTICS */}
        <section className="admin-stats-grid">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div className="admin-stat-card" key={stat.title}>
                <div className="admin-stat-top">
                  <span>{stat.title}</span>
                  <div className="admin-stat-icon">
                    <Icon size={20} />
                  </div>
                </div>

                <h2>{stat.value}</h2>
                <p>{stat.note}</p>
              </div>
            );
          })}
        </section>

        {/* OVERVIEW PANELS */}
        <section className="admin-overview-grid">

          <div className="admin-panel admin-activity-panel">
            <div className="admin-panel-heading">
              <div>
                <h2>Recent Reports</h2>
                <p>Latest lost and found submissions</p>
              </div>

              <Link to="/admin/items">
                View all <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ITEM</th>
                    <th>TYPE</th>
                    <th>LOCATION</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id}>
                      <td>
                        <strong>{report.name}</strong>
                        <small>{report.id} · {report.date}</small>
                      </td>
                      <td>
                        <span className={`admin-type ${report.type.toLowerCase()}`}>
                          {report.type}
                        </span>
                      </td>
                      <td>{report.location}</td>
                      <td>
                        <span className={`admin-status ${report.status.toLowerCase()}`}>
                          {report.status}
                        </span>
                      </td>
                      <td>
                        <Link to="/admin/items" className="admin-view-link">
                          <Eye size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CLAIM REQUESTS */}
          <div className="admin-panel admin-claims-panel">
            <div className="admin-panel-heading">
              <div>
                <h2>Recent Claims</h2>
                <p>Student claim requests</p>
              </div>
              <Link to="/admin/claims">
                View all <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="admin-claims-list">
              {claims.map((claim) => (
                <div className="admin-claim-item" key={`${claim.name}-${claim.item}`}>
                  <div className="admin-claim-avatar">
                    {claim.name.charAt(0)}
                  </div>

                  <div className="admin-claim-details">
                    <h3>{claim.name}</h3>
                    <p>{claim.item}</p>
                    <small>{claim.date}</small>
                  </div>

                  <span className={`admin-status ${claim.status.toLowerCase()}`}>
                    {claim.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* QUICK ACTIONS */}
        <section className="admin-quick-actions">
          <div>
            <h2>Quick Actions</h2>
            <p>Access important administration tasks.</p>
          </div>

          <div className="admin-action-buttons">
            <Link to="/admin/items">
              <Package size={18} /> Review Reports
            </Link>
            <Link to="/admin/claims">
              <ShieldCheck size={18} /> Review Claims
            </Link>
            <Link to="/admin/users">
              <Users size={18} /> Manage Students
            </Link>
          </div>
        </section>

        <footer className="admin-dashboard-footer">
          <span>FindIt. Administration Panel</span>
          <span>Version 1.0</span>
        </footer>

      </main>
    </div>
  );
}

export default AdminDashboard;
