import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminSide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };

  return (
    <div>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <a className="nav-link " href="/admin-dashboard">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </a>
          </li>

          <li className="nav-item">
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
                <Link to={'/add-customer'}>
                  <i className="bi bi-circle"></i>
                  <span>Add Customer</span>
                </Link>
              </li>
              <li>
                <Link to={'/view-customer'}>
                  <i className="bi bi-circle"></i>
                  <span>View Customer</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              onClick={toggleDropdown1}
            >
              <i className="bi bi-layout-text-window-reverse"></i>
              <span>Suppliers</span>
              <i className={`bi ms-auto ${isOpen1 ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
            </a>
            <ul
              id="tables-nav"
              className={`nav-content collapse ${isOpen1 ? "show" : ""}`}
            >
              <li>
                <Link to={'/add-supplier'}>
                  <i className="bi bi-circle"></i>
                  <span>Add Supplier</span>
                </Link>
              </li>
              <li>
                <Link to={'/view-suppliers'}>
                  <i className="bi bi-circle"></i>
                  <span>View Supplier</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="/view-product">
              <i className="bi bi-box"></i>
              <span>Product</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="/AddMaternityProduct">
              <i className="bi bi-box"></i>
              <span>Maternity Product</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="/viewMaternityproduct">
              <i className="bi bi-box"></i>
              <span> view Maternity Product</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="/categoryManagment">
              <i className="bi bi-list"></i>
              <span>Category</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="/orderManagment">
              <i className="bi bi-cart"></i>
              <span>Orders</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="/reviewManagment">
              <i className="bi bi-chat-dots"></i>
              <span>Reviews</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="/view-charitys">
              <i className="bi bi-heart"></i>
              <span>Charitys</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link collapsed" href="/Payments">
              <i className="bi bi-credit-card"></i>
              <span>Payments</span>
            </a>
          </li>
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

export default AdminSide;
