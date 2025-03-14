import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreasequantity, fetchCart, orderProduct, removeFromCart, } from "../../store/productSlice"; // Add updateCart and removeFromCart actions

function Cart() {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.product);

    const { user } = useSelector((state) => ({
        user: state.user.user
    }))
    const [cartItems, setCartItems] = useState([]);
    console.log(cartItems);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    useEffect(() => {
        if (cart && cart.products) {
            setCartItems(cart.products);
        }
    }, [cart]);

    // Update Quantity
    const incerement = (item) => {
        dispatch(addToCart(item.productId._id))
        setCartItems(cartItems.map((cartItem, i) =>
            cartItem.productId._id === item.productId._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        ));
    }

    const decrement = (item) => {
        dispatch(decreasequantity(item.productId._id))
        setCartItems(cartItems.map((cartItem, i) =>
            cartItem.productId._id === item.productId._id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        ));
    }

    // Calculate Total Price
    const totalPrice = useMemo(() => (
        cartItems.reduce(
            (acc, item) => acc + item.productId.price * item.quantity,
            0
        )
    ), [cart, decrement, incerement])

    const checkoutHandler = () => {
        dispatch(orderProduct({ cartItems, totalPrice, user }))
    }

    return (
        <div className="container" style={{ marginTop: 110,minHeight:'80vh' }}>
            <h2 className="fw-bold text-center mb-4">Your Shopping Cart</h2>

            {/* Cart Items */}
            
            {cartItems.length > 0 ? (
                <div className="row">
                    <div className="col-lg-8">
                        {cartItems.map((item, index) => (
                            <div key={index} className="d-flex border rounded p-3 mb-3 bg-light shadow-sm">
                                <img
                                    src={`${BASE_URL}${item.productId.productImage}`}
                                    alt={item.productId.name}
                                    className="img-fluid rounded"
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                />
                                <div className="ms-3 flex-grow-1">
                                    <h5 className="fw-bold">{item.productId.name}</h5>
                                    <p className="mb-1 text-success fw-semibold">${item.productId.price}</p>
                                    <div className="d-flex align-items-center">
                                        {/* Quantity Controls */}
                                        <button className="btn btn-outline-secondary btn-sm" onClick={() => decrement(item)}>-</button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button className="btn btn-outline-secondary btn-sm" onClick={() => incerement(item)}>+</button>
                                    </div>
                                </div>
                                <button className="btn btn-danger ms-auto" onClick={() => dispatch(removeFromCart(item.productId._id))}>Remove</button>
                            </div>
                        ))}
                    </div>

                    {/* Checkout Section */}
                    <div className="col-lg-4">
                        <div className="border p-4 rounded bg-white shadow-lg">
                            <h4 className="fw-bold">Order Summary</h4>
                            <p className="fw-semibold">Total Items: {cartItems.length}</p>
                            <h5 className="fw-bold text-success">Total Price: ${totalPrice}</h5>
                            <button onClick={checkoutHandler} className="btn btn-primary w-100 mt-3">Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-muted">Your cart is empty.</p>
            )}
        </div>
    );
}

export default Cart;
