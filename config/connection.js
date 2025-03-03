const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const URL = process.env.MONGO_URI;

    if (!URL) {
      throw new Error("❌ MONGO_URI is not defined in .env file!");
    }

    const conn = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error(`❌ Database connection error: ${error.message}`);
    process.exit(1); // Exit process on failure
  }
};

module.exports = connectDB;
