import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addreview, addToCart, fetchPrdReview, orderProduct } from '../../store/productSlice';
import { BASE_URL } from "../../lib/apiUrl";

function ProductDetails() {

    const { reviews, user } = useSelector((state) => ({
        reviews: state.product.reviews,
        user: state.user.user
    }));
    const { state: details } = useLocation();
    const [newReview, setNewReview] = useState({ comment: '', rating: 4 });



    // console.log(details);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPrdReview(details._id))
    }, [dispatch])
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        const setReviews = {
            ProductId: details._id,
            comment: newReview.comment,
            rating: newReview.rating,
        }
        dispatch(addreview(setReviews))
    };

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setNewReview({
            ...newReview,
            [name]: name === "rating" ? Number(value) : value, // Convert rating to a number
        });
        console.log(newReview);
    }


    const cart = () => {
        console.log('add to cart');
        dispatch(addToCart(details._id))
    }

    const handleBuy = () => {
        dispatch(orderProduct({ cartItems: details, totalPrice: details.price, user }))
    }
    return (
        <div className='' style={{ marginTop: '110px' }}>

            <div className="container mt-5" >
                {/* Product Details Section */}
                <div className="d-flex flex-wrap justify-content-center align-items-center ">
                    <div className="me-4">
                        <img
                            src={`${BASE_URL}${details.productImage}`}
                            alt={details.name}
                            className="img-fluid rounded shadow-lg"
                            style={{  height: '500px' }}
                        />
                    </div>
                    <div>
                        <h2 className="fw-bold">{details.name}</h2>
                        <h4 className="text-success fw-bold">${details.price}</h4>
                        <p className="fw-semibold">Category: {details.category}</p>
                        <p>{details.description}</p>
                        <button className="btn btn-primary" onClick={cart}>Add to Cart</button>
                        <button className="btn btn-success " style={{ marginLeft: 10 }} onClick={handleBuy}>Buy </button>
                    </div>
                </div>

                {/* Review Section */}
                <div className="mt-5">
                    <h3 className="fw-bold">Customer Reviews</h3>
                    {/* <p>^</p> */}
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="border p-3 my-2 rounded">
                                <h5 className="mb-1">
                                    {review.userId.name}
                                    <span className="text-warning ms-2">⭐ {review.rating}/5</span>
                                </h5>
                                <p className="mb-0">{review.review}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">No reviews yet. Be the first to review!</p>
                    )}
                    {/* Review Form */}
                    <div className="border p-4 mt-4 rounded">
                        <h4 className="fw-bold">Write a Review</h4>
                        <form onSubmit={handleReviewSubmit}>
     

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Comment</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={newReview.comment}
                                    name='comment'
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Rating</label>
                                <select
                                    className="form-select"
                                    value={newReview.rating}
                                    name='rating'
                                    onChange={handleChange}
                                >
                                    <option value="">select</option>
                                    {[5, 4, 3, 2, 1].map(num => (
                                        <option key={num} value={num}>{num} Stars</option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="btn btn-success w-100">Submit Review</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ProductDetails;
