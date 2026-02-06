import React from 'react';
import './AboutUs.css'; // Component styles

const AboutUs = () => {
  return (
    <div className="about-us">
      <header className="about-header">
        <h1>About TechVision</h1>
        <p className="tagline">Innovations that shape the future</p>
      </header>

      <section className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            We create technological solutions that simplify lives and businesses. 
            Our goal is to make cutting-edge technologies accessible, reliable, 
            and efficient for everyone.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2015, TechVision started as a small team of passionate 
            software developers. Today, we are an international company with 
            offices in 10 countries, serving over 500 clients worldwide.
          </p>
        </div>

        <div className="about-section">
          <h2>What We Do</h2>
          <ul>
            <li>Web and Mobile Application Development</li>
            <li>Artificial Intelligence & Machine Learning</li>
            <li>Enterprise Digital Solutions</li>
            <li>IT Strategy Consulting</li>
            <li>Cloud Infrastructure & DevOps</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Our Values</h2>
          <div className="values">
            <div className="value-card">
              <h3>Innovation</h3>
              <p>We continuously explore new technologies and approaches.</p>
            </div>
            <div className="value-card">
              <h3>Quality</h3>
              <p>Every product undergoes rigorous quality assurance.</p>
            </div>
            <div className="value-card">
              <h3>Teamwork</h3>
              <p>Our employees are our greatest asset and strength.</p>
            </div>
            <div className="value-card">
              <h3>Sustainability</h3>
              <p>We build solutions with long-term impact in mind.</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Our Team</h2>
          <p>
            We are a diverse team of 200+ professionals including developers, 
            designers, data scientists, and project managers united by a shared 
            passion for technology and excellence.
          </p>
        </div>

        <div className="about-section">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <p><strong>Email:</strong> info@techvision.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Innovation Drive, Silicon Valley, CA</p>
          </div>
        </div>
      </section>

      <footer className="about-footer">
        <p>© {new Date().getFullYear()} TechVision. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
