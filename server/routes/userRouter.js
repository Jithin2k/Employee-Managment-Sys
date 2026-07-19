import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// Routes
userRouter.get("/employees",getAllUsers);
userRouter.get("/employees/:id",getUser);
// protected routes
userRouter.post("/employees",protect,createUser);
userRouter.put("/employees/:id",protect,updateUser);
userRouter.delete("/employees/:id",protect,deleteUser)

export default userRouter;