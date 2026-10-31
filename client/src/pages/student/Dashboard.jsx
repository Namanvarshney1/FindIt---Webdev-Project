
import {
  Search,
  FileText,
  MessageSquare,
  Plus,
  MapPin,
  Clock,
  ArrowRight,
  Package
} from "lucide-react";
import { Link } from "react-router-dom";
import StudentLayout from "../../components/StudentLayout";
import "../../styles/student/Dashboard.css";

const recentReports = [
  {
    name: "Black Leather Wallet",
    location: "Central Library",
    date: "30 Oct 2026",
    status: "Found",
    type: "Found"
  },
  {
    name: "Wireless Headphones",
    location: "Academic Block",
    date: "29 Oct 2026",
    status: "Searching",
    type: "Lost"
  },
  {
    name: "Blue Notebook",
    location: "Block 7",
    date: "28 Oct 2026",
    status: "Found",
    type: "Found"
  }
];

const matches = [
  {
    name: "Black Leather Wallet",
    location: "Near Central Library",
    date: "30 Oct 2026",
    match: "92%"
  },
  {
    name: "Wireless Earbuds",
    location: "Academic Block",
    date: "29 Oct 2026",
    match: "78%"
  }
];

export default function Dashboard() {
  return (
    <StudentLayout>
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <span className="dashboard-date">FRIDAY, 30 OCTOBER 2026</span>
            <h2>Student Dashboard</h2>
          </div>
          <Link to="/report" className="new-report-btn">
            <Plus size={18} /> New Report
          </Link>
        </header>

        <section className="dashboard-welcome">
          <div>
            <span className="welcome-tag">YOUR CAMPUS, YOUR COMMUNITY</span>
            <h1>Welcome back, Student!</h1>
            <p>Keep track of your reports and find what you've lost.</p>
          </div>
          <div className="welcome-icon">
            <Package size={55} strokeWidth={1.2} />
          </div>
        </section>

        <section className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-icon blue"><FileText /></span>
            <p>Total Reports</p>
            <h2>04</h2>
            <span className="stat-note">Items you've reported</span>
          </div>

          <div className="stat-card">
            <span className="stat-icon orange"><Search /></span>
            <p>Lost Items</p>
            <h2>02</h2>
            <span className="stat-note">Still looking for</span>
          </div>

          <div className="stat-card">
            <span className="stat-icon green"><Package /></span>
            <p>Found Items</p>
            <h2>02</h2>
            <span className="stat-note">Reported by you</span>
          </div>

          <div className="stat-card">
            <span className="stat-icon purple"><MessageSquare /></span>
            <p>Active Claims</p>
            <h2>01</h2>
            <span className="stat-note">Waiting for response</span>
          </div>
        </section>

        <section className="dashboard-content-grid">
          <div className="dashboard-panel reports-panel">
            <div className="panel-heading">
              <div>
                <h3>Recent Reports</h3>
                <p>Your latest lost and found reports</p>
              </div>
              <Link to="/my-reports">View all <ArrowRight size={15} /></Link>
            </div>

            <div className="report-list">
              {recentReports.map((report) => (
                <div className="report-row" key={`${report.name}-${report.date}`}>
                  <div className="report-item-icon">
                    <Package size={21} />
                  </div>
                  <div className="report-details">
                    <strong>{report.name}</strong>
                    <span><MapPin size={13} /> {report.location}</span>
                    <span><Clock size={13} /> {report.date}</span>
                  </div>
                  <div className="report-status">
                    <span className={`type-badge ${report.type.toLowerCase()}`}>
                      {report.type}
                    </span>
                    <span className="status-text">{report.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-panel matches-panel">
            <div className="panel-heading">
              <div>
                <h3>Possible Matches</h3>
                <p>Items that may match your reports</p>
              </div>
              <Search size={19} />
            </div>

            {matches.map((item) => (
              <div className="match-card" key={`${item.name}-${item.location}`}>
                <div className="match-top">
                  <strong>{item.name}</strong>
                  <span>{item.match}</span>
                </div>
                <p><MapPin size={13} /> {item.location}</p>
                <small>{item.date}</small>
                <Link to="/browse">View item <ArrowRight size={14} /></Link>
              </div>
            ))}

            <div className="match-info">
              Matches are suggested using item details and location.
            </div>
          </div>
        </section>

        <section className="dashboard-quick-actions">
          <h3>What would you like to do?</h3>
          <div className="quick-action-grid">
            <Link to="/report" className="quick-action">
              <Plus size={22} />
              <div>
                <strong>Report Lost Item</strong>
                <span>Tell us what you lost</span>
              </div>
              <ArrowRight size={17} />
            </Link>

            <Link to="/report" className="quick-action">
              <Package size={22} />
              <div>
                <strong>Report Found Item</strong>
                <span>Help someone find their item</span>
              </div>
              <ArrowRight size={17} />
            </Link>

            <Link to="/browse" className="quick-action">
              <Search size={22} />
              <div>
                <strong>Browse Items</strong>
                <span>Explore campus listings</span>
              </div>
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>

      </main>
    </StudentLayout>
  );
}
