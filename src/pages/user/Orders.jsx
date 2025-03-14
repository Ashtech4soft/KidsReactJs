import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { maternityorderByUser, orderByUser } from "../../store/productSlice";

function Orders() {
    const dispatch = useDispatch();
    const { orders, maternityordersByUser } = useSelector((state) => ({
        orders: state.product.orders || [],
        maternityordersByUser: state.product.maternityordersByUser || []
    }));

    const [activeTab, setActiveTab] = useState("orders");

    useEffect(() => {
        dispatch(orderByUser());
        dispatch(maternityorderByUser());
    }, [dispatch]);

    return (
        <div className="container" style={{ marginTop: "110px",minHeight:'80vh' }}>
            <h2 className="text-center mb-4">Your Orders</h2>

            {/* Tabs for Orders & Maternity Orders */}
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "orders" ? "active" : ""}`}
                        onClick={() => setActiveTab("orders")}
                    >
                        Orders
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "maternityOrders" ? "active" : ""}`}
                        onClick={() => setActiveTab("maternityOrders")}
                    >
                        Maternity Orders
                    </button>
                </li>
            </ul>

            {/* Orders Tab Content */}
            {activeTab === "orders" && (
                <>
                    {orders.length === 0 ? (
                        <p className="text-center">No orders found.</p>
                    ) : (
                        <div className="row">
                            {orders?.map((order) => (
                                <div key={order._id} className="col-md-4 mb-4">
                                    <div className="card shadow-sm">
                                        <img
                                            src={`${BASE_URL}${order?.itemId?.productImage}`}
                                            alt={order?.itemId?.name}
                                            className="card-img-top"
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{order?.itemId?.name}</h5>
                                            <p className="card-text"><strong>Quantity:</strong> {order?.orderQty}</p>
                                            <p className="card-text"><strong>Price:</strong> ₹{order?.price}</p>
                                            <p className={`badge ${order?.status === "pending" ? "bg-warning" : "bg-success"}`}>
                                                {order?.status}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Maternity Orders Tab Content */}
            {activeTab === "maternityOrders" && (
                <>
                    {maternityordersByUser.length === 0 ? (
                        <p className="text-center">No maternity orders found.</p>
                    ) : (
                        <div className="row">
                            {maternityordersByUser.map((order) => (
                                <div key={order._id} className="col-md-4 mb-4">
                                    <div className="card shadow-sm">
                                        {order.itemId.image ? <img
                                            src={`${BASE_URL}${order.itemId.image}`}
                                            alt={order.itemId.productName}
                                            className="card-img-top"
                                            style={{ height: "200px", objectFit: "cover" }}
                                        /> : <div  style={{ height: "200px", objectFit: "cover",backgroundColor:'#f0f0f0' }} ></div>}
                                        <div className="card-body">
                                            <h5 className="card-title">{order.itemId.productName}</h5>
                                            <p className="card-text"><strong>Quantity:</strong> {order.orderQty}</p>
                                            <p className="card-text"><strong>Price:</strong> ₹{order.price}</p>
                                            <p className={`badge ${order.status === "pending" ? "bg-warning" : "bg-success"}`}>
                                                {order.status}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Orders;
