require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const connectDB  = require("./config/connection"); // MongoDB Connection Import

const authRoutes = require("./routes/authRoutes");
const folderRoutes = require("./routes/folderRoutes");
const fileRoutes = require("./routes/fileRoutes");
const downRoutes = require("./routes/downRoutes");
const prevRoutes = require("./routes/previewRoutes");
const delRoutes = require("./routes/delRoutes");
const trashRoutes = require("./routes/trashRoutes");
const restoreRoutes = require("./routes/restoreRoutes");

const app = express();
const port = process.env.PORT || 5000;

// 🔹 Debugging: Check .env file load ho rahi hai ya nahi
console.log("🔹 Loaded .env variables:");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ Loaded" : "❌ Not Found");
connectDB();


// Add this to your server.js or create a separate initialization script
// const Limit = require("./models/Limitation");

// async function initializeLimitations() {
//   try {
//     const existingLimit = await Limit.findOne();
//     if (!existingLimit) {
//       const newLimit = new Limit();
//       await newLimit.save();
//       console.log("✅ Initialized default limitations");
//     }
//   } catch (error) {
//     console.error("Error initializing limitations:", error);
//   }
// }

// // Call after database connection is established
// initializeLimitations();

// CORS Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// 🔹 Routes Setup
app.use("/api/auth", authRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/files/preview", prevRoutes);
app.use("/api/files/delete", delRoutes);
app.use("/api/resource", downRoutes);
app.use("/api/trash", trashRoutes);
app.use("/api/restore", restoreRoutes);

// 🔹 404 Error Handling
app.use((req, res) => {
  res.status(404).json({ message: "Page not found." });
});

// 🔹 Start Server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
