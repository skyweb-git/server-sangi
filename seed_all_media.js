import cloudinary from "./config/cloudinary.js";
import { connectDB } from "./config/db.js";
import { Media } from "./models/Media.js";
import path from "path";

// ─── Base path for local image files ───
const BASE = "C:\\Users\\lenovo\\Desktop\\--\\finace projcet\\my-app\\public";

// ─── All media items to seed ───
const allMedia = [
  // === ELEVATIONS (10 images) ===
  { key: "elevation_01", file: "elevations/elevation_01.webp", category: "elevations", title: "Luxury Villa Elevation - Front Facade View 01", public_id: "maytri_ambhuja/elevations/elevation_01" },
  { key: "elevation_02", file: "elevations/elevation_02.webp", category: "elevations", title: "Luxury Villa Elevation - Corner Angle View 02", public_id: "maytri_ambhuja/elevations/elevation_02" },
  { key: "elevation_03", file: "elevations/elevation_03.webp", category: "elevations", title: "Luxury Villa Elevation - Grand Modern View 03", public_id: "maytri_ambhuja/elevations/elevation_03" },
  { key: "elevation_04", file: "elevations/elevation_04.webp", category: "elevations", title: "Luxury Villa Elevation - Street Enclave View 04", public_id: "maytri_ambhuja/elevations/elevation_04" },
  { key: "elevation_05", file: "elevations/elevation_05.webp", category: "elevations", title: "Luxury Villa Elevation - Contemporary Architecture 05", public_id: "maytri_ambhuja/elevations/elevation_05" },
  { key: "elevation_06", file: "elevations/elevation_06.webp", category: "elevations", title: "Luxury Villa Elevation - Private Garden Perspective 06", public_id: "maytri_ambhuja/elevations/elevation_06" },
  { key: "elevation_07", file: "elevations/elevation_07.webp", category: "elevations", title: "Luxury Villa Elevation - Terrace & Balcony View 07", public_id: "maytri_ambhuja/elevations/elevation_07" },
  { key: "elevation_pool", file: "elevations/elevation_pool.webp", category: "elevations", title: "Clubhouse Resort Swimming Pool & Deck", public_id: "maytri_ambhuja/elevations/elevation_pool" },
  { key: "elevation_cricket_pitch", file: "elevations/elevation_cricket_pitch.webp", category: "elevations", title: "Professional Cricket Pitch & Outdoor Sports Arena", public_id: "maytri_ambhuja/elevations/elevation_cricket_pitch" },
  { key: "elevation_park_day", file: "elevations/elevation_park_day.webp", category: "elevations", title: "4.5 Acres Central Park & Landscaped Promenade", public_id: "maytri_ambhuja/elevations/elevation_park_day" },

  // === CLUBHOUSE (4 images) ===
  { key: "clubhouse_front_panorama", file: "clubhouse/clubhouse_front_panorama.webp", category: "clubhouse", title: "90,000 SFT Club House - Grand Facade & Swimming Pool", public_id: "maytri_ambhuja/clubhouse/clubhouse_front_panorama" },
  { key: "clubhouse_pool_aerial", file: "clubhouse/clubhouse_pool_aerial.webp", category: "clubhouse", title: "Club House - Grand Swimming Pool & Sun Deck View", public_id: "maytri_ambhuja/clubhouse/clubhouse_pool_aerial" },
  { key: "clubhouse_evening_elevation", file: "clubhouse/clubhouse_evening_elevation.webp", category: "clubhouse", title: "Club House - Evening Illumination & Poolside", public_id: "maytri_ambhuja/clubhouse/clubhouse_evening_elevation" },
  { key: "clubhouse_courtyard_lawn", file: "clubhouse/clubhouse_courtyard_lawn.webp", category: "clubhouse", title: "Club House - Landscaped Courtyard & Central Lawn", public_id: "maytri_ambhuja/clubhouse/clubhouse_courtyard_lawn" },

  // === 222 EAST FLOORPLANS (3 images) ===
  { key: "floorplan_222_east_ground", file: "floorplans/222east_ground.webp", category: "floorplans", title: "222 SQ YDS East Facing - Ground Floor Plan", public_id: "maytri_ambhuja/floorplans/222_east_ground" },
  { key: "floorplan_222_east_first", file: "floorplans/222east_first.webp", category: "floorplans", title: "222 SQ YDS East Facing - First Floor Plan", public_id: "maytri_ambhuja/floorplans/222_east_first" },
  { key: "floorplan_222_east_terrace", file: "floorplans/222east_terrace.webp", category: "floorplans", title: "222 SQ YDS East Facing - Terrace Floor Plan", public_id: "maytri_ambhuja/floorplans/222_east_terrace" },

  // === 222 WEST FLOORPLANS (3 images) ===
  { key: "floorplan_222_west_ground", file: "floorplans/222west_ground.jpg", category: "floorplans", title: "222 SQ YDS West Facing - Ground Floor Plan", public_id: "maytri_ambhuja/floorplans/222_west_ground" },
  { key: "floorplan_222_west_first", file: "floorplans/222west_first.jpg", category: "floorplans", title: "222 SQ YDS West Facing - First Floor Plan", public_id: "maytri_ambhuja/floorplans/222_west_first" },
  { key: "floorplan_222_west_terrace", file: "floorplans/222west_terrace.jpg", category: "floorplans", title: "222 SQ YDS West Facing - Terrace Floor Plan", public_id: "maytri_ambhuja/floorplans/222_west_terrace" },

  // === 300 EAST FLOORPLANS (3 images) ===
  { key: "floorplan_300_east_ground", file: "floorplans/300east_ground.jpg", category: "floorplans", title: "300 SQ YDS East Facing - Ground Floor Plan", public_id: "maytri_ambhuja/floorplans/300_east_ground" },
  { key: "floorplan_300_east_first", file: "floorplans/300east_first.jpg", category: "floorplans", title: "300 SQ YDS East Facing - First Floor Plan", public_id: "maytri_ambhuja/floorplans/300_east_first" },
  { key: "floorplan_300_east_terrace", file: "floorplans/300east_terrace.jpg", category: "floorplans", title: "300 SQ YDS East Facing - Terrace Floor Plan", public_id: "maytri_ambhuja/floorplans/300_east_terrace" },

  // === 300 WEST FLOORPLANS (3 images) ===
  { key: "floorplan_300_west_ground", file: "floorplans/300west_ground.jpg", category: "floorplans", title: "300 SQ YDS West Facing - Ground Floor Plan", public_id: "maytri_ambhuja/floorplans/300_west_ground" },
  { key: "floorplan_300_west_first", file: "floorplans/300west_first.jpg", category: "floorplans", title: "300 SQ YDS West Facing - First Floor Plan", public_id: "maytri_ambhuja/floorplans/300_west_first" },
  { key: "floorplan_300_west_terrace", file: "floorplans/300west_terrace.jpg", category: "floorplans", title: "300 SQ YDS West Facing - Terrace Floor Plan", public_id: "maytri_ambhuja/floorplans/300_west_terrace" },
];

