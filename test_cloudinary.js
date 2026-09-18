import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure using the CLOUDINARY_URL or individual env vars
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "li8lgd5l",
  api_key: process.env.CLOUDINARY_API_KEY || "788667985134479",
  api_secret: process.env.CLOUDINARY_API_SECRET || "N8MgQ1Y9tjtSaDCWiiGHV4pXsxc",
  secure: true,
});

console.log("═══════════════════════════════════════════");
console.log("🔍 Cloudinary Quick Connection Test");
console.log("═══════════════════════════════════════════");
console.log(`  Cloud Name : ${cloudinary.config().cloud_name}`);
console.log(`  API Key    : ${cloudinary.config().api_key}`);
console.log(`  Secure     : ${cloudinary.config().secure}`);
console.log("");

try {
  const result = await cloudinary.api.ping();
  console.log("✅ PING SUCCESS:", JSON.stringify(result));

  // Also try listing some resources
  const resources = await cloudinary.api.resources({
    type: "upload",
    prefix: "maytri_ambhuja",
    max_results: 5,
  });
  console.log(`\n📦 Found ${resources.resources.length} existing resources with prefix 'maytri_ambhuja':`);
  resources.resources.forEach((r) => {
    console.log(`   - ${r.public_id} (${r.format}, ${r.bytes} bytes)`);
  });

  console.log("\n✅ Cloudinary is fully operational!");
} catch (err) {
  console.error("❌ Cloudinary test FAILED:", err.message);
  if (err.error) console.error("   Error details:", JSON.stringify(err.error));
  process.exit(1);
}
