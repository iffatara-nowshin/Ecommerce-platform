import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import "./Feature.css";
import "./NewArrival.css";
import "./Footer.css";

const Home = () => {
  return (
    <div className="mt-5 pt-4">
      {/* HERO SECTION */}
      <section className="hero-section min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden">
        <div
          className="hero-bg position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundImage:  "url('/images/hero.jpg')",height: "100vh",
       backgroundSize: "cover",
       backgroundPosition: "center",
      backgroundRepeat: "no-repeat" }}
        ></div>
        <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100"></div>

        <div className="container position-relative text-white">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h1 className="hero-title">CARRYONIX</h1>

              <p className="hero-subtitle">Carry Your Own Style</p>

              <div className="hero-divider mx-auto mb-4"></div>

              <Link
                to="/products"
                className="hero-btn btn btn-outline-light rounded-pill px-5 py-3 text-uppercase fw-bold"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </section>


{/* FEATURED SECTION (Dreamy Ibiza Style) */}
<section className="feature-ibiza">
  {/* background image overlay */}
  <div className="feature-ibiza__bg" />

  <div className="container">
    <div className="feature-ibiza__head">
      <h2 className="feature-ibiza__title">Featured Categories</h2>
      <p className="feature-ibiza__sub">
        Soft tones. Premium picks. Choose your next favorite bag.
      </p>
    </div>

    <div className="feature-ibiza__grid">
      {/* 1 */}
      <div className="ibiza-card">
        <div className="ibiza-card__img">
          <img src="/images/backpacks.jpg" alt="Backpacks" />
        </div>
        <div className="ibiza-card__content">
          <span className="ibiza-card__tag">01</span>
          <h3 className="ibiza-card__h3">Backpacks</h3>
          <p className="ibiza-card__p">
            Durable and stylish backpacks for travel, college, and daily use.
          </p>
          <Link to="/products" className="ibiza-card__btn">View Collection</Link>
        </div>
      </div>

      {/* 2 */}
      <div className="ibiza-card">
        <div className="ibiza-card__img">
          <img src="/images/casual-bags.jpg" alt="Casual Bags" />
        </div>
        <div className="ibiza-card__content">
          <span className="ibiza-card__tag">02</span>
          <h3 className="ibiza-card__h3">Casual Bags</h3>
          <p className="ibiza-card__p">
            Everyday bags made for simple style and comfort.
          </p>
          <Link to="/products" className="ibiza-card__btn">View Collection</Link>
        </div>
      </div>

      {/* 3 */}
      <div className="ibiza-card">
        <div className="ibiza-card__img">
          <img src="/images/laptop-bags.jpg" alt="Laptop Bags" />
        </div>
        <div className="ibiza-card__content">
          <span className="ibiza-card__tag">03</span>
          <h3 className="ibiza-card__h3">Laptop Bags</h3>
          <p className="ibiza-card__p">
            Smart and protective laptop bags for work and study.
          </p>
          <Link to="/products" className="ibiza-card__btn">View Collection</Link>
        </div>
      </div>

      {/* 4 */}
      <div className="ibiza-card">
        <div className="ibiza-card__img">
          <img src="/images/travel-bags.jpg" alt="Travel Bags" />
        </div>
        <div className="ibiza-card__content">
          <span className="ibiza-card__tag">04</span>
          <h3 className="ibiza-card__h3">Travel Bags</h3>
          <p className="ibiza-card__p">
            Spacious and reliable travel bags for long journeys.
          </p>
          <Link to="/products" className="ibiza-card__btn">View Collection</Link>
        </div>
      </div>

      {/* 5 */}
      <div className="ibiza-card">
        <div className="ibiza-card__img">
          <img src="/images/womens-bags.jpg" alt="Women’s Bags" />
        </div>
        <div className="ibiza-card__content">
          <span className="ibiza-card__tag">05</span>
          <h3 className="ibiza-card__h3">Women’s Bags</h3>
          <p className="ibiza-card__p">
            Elegant bags designed for modern everyday fashion.
          </p>
          <Link to="/products" className="ibiza-card__btn">View Collection</Link>
        </div>
      </div>
    </div>
  </div>
</section>

      


      {/* NEW ARRIVAL SECTION */}
      <section className="new-arrival">
        <div className="container">
          <div className="section-head center">
            <p className="section-mini">LATEST DROP</p>
            <h2 className="arrival-title">New Arrivals</h2>
          </div>

          <div className="arrival-wrapper">
            <div className="arrival-card">
              <img src="/images/newarrival1.jpg" alt="Crossbody Leather Bag" />
              <h4>Crossbody Leather Bag</h4>
              <p>Minimal design for everyday elegance.</p>
              <Link to="/products" className="arrival-btn">
                Shop Now
              </Link>
            </div>

            <div className="arrival-card">
              <img src="/images/newarrival2.jpg" alt="Shoulder Bag" />
              <h4>Shoulder Bag</h4>
              <p>Soft, stylish, and made for comfort.</p>
              <Link to="/products" className="arrival-btn">
                Shop Now
              </Link>
            </div>

            <div className="arrival-card">
              <img src="/images/newarrival3.jpg" alt="Mini Shoulder Bag" />
              <h4>Mini Shoulder Bag</h4>
              <p>Small bag, big style statement.</p>
              <Link to="/products" className="arrival-btn">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ft">
        <div className="ftTop">
          <div className="ftWrap ftTopRow">
            <div>
              <h3>Subscribe To Our Newsletter</h3>
              <p>Get updates, offers and new arrivals in your inbox.</p>
            </div>

            <form className="ftForm" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter email address" />
              <button type="submit">Get Listed</button>
            </form>
          </div>
        </div>

        <div className="ftMain">
          <div className="ftWrap ftGrid">
            <div className="ftBrand">
              <h4>CARRYONIX</h4>
              <p>Premium bags for everyday carry. Simple, durable, stylish.</p>

              <div className="ftMiniForm">
                <input placeholder="Your email" />
                <button aria-label="submit">→</button>
              </div>
            </div>

            <div className="ftCol">
              <h5>About</h5>
              <a href="/about">About Us</a>
              <a href="/contact">Contact</a>
              <a href="/blog">Blog</a>
            </div>

            <div className="ftCol">
              <h5>Support</h5>
              <a href="/shipping">Shipping</a>
              <a href="/returns">Returns</a>
              <a href="/faq">FAQ</a>
            </div>

            <div className="ftCol">
              <h5>Social</h5>
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
            </div>
          </div>

          <div className="ftCopy">
            © {new Date().getFullYear()} Carryonix. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
