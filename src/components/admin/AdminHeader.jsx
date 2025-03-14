import React from "react";
import { Link } from "react-router-dom";

const AdminHeader = () => {

  const role = localStorage.getItem("role");
  return (
    <div>
      <Link to="/logout" className="getstarted scrollto">
        Logout
      </Link>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between" style={{ width: '90%', marginInline: 'auto' }}>
          <Link to={role === 'admin' ? '/admin-dashboard' : role === 'supplier' ? '/supplier' : role === 'charity' ? '/charity' : ''} className="bi bi-house toggle-sidebar-btn"></Link>
          <a className="nav-link collapsed" href="/logout">
            <i className="bi bi-box-arrow-right toggle-sidebar-btn"></i>
          </a>
        </div>

        <nav className="header-nav ms-auto">
          {!role === 'admin' && <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                data-bs-toggle="dropdown"
              >
                <img
                  src="assets/admin/img/profile-img.jpg"
                  alt="Profile"
                  className="rounded-circle"
                />
                <span className="d-none d-md-block ps-2">
                  K. Anderson
                </span>
              </a>
            </li>
          </ul>}
        </nav>
      </header>
    </div>
  );
};

export default AdminHeader;
