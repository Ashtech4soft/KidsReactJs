import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addCharityPRoduct, deleteCharityProduct, fetchCharity, getCharityProduct } from '../../store/charitySlice';

function Charity() {
    const { charitys, products } = useSelector((state) => ({
        charitys: state.charity.charitys,
        products: state.charity.products
    }));

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        condition: '',
        charityId: '',
        file: null
    });

    const id = localStorage.getItem('id');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCharityProduct())
        dispatch((fetchCharity()))
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.name === 'file' ? e.target.files[0] : e.target.value
        });
    };

    console.log(products)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('condition', formData.condition);
        data.append('charityId', formData.charityId);
        data.append('file', formData.file);

        console.log(formData)

        dispatch(addCharityPRoduct(data))

    };

    return (
        <div className="container " style={{ marginTop: 110 }}>
            <h2>Add Charity Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Condition</label>
                    <input
                        type="text"
                        className="form-control"
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Select Charity</label>
                    <select
                        className="form-select"
                        name="charityId"
                        value={formData.charityId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Choose a charity...</option>
                        {charitys?.map((charity) => (
                            <option key={charity._id} value={charity._id}>
                                {charity.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Product Image</label>
                    <input
                        type="file"
                        className="form-control"
                        name="file"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
            {/* Display Products */}
            <div className="row mt-4">
                {products?.map((product) => (
                    <div key={product._id} className="col-md-4 mb-3">
                        <div className="card">
                            <img src={`http://localhost:4000/${product.image}`} style={{ height: 250, objectFit: 'cover' }} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text"><small>Condition: {product.condition}</small></p>
                            </div>
                            {product.userId === id && <div className='d-flex justify-content-end p-3' >
                                <button className='btn btn-danger' onClick={() => dispatch(deleteCharityProduct(product._id))} style={{ marginRight: 5 }}>Delete</button>
                                <button className='btn btn-primary'>Edit</button>
                            </div>}
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default Charity; 
