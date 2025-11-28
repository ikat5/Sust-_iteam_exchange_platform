import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../model/product.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";

// ✅ Create a new product post
const createProduct = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { productName, description, category, price, condition, location } = req.body;

  if ([productName, category, price, condition, location].some(f => !f || f.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, "At least one product image is required");
  }

  if (req.files.length > 5) {
    throw new ApiError(400, "You can upload a maximum of 5 images");
  }

  // upload to cloudinary
  const uploadResults = await Promise.all(req.files.map(file => uploadCloudinary(file.path)));
  const imageUrls = uploadResults.map(r => r.secure_url);
  console.log(imageUrls)

  const product = await Product.create({
    productName,
    description,
    category,
    price,
    condition,
    location,
    owner: req.user._id,
    productImage: imageUrls
  });

  return res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
});

// ✅ Update product (partial update allowed)
const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  let updateFields = {};

  // only add fields if present in request
  if (req.body.productName) updateFields.productName = req.body.productName;
  if (req.body.description) updateFields.description = req.body.description;
  if (req.body.category) updateFields.category = req.body.category;
  if (req.body.price) updateFields.price = req.body.price;
  if (req.body.condition) updateFields.condition = req.body.condition;
  if (req.body.location) updateFields.location = req.body.location;

  // if new images provided
  if (req.files && req.files.length > 0) {
    if (req.files.length > 5) {
      throw new ApiError(400, "You can upload a maximum of 5 images");
    }
    const uploadResults = await Promise.all(req.files.map(file => uploadCloudinary(file.path)));
    updateFields.productImage = uploadResults.map(r => r.secure_url);
  }

  const product = await Product.findOneAndUpdate(
    { _id: productId, owner: req.user._id },
    { $set: updateFields },
    { new: true }
  );

  if (!product) {
    throw new ApiError(404, "Product not found or you are not authorized");
  }

  return res.status(200).json(new ApiResponse(200, product, "Product updated successfully"));
});

// ✅ Get products by category (case-insensitive) with pagination
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const page = Math.max(parseInt(req.query.page || "1", 10), 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit || "12", 10), 1), 100);
  const skip = (page - 1) * limit;

  const categoryRegex = new RegExp(`^${category}$`, 'i');

  const [products, total] = await Promise.all([
    Product.find({ category: { $regex: categoryRegex } })
      .populate('owner', 'fullName phoneNumber email studentId userName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Product.countDocuments({ category: { $regex: categoryRegex } })
  ]);

  return res.status(200).json(
    new ApiResponse(200, {
      items: products,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }, `Fetched products in category: ${category}`)
  );
});

// ✅ Get all products with pagination
const getAllProducts = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page || "1", 10), 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit || "12", 10), 1), 100);
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find()
      .populate('owner', 'fullName phoneNumber email studentId userName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Product.countDocuments()
  ]);

  return res.status(200).json(
    new ApiResponse(200, {
      items: products,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }, "Fetched products")
  );
});

// ✅ Get recent 10 products
const getRecentProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate('owner', 'fullName phoneNumber email studentId userName')
    .sort({ createdAt: -1 })
    .limit(10);
  return res.status(200).json(
    new ApiResponse(200, products, "Fetched 10 recent products")
  );
});

// ✅ Search products with pagination
const searchProducts = asyncHandler(async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    throw new ApiError(400, "Search query is required");
  }

  const page = Math.max(parseInt(req.query.page || "1", 10), 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit || "12", 10), 1), 100);
  const skip = (page - 1) * limit;

  const searchQuery = {
    $or: [
      { productName: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { category: { $regex: q, $options: 'i' } }
    ]
  };

  const [products, total] = await Promise.all([
    Product.find(searchQuery)
      .populate('owner', 'fullName phoneNumber email studentId userName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Product.countDocuments(searchQuery)
  ]);

  return res.status(200).json(
    new ApiResponse(200, {
      items: products,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      query: q
    }, `Found ${total} products matching "${q}"`)
  );
});

// ✅ Get single product by ID
const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  
  const product = await Product.findById(productId)
    .populate('owner', 'fullName phoneNumber email studentId userName');
  
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(
    new ApiResponse(200, product, "Product fetched successfully")
  );
});

export {
  createProduct,
  updateProduct,
  getProductsByCategory,
  getRecentProducts,
  searchProducts,
  getProductById,
  getAllProducts
};
