import React, { useEffect } from 'react'
import SupplierSide from '../../components/supplier/supplierSide'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCategory, fetchorders, fetchReviews, fetchsupplierProduct } from '../../store/productSlice'
import { getCharityProduct, getProductByCharity } from '../../store/charitySlice'
import CharitySide from '../../components/charity/CharitySide'

function CharityHome() {

    const { charityProducts } = useSelector((state) => ({
        charityProducts: state.charity.charityProducts
    }))


    const Id = localStorage.getItem('id')
    // const supplierOrder = orders?.filter(order => order.itemId.supplierId === Id)
    // console.log(supplierOrder);


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCharityProduct())
        dispatch(getProductByCharity())
    }, [dispatch])

    return (
        <div>
            <CharitySide />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Welcome </h1>
                </div>

                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">


                                <div className="col-xxl-3 col-md-6">
                                    <Link to={'/viewCharityProducts'} className="card info-card revenue-card">

                                        <div className="card-body">
                                            <h5 className="card-title">
                                                Charity Items <span></span>
                                            </h5>

                                            <div className="d-flex align-items-center">
                                                <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">

                                                    <i className="bi bi-tags-fill"></i>
                                                </div>
                                                <div className="ps-3">
                                                    <h6>{charityProducts?.length}</h6>

                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default CharityHome
