import React from 'react'
import { useNavigate } from 'react-router-dom'
// import ProductDetails from '../../pages/user/ProductDetails'

function ProductCard({ name, image, product, price }) {

    const navigate = useNavigate()

    const ProductDetail = () => {
        navigate(`/productDetails`, { state: product })
    }
    console.log(product)
    return (
        <div onClick={ProductDetail} className="pointer" style={{ cursor: 'pointer', transition: 'transform 0.3s', }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
            <div className="card text-center p-2 shadow" data-aos="fade-up" data-aos-delay="100" style={{ height: 350 }}>
                <div className="member-img" style={{ width: '' }}>
                    <img
                        src={image}
                        className="img-fluid rounded"
                        alt={name}
                        style={{ objectFit: "cover", height: "200px", width: "100%", transition: 'opacity 0.3s', margin: 'auto' }}
                        onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
                        onMouseOut={e => e.currentTarget.style.opacity = '1'}
                    />
                </div>
                <div>{product.communityId && <p className='text-muted fst-italic mt-2'> By <b>{product.communityId.name}</b> Community</p>}</div>
                <div className="card-body mt-3">
                    <h4 className="mb-1 fw-semibold h5">{name}</h4>
                    <h5 className="text-success fw-bold h4">${price}</h5>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
