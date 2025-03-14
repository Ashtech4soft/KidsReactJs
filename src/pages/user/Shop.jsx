import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategory, fetchProduct } from '../../store/productSlice';
import ProductCard from '../../components/user/ProductCard';

function Shop() {

    const { products, categories } = useSelector((state) => ({
        products: state.product.products,
        categories: state.product.categories
    }))

    const dispatch = useDispatch()
    console.log(categories);

    useEffect(() => {
        dispatch(fetchProduct())
        dispatch(fetchAllCategory())
    }, [])


    const [priceFilter, setPriceFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const filteredProducts = products.filter(product => {
        const matchesPrice = priceFilter === 'all' ||
            (priceFilter === 'under100' && product.price < 100) ||
            (priceFilter === '100to500' && product.price >= 100 && product.price <= 500) ||
            (priceFilter === '500to1000' && product.price >= 500 && product.price <= 1000) ||
            (priceFilter === 'over1000' && product.price > 1000);

        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
        return matchesPrice && matchesCategory;

    });

    return (
        <div className="container py-5" style={{ marginTop: 100 }}>
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Filter by Price</label>
                        <select className="form-control" onChange={(e) => setPriceFilter(e.target.value)}>
                            <option value="all">All Prices</option>
                            <option value="under100">Under $100</option>
                            <option value="100to500">$100 - $500</option>
                            <option value="500to1000">$500 - $1000</option>
                            <option value="over1000">Over $1000</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Filter by Category</label>
                        <select className="form-control" onChange={(e) => setCategoryFilter(e.target.value)}>
                            <option value="all">All Categories</option>
                            {categories?.map((category) => (
                                <option key={category._id} value={category.category_name}>{category.category_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="row">
                {filteredProducts.map((product, index) => (
                    <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch mb-4">
                        <div style={{width: '100%', height: '100%' }}>
                            <ProductCard
                                key={product._id}
                                name={product.name}
                                price={product.price}
                                desc={product.description}
                                product={product}
                                image={`http://localhost:4000/${product.productImage}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Shop;
