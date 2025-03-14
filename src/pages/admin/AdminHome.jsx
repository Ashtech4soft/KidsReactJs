import React, { useEffect } from "react";
import AdminSide from "../../components/admin/AdminSide";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory, fetchmaternityProducts, fetchorders, fetchPayments, fetchProduct, fetchReviews } from "../../store/productSlice";
import { usersFetch } from "../../store/userSlice";
import { fetchSuppliers } from "../../store/SupplierSlice";
import { fetchCharity } from "../../store/charitySlice";

const AdminHome = () => {

  const { users, suppliers, charitys, categories, orders, products, reviews, payments, maternityProducts } = useSelector((state) => ({
    users: state.user.users,
    suppliers: state.supplier.suppliers,
    charitys: state.charity.charitys,
    products: state.product.products,
    categories: state.product.categories,
    orders: state.product.orders,
    reviews: state.product.reviews,
    payments: state.product.payments,
    maternityProducts: state.product.maternityProducts,
  }))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchorders())
    dispatch(fetchAllCategory())
    dispatch(fetchSuppliers())
    dispatch(fetchCharity())
    dispatch(fetchReviews())
    dispatch(usersFetch())
    dispatch(fetchProduct())
    dispatch(fetchPayments())
    dispatch(fetchmaternityProducts())
  }, [dispatch])

  return (
    <div>
      <AdminSide />

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Welcome Admin</h1>
        </div>

        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-xxl-3 col-md-4">
                  <div className="card info-card sales-card">
                    <Link to="/view-customer">
                      <div className="card-body">
                        <h5 className="card-title">
                          Customers <span></span>
                        </h5>

                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-people"></i>
                          </div>
                          <div className="ps-3">
                            <h6>{users?.length}</h6>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/*  */}
                <div className="col-xxl-3 col-md-4">
                  <Link to={'/view-suppliers'} className="card info-card customers-card">
                    <div className="card-body">
                      <h5 className="card-title">
                        Suppliers <span></span>
                      </h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-people"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{suppliers?.length}</h6>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-xxl-3 col-md-4">
                  <div className="card info-card sales-card">
                    <Link to="/view-charitys">
                      <div className="card-body">
                        <h5 className="card-title">
                          Charitys <span></span>
                        </h5>

                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-people"></i>
                          </div>
                          <div className="ps-3">
                            <h6>{charitys?.length}</h6>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
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
                  <Link to={'/view-product'} className="card info-card customers-card">
                    <div className="card-body">
                      <h5 className="card-title">
                        Products <span></span>
                      </h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-bag-fill"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{products?.length}</h6>

                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-xxl-3 col-md-4">
                  <Link to={'/AddMaternityProduct'} className="card info-card customers-card">
                    <div className="card-body">
                      <h5 className="card-title">
                        <span>Maternity Products</span>
                      </h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-bag-fill"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{maternityProducts?.length}</h6>

                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-xxl-3 col-md-4">
                  <div className="card info-card sales-card">
                    <Link to="/payments">
                      <div className="card-body">
                        <h5 className="card-title">
                          Payments <span></span>
                        </h5>

                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-currency-dollar"></i>
                          </div>
                          <div className="ps-3">
                            <h6>{payments?.length}</h6>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="col-xxl-3 col-md-4">
                  <div className="card info-card sales-card">
                    <Link to="/orderManagment">
                      <div className="card-body">
                        <h5 className="card-title">
                          Orders <span></span>
                        </h5>

                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-tags"></i>
                          </div>
                          <div className="ps-3">
                            <h6>{orders?.length}</h6>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="col-xxl-3 col-md-4">
                  <div className="card info-card sales-card">
                    <Link to="/reviewManagment">
                      <div className="card-body">
                        <h5 className="card-title">
                          Reviews <span></span>
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i class="bi bi-wechat"></i>
                          </div>
                          <div className="ps-3">
                            <h6>{reviews?.length}</h6>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminHome;
