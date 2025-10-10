import axios from "axios";

const url = "https://dummyjson.com";

/// get all products with limit 10 
export const getProducts = async () => {
  try {
    const response = await axios.get(`${url}/products?limit=10`);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/// search products
export const searchProducts = async (query) => {
  try {
    const response = await axios.get(`${url}/products/search?q=${query}&limit=10`);
    return response.data.products;
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

/// Get products by a category
export const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${url}/products/category/${category}`);
    return response.data.products;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

/// sort with price
export const sortProductsByPrice = async (sortOption) => {
  console.log(sortOption);
  
  try {
    const response = await axios.get(`${url}/products?sortBy=price&order=${sortOption}&limit=10`);
    return response.data.products;
  } catch (error) {
    console.error("Error sorting products by price:", error);
    throw error;
  }
};

