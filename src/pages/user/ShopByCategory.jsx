import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { shopByCategory } from '../../store/productSlice'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../../components/user/ProductCard'

function ShopByCategory() {
    const { productByCategory } = useSelector((state) => ({
        productByCategory: state.product.productByCategory,
    }))
    const dispatch = useDispatch()

    const [search] = useSearchParams()
    const cate = search.get('cate')
    console.log(productByCategory);

    console.log(cate);

    useEffect(() => {
        dispatch(shopByCategory(cate))
    }, [])

    return (
        <div style={{ marginTop: '110px', paddingInline: 50, minHeight: '90vh' }}>
            <div className="row">
                {productByCategory?.map((product) => (
                    <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch mb-4">
                        <div style={{width: '100%', height: '100%' }}>
                            <ProductCard
                                key={product._id}
                                name={product.name}
                                price={product.price}
                                desc={product.description}
                                product={product}
                                image={${BASE_URL}${product.productImage}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShopByCategory
