import React, { useEffect } from 'react'
import SupplierSide from '../../components/supplier/supplierSide'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCategory, fetchorders, fetchReviews, fetchsupplierProduct } from '../../store/productSlice'

function SupplierHome() {

  const { categories, orders, supplierProduct, reviews } = useSelector((state) => ({
    supplierProduct: state.product.supplierProduct,
    categories: state.product.categories,
    orders: state.product.orders,
    reviews: state.product.reviews,
  }))

  console.log(orders);

  const Id = localStorage.getItem('id')
  const supplierOrder = orders?.filter(order => order.itemId.supplierId === Id)
  console.log(supplierOrder);


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchorders())
    dispatch(fetchAllCategory())
    dispatch(fetchReviews())
    dispatch(fetchsupplierProduct())
  }, [dispatch])

  return (
    <div>
      <SupplierSide />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Welcome Admin</h1>
        </div>

        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">


                <div className="col-xxl-3 col-md-4">
                  <Link to={'/categoryManagment'} className="card info-card revenue-card">

                    <div className="card-body">
                      <h5 className="card-title">
                        Category <span></span>
                      </h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">

                          <i class="bi bi-tags-fill"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{categories?.length}</h6>

                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-xxl-3 col-md-4">
                  <Link to={'/view-supproduct'} className="card info-card customers-card">
                    <div className="card-body">
                      <h5 className="card-title">
                        Products <span></span>
                      </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-people"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{supplierProduct?.length}</h6>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-xxl-3 col-md-4">
                  <Link to={'/orderManagment'} className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title">
                        Orders <span></span>
                      </h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-tags"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{supplierOrder?.length}</h6>

                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* <div className="col-xxl-3 col-md-4">
                <div className="card info-card sales-card">
                  <Link to="/view-customer">
                    <div className="card-body">
                      <h5 className="card-title">
                        Reviews <span></span>
                      </h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i class="bi bi-wechat"></i>
                        </div>
                        <div className="ps-3">
                          <h6>5</h6>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div> */}

              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default SupplierHome
