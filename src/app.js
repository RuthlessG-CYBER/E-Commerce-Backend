import express from "express";
import cors from "cors";
import helmet from "helmet";
import { userRouter } from "./routes/userRoutes.js";
import { productRouter } from "./routes/productRoutes.js";

const app = express();

app.use(helmet());
app.use(cors(
  {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend API is running"
  });
});

export default app;