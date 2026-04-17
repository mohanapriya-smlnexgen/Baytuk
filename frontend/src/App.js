import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';

// Separate Menu Page Component
function MenuPage({ data, activeCategory, setActiveCategory }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = data?.menu_categories || [];

  // Filter dishes based on search term
  const filteredCategories = categories.map(category => ({
    ...category,
    dishes: category.dishes.filter(dish =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.dishes.length > 0);

  return (
    <div className="menu-page">
      {/* Header */}
      <div className="menu-page-header">
        <div className="container">
          <button className="back-btn" onClick={() => window.history.back()}>
            ← Back to Home
          </button>
          <h1>Our Full Menu</h1>
          <p>Authentic Arabic • Turkish • Middle Eastern Delicacies</p>
        </div>
      </div>

      <div className="container menu-page-content">
      <div className="icons">
  <a href="#" className="instagram">
    <FaInstagram />
  </a>

  <a href="#" className="tiktok">
    <FaTiktok />
  </a>
</div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(category.id);
                setSearchTerm(''); 
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Dishes Grid */}
        {filteredCategories.length > 0 ? (
          filteredCategories
            .filter((category) => category.id === activeCategory || searchTerm !== '')
            .map((category) => (
              <div key={category.id}>
                <h2 className="category-title">{category.name}</h2>
                <div className="dishes-grid">
                  {category.dishes.map((dish) => (
                    <div key={dish.id} className="dish-card">
                      <div className="dish-image-wrapper">
                        {dish.image ? (
                          <img 
                            src={`http://127.0.0.1:8000${dish.image}`} 
                            alt={dish.name} 
                            className="dish-image"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.classList.add('no-image');
                            }}
                          />
                        ) : (
                          <div className="dish-placeholder">🍽️</div>
                        )}
                        {dish.is_veg && <span className="veg-tag">VEG</span>}
                      </div>

                      <div className="dish-content">
                        <div className="dish-header">
                          <h4>{dish.name}</h4>
                          <span className="dish-price">{dish.price}</span>
                        </div>
                        <p className="dish-description">
                          {dish.description || 'Freshly prepared with authentic ingredients.'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
        ) : (
          <div className="no-results">
            <p>No dishes found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/home/')
      .then((res) => {
        setData(res.data);
        if (res.data.menu_categories?.length > 0) {
          setActiveCategory(res.data.menu_categories[0].id);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader-ring"></div>
        <h2>Discover BAYTUK</h2>
        <p>Preparing an authentic Arabic dining experience...</p>
      </div>
    );
  }

  const hero = data?.hero || {};
  const about = data?.about || {};
  const contact = data?.contact || {};
  const categories = data?.menu_categories || [];

  // Featured dishes for slider (first 3)
  const featuredDishes = [];
  categories.forEach((cat) => {
    cat.dishes.slice(0, 3).forEach((dish) => {
      if (featuredDishes.length < 3) featuredDishes.push(dish);
    });
  });

  return (
    <Router>
      <div className="app">
        {/* Navbar */}
        <nav className="navbar">
          <div className="container navbar-inner">
            <div className="logo-section">
              <img src="/logo-baytuk.png" alt="BAYTUK Logo" className="navbar-logo" />
              <div>
                <h2>BAYTUK</h2>
                <span>Savor the Tradition, Taste the Difference</span>
              </div>
            </div>

            <div className="nav-links">
  <Link to="/">Home</Link>
  <Link to="/menu">Menu</Link>
  <a href="/#about">About</a>
  <a href="/#contact">Contact</a>
</div>
          </div>
        </nav>


        <Routes>
  
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                {/* Hero Section */}
                <section id="home" className="hero" style={{
                  backgroundImage: hero.background_image
                    ? `linear-gradient(rgba(8,8,8,0.78), rgba(8,8,8,0.88)), url(${hero.background_image})`
                    : `linear-gradient(rgba(8,8,8,0.78), rgba(8,8,8,0.88)), url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80')`
                }}>
                  <div className="container hero-layout">
                    <div className="hero-content">
                      <span className="hero-badge">Authentic Arabic Cuisine</span>
                      <h1>{hero.title || 'BAYTUK'}</h1>
                      <p className="hero-subtitle">{hero.subtitle || 'Premium Grill • Shawarma • Mandi'}</p>
                      <p className="hero-description">
                        Experience luxury Arabic dining with premium grilled meats, handcrafted shawarma, aromatic mandi rice, and a sophisticated atmosphere inspired by Dubai and the Middle East.
                      </p>

                      <div className="hero-buttons">
                        <button className="primary-btn" onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}>
                          Explore Menu
                        </button>
                        <a href="#contact" className="secondary-btn">Reserve Table</a>
                      </div>

                      <div className="hero-features">
                        <div className="feature-card">🔥 Premium Grill</div>
                        <div className="feature-card">🌿 Fresh Ingredients</div>
                        <div className="feature-card">✨ Authentic Taste</div>
                      </div>
                      <div className="icons">
  <a href="#" className="instagram">
    <FaInstagram />
  </a>

  <a href="#" className="tiktok">
    <FaTiktok />
  </a>
</div>
                    </div>

                    <div className="hero-visual">
                      <div className="main-food-card">
                        <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80" alt="Arabic Grill" className="main-food-image" />
                      </div>
                      <div className="floating-card floating-card-top">
                        <img src="https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=400&q=80" alt="Shawarma" />
                        <div><h4>Signature Shawarma</h4><p>Authentic grilled wrap</p></div>
                      </div>
                      <div className="floating-card floating-card-bottom">
                        <img src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80" alt="Mandi" />
                        <div><h4>Royal Mandi</h4><p>Slow cooked Arabic rice</p></div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Info Strip */}
                <section className="info-strip">
                  <div className="container info-grid">
                    <div><h4>Location</h4><p>{contact.address || '626 Great Horton Road, Bradford BD7 3ER'}</p></div>
                    <div><h4>Opening Hours</h4><p>Daily: 4:00 PM – 11:30 PM</p></div>
                    <div><h4>Reservations</h4><p>{contact.phone || '01274 780810'}</p></div>
                  </div>
                </section>

                {/* Menu Slider Section */}
                <section id="menu" className="menu-section">
                  <div className="container">
                    <div className="section-header">
                      <span className="section-tag">Signature Dishes</span>
                      <h2 className="section-title">Our Menu</h2>
                      <p className="section-description">
                        Carefully prepared dishes inspired by Arabic, Turkish, and Middle Eastern flavors.
                      </p>
                    </div>

                    <div className="featured-slider">
                      {featuredDishes.map((dish, index) => (
                        <div key={dish.id || index} className="slider-card">
                          <div className="slider-image-wrapper">
                            {dish.image ? (
                              <img 
                                src={`http://127.0.0.1:8000${dish.image}`} 
                                alt={dish.name} 
                                className="slider-image"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.parentElement.classList.add('no-image');
                                }}
                              />
                            ) : (
                              <div className="slider-placeholder">🍽️</div>
                            )}
                            {dish.is_veg && <span className="veg-tag">VEG</span>}
                          </div>

                          <div className="slider-content">
                            <h3>{dish.name}</h3>
                            <p className="slider-price">{dish.price}</p>
                          </div>
                        </div>
                      ))}

                      {/* View Full Menu Card */}
                      <div 
                        className="slider-card view-menu-card" 
                        onClick={() => window.location.href = '/menu'}
                      >
                        <div className="view-menu-content">
                          <div className="arrow-circle">→</div>
                          <h3>View Full Menu</h3>
                          <p>Explore all our signature Arabic dishes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* About Section */}
                <section id="about" className="about-section">
                  <div className="container about-grid">
                    <div className="about-image-container">
                      <img src={about.image || 'https://images.unsplash.com/photo-1552566626-52f8b828add9'} alt="About BAYTUK" className="about-image" />
                    </div>
                    <div className="about-content">
                      <span className="section-tag">Our Story</span>
                      <h2>{about.title || 'Where Tradition Meets Luxury'}</h2>
                      <p>{about.description || 'BAYTUK combines the rich heritage of Arabic cuisine...'}</p>
                      <div className="about-stats">
                        <div className="stat-card"><h3>10+</h3><span>Signature Dishes</span></div>
                        <div className="stat-card"><h3>100%</h3><span>Fresh Ingredients</span></div>
                        <div className="stat-card"><h3>5★</h3><span>Dining Experience</span></div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="contact-section">
                  <div className="container">
                    <div className="section-header">
                      <span className="section-tag">Visit Us</span>
                      <h2 className="section-title">Reserve Your Table</h2>
                    </div>
                    <div className="contact-grid">
                      <div className="contact-info-card">
                        <h3>BAYTUK Arabic Grill House</h3>
                        <div className="contact-item"><span>📍</span><p>{contact.address || '626 Great Horton Road, Bradford BD7 3ER'}</p></div>
                        <div className="contact-item"><span>📞</span><p>{contact.phone || '01274 780810'}</p></div>
                        <div className="contact-item"><span>✉️</span><p>{contact.email || 'info@baytuk.com'}</p></div>
                        <div className="contact-item"><span>🕒</span><p>Daily: 4:00 PM – 11:30 PM</p></div>
                      </div>
                      <div className="contact-form-card">
                        <h3>Book a Table</h3>
                        <input type="text" placeholder="Your Name" />
                        <input type="email" placeholder="Your Email" />
                        <input type="text" placeholder="Phone Number" />
                        <textarea rows="5" placeholder="Special Requests"></textarea>
                        <button className="primary-btn full-width-btn">Send Reservation Request</button>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            }
          />

          {/* Separate Menu Route */}
          <Route
            path="/menu"
            element={<MenuPage data={data} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;