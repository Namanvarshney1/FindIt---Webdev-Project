
import { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  Search,
  MapPin,
  ArrowRight,
  Plus,
  BookOpen,
  Smartphone,
  Wallet,
  Watch,
  Package
} from "lucide-react";

import campus from "./assets/campus.jpg";
import wallet from "./assets/wallet.jpg";
import headphones from "./assets/headphones.jpg";
import notebook from "./assets/notebook.jpg";
import smartwatch from "./assets/smartwatch.jpg";

import Login from "./pages/student/Login";
import Register from "./pages/student/Register";
import Dashboard from "./pages/student/Dashboard";
import Report from "./pages/student/Report";
import Browse from "./pages/student/Browse";
import MyClaims from "./pages/student/MyClaims";
import Profile from "./pages/student/Profile";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminClaims from "./pages/Admin/AdminClaims";
import AdminItems from "./pages/Admin/AdminItems";
import Settings from "./pages/student/Settings";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminAnalytics from "./pages/Admin/AdminAnalytics";
import AdminSettings from "./pages/Admin/AdminSettings";
import ForgotPassword from "./pages/student/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLogin from "./pages/Admin/AdminLogin";
import NotFound from "./pages/NotFound";
import MyReports from "./pages/student/MyReports";

import "./styles/App.css";

const categories = [
  { name: "All Items", icon: Package },
  { name: "Electronics", icon: Smartphone },
  { name: "Bags & Wallets", icon: Wallet },
  { name: "Books & Notes", icon: BookOpen },
  { name: "Accessories", icon: Watch }
];

const items = [
  {
    id: 1,
    name: "Black Leather Wallet",
    category: "Bags & Wallets",
    location: "Central Library",
    date: "Oct 30, 2026",
    status: "Found",
    image: wallet
  },
  {
    id: 2,
    name: "Wireless Headphones",
    category: "Electronics",
    location: "Academic Block",
    date: "Oct 29, 2026",
    status: "Lost",
    image: headphones
  },
  {
    id: 3,
    name: "Blue Notebook",
    category: "Books & Notes",
    location: "Block 7",
    date: "Oct 28, 2026",
    status: "Found",
    image: notebook
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    location: "Cafeteria",
    date: "Oct 27, 2026",
    status: "Lost",
    image: smartwatch
  }
];

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [searchTerm, setSearchTerm] = useState("");

const filteredItems = useMemo(() => {
  return items.filter((item) => {
    const search = searchTerm.trim().toLowerCase();

    const matchesCategory =
      selectedCategory === "All Items" ||
      item.category === selectedCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(search) ||
      item.location.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });
}, [selectedCategory, searchTerm]);

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">
            <Package size={25} />
            FindIt<span>.</span>
          </Link>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <a href="#browse">Browse Items</a>
            <a href="#how-it-works">How It Works</a>
          </div>

          <div className="nav-actions">
            <Link to="/login" className="login-link">
              Login
            </Link>

            <Link to="/register" className="register-btn">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">
            YOUR CAMPUS LOST & FOUND PLATFORM
          </span>

          <h1>
            Lost something?
            <br />
            <span>Let's find it.</span>
          </h1>

          <p>
            A smarter way to report lost belongings and reconnect
            people with the things that matter.
          </p>

          <div className="hero-actions">
            <Link to="/login" className="primary-btn">
              Report an Item <ArrowRight size={17} />
            </Link>

            <a href="#browse" className="secondary-btn">
              Browse Items
            </a>
          </div>

          <div className="hero-location">
            <MapPin size={15} />
            Made for your campus community
          </div>
        </div>

        <div className="hero-image">
          <img src={campus} alt="College campus" />
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="search-section" id="browse">
        <div className="section-heading">
          <span>FIND WHAT YOU NEED</span>
          <h2>Explore lost & found items</h2>
          <p>Search through items reported by your campus community.</p>
        </div>

        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by item name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* CATEGORIES */}
        <div className="categories">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                className={
                  selectedCategory === category.name
                    ? "category-btn active"
                    : "category-btn"
                }
                onClick={() => setSelectedCategory(category.name)}
              >
                <Icon size={18} />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* ITEMS */}
        <div className="items-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div className="item-card" key={item.id}>
                <div className="item-image">
                  <img src={item.image} alt={item.name} />

                  <span
                    className={`item-status ${item.status.toLowerCase()}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="item-info">
                  <span className="item-category">
                    {item.category}
                  </span>

                  <h3>{item.name}</h3>

                  <p>
                    <MapPin size={14} />
                    {item.location}
                  </p>

                  <div className="item-footer">
                    <span>{item.date}</span>

                    <Link to="/login">
                      View Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-items">
              No items found. Try another search.
            </p>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how-it-works">
        <div className="section-heading">
          <span>SIMPLE PROCESS</span>
          <h2>How FindIt works</h2>
          <p>Three simple steps to reconnect with your belongings.</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-icon">
              <Plus size={25} />
            </div>
            <span>01</span>
            <h3>Report an Item</h3>
            <p>
              Report something you've lost or found on campus.
            </p>
          </div>

          <div className="step-card">
            <div className="step-icon">
              <Search size={25} />
            </div>
            <span>02</span>
            <h3>Find a Match</h3>
            <p>
              Browse listings and discover possible matching items.
            </p>
          </div>

          <div className="step-card">
            <div className="step-icon">
              <Package size={25} />
            </div>
            <span>03</span>
            <h3>Get It Back</h3>
            <p>
              Connect with the finder and recover your belongings.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">
          <Package size={22} />
          FindIt<span>.</span>
        </div>

        <p>
          Helping campus communities reconnect with what matters.
        </p>

        <span>© 2026 FindIt. All rights reserved.</span>
      </footer>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/report" element={<Report />} />
        <Route path="/my-reports" element={<MyReports />} />
        <Route path="/my-claims" element={<MyClaims />} />
        <Route path="/admin/items" element={<AdminItems />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/claims" element={<AdminClaims />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
