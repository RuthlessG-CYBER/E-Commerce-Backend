import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/user/userController.js";
import { authenticateUser } from "../middlewares/userAuth.js";

export const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.get("/users", authenticateUser, getAllUsers);
userRouter.get("/users/:id", authenticateUser, getUserById);
userRouter.post("/login", loginUser);
userRouter.put("/users/:id", authenticateUser, updateUser);
userRouter.delete("/users/:id", authenticateUser, deleteUser);



