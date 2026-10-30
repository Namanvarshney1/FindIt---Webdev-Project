
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ArrowLeft,
  Search,
  MapPin,
  CalendarDays,
  SlidersHorizontal,
  Plus,
  X
} from "lucide-react";

import wallet from "../../assets/wallet.jpg";
import headphones from "../../assets/headphones.jpg";
import notebook from "../../assets/notebook.jpg";
import smartwatch from "../../assets/smartwatch.jpg";

import "../../Browse.css";

const items = [
  {
    id: 1,
    name: "Black Leather Wallet",
    category: "Bags & Wallets",
    location: "Central Library",
    date: "2026-10-30",
    status: "Found",
    image: wallet,
    description: "A black leather wallet found near the Central Library."
  },
  {
    id: 2,
    name: "Wireless Headphones",
    category: "Electronics",
    location: "Academic Block",
    date: "2026-10-29",
    status: "Lost",
    image: headphones,
    description: "Black wireless headphones with a charging case."
  },
  {
    id: 3,
    name: "Blue Notebook",
    category: "Books & Notes",
    location: "Block 7",
    date: "2026-10-28",
    status: "Found",
    image: notebook,
    description: "A blue notebook with handwritten class notes."
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    location: "Cafeteria",
    date: "2026-10-27",
    status: "Lost",
    image: smartwatch,
    description: "A smartwatch with a dark strap."
  }
];

export default function Browse() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All");
  const [location, setLocation] = useState("All Locations");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const searchMatch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const categoryMatch =
        category === "All Categories" || item.category === category;

      const statusMatch =
        status === "All" || item.status === status;

      const locationMatch =
        location === "All Locations" || item.location === location;

      return searchMatch && categoryMatch && statusMatch && locationMatch;
    });
  }, [search, category, status, location]);

  function clearFilters() {
    setSearch("");
    setCategory("All Categories");
    setStatus("All");
    setLocation("All Locations");
  }

  function formatDate(date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  return (
    <div className="browse-page">

      <header className="browse-navbar">
        <Link to="/" className="browse-logo">
          <Package size={25} />
          FindIt<span>.</span>
        </Link>

        <div className="browse-nav-actions">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/report" className="browse-report-btn">
            <Plus size={17} /> Report Item
          </Link>
        </div>
      </header>

      <main className="browse-container">

        <div className="browse-heading">
          <Link to="/" className="browse-back">
            <ArrowLeft size={15} /> Back to Home
          </Link>

          <span className="browse-eyebrow">CAMPUS LOST & FOUND</span>
          <h1>Explore Items</h1>
          <p>
            Search for lost belongings or help someone recover
            something they've misplaced.
          </p>
        </div>

        <section className="browse-search-section">
          <div className="browse-search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search item name, description or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <div className="browse-filter-heading">
            <span><SlidersHorizontal size={16} /> FILTER ITEMS</span>
            <button type="button" onClick={clearFilters}>
              Clear all
            </button>
          </div>

          <div className="browse-filters">

            <div className="browse-filter">
              <label htmlFor="status-filter">Item Status</label>
              <select
                id="status-filter"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="All">All Items</option>
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
              </select>
            </div>

            <div className="browse-filter">
              <label htmlFor="category-filter">Category</label>
              <select
                id="category-filter"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Bags & Wallets</option>
                <option>Books & Notes</option>
                <option>Accessories</option>
                <option>Clothing</option>
                <option>Documents</option>
                <option>Other</option>
              </select>
            </div>

            <div className="browse-filter">
              <label htmlFor="location-filter">Location</label>
              <select
                id="location-filter"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option>All Locations</option>
                <option>Central Library</option>
                <option>Academic Block</option>
                <option>Block 7</option>
                <option>Cafeteria</option>
              </select>
            </div>

          </div>
        </section>

        <section className="browse-results">

          <div className="browse-results-heading">
            <div>
              <h2>Recently Reported Items</h2>
              <p>
                Showing {filteredItems.length}{" "}
                {filteredItems.length === 1 ? "item" : "items"}
              </p>
            </div>

            <span className="browse-result-count">
              {filteredItems.length} RESULTS
            </span>
          </div>

          {filteredItems.length > 0 ? (
            <div className="browse-items-grid">
              {filteredItems.map((item) => (
                <article className="browse-item-card" key={item.id}>

                  <div className="browse-item-image">
                    <img src={item.image} alt={item.name} />

                    <span
                      className={`browse-status ${item.status.toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="browse-item-content">
                    <span className="browse-item-category">
                      {item.category}
                    </span>

                    <h3>{item.name}</h3>

                    <p className="browse-item-description">
                      {item.description}
                    </p>

                    <div className="browse-item-meta">
                      <span>
                        <MapPin size={14} /> {item.location}
                      </span>

                      <span>
                        <CalendarDays size={14} /> {formatDate(item.date)}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="browse-view-btn"
                      onClick={() => setSelectedItem(item)}
                    >
                      View Details <ArrowLeft size={15} />
                    </button>
                  </div>

                </article>
              ))}
            </div>
          ) : (
            <div className="browse-empty">
              <Package size={38} />
              <h3>No items found</h3>
              <p>Try changing your search or filters.</p>
              <button type="button" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}

        </section>
      </main>

      {/* ITEM DETAILS MODAL */}
      {selectedItem && (
        <div
          className="browse-modal-overlay"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="browse-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="browse-modal-close"
              onClick={() => setSelectedItem(null)}
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="browse-modal-image"
            />

            <span
              className={`browse-status ${selectedItem.status.toLowerCase()}`}
            >
              {selectedItem.status}
            </span>

            <span className="browse-item-category">
              {selectedItem.category}
            </span>

            <h2>{selectedItem.name}</h2>
            <p>{selectedItem.description}</p>

            <div className="browse-modal-info">
              <span>
                <MapPin size={16} /> {selectedItem.location}
              </span>
              <span>
                <CalendarDays size={16} /> {formatDate(selectedItem.date)}
              </span>
            </div>

            <Link to="/login" className="browse-claim-btn">
              Login to Contact / Claim Item
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
