import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserrPayments } from "../../store/productSlice";

function UserPayment() {
    const { userpayments } = useSelector((state) => ({
        userpayments: state.product.userpayments,
    }));

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserrPayments())
    }, [])

    return (
        <>
            <div className="container  col-md-12  " style={{ marginTop: 110, minHeight:'80vh', display: "flex", justifyContent: "", flexDirection: 'column' }}>
                <h2 className="text-center text-primary mb-4">Payments Management</h2>
                <div className="table-responsive d-flex justify-content-center" style={{ maxWidth: "90%", display: "flex", justifyContent: "center" }}>
                    <table className="table table-striped table-bordered text-center " >
                        <thead className="bg-dark text-white text-primary">
                            <tr>
                                <th>#</th>
                                <th>Amount</th>
                                <th>Order ID</th>
                                <th>Paid To</th>
                                <th>Payment Date</th>
                                <th>Payment ID</th>
                                {/* <th>User</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {userpayments?.length > 0 ? (
                                userpayments.map((payment, index) => (
                                    <tr key={payment._id}>
                                        <td>{index + 1}</td>
                                        <td>${payment.amount}</td>
                                        <td className="text-break">{payment.orderId}</td>
                                        <td>{payment.paidTo}</td>
                                        <td>{new Date(payment.paymentDate).toLocaleString()}</td>
                                        <td className="text-break">{payment.razorpayPaymentId}</td>
                                        {/* 
                                        <td className="text-break">
                                            {payment.userId?.name} <br />
                                            <small>({payment.userId?.email})</small>
                                        </td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center text-danger">No payments available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default UserPayment;
