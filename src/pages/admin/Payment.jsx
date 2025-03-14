import React from "react";
import { useSelector } from "react-redux";
import AdminSide from "../../components/admin/AdminSide";

function Payment() {
    const { payments } = useSelector((state) => ({
        payments: state.product.payments,
    }));

    return (
        <>
            <AdminSide />
            <div className="container  col-md-9  " style={{ marginTop: 100 ,width:"80%",display:"flex",justifyContent:"center",flexDirection:'column'}}>
                <h2 className="text-center text-primary mb-4">Payments Management</h2>
                <div className="table-responsive d-flex justify-content-center" style={{ maxWidth: "90%",margin:"auto",display:"flex",justifyContent:"center"}}>
                    <table className="table table-striped table-bordered text-center " >
                        <thead className="bg-dark text-white text-primary">
                            <tr>
                                <th>#</th>
                                <th>Amount</th>
                                <th>Order ID</th>
                                <th>Paid To</th>
                                <th>Payment Date</th>
                                <th>Payment ID</th>
                                <th>User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length > 0 ? (
                                payments.map((payment, index) => (
                                    <tr key={payment._id}>
                                        <td>{index + 1}</td>
                                        <td>${payment.amount}</td>
                                        <td className="text-break">{payment.orderId}</td>
                                        <td>{payment.paidTo}</td>
                                        <td>{new Date(payment.paymentDate).toLocaleString()}</td>
                                        <td className="text-break">{payment.razorpayPaymentId}</td>

                                        <td className="text-break">
                                            {payment.userId?.name} <br />
                                            <small>({payment.userId?.email})</small>
                                        </td>
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

export default Payment;
