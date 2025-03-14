import React from 'react'

const Home1 = () => {
  return (
    <div>
          <section id="hero" className="d-flex align-items-center">

            <div className="container">
            <div className="row">
                <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
                <h1 data-aos="fade-up">Grow your business with Vesperr</h1>
                <h2 data-aos="fade-up" data-aos-delay="400">We are team of talented designers making websites with Bootstrap</h2>
                <div data-aos="fade-up" data-aos-delay="800">
                    <a href="#about" className="btn-get-started scrollto">Get Started</a>
                </div>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="fade-left" data-aos-delay="200">
                <img src="assets/user/img/hero-img.png" className="img-fluid animated" alt=""/>
                </div>
            </div>
            </div>

            </section>
    </div>
  )
}

export default Home1