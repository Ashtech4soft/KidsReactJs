import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa'; // Make sure to install react-icons

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get("paymentId");

    const navigate = useNavigate();
    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow p-4 text-center" style={{ maxWidth: '400px' }}>
                <div className="text-success mb-3">
                    <FaCheckCircle size={64} className="mx-auto" />
                </div>
                <h1 className="h3 mb-4">
                    Payment Successful!
                </h1>
                <div className="alert alert-light mb-4">
                    <p className="text-muted mb-1">Payment ID:</p>
                    <p className="fw-bold">{paymentId}</p>
                </div>
                <button
                    onClick={() => navigate('/orders')}
                    className="btn btn-success"
                >
                    Check Order
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;