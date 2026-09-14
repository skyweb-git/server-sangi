import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "s8b4ps7b",
  api_key: process.env.CLOUDINARY_API_KEY || "439984278246422",
  api_secret: process.env.CLOUDINARY_API_SECRET || "jegsCKfQtcc0_NeQdbERH9RXxjg",
  secure: true,
});

export default cloudinary;
