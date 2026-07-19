import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import cors from "cors"

dotenv.config();

const app = express();
connectDb();
app.use(cors())
app.use(express.json())

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter)

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
