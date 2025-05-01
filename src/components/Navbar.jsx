import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './Navbar.css';
import Swift from "../assets/swift.png"

function Navbar() {
  const handleDownloadApp = () => {
    // Replace with actual download link or action
    alert('Downloading Swift App...'); // Placeholder action
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Logo */}
        <Link to="/" className="navbar-logo">
        <img src={Swift} alt='swift'/>
        </Link>

        {/* Center: Search Bar */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search for anything"
            className="search-input"
          />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>

        {/* Right: Sign In and Download App */}
        <div className="navbar-signin">
          <button onClick={handleDownloadApp} className="download-app-btn">
            Download Swift App
          </button>
        </div>
      </div>

      {/* Bottom: Navigation Buttons */}
      <div className="navbar-buttons">
        <Link to="/" className="nav-button">
          Home
        </Link>
        <Link to="/added-cart" className="nav-button">
          Cart
        </Link>
        <Link to="/signin" className='nav-button'>
            Sign In
          </Link>
      </div>
    </nav>
  );
}

export default Navbar;