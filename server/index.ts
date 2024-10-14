import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import customerRoutes from "./routes/customerRoutes";
import orderRoutes from "./routes/orderRoutes";
import employeeRoutes from "./routes/employeeRoutes";
import { config } from "dotenv";
config();

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    app.use("/api", orderRoutes);
    app.use("/api", productRoutes);
    app.use("/api", customerRoutes);
    app.use("/api", employeeRoutes);

    app.listen(port, () => console.log(`server running on ${port}`));
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
