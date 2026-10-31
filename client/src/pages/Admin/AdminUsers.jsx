
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShieldCheck,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Eye,
  UserCheck,
  UserX,
  X
} from "lucide-react";

import "../../styles/admin/AdminUsers.css";

const initialStudents = [
  {
    id: 1,
    name: "Aarav Sharma",
    studentId: "STU1001",
    email: "aarav@college.edu",
    department: "Computer Science",
    phone: "9876543210",
    status: "Active",
    joined: "12 Oct 2026"
  },
  {
    id: 2,
    name: "Priya Singh",
    studentId: "STU1002",
    email: "priya@college.edu",
    department: "Information Technology",
    phone: "9876543211",
    status: "Active",
    joined: "14 Oct 2026"
  },
  {
    id: 3,
    name: "Rahul Verma",
    studentId: "STU1003",
    email: "rahul@college.edu",
    department: "Computer Science",
    phone: "9876543212",
    status: "Blocked",
    joined: "15 Oct 2026"
  },
  {
    id: 4,
    name: "Sneha Gupta",
    studentId: "STU1004",
    email: "sneha@college.edu",
    department: "Electronics",
    phone: "9876543213",
    status: "Active",
    joined: "18 Oct 2026"
  },
  {
    id: 5,
    name: "Rohan Mehta",
    studentId: "STU1005",
    email: "rohan@college.edu",
    department: "Mechanical",
    phone: "9876543214",
    status: "Active",
    joined: "20 Oct 2026"
  },
  {
    id: 6,
    name: "Ananya Roy",
    studentId: "STU1006",
    email: "ananya@college.edu",
    department: "Information Technology",
    phone: "9876543215",
    status: "Blocked",
    joined: "22 Oct 2026"
  }
];

