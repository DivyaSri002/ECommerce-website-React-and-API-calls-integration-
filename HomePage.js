import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/stylehome.css";
import { getAllProducts } from "../services/productService";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle errors if any

  useEffect(() => {
    // Fetch products on component mount
    getAllProducts()
      .then((data) => {
        console.log(data);  // Log the product data structure
        setProducts(data);  // Assuming 'data' is a list of products with unique 'id'
        setLoading(false); // Stop loading after data is fetched
      })
      .catch((err) => {
        setError("Failed to load products. Please try again later.");
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if something went wrong
  }

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h2>Welcome to Shopiee</h2>
          <p>Explore the best deals and premium products at your fingertips.</p>
          <a href="/products" className="cta-button">Shop Now</a>
        </div>
      </section>

      <section className="featured-products">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id || `${product.name}-${product.price}`} className="product-card">
                <img
                  src={product.imageUrl1 || "default-image.jpg"} // Default fallback image
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <Link to={`/product/${product.productId}`} className="view-details">
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <p>No featured products available at the moment.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
