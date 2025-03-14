import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supplierProfile, updateSupplierProfile } from "../../store/SupplierSlice";
import SupplierSide from "./supplierSide";
// import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

function SupplierProfile() {
    const { supplier } = useSelector((state) => ({
        supplier: state.supplier.supplier,
    }));

    const [editedSupplier, setEditedSupplier] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(supplierProfile());
    }, [dispatch]);

    useEffect(() => {
        if (supplier) {
            setEditedSupplier({
                name: supplier.name || "",
                email: supplier.email || "",
                phone: supplier.phone || "",
            });
        }
    }, [supplier]);

    const [editMode, setEditMode] = useState(false);

    const handleChange = (e) => {
        setEditedSupplier({ ...editedSupplier, [e.target.name]: e.target.value });
    };

    const toggleEdit = () => {
        setEditMode(!editMode);
    };

    const submitData = () => {
        dispatch(updateSupplierProfile(editedSupplier));
        setEditMode(false);
    };

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3">
                    <SupplierSide />
                </div>

                {/* Profile Content */}
                <div className="col-md-9 d-flex justify-content-center mt-5">
                    <div className="card p-4 shadow-lg w-75">
                        <h2 className="fw-bold mb-4 text-center">Supplier Profile</h2>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={editedSupplier.name}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={editedSupplier.email}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Phone</label>
                            <input
                                type="tel"
                                className="form-control"
                                name="phone"
                                value={editedSupplier.phone}
                                onChange={handleChange}
                                disabled={!editMode}
                            />
                        </div>

                        <div className="text-center">
                            {editMode ? (
                                <button className="btn btn-success me-2" onClick={submitData}>
                                    Save Changes
                                </button>
                            ) : (
                                <button className="btn btn-primary" onClick={toggleEdit}>
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SupplierProfile;
