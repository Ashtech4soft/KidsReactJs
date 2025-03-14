import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getSingleProduct, updateProductDetails } from '../../store/productSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from "../../lib/apiUrl";

function UpdateProduct() {

    const { id: productId } = useParams()
    const { currentProduct, categories } = useSelector((state) => ({
        currentProduct: state.product.currentProduct,
        categories: state.product.categories
    }))

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [imgpreview, setimgPreview] = useState()

    const [updateProduct, setUpdateProduct] = useState({
        name: "",
        price: "",
        description: "",
        productImage: "",
        category: "",
    })


    useEffect(() => {
        dispatch(getSingleProduct(productId))
    }, [dispatch, productId])

    const handleChange = (e) => {
        e.preventDefault()
        setUpdateProduct({ ...updateProduct, [e.target.name]: e.target.value })
    }

    const handleImgChange = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setimgPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
        setUpdateProduct({ ...updateProduct, productImage: e.target.files[0] })


    }
    console.log(categories);

    const updated = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', updateProduct.name)
        formData.append('price', updateProduct.price)
        formData.append('description', updateProduct.description)
        if (updateProduct.productImage) {
            formData.append('file', updateProduct.productImage)
        }
        formData.append('category', updateProduct.category)
        formData.append('productId', productId)
        dispatch(updateProductDetails(formData))

    }

    const delprd = (e) => {
        e.preventDefault()
        dispatch(deleteProduct(productId))
        navigate(-1)
    }


    return (
        <div className="container " style={{ marginTop: 120 }}>
            <h2 className="display-6 mb-4">Update Product</h2>
            {currentProduct && (
                <div className="card p-5">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 position-relative">
                                <img
                                    src={imgpreview || `${BASE_URL}${currentProduct.productImage}`}
                                    style={{ height: 500, width: 500, objectFit: 'cover' }}
                                    alt={currentProduct.name}
                                    className="img-fluid rounded"
                                />
                                <div className="position-absolute top-0 end-0 m-2">
                                    <label htmlFor="imageUpload" className="btn btn-light rounded-circle">
                                        <i className="bi bi-pencil"></i>
                                    </label>
                                    <input
                                        type="file"
                                        id="imageUpload"
                                        className="d-none"
                                        onChange={handleImgChange}
                                        name="productImage"
                                        accept="image/*"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <form onSubmit={updated}>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            value={updateProduct.name || null || currentProduct.name}
                                            onChange={handleChange}
                                            name='name'
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Category</label>
                                        <select className='form-control' name="category" id="" onChange={handleChange}>
                                            <option value={updateProduct.category || currentProduct.category}>select</option>
                                            {categories?.map((cate) => (
                                                <>
                                                    <option value={cate.category_name}>{cate.category_name}</option>
                                                </>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Price</label>
                                        <input
                                            type="number"
                                            name='price'
                                            value={updateProduct.price || currentProduct.price}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            name='description'
                                            value={updateProduct.description || currentProduct.description}
                                            onChange={handleChange}
                                            className="form-control"
                                            rows="3"
                                        />
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Update Product
                                        </button>
                                        <button
                                            onClick={delprd}
                                            type="button"
                                            className="btn btn-danger"
                                        >
                                            Delete Product
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UpdateProduct

