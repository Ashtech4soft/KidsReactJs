import React, { useEffect } from 'react'
import CharitySide from '../../components/charity/CharitySide';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByCharity } from '../../store/charitySlice';

function ViewCharitProduct() {
    const { charityProducts } = useSelector((state) => ({
        charityProducts: state.charity.charityProducts
    }));
    console.log(charityProducts);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProductByCharity())
    }, [])

    return (
        <div className="d-flex flex-column flex-md-row">
            <div className="col-12 col-md-3">
                <CharitySide />
            </div>
            <div className="col-12 col-md-9 px-3" style={{ marginTop: 100 }}>
                <h2 className="mb-4">Charity Products</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Condition</th>
                                {/* <th>Status</th> */}
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {charityProducts.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.condition}</td>
                                    {/* <td>
                                        <span className={`badge ${product.status === 'Pending' ? 'bg-warning' : 'bg-success'}`}>
                                            {product.status}
                                        </span>
                                    </td> */}
                                    <td>
                                        <img
                                            src={`http://localhost:4000/${product.image}`}
                                            alt={product.name}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewCharitProduct
