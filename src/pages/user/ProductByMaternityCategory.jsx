import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMaternityProductbyCategory, maternityProductOrder } from '../../store/productSlice';

function ProductByMaternityCategory() {
    const { cate: category } = useParams();
    const dispatch = useDispatch();

    const { maternityProductsbyCategory, user } = useSelector((state) => ({
        maternityProductsbyCategory: state.product.maternityProductsbyCategory || [],
        user: state.user.user
    }));

    // Store quantity for each product in an object
    const [quantities, setQuantities] = useState({});
    const [prsize, setprSize] = useState(null);

    useEffect(() => {
        dispatch(fetchMaternityProductbyCategory(category));
    }, [dispatch, category]);

    // Sort products: Dress category first
    const sortedProducts = [...maternityProductsbyCategory].sort((a, b) => {
        return a.category === "dress" ? -1 : 1;
    });

    // Function to update quantity per product
    const handleQuantityChange = (productId, change) => {
        setQuantities((prev) => {
            const newQuantity = (prev[productId] || 0) + change;
            return {
                ...prev,
                [productId]: newQuantity < 0 ? 0 : newQuantity, // Prevent negative quantities
            };
        });
    };

    // Calculate total price based on quantities
    const totalPrice = sortedProducts.reduce((acc, product) => {
        return acc + (quantities[product._id] || 0) * product.price;
    }, 0);

    const buyProducts = () => {
        dispatch(maternityProductOrder({ quantities, totalPrice, user, prsize }));
    };

    return (
        <div className="container py-5" style={{ minHeight: '80vh', marginTop: '110px', }}>
            {/* Title */}
            <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">Customize Your {category}</h2>
                <h4 className="text-secondary">Maternity Products</h4>
            </div>

            <div className="row">
                {/* Product List Section */}
                <div className="col-md-8">
                    <div className="row">
                        {sortedProducts.length > 0 ? (
                            sortedProducts.map((product) => (
                                <div key={product._id} className="mb-4">
                                    <div className="card shadow-lg p-3 rounded border-0" style={{ backgroundColor: '#fff', borderRadius: '15px' }}>
                                        {product.image && (
                                            <img
                                                src={`${BASE_URL}${product.image}`}
                                                className="card-img-top rounded"
                                                alt={product.productName}
                                                style={{ height: '220px', objectFit: 'cover' }}
                                            />
                                        )}
                                        <div className="card-body">
                                            <h5 className="card-title text-dark fw-bold">{product.productName}</h5>
                                            {product.category === 'dress' && (
                                                <div className="d-flex gap-2 my-2">
                                                    {['XS', 'S', 'M', 'L'].map((size, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => setprSize(size)}
                                                            className={`btn ${prsize === size ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
                                                            style={{ padding: '6px 18px', borderRadius: '10px' }}
                                                        >
                                                            {size}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                            <p className="card-text text-muted">{product.description}</p>
                                            <h5 className="text-primary fw-bold">₹{product.price}</h5>
                                            <div className="d-flex align-items-center mt-2">
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => handleQuantityChange(product._id, -1)}
                                                >
                                                    -
                                                </button>
                                                <span className="mx-3 fw-bold">{quantities[product._id] || 0}</span>
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    onClick={() => handleQuantityChange(product._id, 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No products available in this category.</p>
                        )}
                    </div>
                </div>

                {/* Kit Summary Section */}
                <div className="col-md-4">
                    <div className="card shadow-lg p-3 rounded border-0" style={{ backgroundColor: '#fff', borderRadius: '15px' }}>
                        <h5 className="text-center fw-bold text-primary">Kit Summary</h5>
                        <hr />
                        <p className="text-center text-dark">
                            <strong>Total:</strong> ₹{totalPrice}
                        </p>
                        <button onClick={buyProducts} className="btn btn-primary w-100 fw-bold">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductByMaternityCategory;
