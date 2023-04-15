import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectMongo = () => {
  try {
    console.log(process.env.MONGODB_URI, "checking dotenv");
    const conn = mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectMongo;
