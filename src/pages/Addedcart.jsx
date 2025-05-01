import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { FaTrash } from 'react-icons/fa';
import './AddedCart.css';

function AddedCart() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null); // Track authenticated user
  const [loadingAuth, setLoadingAuth] = useState(true); // Track auth state loading
  const navigate = useNavigate();

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

    return () => unsubscribe();
  }, [navigate]);

  // Fetch orders for the user
  const fetchOrders = async () => {
    if (!user) return; // Don't fetch if user is not authenticated

    try {
      const q = query(collection(db, 'Orders'), where('CartItems.UserId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      console.log('Query Snapshot:', querySnapshot);
      console.log('Number of documents fetched:', querySnapshot.size);

      if (querySnapshot.empty) {
        console.log('No orders found for this user.');
      }

      const ordersData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        console.log('Document data:', data);
        return {
          id: doc.id,
          ...data,
        };
      });

      setOrders(ordersData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(`Failed to load orders: ${err.message}`);
      setLoading(false);
    }
  };

  // Delete an order
  const handleDelete = async (orderId) => {
    try {
      await deleteDoc(doc(db, 'Orders', orderId));
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (err) {
      console.error('Error deleting order:', err);
      setError(`Failed to delete order: ${err.message}`);
    }
  };

  // Navigate to homepage
  const handleContinueShopping = () => {
    navigate('/');
  };

  // Fetch orders once user is authenticated
  useEffect(() => {
    if (!loadingAuth && user) {
      fetchOrders();
    }
  }, [loadingAuth, user]);

  if (loadingAuth) {
    return <div className="added-cart-container"><p>Checking authentication...</p></div>;
  }

  if (loading) {
    return <div className="added-cart-container"><p>Loading orders...</p></div>;
  }

  if (error) {
    return <div className="added-cart-container"><p className="error-message">{error}</p></div>;
  }

  return (
    <div className="added-cart-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="orders-table">
          <div className="table-header">
            <span>Delete</span>
            <span>Product Name</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Delivery Location</span>
            <span>Phone Number</span>
            <span>Date & Time</span>
          </div>
          {orders.map((order) => (
            <div key={order.id} className="table-row">
              <button
                onClick={() => handleDelete(order.id)}
                className="delete-btn"
                title="Delete Order"
              >
                <FaTrash />
              </button>
              <span>{order.CartItems?.ProductName || 'N/A'}</span>
              <span>${order.CartItems?.Price || 'N/A'}</span>
              <span>{order.CartItems?.Quantity || 'N/A'}</span>
              <span>{order.DeliveryLocation || 'N/A'}</span>
              <span>{order.PhoneNumber || 'N/A'}</span>
              <span>
                {order.SelectedDateTime
                  ? new Date(order.SelectedDateTime).toLocaleString()
                  : 'N/A'}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="continue-shopping">
        <button onClick={handleContinueShopping} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default AddedCart;