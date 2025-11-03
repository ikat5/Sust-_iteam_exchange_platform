import { Router } from "express";
import { upload } from "../middleware/multermiddleware.js";
import { verifyUser } from "../middleware/auth-middleware.js";
import { createProduct, updateProduct, getProductsByCategory, getRecentProducts, searchProducts, getProductById, getAllProducts } from "../controller.js/product.controller.js"

const router = Router();

// create product
router.post("/create", verifyUser, upload.array("productImage", 5), createProduct);

// update product
router.patch("/:productId", verifyUser, upload.array("productImage", 5), updateProduct);

// get by category
router.get("/category/:category", getProductsByCategory);

// get all with pagination
router.get("/", getAllProducts);

// get recent 10
router.get("/recent", getRecentProducts);

// search products
router.get("/search", searchProducts);

// get single product by ID
router.get("/:productId", getProductById);

export default router;
