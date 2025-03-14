import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { commuOrders, fetchMessage, sendMessage, singleCommunity } from '../../store/communitySlice';

function CommunityActivites() {

    const { id: communityId } = useParams();
    const dispatch = useDispatch();
    const { singleCommu, messages } = useSelector((state) => ({
        singleCommu: state.community.singleCommu,
        messages: state.community.messages
    }));

    const [selectedCommunity, setSelectedCommunity] = useState(false);
    const [message, setMessage] = useState("");
    const id = localStorage.getItem("id");

    useEffect(() => {
        if (communityId) {
            dispatch(singleCommunity(communityId));
            dispatch(commuOrders(communityId));
        }
    }, [dispatch, communityId]);

    const sendMessages = (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        dispatch(sendMessage({ message, commId: String(communityId) }));
        setMessage("");
    };

    useEffect(() => {
        dispatch(fetchMessage(communityId));
    }, [communityId]);

    return (
        <div className="container-fluid bg-light" style={{ marginTop: 80, minHeight: '90vh', padding: '2rem' }}>
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card shadow-sm hover-shadow rounded-lg border-0">
                        <div className="position-relative">
                            <img
                                src={`http://localhost:4000/${singleCommu?.file}`}
                                className="card-img-top rounded-top"
                                style={{ height: 250, objectFit: 'cover' }}
                                alt={singleCommu?.name}
                            />
                            <div className="position-absolute bottom-0 start-0 w-100 bg-gradient-dark p-3">
                                <h4 className="text-white mb-0">{singleCommu?.name}</h4>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="card-text text-muted">{singleCommu?.description}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="d-grid gap-3">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <Link to={`/add-product/${singleCommu?._id}`}
                                    className="card shadow-sm hover-lift border-0 h-100 text-decoration-none">
                                    <div className="card-body d-flex align-items-center">
                                        <i className="bi bi-plus-circle fs-2 text-primary me-3"></i>
                                        <h5 className="mb-0">Add Product</h5>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-6">
                                <button onClick={() => setSelectedCommunity(true)}
                                    className="card shadow-sm hover-lift border-0 w-100 h-100">
                                    <div className="card-body d-flex align-items-center">
                                        <i className="bi bi-chat-dots fs-2 text-success me-3"></i>
                                        <h5 className="mb-0">Open Chat</h5>
                                    </div>
                                </button>
                            </div>
                            <div className="col-md-6">
                                <Link to="/view-commuproduct"
                                    className="card shadow-sm hover-lift border-0 h-100 text-decoration-none">
                                    <div className="card-body d-flex align-items-center">
                                        <i className="bi bi-pencil-square fs-2 text-warning me-3"></i>
                                        <h5 className="mb-0">Update Products</h5>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-6">
                                <Link to="/orderManagment"
                                    className="card shadow-sm hover-lift border-0 h-100 text-decoration-none">
                                    <div className="card-body d-flex align-items-center">
                                        <i className="bi bi-cart fs-2 text-primary me-3"></i>
                                        <h5 className="mb-0">Order Management</h5>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {selectedCommunity && (
                        <div className="card shadow-lg mt-4 border-0">
                            <div className="card-header bg-white border-bottom-0 d-flex justify-content-between align-items-center py-3">
                                <h5 className="mb-0">{singleCommu?.name} Chat</h5>
                                <button className="btn btn-outline-secondary" onClick={() => setSelectedCommunity(false)}>
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div className="card-body bg-light" style={{ height: '400px', overflowY: 'auto' }}>
                                <div className="chat-messages p-3">
                                    {messages?.map((msg) => (
                                        <div key={msg?._id} className="message mb-3">
                                            <div className={`d-flex ${id === msg?.sender?._id ? 'justify-content-end' : ''}`}>
                                                <div className='d-flex gap-2 px-3 py-2 rounded-pill mb-1'
                                                    style={{ backgroundColor: id === msg?.sender?._id ? '#007bff' : '#6c757d' }}>
                                                    <span className="text-white">{msg?.content}</span>
                                                </div>
                                            </div>
                                            <div className={`d-flex ${id === msg?.sender?._id ? 'justify-content-end' : ''}`}>
                                                <small className="text-muted">
                                                    {msg?.sender?.name} • {new Date(msg?.createdAt).toLocaleDateString()}
                                                </small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card-footer bg-white border-top-0 p-3">
                                <form className="d-flex gap-2" onSubmit={sendMessages}>
                                    <input
                                        type="text"
                                        className="form-control rounded-pill"
                                        placeholder="Type your message..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <button type="submit" className="btn btn-primary rounded-circle">
                                        <i className="bi bi-send"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CommunityActivites;
