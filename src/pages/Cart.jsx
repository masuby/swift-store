import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { FaDollarSign, FaInfoCircle, FaTag, FaPhone } from 'react-icons/fa';
import { FaMapMarkerAlt, FaPhoneAlt, FaCommentDots, FaCalendarAlt, FaBox } from 'react-icons/fa';
import './Cart.css';

function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  // State for form inputs
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [deliveryDateTime, setDeliveryDateTime] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(null); // Track authenticated user
  const [loadingAuth, setLoadingAuth] = useState(true); // Track auth state loading

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user if logged in
      } else {
        navigate('/signin'); // Redirect to signin if not logged in
      }
      setLoadingAuth(false); // Auth state resolved
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  // Calculate total price
  const totalPrice = product ? product.productPrice * quantity : 0;

  // Handle form submission and save to Firebase
  const handleAddToCart = async (e) => {
    e.preventDefault();

    if (!deliveryLocation || !phoneNumber || !deliveryDateTime || quantity < 1) {
      setError('Please fill in all required fields and ensure quantity is at least 1.');
      return;
    }

    if (!user) {
      setError('You must be logged in to add items to the cart.');
      navigate('/signin');
      return;
    }

    setError('');
    setSuccess('');

    try {
      const orderData = {
        CartItems: {
          Price: product.productPrice,
          Quantity: quantity,
          ProductName: product.productName,
          UserId: user.uid, // Use the authenticated user's UID
        },
        DeliveryLocation: deliveryLocation,
        PhoneNumber: phoneNumber,
        ProductDescription: productDescription,
        SelectedDateTime: deliveryDateTime,
        TotalPrice: totalPrice,
        CreatedAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'Orders'), orderData);

      setSuccess('Product added to cart successfully!');

      // Reset form
      setDeliveryLocation('');
      setPhoneNumber('');
      setProductDescription('');
      setDeliveryDateTime('');
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('Failed to add product to cart. Please try again.');
    }
  };

  // Show loading state while checking authentication
  if (loadingAuth) {
    return <div className="cart-container"><p>Checking authentication...</p></div>;
  }

  if (!product) {
    return <div className="cart-container"><p>No product selected.</p></div>;
  }

  return (
    <div className="cart-container">
      <div className="cart-content fade-in">
        {/* Left Side: Product Details (60%) */}
        <div className="product-details fade-in-delay-1">
          <div className="product-image-container">
            <img src={product.ImageUrl} alt={product.productName} className="product-image" />
            <h2>{product.productName}</h2>
          </div>
          <div className="product-info-details">
            <p>
              <FaDollarSign className="info-icon" />
              <strong>Price:</strong> ${product.productPrice}
            </p>
            <p>
              <FaInfoCircle className="info-icon" />
              <strong>Description:</strong> {product.description || 'No description available.'}
            </p>
            <p>
              <FaTag className="info-icon" />
              <strong>Type:</strong> {product.productType}
            </p>
            <p>
              <FaPhone className="info-icon" />
              <strong>Phone Number:</strong> {product.phoneNumber || 'Not provided'}
            </p>
          </div>
        </div>

        {/* Right Side: Delivery Form (40%) */}
        <div className="delivery-form fade-in-delay-2">
          <h3>Delivery Details</h3>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <form onSubmit={handleAddToCart}>
            <div className="form-group">
              <label htmlFor="deliveryLocation">
                <FaMapMarkerAlt className="form-icon" />
                Delivery Location
              </label>
              <input
                type="text"
                id="deliveryLocation"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                placeholder="Enter your delivery location"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">
                <FaPhoneAlt className="form-icon" />
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="productDescription">
                <FaCommentDots className="form-icon" />
                Product Description
              </label>
              <textarea
                id="productDescription"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="What do you want the product to contain?"
                rows="3"
              />
            </div>
            <div className="form-group">
              <label htmlFor="deliveryDateTime">
                <FaCalendarAlt className="form-icon" />
                Delivery Date & Time
              </label>
              <input
                type="datetime-local"
                id="deliveryDateTime"
                value={deliveryDateTime}
                onChange={(e) => setDeliveryDateTime(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">
                <FaBox className="form-icon" />
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                required
              />
            </div>
            <div className="calculation-section">
              <h4>Order Summary</h4>
              <p>Price per item: ${product.productPrice}</p>
              <p>Quantity: {quantity}</p>
              <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
            </div>
            <button type="submit" className="add-to-cart-submit-btn">
              Add to Cart
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cart;