function AdminUsers() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  // Open confirmation popup
  const requestStatusChange = (student) => {
    setSelectedStudent(null);
    setConfirmAction(student);
  };

  // Change student status after confirmation
  const confirmStatusChange = () => {
    if (!confirmAction) return;

    const newStatus =
      confirmAction.status === "Active" ? "Blocked" : "Active";

    setStudents(prev =>
      prev.map(student =>
        student.id === confirmAction.id
          ? { ...student, status: newStatus }
          : student
      )
    );

    setConfirmAction(null);
    setSelectedStudent(null);
  };

  const userStats = useMemo(() => ({
    total: students.length,
    active: students.filter(s => s.status === "Active").length,
    blocked: students.filter(s => s.status === "Blocked").length
  }), [students]);

  // Search and filter students
  const filteredStudents = useMemo(() => {
    const term = search.toLowerCase();

    return students.filter(student => {
      const matchesSearch =
        student.name.toLowerCase().includes(term) ||
        student.studentId.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "All" || student.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [students, search, statusFilter]);

  return (
    <div className="admin-users-layout">

      {/* SIDEBAR */}
      <aside className="admin-users-sidebar">

        <div className="admin-users-brand">
          Find<span>It.</span>
        </div>

        <div className="admin-users-user">
          <div className="admin-users-avatar">A</div>

          <div>
            <h3>Administrator</h3>
            <p>Admin Account</p>
          </div>
        </div>

        <div className="admin-users-nav-label">
          MAIN MENU
        </div>

        <nav className="admin-users-nav">
          <Link to="/admin/dashboard">
            <LayoutDashboard /> Overview
          </Link>

          <Link to="/admin/items">
            <Package /> Manage Items
          </Link>

          <Link to="/admin/claims">
            <ShieldCheck /> Manage Claims
          </Link>

          <Link to="/admin/users" className="active">
            <Users /> Students
          </Link>

          <Link to="/admin/analytics">
            <BarChart3 /> Analytics
          </Link>

          <Link to="/admin/settings">
            <Settings /> Settings
          </Link>
        </nav>

        <Link to="/" className="admin-users-logout">
          <LogOut /> Back to Home
        </Link>

      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-users-main">

        <header className="admin-users-header">
          <span>ADMINISTRATION</span>
          <h1>Manage Students</h1>
          <p>
            View and manage student accounts registered on FindIt.
          </p>
        </header>

        {/* STATISTICS */}
        <section className="admin-users-stats">

          <div>
            <span>Total Students</span>
            <h2>{userStats.total}</h2>
          </div>

          <div>
            <span>Active Accounts</span>
            <h2>{userStats.active}</h2>
          </div>

          <div>
            <span>Blocked Accounts</span>
            <h2>{userStats.blocked}</h2>
          </div>

        </section>

        {/* STUDENT TABLE */}
        <section className="admin-users-panel">

          <div className="admin-users-panel-heading">
            <div>
              <h2>Registered Students</h2>
              <p>Search and manage student accounts.</p>
            </div>
          </div>

          {/* SEARCH AND FILTER */}
          <div className="admin-users-filters">

            <div className="admin-users-search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search name, student ID or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              aria-label="Filter accounts by status"
            >
              <option value="All">All Accounts</option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
            </select>

          </div>

          {/* TABLE */}
          <div className="admin-users-table-wrapper">

            <table className="admin-users-table">

              <thead>
                <tr>
                  <th>STUDENT</th>
                  <th>DEPARTMENT</th>
                  <th>JOINED DATE</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>

                {filteredStudents.map(student => (

                  <tr key={student.id}>

                    <td>
                      <div className="admin-student-cell">

                        <div className="admin-student-initial">
                          {student.name.charAt(0)}
                        </div>

                        <div>
                          <strong>{student.name}</strong>
                          <small>{student.studentId}</small>
                        </div>

                      </div>
                    </td>

                    <td>{student.department}</td>

                    <td>{student.joined}</td>

                    <td>
                      <span className={`admin-user-status ${student.status.toLowerCase()}`}>
                        {student.status}
                      </span>
                    </td>

                    <td>
                      <div className="admin-user-actions">

                        <button
                          className="admin-user-view"
                          title="View Details"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          className={
                            student.status === "Active"
                              ? "admin-user-block"
                              : "admin-user-activate"
                          }
                          title={
                            student.status === "Active"
                              ? "Block Student"
                              : "Activate Student"
                          }
                          onClick={() => requestStatusChange(student)}
                        >
                          {student.status === "Active"
                            ? <UserX size={16} />
                            : <UserCheck size={16} />}
                        </button>

                      </div>
                    </td>

                  </tr>

                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="5" className="admin-users-empty">
                      No students found.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

          <div className="admin-users-count">
            Showing {filteredStudents.length} of {students.length} students
          </div>

        </section>

        {/* STUDENT DETAILS POPUP */}
        {selectedStudent && (

          <div
            className="admin-user-modal-overlay"
            onClick={() => setSelectedStudent(null)}
          >

            <div
              className="admin-user-modal"
              onClick={e => e.stopPropagation()}
            >

              <div className="admin-user-modal-heading">
                <div>
                  <span>STUDENT DETAILS</span>
                  <h2>{selectedStudent.name}</h2>
                </div>

                <button onClick={() => setSelectedStudent(null)}>
                  <X size={20} />
                </button>
              </div>

              <div className="admin-user-detail">
                <span>Student ID</span>
                <strong>{selectedStudent.studentId}</strong>
              </div>

              <div className="admin-user-detail">
                <span>Email</span>
                <strong>{selectedStudent.email}</strong>
              </div>

              <div className="admin-user-detail">
                <span>Department</span>
                <strong>{selectedStudent.department}</strong>
              </div>

              <div className="admin-user-detail">
                <span>Phone</span>
                <strong>{selectedStudent.phone}</strong>
              </div>

              <div className="admin-user-detail">
                <span>Joined Date</span>
                <strong>{selectedStudent.joined}</strong>
              </div>

              <div className="admin-user-detail">
                <span>Account Status</span>
                <strong>{selectedStudent.status}</strong>
              </div>

              <button
                className={`admin-user-modal-action ${
                  selectedStudent.status === "Active" ? "block" : "activate"
                }`}
                onClick={() => requestStatusChange(selectedStudent)}
              >
                {selectedStudent.status === "Active"
                  ? <><UserX size={17} /> Block Student</>
                  : <><UserCheck size={17} /> Activate Student</>}
              </button>

            </div>
          </div>

        )}

        {/* BLOCK / ACTIVATE CONFIRMATION POPUP */}
        {confirmAction && (

          <div
            className="admin-confirm-overlay"
            onClick={() => setConfirmAction(null)}
          >

            <div
              className="admin-confirm-modal"
              onClick={e => e.stopPropagation()}
            >

              <div className={`admin-confirm-icon ${
                confirmAction.status === "Active" ? "block" : "activate"
              }`}>
                {confirmAction.status === "Active"
                  ? <UserX size={25} />
                  : <UserCheck size={25} />}
              </div>

              <h2>
                {confirmAction.status === "Active"
                  ? "Block Student Account?"
                  : "Activate Student Account?"}
              </h2>

              <p>
                Are you sure you want to{" "}
                {confirmAction.status === "Active" ? "block" : "activate"}{" "}
                this student's account?
              </p>

              <div className="admin-confirm-student">
                <strong>{confirmAction.name}</strong>
                <span>{confirmAction.studentId}</span>
              </div>

              <div className="admin-confirm-actions">

                <button
                  className="admin-confirm-cancel"
                  onClick={() => setConfirmAction(null)}
                >
                  Cancel
                </button>

                <button
                  className={`admin-confirm-submit ${
                    confirmAction.status === "Active" ? "block" : "activate"
                  }`}
                  onClick={confirmStatusChange}
                >
                  Yes, {confirmAction.status === "Active" ? "Block" : "Activate"}
                </button>

              </div>

            </div>

          </div>

        )}

        <footer className="admin-users-footer">
          <span>FindIt. Administration Panel</span>
          <span>Version 1.0</span>
        </footer>

      </main>

    </div>
  );
}

export default AdminUsers;
