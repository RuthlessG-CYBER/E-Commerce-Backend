import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUser,
  deleteUser,
  updateUserRole
} from "../controllers/user/userController.js";
import { authenticateUser, authorizeRoles } from "../middlewares/userAuth.js";

export const userRouter = express.Router();

const adminAccess = [authenticateUser, authorizeRoles("ADMIN", "SUPERADMIN")];

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/users", ...adminAccess, getAllUsers);
userRouter.get("/users/:id", authenticateUser, getUserById);
userRouter.put("/users/:id", authenticateUser, updateUser);
userRouter.delete("/users/:id", ...adminAccess, deleteUser);
userRouter.patch("/users/:id/role", updateUserRole);


