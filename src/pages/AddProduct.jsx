import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { FaList, FaBox, FaDollarSign, FaFileAlt, FaTags, FaPhone, FaImage } from 'react-icons/fa'; // Icons
import './AddProduct.css';

function AddProduct() {
  const [formData, setFormData] = useState({
    category: '',
    productName: '',
    productPrice: '',
    Description: '',
    productType: '',
    Phonenumber: '',
  });
  const [image, setImage] = useState(null);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [showProductTypePopup, setShowProductTypePopup] = useState(false);

  const categories = ['Electronics', 'Clothes', 'Food', 'Bed', 'Shoes', 'Transport', 'Utensils'];
  const productTypes = ['USED', 'NEW', 'NICHE'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleCategorySelect = (category) => {
    setFormData({ ...formData, category });
    setShowCategoryPopup(false);
  };

  const handleProductTypeSelect = (type) => {
    setFormData({ ...formData, productType: type });
    setShowProductTypePopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (image) {
        const imageRef = ref(storage, `Products/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, 'products'), {
        ...formData,
        ImageUrl: imageUrl,
        productId: uuidv4(),
        userId: 'test-user',
        productPrice: parseFloat(formData.productPrice),
      });

      alert('Product added successfully!');
      setFormData({
        category: '',
        productName: '',
        productPrice: '',
        Description: '',
        productType: '',
        Phonenumber: '',
      });
      setImage(null);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <div className="add-product-container">
      <h1>Add a New Product</h1>
      <Link to="/" className="back-link">Back to Home</Link>
      <form onSubmit={handleSubmit} className="add-product-form">
        {/* Category Input with Popup */}
        <div className="input-group">
          <FaList className="input-icon" />
          <input
            type="text"
            name="category"
            placeholder="Select Category"
            value={formData.category}
            onClick={() => setShowCategoryPopup(true)}
            readOnly
            required
          />
        </div>
        {showCategoryPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>Select Category</h3>
              <div className="popup-options">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                    className="popup-option"
                  >
                    {category}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowCategoryPopup(false)}
                className="popup-close"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Product Name */}
        <div className="input-group">
          <FaBox className="input-icon" />
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Product Price */}
        <div className="input-group">
          <FaDollarSign className="input-icon" />
          <input
            type="number"
            name="productPrice"
            placeholder="Product Price"
            value={formData.productPrice}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="input-group">
          <FaFileAlt className="input-icon" />
          <textarea
            name="Description"
            placeholder="Product Description"
            value={formData.Description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Product Type with Popup */}
        <div className="input-group">
          <FaTags className="input-icon" />
          <input
            type="text"
            name="productType"
            placeholder="Select Product Type"
            value={formData.productType}
            onClick={() => setShowProductTypePopup(true)}
            readOnly
            required
          />
        </div>
        {showProductTypePopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>Select Product Type</h3>
              <div className="popup-options">
                {productTypes.map((type, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleProductTypeSelect(type)}
                    className="popup-option"
                  >
                    {type}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowProductTypePopup(false)}
                className="popup-close"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Phone Number */}
        <div className="input-group">
          <FaPhone className="input-icon" />
          <input
            type="text"
            name="Phonenumber"
            placeholder="Phone Number"
            value={formData.Phonenumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="input-group">
          <FaImage className="input-icon" />
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="file-input"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;