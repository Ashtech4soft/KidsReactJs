import React, { useState } from 'react';
import AdminSide from '../../components/admin/AdminSide';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../store/productSlice';
import SupplierSide from '../../components/supplier/supplierSide';
import { Link, useParams } from 'react-router-dom';

function AddMaternityProduct() {


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

                <div>
                    <Link to={'/maternityManagement'}>
                        MatternityKit
                    </Link>
                </div>
                <div>
                    <button>
                        New Born Kit
                    </button>
                </div>
                <div>
                    <button>
                        Hospital Kit
                    </button>
                </div>
            </main>
        </div>
    );
}

export default AddMaternityProduct;
