import { FaBullseye, FaEye, FaHeart } from 'react-icons/fa';
import './About.css';

function About() {
  return (
    <div className="about-container">
      {/* What is Swift Store Section */}
      <div className="what-is-section">
        <h2>WHAT IS SWIFT STORE?</h2>
        <p>
          Swift Store is your go-to online marketplace for a wide range of products, from electronics to fashion. We connect buyers and sellers in Tanzania, offering a seamless shopping experience with quality and convenience at its core.
        </p>
      </div>

      {/* Mission, Vision, Core Values Section */}
      <div className="values-section">
        <div className="value-item">
          <FaBullseye className="value-icon" />
          <h3>Mission</h3>
          <p>
            To empower Tanzanian communities by providing a reliable platform for buying and selling high-quality products, fostering economic growth and convenience.
          </p>
        </div>
        <div className="value-item">
          <FaEye className="value-icon" />
          <h3>Vision</h3>
          <p>
            To become the leading e-commerce platform in Tanzania, revolutionizing online shopping with innovation, trust, and accessibility for all.
          </p>
        </div>
        <div className="value-item">
          <FaHeart className="value-icon" />
          <h3>Core Values</h3>
          <p>
            Integrity, customer satisfaction, and innovation drive us to deliver exceptional service while building lasting relationships with our community.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;