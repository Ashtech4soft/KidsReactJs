import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(email, role);

      const response = await axios.post('http://localhost:4000/users/login', {
        email,
        password,
        role,
      });

      if (response.data) {
        console.log(response.data);

        // Store role and token in localStorage
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('id', response.data.id);

        // Redirect based on role
        if (role === 'admin') {
          localStorage.setItem('Adtoken', response.data.token);
          navigate('/admin-dashboard');
        } else if (role === 'user') {
          localStorage.setItem('Utoken', response.data.token);
          navigate('/');
        } else if (role === 'supplier') {
          localStorage.setItem('Suptoken', response.data.token);
          navigate('/supplier');
        } else if (role === 'charity') {
          localStorage.setItem('Chatoken', response.data.token);
          navigate('/charity');
        } else if (role === 'community') {
          localStorage.setItem('Cotoken', response.data.token);
          navigate('/community');
        }


        // Reload to apply role-based routes
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      <section id="contact" className="contact" style={{ marginTop: '50px' }}>
        <div className="container">

          <div className="section-title" data-aos="fade-up">
            <h2>Login to continue</h2>
          </div>

          <div className="row">

            <div className="col-lg-6 col-md-6 mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="200">
              <div className="info">
                <img src="assets/user/img/hero-img.png" className="img-fluid animated" alt="" style={{ borderRadius: "10px" }} />
              </div>
            </div>

            <div className="col-lg-5 col-md-12" data-aos="fade-up" data-aos-delay="300" style={{ marginTop: "100px" }}>
              <form onSubmit={handleLogin} method="post" role="form" className="php-email-form">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Your Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <select className="form-control" required value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="supplier">Supplier</option>
                    <option value="charity">Charity</option>
                  </select>
                </div>

                <div className="text-center"><button type="submit">Login</button></div>
              </form>
              <br />
              <center><p>Don't have an account? <Link to="/register" >Register Now</Link></p></center>
            </div>


          </div>

        </div>
      </section>
    </div>
  )
}

export default Login