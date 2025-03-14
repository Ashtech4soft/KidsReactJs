import React, { useEffect, useState } from 'react';
import AdminSide from '../../components/admin/AdminSide';
import { useDispatch, useSelector } from 'react-redux';
import { addcategory, delcategory, fetchAllCategory } from '../../store/productSlice';
import SupplierSide from '../../components/supplier/supplierSide';
// import 'bootstrap/dist/css/bootstrap.min.css';

function CategoryManage() {
    // const [categories, setCategories] = useState([
    //     { id: 1, name: 'Toys', description: 'Fun toys for all ages', active: true },
    //     { id: 2, name: 'Dresses', description: 'Beautiful dresses for kids', active: true },
    //     { id: 3, name: 'Shoes', description: 'Comfortable footwear', active: true }
    // ]);

    const { categories } = useSelector((state) => ({
        categories: state.product.categories,
    }))
    const [newCategory, setNewCategory] = useState({
        name: '',
        description: '',
        image: null,
    });


    const [showForm, setShowForm] = useState(false);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllCategory())
    }, [])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };

    const handleImageChange = (e) => {
        setNewCategory({ ...newCategory, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newCategory.name);
        formData.append('description', newCategory.description);
        if (newCategory.image) {
            formData.append('image', newCategory.image);
        }
        dispatch(addcategory(formData))
        resetForm();
    };

    const handleDelete = (id) => {
        dispatch(delcategory(id))

    };

    const resetForm = () => {
        setNewCategory({ name: '', description: '', image: null, active: true });
        setShowForm(false);
    };

    console.log(categories)

    const role = localStorage.getItem('role')

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3 col-md-4">
                    {role === 'admin' ? < AdminSide /> : <SupplierSide />}
                </div>
                <div className="col-lg-9 col-md-8 mt-5">
                    <div className="section dashboard">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h2 className="text-primary">Category Management</h2>
                            <button
                                onClick={() => setShowForm(!showForm)}
                                className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'}`}
                            >
                                {showForm ? 'Cancel' : 'Add New Category'}
                            </button>
                        </div>

                        {showForm && (
                            <div className="card mb-4 shadow">
                                <div className="card-header bg-light">
                                    <h5 className="card-title mb-0">Add New Category</h5>
                                </div>
                                <div className="card-body">
                                    <form >
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label className="form-label">Category Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={newCategory.name}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label">Description</label>
                                                <textarea
                                                    name="description"
                                                    value={newCategory.description}
                                                    onChange={handleInputChange}
                                                    className="form-control"
                                                    rows="3"
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Category Image</label>
                                                <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
                                            </div>
                                        </div>

                                        <div className="mt-3 d-flex justify-content-end gap-2">
                                            <button type="button" onClick={handleSubmit} className="btn btn-secondary">
                                                Add
                                            </button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        <div className="card shadow">
                            <div className="card-header bg-light">
                                <h5 className="card-title mb-0">Categories</h5>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th className="text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories?.map((category, index) => (
                                                <tr key={category._id}>
                                                    <td>{index + 1}</td>
                                                    <td className="fw-medium">{category.category_name}</td>
                                                    <td>{category.description}</td>
                                                    <td className="text-center">
                                                        <div className="d-flex justify-content-center gap-2">

                                                            <button
                                                                onClick={() => handleDelete(category._id)}
                                                                className="btn btn-sm btn-outline-danger"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {categories?.length === 0 && (
                                    <div className="text-center py-4">
                                        <p className="text-muted">No categories found. Add your first category!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryManage;