async function run() {
  // ─── Step 1: Test Cloudinary Connection ───
  console.log("════════════════════════════════════════════════════");
  console.log("🔍 STEP 1: Testing new Cloudinary connection...");
  console.log("════════════════════════════════════════════════════");

  try {
    const testResult = await cloudinary.api.ping();
    console.log("✅ Cloudinary PING successful:", testResult);
  } catch (err) {
    console.error("❌ Cloudinary connection FAILED:", err.message);
    console.error("Check your CLOUDINARY_CLOUD_NAME, API_KEY, and API_SECRET in .env");
    process.exit(1);
  }

  // ─── Step 2: Connect to MongoDB ───
  console.log("\n════════════════════════════════════════════════════");
  console.log("🔍 STEP 2: Connecting to MongoDB...");
  console.log("════════════════════════════════════════════════════");

  await connectDB();
  console.log("✅ MongoDB connected");

  // ─── Step 3: Upload all media ───
  console.log("\n════════════════════════════════════════════════════");
  console.log(`📤 STEP 3: Uploading ${allMedia.length} media files to new Cloudinary...`);
  console.log("════════════════════════════════════════════════════\n");

  let success = 0;
  let failed = 0;
  const results = {};

  for (let i = 0; i < allMedia.length; i++) {
    const item = allMedia[i];
    const filePath = path.join(BASE, item.file);
    const progress = `[${i + 1}/${allMedia.length}]`;

    try {
      console.log(`${progress} 📤 Uploading: ${item.title}`);
      console.log(`       File: ${filePath}`);

      const uploadRes = await cloudinary.uploader.upload(filePath, {
        public_id: item.public_id,
        overwrite: true,
        resource_type: "image",
      });

      console.log(`       ✅ Done → ${uploadRes.secure_url}\n`);

      // Update MongoDB
      await Media.findOneAndUpdate(
        { key: item.key },
        {
          key: item.key,
          title: item.title,
          category: item.category,
          cloudinaryUrl: uploadRes.secure_url,
          publicId: uploadRes.public_id,
          format: uploadRes.format,
          resourceType: "image",
          bytes: uploadRes.bytes,
        },
        { upsert: true, new: true }
      );

      results[item.key] = uploadRes.secure_url;
      success++;
    } catch (err) {
      console.error(`       ❌ FAILED: ${err.message}\n`);
      failed++;
    }
  }

  // ─── Summary ───
  console.log("════════════════════════════════════════════════════");
  console.log(`🎉 SEED COMPLETE: ${success} uploaded, ${failed} failed (out of ${allMedia.length})`);
  console.log("════════════════════════════════════════════════════");
  console.log("\nNew Cloudinary URLs:");
  console.log(JSON.stringify(results, null, 2));

  process.exit(0);
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
