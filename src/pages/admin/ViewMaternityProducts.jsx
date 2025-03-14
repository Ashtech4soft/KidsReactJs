import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchmaternityProducts } from '../../store/productSlice'
import AdminSide from '../../components/admin/AdminSide'

function ViewMaternityProducts() {


    const { maternityProducts } = useSelector((state) => ({
        maternityProducts: state.product.maternityProducts,
    }))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchmaternityProducts())
    }, [])
    console.log(maternityProducts);

    return (
        <div>
            <AdminSide />

            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Welcome Admin</h1>
                </div>
                <div>
                {maternityProducts && maternityProducts.length > 0 ? (
                    <table className="product-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Product Name</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {maternityProducts.map((product) => (
                                <tr key={product._id} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.productName}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.MaternityCategory}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.description}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>${product.price}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.image && <img src={`${BASE_URL}${product.image}`} alt={product.productName} style={{ width: '50px' }} />}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No maternity products available.</p>
                )}
                </div>
            </main>
        </div>
    )
}

export default ViewMaternityProducts
