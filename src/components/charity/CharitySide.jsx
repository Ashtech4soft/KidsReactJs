import React, { useState } from "react";

const CharitySide = () => {
 
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
                        <a className="nav-link " href="/charityProfile">
                            <img className="" style={{ height: 35, width: 35, borderRadius: 20, marginRight: 5 }} src="assets/admin/img/messages-3.jpg" />
                            <span>Profile</span>
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

export default CharitySide;
