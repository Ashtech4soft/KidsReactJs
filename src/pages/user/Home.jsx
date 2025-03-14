import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../../components/user/ProductCard'
import { fetchProduct } from '../../store/productSlice'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const { products, loading, categories } = useSelector((state) => ({
    products: state.product?.products,
    loading: state.product?.loading,
    categories: state.product?.categories

  }))
  const dispatch = useDispatch()

  console.log(products);
  useEffect(() => {
    dispatch(fetchProduct())
  }, [dispatch])

  const navigate = useNavigate()

  return (
    <>
      <section id="hero" className="">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1 data-aos="fade-up">Discover Joyful Shopping for Kids!</h1>
              <h2 data-aos="fade-up" data-aos-delay="400">Explore a delightful collection of toys, clothing, and accessories for your little ones.</h2>
              <div data-aos="fade-up" data-aos-delay="800">
                <a href="#about" className="btn-get-started scrollto">Get Started</a>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="fade-left" data-aos-delay="200">
              <img src="assets/user/img/hero-img.png" className="img-fluid animated" alt="" style={{ borderRadius: "10px" }} />
            </div>
          </div>
        </div>
      </section>

      <main id="main " className='row'>
        <section id="clients" className="clients clients ">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-4 col-6">
                <img src="assets/user/img/clients/client-1.png" className="img-fluid" alt="" data-aos="zoom-in" />
              </div>

              <div className="col-lg-2 col-md-4 col-6">
                <img src="assets/user/img/clients/client-2.png" className="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="100" />
              </div>

              <div className="col-lg-2 col-md-4 col-6">
                <img src="assets/user/img/clients/client-3.png" className="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="200" />
              </div>

              <div className="col-lg-2 col-md-4 col-6">
                <img src="assets/user/img/clients/client-4.png" className="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="300" />
              </div>

              <div className="col-lg-2 col-md-4 col-6">
                <img src="assets/user/img/clients/client-5.png" className="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="400" />
              </div>

              <div className="col-lg-2 col-md-4 col-6">
                <img src="assets/user/img/clients/client-6.png" className="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="500" />
              </div>
            </div>
          </div>
        </section>

        <section id="counts" className="counts">
          <div className="container">
            <div className="row">
              <div className="image col-xl-5 d-flex align-items-stretch justify-content-center justify-content-xl-start" data-aos="fade-right" data-aos-delay="150">
                <img src="assets/user/img/counts-img.png" alt="" className="img-fluid" style={{ borderRadius: "10px" }} />
              </div>
              <div className="col-xl-7 d-flex align-items-stretch pt-4 pt-xl-0" data-aos="fade-left" data-aos-delay="300">
                <div className="content d-flex flex-column justify-content-center">
                  <div className="row">
                    <div className="col-md-6 d-md-flex align-items-md-stretch">
                      <div className="count-box">
                        <i className="bi bi-emoji-smile"></i>
                        <span data-purecounter-start="0" data-purecounter-end="5000" data-purecounter-duration="1" className="purecounter"></span>
                        <p><strong>Happy Customers</strong> Thousands of parents trust us for quality kids' products.</p>
                      </div>
                    </div>

                    <div className="col-md-6 d-md-flex align-items-md-stretch">
                      <div className="count-box">
                        <i className="bi bi-box-seam"></i>
                        <span data-purecounter-start="0" data-purecounter-end="1000" data-purecounter-duration="1" className="purecounter"></span>
                        <p><strong>Products Available</strong> A wide range of toys, clothing, and accessories for kids of all ages.</p>
                      </div>
                    </div>

                    <div className="col-md-6 d-md-flex align-items-md-stretch">
                      <div className="count-box">
                        <i className="bi bi-truck"></i>
                        <span data-purecounter-start="0" data-purecounter-end="10" data-purecounter-duration="1" className="purecounter"></span>
                        <p><strong>Years in Business</strong> Delivering happiness and quality for over a decade.</p>
                      </div>
                    </div>

                    <div className="col-md-6 d-md-flex align-items-md-stretch">
                      <div className="count-box">
                        <i className="bi bi-star"></i>
                        <span data-purecounter-start="0" data-purecounter-end="50" data-purecounter-duration="1" className="purecounter"></span>
                        <p><strong>Awards & Recognitions</strong> Proudly recognized for excellence in kids' retail.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services">
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>Categories</h2>
              <p>Magnam dolores commodi suscipit eius consequatur ex aliquid fug</p>
            </div>
            <div className="row">
              {categories?.map((cate) => (
                <div onClick={() => navigate(`/shopByCategory?cate=${cate.category_name}`)} key={cate._id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch mb-4">
                  <div className="icon-box text-center w-100 p-3 shadow-sm rounded" data-aos="fade-up" data-aos-delay="100">
                    <div className="">
                      <img
                        src={`${BASE_URL}${cate.image}`}
                        alt={cate.category_name}
                        className="img-fluid rounded"
                        style={{ height: '150px', width: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <h4 className="title mt-3">
                      <a href="#" className="text-decoration-none text-dark">{cate.category_name}</a>
                    </h4>
                    <p className="description text-muted">{cate.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="team section-bg">
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>Recent Products</h2>
              <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem</p>
            </div>
            <div className="row">
              {products?.slice(0, 8).map((product) => (
                <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch mb-4">
                  <div style={{ width: '100%', height: '100%' }}>
                    <ProductCard
                      key={product._id}
                      name={product.name}
                      price={product.price}
                      desc={product.description}
                      product={product}
                      image={`${BASE_URL}${product.productImage}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home