import React, { useState } from "react";

const SupplierSide = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <a className="nav-link " href="/supplier">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link " href="/supplierProfile">
                            <img className="" style={{ height: 35, width: 35, borderRadius: 20, marginRight: 5 }} src="assets/admin/img/messages-3.jpg" />
                            <span>Profile</span>
                        </a>
                    </li>

                    {/* <li className="nav-item">
                        <a
                            className="nav-link collapsed"
                            onClick={toggleDropdown}
                            href="#"
                        >
                            <i className="bi bi-journal-text"></i>
                            <span>Customers</span>
                            <i className={`bi ms-auto ${isOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                        </a>
                        <ul id="forms-nav" className={`nav-content collapse ${isOpen ? "show" : ""}`}>
                            <li>
                                <a href="forms-elements.html">
                                    <i className="bi bi-circle"></i>
                                    <span>Add Customer</span>
                                </a>
                            </li>
                            <li>
                                <a href="forms-layouts.html">
                                    <i className="bi bi-circle"></i>
                                    <span>View Customer</span>
                                </a>
                            </li>
                        </ul>
                    </li> */}

                    {/* <li className="nav-item">
                        <a
                            className="nav-link collapsed"
                            onClick={toggleDropdown}
                        >
                            <i className="bi bi-layout-text-window-reverse"></i>
                            <span>Suppliers</span>
                            <i className={`bi ms-auto ${isOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                        </a>
                        <ul
                            id="tables-nav"
                            className={`nav-content collapse ${isOpen ? "show" : ""}`}
                        >
                            <li>
                                <a href="tables-general.html">
                                    <i className="bi bi-circle"></i>
                                    <span>Add Supplier</span>
                                </a>
                            </li>
                            <li>
                                <a href="tables-data.html">
                                    <i className="bi bi-circle"></i>
                                    <span>View Supplier</span>
                                </a>
                            </li>
                        </ul>
                    </li> */}
                    {/* 
          <li className="nav-item">
            <a className="nav-link collapsed" href="users-profile.html">
              <i className="bi bi-person"></i>
              <span>Profile</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="pages-register.html">
              <i className="bi bi-card-list"></i>
              <span>Register</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="pages-login.html">
              <i className="bi bi-box-arrow-in-right"></i>
              <span>Login</span>
            </a>
          </li> */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="/logout">
                            <i className="bi bi-box-arrow-right"></i>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </aside>
        </div>
    );
};

export default SupplierSide;
