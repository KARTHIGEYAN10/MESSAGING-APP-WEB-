const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path=require("path")

dotenv.config();
 

const MONGO_URI = process.env.MONGODB; 

if (!MONGO_URI) {
    throw new Error("MONGODB is not defined in .env file");
}

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);;
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1); 
    }
};

module.exports = connectToMongoDB;
