import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import CategoryPage from './pages/CategoryPage';
import About from './pages/About';
import Cart from './pages/Cart'; // Import the Cart page
import AddedCart from './pages/Addedcart';
import SignIn from './components/SignIn';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} /> {/* Add the Cart route */}
        <Route path="/added-cart" element={<AddedCart />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;