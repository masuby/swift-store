import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Electronics from "../assets/electronics.png";
import Clothes from "../assets/clothes.png";
import Food from "../assets/food.png";
import Bed from "../assets/Bed.png";
import Shoes from "../assets/shoes.jpeg";
import Transport from "../assets/transport.jpg";
import Utensils from "../assets/utensols.jpg";
import './CategoryPage.css';

// Map category names to their images
const categoryImages = {
  electronics: Electronics,
  clothes: Clothes,
  food: Food,
  bed: Bed,
  shoes: Shoes,
  transport: Transport,
  utensils: Utensils,
};

function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const newProductsRef = useRef(null);
  const usedProductsRef = useRef(null);
  const nicheProductsRef = useRef(null);

  // Capitalize the category name for display and Firestore query
  const formattedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Query Firestore for products in the selected category
        const q = query(collection(db, 'products'), where('category', '==', formattedCategoryName));
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [categoryName]);

  const newProducts = products.filter(product => product.productType === 'NEW');
  const usedProducts = products.filter(product => product.productType === 'USED');
  const nicheProducts = products.filter(product => product.productType === 'NICHE');

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const renderProductRow = (products, title, ref) => {
    // Only render the row if there are products
    if (products.length === 0) return null;

    return (
      <div className="product-row">
        <h3>{title}</h3>
        <div className="product-row-container">
          <button className="scroll-btn left" onClick={() => scroll(ref, 'left')}>
            <FaChevronLeft />
          </button>
          <div className="product-row-cards" ref={ref}>
            {products.map(product => (
              <Link
                to="/cart"
                state={{ product }} // Pass the product data to Cart page
                key={product.productId}
                className="product-card-link" // Use the same class as Home.jsx
              >
                <div className="product-card">
                  <img src={product.ImageUrl} alt={product.productName} />
                  <div className="product-info">
                    <h4>{product.productName}</h4>
                    <p>Price: ${product.productPrice}</p>
                    <p>Type: {product.productType}</p>
                    <button className="add-to-cart-btn">Add to Cart</button> {/* Add button */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <button className="scroll-btn right" onClick={() => scroll(ref, 'right')}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="category-page-container">
      {/* Category Header with Image and Name */}
      <div className="category-header">
        <img
          src={categoryImages[categoryName.toLowerCase()]}
          alt={formattedCategoryName}
          className="category-image"
        />
        <h2>{formattedCategoryName} Products</h2>
      </div>

      {/* Products Section */}
      <div className="products-section">
        {newProducts.length > 0 && renderProductRow(newProducts, 'New', newProductsRef)}
        {usedProducts.length > 0 && renderProductRow(usedProducts, 'Used', usedProductsRef)}
        {nicheProducts.length > 0 && renderProductRow(nicheProducts, 'Niche', nicheProductsRef)}
        {/* Display a message if no products are found in any type */}
        {newProducts.length === 0 && usedProducts.length === 0 && nicheProducts.length === 0 && (
          <p>No products found in {formattedCategoryName}.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;