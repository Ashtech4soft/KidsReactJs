import React, { useState } from 'react';
import AdminSide from '../../components/admin/AdminSide';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../store/productSlice';
import SupplierSide from '../../components/supplier/supplierSide';
import { useParams } from 'react-router-dom';

function AddProduct() {


  const { id: commId } = useParams()
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    image: null,
    description: '',
    category: '',
  });

  const { categories } = useSelector((state) => ({
    categories: state.product.categories,
  }))

  const id = localStorage.getItem('id')
  const role = localStorage.getItem('role')

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData((prevData) => ({ ...prevData, image: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting product data:", productData);

    // Creating FormData to send file and text data
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('category', productData.category);
    formData.append('price', productData.price);
    formData.append('description', productData.description);
    formData.append('file', productData.image); // File object
    role === 'supplier' && formData.append('supplierId', id);
    commId && formData.append('communityId', commId)

    console.log("FormData values:");
    dispatch(addProduct(formData))

    resetForm();



  };

  return (
    <div>

      {role === 'admin' ? < AdminSide /> : role !== 'user' && < SupplierSide />}

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Welcome {role}</h1>
        </div>

        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Add Product</h5>
                      <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                          <label htmlFor="productName" className="form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="productName"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="productCategory" className="form-label">
                            Category
                          </label>
                          <select className='form-control' name="category" id="" onChange={handleChange}>
                            <option value="">select</option>
                            {categories?.map((cate) => (
                              <>

                                <option value={cate.category_name}>{cate.category_name}</option>
                              </>
                            ))}
                          </select>
                          {/* <label htmlFor="productCategory" className="form-label">
                            Category
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="productCategory"
                            name="category"
                            value={productData.category}
                            onChange={handleChange}
                            required
                          /> */}
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="productPrice" className="form-label">
                            Price
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="productPrice"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-12">
                          <label htmlFor="productDescription" className="form-label">
                            Description
                          </label>
                          <textarea
                            className="form-control"
                            id="productDescription"
                            name="description"
                            value={productData.description}
                            onChange={handleChange}
                            rows={3}
                            style={{ resize: 'none' }}
                            required
                          ></textarea>
                        </div>
                        <div className="col-12">
                          <label htmlFor="productImage" className="form-label">
                            Image
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="productImage"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </div>
                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                          &nbsp;
                          {/* <button type="reset" className="btn btn-secondary" >
                            View All
                          </button> */}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AddProduct;
