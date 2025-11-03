import api from './api';

// Product service functions
export const productService = {
  // Create a new product
  createProduct: async (productData) => {
    try {
      const formData = new FormData();
      
      // Append product data
      Object.keys(productData).forEach(key => {
        if (key === 'images' && productData[key]) {
          // Handle multiple images
          productData[key].forEach((file, index) => {
            formData.append('productImage', file);
          });
        } else if (key !== 'images') {
          formData.append(key, productData[key]);
        }
      });

      const response = await api.post('/product/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create product'
      };
    }
  },

  // Get products by category
  getProductsByCategory: async (category, { page = 1, limit = 12 } = {}) => {
    try {
      const response = await api.get(`/product/category/${category}?page=${page}&limit=${limit}`);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        data: { items: [], page: 1, limit: 12, total: 0, totalPages: 0 },
        message: error.response?.data?.message || 'Failed to fetch products'
      };
    }
  },

  // Get all products with pagination
  getAllProducts: async ({ page = 1, limit = 12 } = {}) => {
    try {
      const response = await api.get(`/product?page=${page}&limit=${limit}`);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        data: { items: [], page: 1, limit: 12, total: 0, totalPages: 0 },
        message: error.response?.data?.message || 'Failed to fetch products'
      };
    }
  },

  // Get recent products
  getRecentProducts: async () => {
    try {
      const response = await api.get('/product/recent');
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || 'Failed to fetch recent products'
      };
    }
  },

  // Get user's own posts
  getMyPosts: async () => {
    try {
      const response = await api.get('/user/myposts');
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        message: error.response?.data?.message || 'Failed to fetch your posts'
      };
    }
  },

  // Delete a product
  deleteProduct: async (productId) => {
    try {
      const response = await api.delete(`/user/myposts/${productId}`);
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete product'
      };
    }
  },

  // Update a product
  updateProduct: async (productId, productData) => {
    try {
      const formData = new FormData();
      
      // Append product data
      Object.keys(productData).forEach(key => {
        if (key === 'images' && productData[key]) {
          // Handle multiple images
          productData[key].forEach((file, index) => {
            formData.append('productImage', file);
          });
        } else if (key !== 'images') {
          formData.append(key, productData[key]);
        }
      });

      const response = await api.patch(`/product/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update product'
      };
    }
  },

  // Search products with pagination
  searchProducts: async (query, { page = 1, limit = 12 } = {}) => {
    try {
      const response = await api.get(`/product/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        data: { items: [], page: 1, limit: 12, total: 0, totalPages: 0, query: query },
        message: error.response?.data?.message || 'Search failed'
      };
    }
  },

  // Get single product by ID
  getProductById: async (productId) => {
    try {
      const response = await api.get(`/product/${productId}`);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Product not found'
      };
    }
  }
};
