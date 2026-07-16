import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import buyerRoutes from "./routes/buyerRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Middleware

/*app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
); */

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

//Static Uploads

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Health Check  

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ELITE CART Backend API is running successfully.",
  });
});

// API Routes

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/buyer", buyerRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/admin", adminRoutes);

// app.use("/api/recently-viewed", recentlyViewedRoutes);


// Route Not Found                              


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});


// Global Error Handler                     


app.use(errorMiddleware);

export default app;