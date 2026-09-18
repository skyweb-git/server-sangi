import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "li8lgd5l",
  api_key: process.env.CLOUDINARY_API_KEY || "788667985134479",
  api_secret: process.env.CLOUDINARY_API_SECRET || "N8MgQ1Y9tjtSaDCWiiGHV4pXsxc",
  secure: true,
});

async function createUploadPreset() {
  console.log("═══════════════════════════════════════════");
  console.log("📦 Creating 'maytri_unsigned' upload preset");
  console.log("═══════════════════════════════════════════\n");

  try {
    // First check if preset already exists
    try {
      const existing = await cloudinary.api.upload_preset("maytri_unsigned");
      console.log("✅ Preset 'maytri_unsigned' already exists:", existing.name);
      console.log("   Mode:", existing.settings?.mode || existing.unsigned ? "unsigned" : "signed");
      return;
    } catch (e) {
      if (e.error?.http_code !== 404) throw e;
      console.log("Preset doesn't exist yet, creating...\n");
    }

    // Create unsigned upload preset
    const result = await cloudinary.api.create_upload_preset({
      name: "maytri_unsigned",
      unsigned: true,
      folder: "maytri_ambhuja",
      allowed_formats: "jpg,jpeg,png,gif,webp,svg,mp4,webm,mov,pdf",
      max_file_size: 52428800, // 50MB
      unique_filename: false,
      use_filename: false,
    });

    console.log("✅ Upload preset created successfully!");
    console.log("   Name:", result.name);
    console.log("   Unsigned:", result.unsigned !== false);
    console.log("   Settings:", JSON.stringify(result.settings, null, 2));
  } catch (err) {
    console.error("❌ Failed to create upload preset:", err.message);
    if (err.error) console.error("   Details:", JSON.stringify(err.error, null, 2));
    process.exit(1);
  }
}

createUploadPreset();
