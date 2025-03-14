import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CharitySide from './CharitySide';
import { fetchSingleCharity } from '../../store/charitySlice';

function CharityProfile() {
    const { charity } = useSelector((state) => ({
        charity: state.charity.charity,
    }));



    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSingleCharity());
    }, [dispatch]);

    console.log(charity);

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3">
                    <CharitySide />
                </div>

                {/* Profile Content */}
                <div className="col-md-9 d-flex justify-content-center mt-5">
                    <div className="card p-4 shadow-lg w-75">
                        <h2 className="fw-bold mb-4 text-center">Charity Profile</h2>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={charity?.name}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={charity?.email}
                            />
                        </div>

                        {/* <div className="mb-3">
                            <label className="form-label fw-semibold">Phone</label>
                            <input
                                type="tel"
                                className="form-control"
                                name="phone"
                                value={charity.phone}
                            />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CharityProfile
