import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/styledetail.css";
import { getProductById } from "../services/productService";
import { getReviewsByProductId, addReview } from "../services/reviewService";

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [cartCount, setCartCount] = useState(0); // For tracking cart count
  const [isAddingToCart, setIsAddingToCart] = useState(false); // For disabling button during add-to-cart

  useEffect(() => {
    console.log("Product ID from URL:", productId);
    setLoading(true);

    Promise.all([getProductById(productId), getReviewsByProductId(productId)])
      .then(([productData, reviewData]) => {
        setProduct(productData);
        setSelectedImage(productData?.imageUrl1 || "default-image.jpg");
        setReviews(reviewData || []);
      })
      .catch((err) => {
        console.error("Error loading product or reviews:", err);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
  
    const reviewerName = document.getElementById("name").value.trim();
    if (!reviewerName || !reviewText || rating <= 0) {
      alert("Please provide a name, rating, and review text.");
      return;
    }
  
    const newReview = {
      reviewerName,
      rating,
      comment: reviewText,
      date: new Date().toISOString(), // Add current date to review
    };
  
    // Add the new review to the reviews state
    const updatedReviews = [...reviews, newReview];
    
    // Persist reviews in localStorage
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  
    // Update state with the new reviews
    setReviews(updatedReviews);
  
    // Clear form after submitting
    document.getElementById("name").value = "";
    setReviewText("");
    setRating(0);
  
    // Optionally, send the review to the server (e.g., API call) if needed
    try {
      await addReview(productId, newReview);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit the review. Please try again.");
    }
  };
  
  const handleAddToCart = () => {
    setIsAddingToCart(true); // Disable the button while adding to cart

    // Simulate a short delay to mimic a real-world interaction
    setTimeout(() => {
      setIsAddingToCart(false); // Re-enable the button after delay
      alert("Item added to cart!");

      setCartCount(cartCount + 1); // Increase the cart count
    }, 1500);
  };

  const highlightStars = (star) => {
    setRating(star);
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="not-found">Product not found</div>;
  }

  return (
    <main>
      <section className="product-details">
        <h2 className="product-name">{product.name}</h2>
        <div className="image-carousel">
          <img
            src={selectedImage}
            alt={product.name}
            className="product-img"
          />
          <div className="thumbnail-container">
            {[product.imageUrl1, product.imageUrl2, product.imageUrl3]
              .filter(Boolean)
              .map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`Thumbnail ${index + 1}`}
                  className="thumbnail"
                  onClick={() => setSelectedImage(imgUrl)}
                />
              ))}
          </div>
        </div>
        <div className="product-info">
          <p className="description">{product.description}</p>
          <p className="price">
            <span className="current-price">${product.price}</span>
          </p>
          <button
            id="addToCart"
            onClick={handleAddToCart}
            disabled={isAddingToCart} // Disable when adding to cart
            style={{ cursor: isAddingToCart ? "not-allowed" : "pointer" }}
          >
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </section>

      <section className="reviews">
        <h3>Customer Reviews</h3>
        <ul id="reviewsList" className="review-list">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <li key={review.reviewId} className="review-item">
                <div className="review-header">
                  <div className="review-info">
                    <strong>{review.reviewerName}</strong>
                    <span className="rating">
                      {"⭐".repeat(review.rating)}{" "}
                    </span>
                  </div>
                </div>
                <p className="review-text">{review.comment}</p>
              </li>
            ))
          ) : (
            <p className="no-reviews">No reviews available.</p>
          )}
        </ul>

        <h4>Write a Review</h4>
        <form id="reviewForm" onSubmit={handleReviewSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" placeholder="Your Name" required />

          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onMouseEnter={() => highlightStars(star)}
                onClick={() => setRating(star)}
                style={{
                  cursor: "pointer",
                  color: rating >= star ? "gold" : "gray",
                }}
              >
                &#9733;
              </span>
            ))}
          </div>

          <label htmlFor="reviewText">Review:</label>
          <textarea
            id="reviewText"
            rows="4"
            placeholder="What did you like about this product?"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          ></textarea>

          <button type="submit">Submit Review</button>
        </form>
      </section>
    </main>
  );
};

export default ProductDetailsPage;
