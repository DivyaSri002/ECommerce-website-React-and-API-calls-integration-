import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

// Fetch all products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    handleError("Error fetching all products", error);
    return []; // Return an empty array as fallback
  }
};

// Fetch product by ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleError(`Error fetching product with ID ${id}`, error);
    return null; // Return null as fallback for a single product
  }
};

// Centralized error handling
const handleError = (message, error) => {
  if (error.response) {
    console.error(
      `${message}:`,
      `Status ${error.response.status}`,
      `Response: ${JSON.stringify(error.response.data)}`
    );
  } else if (error.request) {
    console.error(`${message}: No response received`, error.request);
  } else {
    console.error(`${message}:`, error.message);
  }
};
