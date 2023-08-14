import mongoose from "mongoose";
import colors from "colors";

let isConnected = false;

export const connectToAtlas = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected.".green);
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB is connected.".green);
  } catch (error) {
    console.log(error.message.red);
  }
}