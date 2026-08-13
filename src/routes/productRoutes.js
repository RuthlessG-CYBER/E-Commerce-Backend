import express from "express";
import { createProduct, deleteProduct } from "../controllers/product/productController.js";
// import { authenticateUser } from "../middlewares/userAuth.js";

export const productRouter = express.Router();

productRouter.post("/create-product", createProduct);
productRouter.delete("/delete-product/:id", deleteProduct);
