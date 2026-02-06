import React from 'react';
import './App.css'; // Component styles

function App() {
  const handleGetStarted = () => {
    alert('Welcome to Paradise Nursery! We will contact you soon.');
    // Here could be navigation to another page or modal opening
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-overlay">
          <nav className="navbar">
            <div className="logo">
              <span className="logo-icon">🌿</span>
              <h1 className="logo-text">Paradise Nursery</h1>
            </div>
          </nav>
          
          <div className="hero-content">
            <h2 className="hero-title">Grow Your Paradise Garden</h2>
            <p className="hero-subtitle">
              Specialized nursery of exotic and rare plants 
              for your home and garden
            </p>
            
            <div className="hero-features">
              <div className="feature">
                <span className="feature-icon">✅</span>
                <span>100% Organic Plants</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <span>Free Delivery from $50</span>
              </div>
              <div className="feature">
                <span className="feature-icon">👨‍🌾</span>
                <span>Expert Consultation</span>
              </div>
            </div>
            
            <button 
              className="cta-button"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
            
            <p className="hero-note">
              Join 5,000+ happy gardeners
            </p>
          </div>
        </div>
      </header>

      {/* Additional Sections */}
      <section className="info-section">
        <h3>Why Choose Paradise Nursery?</h3>
        <div className="benefits">
          <div className="benefit-card">
            <div className="benefit-icon">🌱</div>
            <h4>Exotic Collection</h4>
            <p>200+ unique plant varieties from around the world</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💧</div>
            <h4>Easy Care</h4>
            <p>Detailed care instructions for every plant</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📦</div>
            <h4>Safe Shipping</h4>
            <p>Special packaging ensures plants arrive healthy</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📞</div>
            <h4>24/7 Support</h4>
            <p>Our plant experts are always ready to help</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h3>Ready to Start Your Plant Journey?</h3>
          <p>Get your first plant with 15% discount today!</p>
          <button 
            className="cta-button secondary"
            onClick={handleGetStarted}
          >
            Get Started Now
          </button>
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Paradise Nursery. All rights reserved.</p>
        <p>123 Green Street, Garden City | contact@paradisenursery.com</p>
      </footer>
    </div>
  );
}

export default App;
