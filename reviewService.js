import axios from "axios";

const REVIEW_API_URL = "http://localhost:5000/api/reviews";

export const getReviewsByProductId = async (productId) => {
  try {
    const response = await axios.get(`${REVIEW_API_URL}?productId=${productId}`);
    return response.data; // Ensure API returns a list of reviews
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error; // Allow caller to handle errors
  }
};

export const addReview = async (productId, review) => {
  try {
    const response = await axios.post(`${REVIEW_API_URL}`, {
      productId, 
      ...review,
    });
    return response.data; // Updated reviews list from the server
  } catch (error) {
    console.error("Error adding review:", error);
    throw error; // Allow caller to handle errors
  }
};
