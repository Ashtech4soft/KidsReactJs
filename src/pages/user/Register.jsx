import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addSupplier } from '../../store/SupplierSlice';
import { addCommunity } from '../../store/communitySlice';
import { addCharity } from '../../store/charitySlice';
import { BASE_URL } from "../../lib/apiUrl";


const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: null
    });

    console.log(formData.role);

    const [file, setFile] = useState(null); // State for file upload
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle input change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const { name, email, phone, password, role } = formData;

        const formDataObject = new FormData();
        formDataObject.append('name', name);
        formDataObject.append('email', email);
        formDataObject.append('phone', phone);
        formDataObject.append('role', role); // Added
        formDataObject.append('password', password); // Added password field

        if (file) {
            formDataObject.append('file', file); // Append file if provided
        }
        if (formData.role === 'user') {
            try {
                const response = await axios.post(
                    `${BASE_URL}users/addUser`,
                    formDataObject,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                console.log(response);
                alert('Registration successful!');
                navigate('/login');

            } catch (error) {
                console.log(error);
                alert('Failed to register. Please try again.');
            }
        }
        if (formData.role === 'supplier') {
            dispatch(addSupplier(formDataObject))
        }
        if (formData.role === 'charity') {
            dispatch(addCharity(formDataObject))
        }
        if (formData.role === 'community') {
            dispatch(addCommunity(formDataObject))
        }
    };

    return (
        <div>
            <section id="contact" className="contact" style={{ marginTop: '50px' }}>
                <div className="container">
                    <div className="section-title" data-aos="fade-up">
                        <h2>Register to continue</h2>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-md-6 mt-4 mt-md-0" data-aos="fade-up" data-aos-delay="200">
                            <div className="info">
                                <img src="assets/user/img/hero-img.png" className="img-fluid animated" alt="" style={{ borderRadius: "10px" }} />
                            </div>
                        </div>

                        <div className="col-lg-5 col-md-12" data-aos="fade-up" data-aos-delay="300">
                            <form onSubmit={handleSubmit} className="php-email-form">

                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Your Email"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-control"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Your Phone"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Your Password"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <select className="form-control" required name='role' value={formData.role} onChange={handleChange}>
                                        <option value="">Select Role</option>
                                        <option value="charity">Charity</option>
                                        {/* <option value="community">Community</option> */}
                                        <option value="user">User</option>
                                        <option value="supplier">Supplier</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Upload Profile Picture:</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <div className="text-center">
                                    <button type="submit">Register</button>
                                </div>
                            </form>

                            <br />
                            <center>
                                <p>Already have an account? <Link to="/login">Login Now</Link></p>
                            </center>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;
