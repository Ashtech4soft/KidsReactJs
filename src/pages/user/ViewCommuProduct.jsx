import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { communitProduct } from '../../store/productSlice'
import { BASE_URL } from "../lib/apiUrl";

function ViewCommuProduct() {

    const { commuProducts, singleCommu } = useSelector((state) => ({
        commuProducts: state.product?.commuProducts,
        singleCommu: state.community.singleCommu,

    }))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(communitProduct(singleCommu._id));
    }, [dispatch])

    console.log(commuProducts);

    return (
        <div style={{ minHeight: '90vh', marginTop: 50, paddingInline: 10 }}>
            <section className="section dashboard">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title"></h5>
                                        <Link to={`/add-product/${singleCommu._id}`} className="btn btn-danger" style={{ float: "right" }}>Add New</Link>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">price</th>
                                                    <th scope="col">Image</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {commuProducts?.map((product, index) => (
                                                    <tr key={product._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{product.name}</td>
                                                        <td>{product.price}</td>
                                                        <td>
                                                            {product.productImage ? (
                                                                <img
                                                                    src={`${BASE_URL}${product.productImage}`}
                                                                    alt="Employee"
                                                                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '10px' }}
                                                                />
                                                            ) : (
                                                                'No Image'
                                                            )}
                                                        </td>
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
        </div>
    )
}

export default ViewCommuProduct
