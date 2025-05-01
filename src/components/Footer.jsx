import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Newsletter Section */}
        <div className="footer-section newsletter-section">
          <h3>Newsletter</h3>
          <p>Subscribe to get the latest updates and offers.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        {/* Contact Section */}
        <div className="footer-section contact-section">
          <h3>Contacts</h3>
          <h4>Swift Store</h4>
          <p>Address: P.O. Box 230698, Dar es Salaam, Tanzania</p>
          <p>Phone: +255 679 601 466</p>
          <p>Email: <a href="mailto:support@swift.co.tz">support@swift.co.tz</a></p>
        </div>

        {/* Follow Us Section */}
        <div className="footer-section follow-section">
          <h3>Follow Us On</h3>
          <div className="social-icons">
            <a href="#" className="social-icon">
              <FaFacebook />
            </a>
            <a href="#" className="social-icon">
              <FaTwitter />
            </a>
            <a href="#" className="social-icon">
              <FaInstagram />
            </a>
            <a href="#" className="social-icon">
              <FaLinkedin />
            </a>
          </div>
        </div>


        {/* Download App Section */}
        <div className="footer-section download-section">
          <h3>Download the Swift App</h3>
          <p>Shop on the go with our mobile app!</p>
          <a href="#" className="download-btn">Download Now</a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Swift Store. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;