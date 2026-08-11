import express from "express";
import { createUser, getAllUsers, getUserById, loginUser, updateUser, deleteUser } from "../controllers/user/userController.js";

export const router = express.Router();


router.post("/register", createUser);
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.post("/login", loginUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

