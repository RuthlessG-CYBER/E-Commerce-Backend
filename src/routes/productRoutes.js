import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product/productController.js";
import { authenticateUser, authorizeRoles } from "../middlewares/userAuth.js";

export const productRouter = express.Router();

const adminAccess = [authenticateUser, authorizeRoles("ADMIN", "SUPERADMIN")];

productRouter.get("/get-all-products", getAllProducts);
productRouter.post("/create-product", ...adminAccess, createProduct);
productRouter.delete("/delete-product/:id", ...adminAccess, deleteProduct);
productRouter.patch("/update-product/:id", ...adminAccess, updateProduct);
