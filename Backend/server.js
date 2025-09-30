import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
  origin:"https://eventify-one-umber.vercel.app",
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
