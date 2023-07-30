const mongoose=require("mongoose")
require("dotenv").config({ path: "../.env.local" });


const connectMongo = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectMongo;
