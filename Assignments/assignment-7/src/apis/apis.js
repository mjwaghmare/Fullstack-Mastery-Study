import axios from "axios";

const url = "https://dummyjson.com";

/// get all products with pagination
export const getProducts = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${url}/products?limit=${limit}&skip=${(page - 1) * limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/// search products with pagination
export const searchProducts = async (query, page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${url}/products/search?q=${query}&limit=${limit}&skip=${(page - 1) * limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

/// get all categories
export const getProductCategories = async () => {
  try {
    const response = await axios.get(`${url}/products/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

/// Get products by a category with pagination
export const getProductsByCategory = async (category, page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${url}/products/category/${category}?limit=${limit}&skip=${(page - 1) * limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

/// sort with price and pagination
export const sortProductsByPrice = async (sortOption, page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${url}/products?sortBy=price&order=${sortOption}&limit=${limit}&skip=${(page - 1) * limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error sorting products by price:", error);
    throw error;
  }
};

/// add product
export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${url}/products/add`, product);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};