import React from 'react';
import { Link } from 'react-router-dom';

function MaternityPage() {
    return (
        <div className="" style={{ marginTop: 110, minHeight: '80vh' }}>
            {/* Hero Banner Section */}
            <div className="position-relative text-center mb-4">
                <img 
                    src="/banner1.jpg" 
                    className="img-fluid" 
                    alt="Maternity Banner" 
                    style={{ 
                        // minHeight: '80vh', 
                        maxHeight: '500px', 
                        objectFit: 'cover', 
                        width: '100%', 
                        filter: 'brightness(80%)' 
                    }} 
                />
                <h2 
                    className="position-absolute top-50 start-50 translate-middle text-white fw-bold" 
                    style={{ zIndex: 2, fontSize: '2.5rem', textShadow: '2px 2px 5px rgba(0,0,0,0.6)' }}
                >
                    Your Maternity Journey
                </h2>
            </div>

            {/* Card Section */}
            <div className="row justify-content-center container mx-auto mb-5">
                {[
                    { name: "Maternity Kit", image: "/maternity.jpg", desc: "Essential items for expecting mothers.", link: "/maternityProducts/Maternity" },
                    { name: "New Born Kit", image: "/Newbornkit.jpg", desc: "Everything you need for your newborn baby.", link: "/maternityProducts/newBornkit" },
                    { name: "Hospital Bag", image: "/hospitalbag.jpg", desc: "Pack your hospital bag with all the essentials.", link: "/maternityProducts/HosptialBag" }
                ].map((item, index) => (
                    <div key={index} className="col-md-4 d-flex align-items-stretch">
                        <Link to={item.link} className="card m-3 shadow-lg border-0 text-decoration-none" style={{ borderRadius: '15px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
                            <img className="card-img-top" src={item.image} alt={item.name} style={{ height: 350, objectFit: 'cover' }} />
                            <div className="card-body text-center">
                                <h5 className="card-title text-primary fw-bold">{item.name}</h5>
                                <p className="card-text text-muted">{item.desc}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MaternityPage;
