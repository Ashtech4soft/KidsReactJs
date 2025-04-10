import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSide from "../../components/admin/AdminSide";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { usersFetch } from '../../store/userSlice';
import { BASE_URL } from "../../lib/apiUrl";

const ViewCustomers = () => {

  const { users } = useSelector((state) => ({
    users: state.user.users
  }))

  // Fetch all employees when the component mounts
  const dispatch = useDispatch()
  useEffect(() => {
    // getUserList();
    dispatch(usersFetch())
  }, [dispatch]);

  // Function to fetch users list
  // const getUserList = () => {
  //   axios
  //     .get('http://localhost:4000/users/users')
  //     .then((response) => {
  //       setUsers(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching employees:', error);
  //     });
  // };

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
                      <h5 class="card-title"></h5>
                      <Link to="/add-customer" className="btn btn-danger" style={{ float: "right" }}>Add New</Link>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            {/* <th scope="col">Password</th> */}
                            <th scope="col">Profile</th>
                            {/* <th>Date Joined</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user, index) => (
                            <tr key={user._id}>
                              <td>{index + 1}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.phone}</td>
                              {/* <td>{user.password}</td> */}
                              <td>
                                {user.file ? (
                                  <img
                                    src={`${BASE_URL}${user.file}`}
                                    alt="Employee"
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                  />
                                ) : (
                                  'No Image'
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

export default ViewCustomers;
