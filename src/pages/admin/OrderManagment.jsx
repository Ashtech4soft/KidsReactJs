import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllMaternityorders, fetchorders, updateMaternityOrderStatus, updateOrderStatus } from "../../store/productSlice";
import AdminSide from "../../components/admin/AdminSide";
import SupplierSide from "../../components/supplier/supplierSide";
import { fetchCommunity } from "../../store/communitySlice";

function OrderManagement() {
    const dispatch = useDispatch();
    const { orders, users, suppliers, Communities, commuOrders, maternityorders } = useSelector((state) => ({
        orders: state.product.orders || [],
        maternityorders: state.product.maternityorders || [],
        users: state.user.users || [],
        suppliers: state.supplier.suppliers || [],
        Communities: state.community?.Communities || [],
        commuOrders: state.community?.commuOrders || []
    }));

    const [activeTab, setActiveTab] = useState("orders");

    useEffect(() => {
        dispatch(fetchorders());
        dispatch(fetchCommunity());
        dispatch(fetchAllMaternityorders());
        // dispatch(fetchCommunity());
    }, [dispatch]);
    console.log(commuOrders);


    const handleStatusChange = (orderId, newStatus) => {
        if (activeTab === 'orders') {
            dispatch(updateOrderStatus({ orderId, status: newStatus }))
        }
        else if (activeTab === 'maternityOrders') {
            dispatch(updateMaternityOrderStatus({ orderId, status: newStatus }))
        }
    };

    const Id = localStorage.getItem("id");
    const role = localStorage.getItem("role");

    const supplierOrder = orders.filter((order) => order.itemId.supplierId === Id);

    return (
        <div className="container-fluid bg-light min-vh-100" style={{ marginTop: role === "user" && 110 }}>
            <div className="row">
                {/* Sidebar */}
                {role === "admin" && (
                    <div className="col-md-2 text-white p-3 d-md-block d-none">
                        <AdminSide />
                    </div>
                )}
                {role === "supplier" && (
                    <div className="col-md-2 text-white p-3 d-md-block d-none">
                        <SupplierSide />
                    </div>
                )}

                <div className="container mt-5 col-md-9">
                    <h2 className="text-center mb-4 text-primary">Order Management</h2>

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
                        {role === 'admin' && <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === "maternityOrders" ? "active" : ""}`}
                                onClick={() => setActiveTab("maternityOrders")}
                            >
                                Maternity Orders
                            </button>
                        </li>}
                    </ul>

                    {/* Orders Table */}
                    {activeTab === "orders" && (
                        <OrderTable
                            role={role}
                            orders={role === "admin" ? orders : role === "supplier" ? supplierOrder : role === 'user' ? commuOrders : []}
                            users={users}
                            suppliers={suppliers}
                            Communities={Communities}
                            activeTab={activeTab}
                            handleStatusChange={handleStatusChange}
                        />
                    )}

                    {/* Maternity Orders Table */}
                    {activeTab === "maternityOrders" && role === 'admin' && (
                        <OrderTable
                            role={role}
                            orders={maternityorders}
                            users={users}
                            suppliers={suppliers}
                            Communities={Communities}
                            activeTab={activeTab}
                            handleStatusChange={handleStatusChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

const OrderTable = ({ role, orders, users, suppliers, Communities, handleStatusChange, activeTab }) => {
    return (
        <div className="table-responsive">
            <table className="table table-hover table-bordered text-center">
                <thead className="bg-dark text-white">
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>User</th>
                        {role === "admin" && activeTab === 'orders' && <th>Supplier</th>}
                        {role === "admin" && activeTab === 'orders' && <th>Community</th>}
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
                            <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td className="d-flex align-items-center">
                                    <img
                                        src={`${BASE_URL}${order.itemId?.productImage || order.itemId?.image || null}`}
                                        alt={order.itemId.name}
                                        className="rounded me-2"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                    {order.itemId?.name || order.itemId?.productName}
                                </td>
                                <td>{order.orderQty}</td>
                                <td>₹{order.price}</td>
                                <td>{users.find((user) => user._id === order.userId)?.name || "N/A"}</td>
                                {role === "admin" && activeTab === 'orders' && (
                                    <td>
                                        {suppliers.find((sup) => sup._id === order.itemId.supplierId)?.name || "N/A"}
                                    </td>
                                )}
                                {role === "admin" && activeTab === 'orders' && (
                                    <td>
                                        {Communities.find((cummu) => cummu._id === order.itemId.communityId)?.name || "N/A"}
                                    </td>
                                )}
                                <td>
                                    <span
                                        className={`badge ${order.status === "pending"
                                            ? "bg-warning"
                                            : order.status === "shipped"
                                                ? "bg-primary"
                                                : "bg-success"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <select
                                        className="form-select"
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center text-danger">
                                No orders available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderManagement;
