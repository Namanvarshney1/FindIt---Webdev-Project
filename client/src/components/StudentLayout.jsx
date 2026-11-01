
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  FileText,
  ClipboardList,
  IdCard,
  User,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";

import { useProfile } from "../context/useProfile";
import "../styles/components/StudentLayout.css";

export default function StudentLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const { profile, profileImage } = useProfile("student");

  const avatarLetter =
    profile.name?.trim().charAt(0).toUpperCase() || "S";

  return (
    <div className="student-layout">

      {/* Mobile Top Bar */}
      <header className="student-mobile-header">
        <button
          type="button"
          className="student-mobile-toggle"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        <Link to="/" className="student-mobile-brand">
          Find<span>It.</span>
        </Link>
      </header>

      {/* Mobile backdrop */}
      {menuOpen && (
        <div
          className="student-sidebar-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Student Sidebar */}
      <aside className={`student-sidebar ${menuOpen ? "open" : ""}`}>

        <div className="student-sidebar-top">
          <Link
            to="/"
            className="student-brand"
            onClick={() => setMenuOpen(false)}
          >
            Find<span>It.</span>
          </Link>

          <button
            type="button"
            className="student-sidebar-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Student Profile */}
        <div className="student-user">

          <div className="student-avatar">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Student profile"
              />
            ) : (
              avatarLetter
            )}
          </div>

          <div className="student-user-details">
            <h3>{profile.name || "Student User"}</h3>
            <p>Student Account</p>
          </div>

        </div>

        {/* Navigation */}
        <nav className="student-nav">

          <NavLink
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          <NavLink
            to="/browse"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Search size={18} /> Browse Items
          </NavLink>

          <NavLink
            to="/report"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FileText size={18} /> Report Item
          </NavLink>

          <NavLink
            to="/my-reports"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <ClipboardList size={18} /> My Reports
          </NavLink>

          <NavLink
            to="/my-claims"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <IdCard size={18} /> My Claims
          </NavLink>

          <NavLink
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <User size={18} /> My Profile
          </NavLink>

          <NavLink
            to="/settings"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Settings size={18} /> Settings
          </NavLink>

        </nav>

        {/* Back to Home */}
        <Link
          to="/"
          className="student-logout"
          onClick={() => setMenuOpen(false)}
        >
          <LogOut size={18} /> Back to Home
        </Link>

      </aside>

      {/* Main Page Content */}
      <div className="student-content-area">
        {children}
      </div>

    </div>
  );
}
