import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "li8lgd5l",
  api_key: process.env.CLOUDINARY_API_KEY || "788667985134479",
  api_secret: process.env.CLOUDINARY_API_SECRET || "N8MgQ1Y9tjtSaDCWiiGHV4pXsxc",
  secure: true,
});

export default cloudinary;
