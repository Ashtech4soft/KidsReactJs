import { useNavigate } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa'; // Changed to X icon for failure

const PaymentFailed = () => {
    const navigate = useNavigate();
    
    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow text-center p-4" style={{ maxWidth: '400px' }}>
                <div className="text-danger mb-3">
                    <FaTimesCircle size={64} className="mx-auto" />
                </div>
                <h1 className="h3 mb-3">
                    Payment Failed!
                </h1>
                <p className="text-muted mb-4">
                    Sorry, your payment could not be processed. Please try again.
                </p>

                <button
                    onClick={() => navigate('/Checkout')}
                    className="btn btn-danger px-4"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default PaymentFailed;
