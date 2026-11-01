
import { useState, useMemo, useEffect } from "react";
import {
  Search,
  MapPin,
  Check,
  X,
  Trash2,
  Eye,
  Pencil,
  Save
} from "lucide-react";

import AdminLayout from "../../components/AdminLayout";
import "../../styles/admin/AdminItems.css";

const initialItems = [
  {
    id: 1,
    name: "Black Leather Wallet",
    category: "Bags & Wallets",
    type: "Found",
    location: "Central Library",
    date: "30 Oct 2026",
    status: "Pending",
    description: "A black leather wallet found near the library."
  },
  {
    id: 2,
    name: "Wireless Headphones",
    category: "Electronics",
    type: "Lost",
    location: "Academic Block",
    date: "29 Oct 2026",
    status: "Approved",
    description: "Wireless headphones reported missing in the academic block."
  },
  {
    id: 3,
    name: "Blue Notebook",
    category: "Books & Notes",
    type: "Found",
    location: "Block 7",
    date: "28 Oct 2026",
    status: "Pending",
    description: "A blue notebook found in Block 7."
  },
  {
    id: 4,
    name: "Smart Watch",
    category: "Electronics",
    type: "Lost",
    location: "Cafeteria",
    date: "27 Oct 2026",
    status: "Rejected",
    description: "A smart watch reported lost near the cafeteria."
  },
  {
    id: 5,
    name: "Student ID Card",
    category: "Accessories",
    type: "Found",
    location: "Main Gate",
    date: "26 Oct 2026",
    status: "Pending",
    description: "A student ID card found near the main gate."
  }
];

const emptyForm = {
  name: "",
  category: "",
  type: "Lost",
  location: "",
  date: "",
  description: ""
};

// Load saved reports from localStorage
const getSavedItems = () => {
  try {
    const savedItems = localStorage.getItem("findit_admin_items");

    if (savedItems !== null) {
      const parsedItems = JSON.parse(savedItems);

      return Array.isArray(parsedItems) ? parsedItems : initialItems;
    }

    return initialItems;
  } catch {
    return initialItems;
  }
};

