import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSide from "../../components/admin/AdminSide";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../store/productSlice';

const ViewProduct = () => {
    const [users, setUsers] = useState([]);


    const { products, loading } = useSelector((state) => ({
        products: state.product?.products,
        loading: state.product?.loading,

    }))
    console.log(loading);


    const dispatch = useDispatch()
    // Fetch all employees when the component mounts
    useEffect(() => {
        dispatch(fetchProduct())
    }, [dispatch]);

    if (loading) {
        return <h2>Loading...</h2>
    }
    console.log(products);

    // Function to fetch users list


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
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title"></h5>
                                            <Link to="/add-product" className="btn btn-danger" style={{ float: "right" }}>Add New</Link>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">price</th>
                                                        <th scope="col">Image</th>
                                                        <th scope="col">supplier</th>
                                                        <th scope="col">community</th>
                                                        <th scope="col">Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products?.map((product, index) => (
                                                        <tr key={product._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{product.name}</td>
                                                            <td>{product.price}</td>
                                                            <td>
                                                                {product.productImage ? (
                                                                    <img
                                                                        src={`http://localhost:4000/${product.productImage}`}
                                                                        alt="Employee"
                                                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                                    />
                                                                ) : (
                                                                    'No Image'
                                                                )}
                                                            </td>
                                                            <td>{product.supplierId || 'N/A'}</td>
                                                            <td>{product.communityId?._id || 'N/A'}</td>
                                                            <td>
                                                                <Link to={`/updateProduct/${product._id}`} className="btn btn-primary btn-sm"
                                                                    style={{
                                                                        borderRadius: '5px',
                                                                        padding: '5px 15px',
                                                                        fontSize: '14px',
                                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                                    }}>
                                                                    Manage
                                                                </Link>
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

export default ViewProduct;