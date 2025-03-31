const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // JSON Parsing
app.use(cors()); // Allows frontend to communicate with backend

// Import Routes
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");

// Use Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Test Route
app.get("/sayhello", (req, res) => {
  res.status(200).send("Hello World!");
});

// MongoDB Connection
mongoose
  .connect("mongodb+srv://vkit:FQPccKPDqP3nUKSv@vkit.hs1of.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" Connected to MongoDB Successfully"))
  .catch((err) => console.error(" Error connecting to MongoDB:", err));

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});