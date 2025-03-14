import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateduserProfile, userProfile } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { user } = useSelector((state) => ({
        user: state.user.user,
    }));

    const navigate = useNavigate()

    const [file, setFile] = useState(null);
    const [editedUser, setEditedUser] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const imageRef = useRef()

    const imageChange = () => {
        imageRef.current.click()
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userProfile());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setEditedUser({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
            });
        }
    }, [user]);

    const [editMode, setEditMode] = useState(false);

    const handleChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const toggleEdit = () => {
        setEditMode(!editMode);
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onloadend = async () => {
            const newImage = reader.result;
            setFile(newImage)
        }
        reader.readAsDataURL(file);

    };

    const submitData = () => {
        const formData = new FormData();
        formData.append('name', editedUser.name);
        formData.append('email', editedUser.email);
        formData.append('phone', editedUser.phone);
        formData.append('file', file);
        dispatch(updateduserProfile(formData));

        setEditMode(false);
    };

    return (
        <div style={{marginTop:'100px'}}> 
            <div className="col-md-12 d-flex justify-content-center align-items-center mt-5">
                <div className="card p-4 shadow-lg w-75 mt-5">
                    <h2 className="fw-bold mb-4 text-center"> Profile</h2>
                    <input type="file" style={{ display: 'none' }} ref={imageRef} disabled={!editMode} />
                    <img src={file || ${BASE_URL}${user?.file} `} onChange={handleFileChange} onClick={imageChange} style={{ width: 100, height: 100, borderRadius: 50, display: 'flex', margin: 'auto' }} alt="" />
                    <div className="mb-3 mt-3">
                        <label className="form-label fw-semibold">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={editedUser.name || user?.name}
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
                            value={editedUser.email || user?.email}
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
                            value={editedUser.phone || user?.phone}
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
                        <button className="btn btn-danger " onClick={() => navigate('/logout')} style={{ marginLeft: 10 }}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
