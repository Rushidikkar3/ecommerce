require("dotenv").config();
const path = require("path");
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const { connectDB } = require("./config/db");
const cors = require("cors");

connectDB();

const app = express();

const baseDir = path.resolve();

app.use(express.static(path.join(baseDir, "e-comerce-frontend/public/dist")));

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(baseDir, "e-comerce-frontend/public", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
