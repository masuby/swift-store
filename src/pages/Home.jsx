import { useEffect, useState, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Food from "../assets/food.png";
import Electronics from "../assets/electronics.png";
import Clothes from "../assets/clothes.png";
import Bed from "../assets/Bed.png";
import Shoes from "../assets/shoes.jpeg";
import Transport from "../assets/transport.jpg";
import Utensils from "../assets/utensols.jpg";
import Laptop from "../assets/laptop.png";
import Shoes2 from "../assets/shoes2.png";
import About from './About';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const newProductsRef = useRef(null);
  const usedProductsRef = useRef(null);
  const nicheProductsRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  // Filter products by productType
  const newProducts = products.filter(product => product.productType === 'NEW');
  const usedProducts = products.filter(product => product.productType === 'USED');
  const nicheProducts = products.filter(product => product.productType === 'NICHE');

  // Categories with corresponding images
  const categories = [
    { name: 'Electronics', image: Electronics },
    { name: 'Clothes', image: Clothes },
    { name: 'Food', image: Food },
    { name: 'Bed', image: Bed },
    { name: 'Shoes', image: Shoes },
    { name: 'Transport', image: Transport },
    { name: 'Utensils', image: Utensils },
  ];

  // Scroll handler for each row
  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Render product row
  const renderProductRow = (products, title, ref) => (
    <div className="product-row">
      <h3>{title}</h3>
      <div className="product-row-container">
        <button className="scroll-btn left" onClick={() => scroll(ref, 'left')}>
          <FaChevronLeft />
        </button>
        <div className="product-row-cards" ref={ref}>
          {products.length > 0 ? (
            products.map(product => (
              <Link
                to="/cart"
                state={{ product }} // Pass the product data to Cart page
                key={product.productId}
                className="product-card-link"
              >
                <div className="product-card">
                  <img src={product.ImageUrl} alt={product.productName} />
                  <div className="product-info">
                    <h4>{product.productName}</h4>
                    <p>Price: ${product.productPrice}</p>
                    <p>Type: {product.productType}</p>
                    <button className="add-to-cart-btn">Add to Cart</button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No {title.toLowerCase()} products found.</p>
          )}
        </div>
        <button className="scroll-btn right" onClick={() => scroll(ref, 'right')}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );

  return (
    <div className="home-container">
      {/* About Section */}

      {/* Banner Section */}
      <div className="banner-section">
        <div className="banner-left">
          <div className="banner-left-content">
            <h2>Welcome to Swift Store!</h2>
            <p>Step into Style<br />Explore the Best Deals on Shoes!</p>
          </div>
          <img src={Shoes2} alt="Shoes Banner" className="banner-left-image" />
        </div>
        <div className="banner-right">
          <h3>Tech Deals Await!</h3>
          <img src={Laptop} alt="Laptop Banner" />
        </div>
      </div>

      {/* Category Section */}
      <h2>Explore Our Categories</h2>
      <div className="category-section">
        {categories.map((category, index) => (
          <div className="category-card" key={index}>
            <Link to={`/category/${category.name.toLowerCase()}`}>
              <img src={category.image} alt={category.name} />
              <p>{category.name}</p>
            </Link>
          </div>
        ))}
      </div>

      {/* Products Section */}
      <h2>Featured Products</h2>
      <div className="products-section">
        {renderProductRow(newProducts, 'New', newProductsRef)}
        {renderProductRow(usedProducts, 'Used', usedProductsRef)}
        {renderProductRow(nicheProducts, 'Niche', nicheProductsRef)}
      </div>
      <About />
    </div>
  );
}

export default Home;