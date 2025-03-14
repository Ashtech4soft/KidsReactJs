import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Header = () => {

    const token = localStorage.getItem('Utoken')
    const [isNavOpen, setIsNavOpen] = useState(false)

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen)
    }

    return (
        <div>
            <header id="header" className="fixed-top d-flex align-items-center" style={{
                background: '#f0f0f0',

            }}>
                <div className="container d-flex align-items-center justify-content-between">
                    {!isNavOpen &&
                        <>
                            <div className="logo">
                                <h1>
                                    <Link to="/" className="text- text-decoration-none fw-bold">
                                        Kids Haven
                                    </Link>
                                </h1>
                            </div>

                            <a className="mobile-nav-toggle d-lg-none  ms-auto" onClick={toggleNav}>
                                <i className={` bi ${isNavOpen ? 'bi-x' : 'bi-list'} toggle-sidebar-btn`}></i>
                            </a>
                        </>
                    }
                    <nav id="navbar" className={`navbar ${isNavOpen ? 'm-auto' : ''}`}>
                        <ul className={isNavOpen ? 'collapse ' : ''} style={{
                            display: isNavOpen ? 'flex' : 'none',
                            flexDirection: 'column',
                            justifyContent:'center',
                            height: '100vh',
                            gap: '10px',
                            alignItems: 'center',
                            width: '100%'
                        }}>

                            <li>
                                <Link to="/shop" className="getstarted nav-link scrollto" onClick={() => setIsNavOpen(false)}>Shop</Link>
                            </li>
                            {token ?
                                <>
                                    <li>
                                        <Link to="/maternity" className="getstarted nav-link scrollto active" onClick={() => setIsNavOpen(false)}>Maternity</Link>
                                    </li>
                                    <li>
                                        <Link to="/orders" className="getstarted nav-link scrollto" onClick={() => setIsNavOpen(false)}>Orders</Link>
                                    </li>
                                    <li>
                                        <Link to="/payments" className="getstarted nav-link scrollto" onClick={() => setIsNavOpen(false)}>Payments</Link>
                                    </li>
                                    <li><Link to={'/charity'} className="getstarted scrollto" onClick={() => setIsNavOpen(false)}>Charity</Link></li>
                                    <li><Link to={'/community'} className="getstarted scrollto" onClick={() => setIsNavOpen(false)}>Community</Link></li>
                                    <li><Link to={'/UProfile'} className="getstarted scrollto" onClick={() => setIsNavOpen(false)}>Profile</Link></li>
                                    <li><Link to={'/Cart'} className="getstarted scrollto" onClick={() => setIsNavOpen(false)}>Cart</Link></li>
                                </>
                                :
                                <>
                                    <li>
                                        <Link to="/login" className="getstarted scrollto" onClick={() => setIsNavOpen(false)}>Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/logout" className="getstarted scrollto" onClick={() => setIsNavOpen(false)}>Logout</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </nav>


                    <nav id="navbar" className={`navbar ${isNavOpen ? 'navbar-mobile' : ''}`}>
                        <ul className={isNavOpen ? '' : ''}>

                            <li>
                                <Link to="/shop" className="nav-link scrollto " onClick={() => setIsNavOpen(false)}>Shop</Link>
                            </li>
                            {token ?
                                <>
                                    <li>
                                        <Link to="/maternity" className="nav-link scrollto " onClick={() => setIsNavOpen(false)}>Maternity</Link>
                                    </li>
                                    <li>
                                        <Link to="/orders" className="nav-link scrollto " onClick={() => setIsNavOpen(false)}>Orders</Link>
                                    </li>
                                    <li>
                                        <Link to="/payments" className="nav-link scrollto " onClick={() => setIsNavOpen(false)}>Payments</Link>
                                    </li>
                                    <li><Link to={'/charity'} className="getstarted scrollto" onClick={() => setIsNavOpen(false)}>Charity</Link></li>
                                    <li><Link to={'/community'} className="getstarted scrollto" onClick={() => setIsNavOpen(false)}>Community</Link></li>
                                    <li><Link to={'/UProfile'} className="getstarted scrollto" onClick={() => setIsNavOpen(false)}>Profile</Link></li>
                                    <li><Link to={'/Cart'} className="getstarted scrollto" onClick={() => setIsNavOpen(false)}>Cart</Link></li>
                                </>
                                :
                                <>
                                    <li>
                                        <Link to="/login" className="getstarted scrollto" onClick={() => setIsNavOpen(false)}>Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/logout" className="getstarted scrollto" onClick={() => setIsNavOpen(false)}>Logout</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Header