function AdminItems() {
  const [items, setItems] = useState(getSavedItems);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteItemData, setDeleteItemData] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [message, setMessage] = useState("");

  // Save all item changes automatically
  useEffect(() => {
  try {
    localStorage.setItem(
      "findit_admin_items",
      JSON.stringify(items)
    );
  } catch (error) {
    console.error("Unable to save admin items:", error);
  }
}, [items]);

  // Approve or reject report
  const updateStatus = (id, status) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, status }
          : item
      )
    );

    setMessage(`Report ${status.toLowerCase()} successfully.`);
  };

  // Open item details
  const openDetails = (item) => {
    setSelectedItem(item);
    setEditingItem(null);
  };

  // Open edit form
  const openEdit = (item) => {
    setFormData({
      name: item.name || "",
      category: item.category || "",
      type: item.type || "Lost",
      location: item.location || "",
      date: item.date || "",
      description: item.description || ""
    });

    setEditingItem(item);
    setSelectedItem(null);
    setMessage("");
  };

  // Update form fields
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save edited report
  const saveEdit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.category.trim() ||
      !formData.location.trim() ||
      !formData.date.trim()
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.id === editingItem.id
          ? {
              ...item,
              ...formData,
              name: formData.name.trim(),
              category: formData.category.trim(),
              location: formData.location.trim(),
              description: formData.description.trim()
            }
          : item
      )
    );

    setEditingItem(null);
    setFormData(emptyForm);
    setMessage("Report updated successfully.");
  };

  // Open delete confirmation
  const confirmDelete = (item) => {
    setDeleteItemData(item);
  };

  // Delete report
  const deleteItem = () => {
    if (!deleteItemData) return;

    setItems(prev =>
      prev.filter(item => item.id !== deleteItemData.id)
    );

    setSelectedItem(null);
    setDeleteItemData(null);

    setMessage("Report deleted successfully.");
  };

  // Dashboard statistics
  const stats = useMemo(() => ({
    total: items.length,
    lost: items.filter(item => item.type === "Lost").length,
    found: items.filter(item => item.type === "Found").length,
    pending: items.filter(item => item.status === "Pending").length
  }), [items]);

  // Search and filters
  const filteredItems = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return items.filter(item => {
      const matchesSearch =
        (item.name || "").toLowerCase().includes(searchTerm) ||
        (item.location || "").toLowerCase().includes(searchTerm) ||
        (item.category || "").toLowerCase().includes(searchTerm) ||
        (item.description || "").toLowerCase().includes(searchTerm);

      const matchesType =
        typeFilter === "All" || item.type === typeFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [items, search, typeFilter, statusFilter]);

  return (
    <AdminLayout>
      <main className="admin-items-main">

        {/* PAGE HEADER */}
        <header className="admin-items-header">
          <div>
            <span className="admin-items-eyebrow">
              ADMINISTRATION
            </span>

            <h1>Manage Items</h1>

            <p>
              Review and manage all lost and found reports.
            </p>
          </div>
        </header>

        {/* FEEDBACK MESSAGE */}
        {message && (
          <div className="admin-items-message" role="status">
            {message}

            <button
              type="button"
              onClick={() => setMessage("")}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
        )}

        {/* STATISTICS */}
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

        {/* REPORTS PANEL */}
        <section className="admin-items-panel">

          <div className="admin-items-panel-heading">
            <div>
              <h2>All Reports</h2>
              <p>Review, approve or reject student submissions.</p>
            </div>
          </div>

          {/* SEARCH AND FILTERS */}
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

          {/* ITEMS TABLE */}
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
                        <MapPin size={13} />
                        {item.location}
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

                        <button
                          type="button"
                          className="admin-view"
                          title="View Details"
                          aria-label={`View ${item.name}`}
                          onClick={() => openDetails(item)}
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          type="button"
                          className="admin-edit"
                          title="Edit Item"
                          aria-label={`Edit ${item.name}`}
                          onClick={() => openEdit(item)}
                        >
                          <Pencil size={16} />
                        </button>

                        {item.status === "Pending" && (
                          <>
                            <button
                              type="button"
                              className="admin-approve"
                              title="Approve"
                              onClick={() =>
                                updateStatus(item.id, "Approved")
                              }
                            >
                              <Check size={16} />
                            </button>

                            <button
                              type="button"
                              className="admin-reject"
                              title="Reject"
                              onClick={() =>
                                updateStatus(item.id, "Rejected")
                              }
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}

                        <button
                          type="button"
                          className="admin-delete"
                          title="Delete"
                          aria-label={`Delete ${item.name}`}
                          onClick={() => confirmDelete(item)}
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
                      No reports found. Try changing your search or filters.
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

        {/* FOOTER */}
        <footer className="admin-items-footer">
          <span>FindIt. Administration Panel</span>
          <span>Version 1.0</span>
        </footer>

        {/* VIEW DETAILS MODAL */}
        {selectedItem && (
          <div
            className="admin-item-modal-overlay"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="admin-item-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="admin-item-details-title"
              onClick={e => e.stopPropagation()}
            >

              <div className="admin-item-modal-header">
                <div>
                  <span>REPORT DETAILS</span>
                  <h2 id="admin-item-details-title">
                    Item Information
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close details"
                >
                  <X />
                </button>
              </div>

              <div className="admin-item-details-content">

                <div className="admin-item-detail-row">
                  <span>Item Name</span>
                  <strong>{selectedItem.name}</strong>
                </div>

                <div className="admin-item-detail-row">
                  <span>Category</span>
                  <strong>{selectedItem.category}</strong>
                </div>

                <div className="admin-item-detail-row">
                  <span>Report Type</span>
                  <strong>{selectedItem.type}</strong>
                </div>

                <div className="admin-item-detail-row">
                  <span>Location</span>
                  <strong>{selectedItem.location}</strong>
                </div>

                <div className="admin-item-detail-row">
                  <span>Date</span>
                  <strong>{selectedItem.date}</strong>
                </div>

                <div className="admin-item-detail-row">
                  <span>Status</span>
                  <span className={`admin-item-status ${selectedItem.status.toLowerCase()}`}>
                    {selectedItem.status}
                  </span>
                </div>

                <div className="admin-item-detail-description">
                  <span>Description</span>
                  <p>
                    {selectedItem.description || "No description provided."}
                  </p>
                </div>

              </div>

              <div className="admin-item-modal-actions">

                <button
                  type="button"
                  className="admin-modal-secondary"
                  onClick={() => setSelectedItem(null)}
                >
                  Close
                </button>

                <button
                  type="button"
                  className="admin-modal-primary"
                  onClick={() => openEdit(selectedItem)}
                >
                  <Pencil size={15} />
                  Edit Item
                </button>

              </div>

            </div>
          </div>
        )}

        {/* EDIT ITEM MODAL */}
        {editingItem && (
          <div
            className="admin-item-modal-overlay"
            onClick={() => setEditingItem(null)}
          >
            <div
              className="admin-item-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="admin-edit-title"
              onClick={e => e.stopPropagation()}
            >

              <div className="admin-item-modal-header">
                <div>
                  <span>EDIT REPORT</span>
                  <h2 id="admin-edit-title">
                    Update Item Details
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  aria-label="Close edit form"
                >
                  <X />
                </button>
              </div>

              <form onSubmit={saveEdit}>

                <div className="admin-item-edit-grid">

                  <label>
                    Item Name *
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </label>

                  <label>
                    Category *
                    <input
                      name="category"
                      value={formData.category}
                      onChange={handleFormChange}
                      required
                    />
                  </label>

                  <label>
                    Report Type *
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleFormChange}
                    >
                      <option value="Lost">Lost</option>
                      <option value="Found">Found</option>
                    </select>
                  </label>

                  <label>
                    Location *
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                      required
                    />
                  </label>

                  <label>
                    Date *
                    <input
                      name="date"
                      value={formData.date}
                      onChange={handleFormChange}
                      required
                    />
                  </label>

                  <label className="admin-edit-full-width">
                    Description
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      rows={4}
                      placeholder="Enter item description"
                    />
                  </label>

                </div>

                <div className="admin-item-modal-actions">

                  <button
                    type="button"
                    className="admin-modal-secondary"
                    onClick={() => setEditingItem(null)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="admin-modal-primary"
                  >
                    <Save size={15} />
                    Save Changes
                  </button>

                </div>

              </form>

            </div>
          </div>
        )}

        {/* CUSTOM DELETE CONFIRMATION */}
        {deleteItemData && (
          <div
            className="admin-item-modal-overlay"
            onClick={() => setDeleteItemData(null)}
          >
            <div
              className="admin-delete-modal"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="admin-delete-title"
              onClick={e => e.stopPropagation()}
            >

              <div className="admin-delete-icon">
                <Trash2 size={23} />
              </div>

              <h2 id="admin-delete-title">
                Delete Report?
              </h2>

              <p>
                Are you sure you want to delete{" "}
                <strong>{deleteItemData.name}</strong>?
                This action cannot be undone.
              </p>

              <div className="admin-item-modal-actions">

                <button
                  type="button"
                  className="admin-modal-secondary"
                  onClick={() => setDeleteItemData(null)}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="admin-delete-confirm"
                  onClick={deleteItem}
                >
                  <Trash2 size={15} />
                  Delete Item
                </button>

              </div>

            </div>
          </div>
        )}

      </main>
    </AdminLayout>
  );
}

export default AdminItems;
