
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShieldCheck,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  User
} from "lucide-react";

import { useProfile } from "../context/useProfile";
import "../styles/components/AdminLayout.css";

export default function AdminLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const { profile, profileImage } = useProfile("admin");

  const avatarLetter =
    profile.name?.trim().charAt(0).toUpperCase() || "A";

  return (
    <div className="admin-layout">

      {menuOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`admin-sidebar ${menuOpen ? "open" : ""}`}>

        <div className="admin-sidebar-top">
          <Link
            to="/admin/dashboard"
            className="admin-brand"
            onClick={() => setMenuOpen(false)}
          >
            Find<span>It.</span>
          </Link>

          <button
            type="button"
            className="admin-sidebar-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Admin Profile */}
        <div className="admin-user">

          <div className="admin-avatar">
            {profileImage ? (
              <img src={profileImage} alt="Admin profile" />
            ) : (
              avatarLetter
            )}
          </div>

          <div className="admin-user-details">
            <h3>{profile.name || "Administrator"}</h3>
            <p>Admin Account</p>
          </div>

        </div>

        <div className="admin-nav-label">MAIN MENU</div>

        <nav className="admin-nav">

          <NavLink
            to="/admin/dashboard"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <LayoutDashboard /> Overview
          </NavLink>

          <NavLink
            to="/admin/items"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Package /> Manage Items
          </NavLink>

          <NavLink
            to="/admin/claims"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <ShieldCheck /> Manage Claims
          </NavLink>

          <NavLink
            to="/admin/users"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Users /> Students
          </NavLink>

          <NavLink
            to="/admin/analytics"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <BarChart3 /> Analytics
          </NavLink>

          <NavLink
            to="/admin/profile"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <User /> My Profile
          </NavLink>

          <NavLink
            to="/admin/settings"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Settings /> Settings
          </NavLink>

        </nav>

        <Link
          to="/"
          className="admin-logout"
          onClick={() => setMenuOpen(false)}
        >
          <LogOut /> Back to Home
        </Link>

      </aside>

      <div className="admin-content-area">

        <header className="admin-header">

          <button
            type="button"
            className="admin-mobile-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>

          <div className="admin-header-right">

            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `admin-header-dashboard-link ${isActive ? "active" : ""}`
              }
            >
              Dashboard
            </NavLink>

            <div className="admin-header-brand">
              Find<span>It.</span>
            </div>

          </div>

        </header>

        {children}

      </div>
    </div>
  );
}
