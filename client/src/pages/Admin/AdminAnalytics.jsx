
import {
  Package, ShieldCheck, Users,
  TrendingUp, TrendingDown, CalendarDays
} from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import "../../styles/admin/AdminAnalytics.css";

const monthlyData = [
  { month: "May", lost: 20, found: 30 },
  { month: "Jun", lost: 35, found: 42 },
  { month: "Jul", lost: 28, found: 50 },
  { month: "Aug", lost: 45, found: 58 },
  { month: "Sep", lost: 38, found: 65 },
  { month: "Oct", lost: 55, found: 75 }
];

const categoryData = [
  { name: "Electronics", value: 38, color: "#294e70" },
  { name: "Bags & Wallets", value: 25, color: "#c87558" },
  { name: "Books & Notes", value: 20, color: "#6b9b83" },
  { name: "Accessories", value: 12, color: "#a69b79" },
  { name: "Others", value: 5, color: "#a6adb5" }
];

const activities = [
  { title: "New wallet report submitted", detail: "Black Leather Wallet", time: "10 minutes ago", type: "Report" },
  { title: "Claim request approved", detail: "Wireless Headphones", time: "35 minutes ago", type: "Claim" },
  { title: "New student registered", detail: "Aarav Sharma", time: "1 hour ago", type: "Student" },
  { title: "New found item reported", detail: "Blue Notebook", time: "2 hours ago", type: "Report" }
];

const totalLost = 96;
const totalFound = 152;
const totalReports = totalLost + totalFound;
const maxMonthlyValue = Math.max(...monthlyData.map(d => d.lost + d.found));

function AdminAnalytics() {
  return (
    <AdminLayout>
      {/* MAIN CONTENT */}
      <main className="admin-analytics-main">

        <header className="admin-analytics-header">
          <div>
            <span>ADMINISTRATION</span>
            <h1>Analytics & Reports</h1>
            <p>Understand platform activity and lost-and-found trends.</p>
          </div>

          <div className="admin-analytics-date">
            <CalendarDays size={17} />
            October 2026
          </div>
        </header>

        {/* SUMMARY CARDS */}
        <section className="analytics-stats-grid">

          <div className="analytics-stat-card">
            <div className="analytics-stat-top">
              <span>Total Reports</span>
              <Package />
            </div>
            <h2>{totalReports}</h2>
            <p><TrendingUp size={14} /> 12% increase this month</p>
          </div>

          <div className="analytics-stat-card">
            <div className="analytics-stat-top">
              <span>Lost Items</span>
              <TrendingDown />
            </div>
            <h2>{totalLost}</h2>
            <p>Items reported as lost</p>
          </div>

          <div className="analytics-stat-card">
            <div className="analytics-stat-top">
              <span>Found Items</span>
              <TrendingUp />
            </div>
            <h2>{totalFound}</h2>
            <p>Items reported as found</p>
          </div>

          <div className="analytics-stat-card">
            <div className="analytics-stat-top">
              <span>Recovery Rate</span>
              <ShieldCheck />
            </div>
            <h2>68%</h2>
            <p>Successful item recoveries</p>
          </div>

        </section>

        {/* MONTHLY CHART */}
        <section className="analytics-panel">
          <div className="analytics-panel-heading">
            <div>
              <h2>Monthly Reports Overview</h2>
              <p>Comparison of lost and found reports.</p>
            </div>
            <span className="analytics-period">Last 6 Months</span>
          </div>

          <div className="analytics-legend">
            <span><i className="legend-lost" /> Lost Items</span>
            <span><i className="legend-found" /> Found Items</span>
          </div>

          <div className="analytics-chart">
            {monthlyData.map(data => (
              <div className="analytics-chart-column" key={data.month}>
                <div className="analytics-bars">
                  <div
                    className="analytics-bar lost-bar"
                    style={{ height: `${(data.lost / maxMonthlyValue) * 100}%` }}
                    title={`Lost: ${data.lost}`}
                  />
                  <div
                    className="analytics-bar found-bar"
                    style={{ height: `${(data.found / maxMonthlyValue) * 100}%` }}
                    title={`Found: ${data.found}`}
                  />
                </div>
                <span>{data.month}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORY AND CLAIMS */}
        <section className="analytics-bottom-grid">

          <div className="analytics-panel">
            <div className="analytics-panel-heading">
              <div>
                <h2>Category Distribution</h2>
                <p>Reports by item category.</p>
              </div>
            </div>

            <div className="analytics-category-list">
              {categoryData.map(category => (
                <div className="analytics-category-row" key={category.name}>
                  <div className="analytics-category-info">
                    <span>
                      <i style={{ background: category.color }} />
                      {category.name}
                    </span>
                    <strong>{category.value}%</strong>
                  </div>

                  <div className="analytics-progress">
                    <div
                      style={{
                        width: `${category.value}%`,
                        background: category.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="analytics-panel">
            <div className="analytics-panel-heading">
              <div>
                <h2>Claim Statistics</h2>
                <p>Current claim request status.</p>
              </div>
            </div>

            <div className="analytics-claim-summary">
              <div>
                <span className="claim-dot pending-dot" />
                <span>Pending Claims</span>
                <strong>18</strong>
              </div>

              <div>
                <span className="claim-dot approved-dot" />
                <span>Approved Claims</span>
                <strong>42</strong>
              </div>

              <div>
                <span className="claim-dot rejected-dot" />
                <span>Rejected Claims</span>
                <strong>8</strong>
              </div>

              <div className="analytics-total-claims">
                <span>Total Claims</span>
                <strong>68</strong>
              </div>
            </div>
          </div>

        </section>

        {/* RECENT ACTIVITY */}
        <section className="analytics-panel analytics-activity-panel">
          <div className="analytics-panel-heading">
            <div>
              <h2>Recent Platform Activity</h2>
              <p>Latest actions performed on FindIt.</p>
            </div>
          </div>

          <div className="analytics-activity-list">
            {activities.map((activity) => (
              <div className="analytics-activity-item" key={`${activity.title}-${activity.time}`}>
                <div className="analytics-activity-icon">
                  {activity.type === "Report" ? <Package size={18} /> :
                   activity.type === "Claim" ? <ShieldCheck size={18} /> :
                   <Users size={18} />}
                </div>

                <div className="analytics-activity-info">
                  <h3>{activity.title}</h3>
                  <p>{activity.detail}</p>
                </div>

                <span>{activity.time}</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="admin-analytics-footer">
          <span>FindIt. Administration Panel</span>
          <span>Version 1.0</span>
        </footer>

      </main>
    </AdminLayout>
  );
}

export default AdminAnalytics;
