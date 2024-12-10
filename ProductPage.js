import React, { useEffect, useState } from 'react';
import '../styles/styleprod.css';
import { getAllProducts } from '../services/productService';

const ProductPage = () => {
  // State to store products, loading status, and any errors
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // to handle loading state
  const [error, setError] = useState(null); // to handle error state

  useEffect(() => {
    // Fetch products on component mount
    getAllProducts()
      .then((data) => {
        console.log(data);
        setProducts(data);
        setLoading(false); // Stop loading after data is fetched
      })
      .catch((err) => {
        setError("Failed to load products. Please try again later.");
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <div className="loading">
        <p>Loading products...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main>
      <section className="category">
        <div className="category-header">
          <h2>Shop Our Products</h2>
          <p>Browse a variety of quality products tailored for your lifestyle.</p>
        </div>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-card">
                {/* Fallback for missing product image */}
                <img
                  src={product.imageUrl1} 
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <a href={`/product/${product.productId}`} className="view-details">View Details</a>
              </div>
            ))
          ) : (
            <p>No products available at the moment.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductPage;
