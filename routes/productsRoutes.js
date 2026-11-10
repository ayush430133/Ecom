import express from "express"
import {
   createProduct,
   getProduct,
   updatedProduct,
   deleteproduct,
} from "../controllers/productController.js"

const router = express.Router();

// create a new product //
router.post("/add", createProduct);

// Get all product //
router.get("/", getProduct);

// Updated product //
router.put("/update/:id", updatedProduct);

// Delete product //
router.delete("/delete/:id", deleteproduct);

export default router