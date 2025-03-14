import React, { useState } from 'react';
import axios from 'axios';
import AdminSide from "../../components/admin/AdminSide";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AddCustomer = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [file, setFile] = useState(null); // State for file upload
  const navigate = useNavigate();

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

    const { name, email, phone, password } = formData;
    const formDataObject = new FormData();
    formDataObject.append('name', name);
    formDataObject.append('email', email);
    formDataObject.append('phone', phone);
    formDataObject.append('password', password); // Added password field

    if (file) {
      formDataObject.append('file', file); // Append file if provided
    }

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
      alert('Data Added successful!');
      navigate('/view-customer');
    } catch (error) {
      console.log(error);
      alert('Failed to register. Please try again.');
    }
  };

  return (
    <div>
      <AdminSide />

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Welcome Admin</h1>
        </div>

        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">Add Customers</h5>

                      <form class="row g-3" onSubmit={handleSubmit} >
                        <div class="col-md-6">
                          <label for="inputEmail5" class="form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div class="col-md-6">
                          <label for="inputEmail5" class="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            class="form-control"
                            id="inputEmail5"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div class="col-md-6">
                          <label for="inputEmail5" class="form-label">
                            Phone
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="phone"
                            id="inputEmail5"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div class="col-md-6">
                          <label for="inputPassword5" class="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            class="form-control"
                            id="inputPassword5"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                        <div class="col-12">
                          <label for="inputAddress5" class="form-label">
                            Image
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            onChange={handleFileChange}
                          />
                        </div>
                        <div class="text-center">
                          <button type="submit" class="btn btn-primary">
                            Submit
                          </button> &nbsp;
                          <button type="reset" class="btn btn-secondary">
                            View All
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AddCustomer;
