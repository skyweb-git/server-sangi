import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import { Lead } from "../models/Lead.js";
import { Employee } from "../models/Employee.js";
import { CallLog } from "../models/CallLog.js";
import { EmailLog } from "../models/EmailLog.js";
import { Media } from "../models/Media.js";

dotenv.config();

export const INITIAL_SAMPLE_LEADS = [];

export const INITIAL_EMPLOYEES = [
  {
    id: "emp-101",
    name: "Kavitha Ramanathan",
    email: "kavitha.marketing@maytri.com",
    password: "emp123",
    role: "employee",
    department: "Digital Marketing & Growth",
    designation: "Marketing Lead & Campaign Manager",
    phone: "+91 98491 55678",
    status: "Active",
    avatar: "👩‍💼",
    dailyCallTarget: 30,
    dailyEmailTarget: 25,
  },
  {
    id: "emp-102",
    name: "Rahul Varma",
    email: "rahul.sales@maytri.com",
    password: "emp123",
    role: "employee",
    department: "Telecalling & Direct Sales",
    designation: "Senior Telecalling Specialist",
    phone: "+91 98765 43210",
    status: "Active",
    avatar: "👨‍💼",
    dailyCallTarget: 45,
    dailyEmailTarget: 20,
  },
  {
    id: "emp-103",
    name: "Pooja Deshmukh",
    email: "pooja.outreach@maytri.com",
    password: "emp123",
    role: "employee",
    department: "NRI & Luxury Sales",
    designation: "Client Relationship Manager",
    phone: "+91 99123 77889",
    status: "Active",
    avatar: "👩‍💻",
    dailyCallTarget: 25,
    dailyEmailTarget: 35,
  },
];

export const INITIAL_CALL_LOGS = [];

export const INITIAL_EMAIL_LOGS = [];

export const INITIAL_MEDIA = [
  {
    key: "logo",
    title: "Maytri Ambhuja Brand Logo",
    category: "logo",
    cloudinaryUrl: "https://res.cloudinary.com/li8lgd5l/image/upload/v1788786505/maytri_ambhuja/brand/ambhuja_logo.png",
    publicId: "ambhuja_logo",
    resourceType: "image",
  },
  {
    key: "heroPoster",
    title: "Hero Background Poster",
    category: "image",
    cloudinaryUrl: "https://res.cloudinary.com/li8lgd5l/image/upload/v1788786507/maytri_ambhuja/brand/hero_poster.jpg",
    publicId: "hero_poster",
    resourceType: "image",
  },
  {
    key: "heroBgImage",
    title: "Hero Background Image",
    category: "image",
    cloudinaryUrl: "https://res.cloudinary.com/li8lgd5l/image/upload/v1788786507/maytri_ambhuja/brand/hero_poster.jpg",
    publicId: "hero_poster",
    resourceType: "image",
  },
  {
    key: "ctaPoster",
    title: "CTA Background Poster",
    category: "image",
    cloudinaryUrl: "https://res.cloudinary.com/li8lgd5l/image/upload/v1788786509/maytri_ambhuja/brand/cta_poster.jpg",
    publicId: "cta_poster",
    resourceType: "image",
  },
  {
    key: "ctaBgImage",
    title: "CTA Background Image",
    category: "image",
    cloudinaryUrl: "https://res.cloudinary.com/li8lgd5l/image/upload/v1788786509/maytri_ambhuja/brand/cta_poster.jpg",
    publicId: "cta_poster",
    resourceType: "image",
  },
  {
    key: "heroVideo",
    title: "Maytri Ambhuja Hero Video",
    category: "video",
    cloudinaryUrl: "https://res.cloudinary.com/li8lgd5l/video/upload/maytri_ambhuja/videos/hero_video.mp4",
    publicId: "hero_video",
    resourceType: "video",
  },
  {
    key: "ctaVideo",
    title: "Maytri Ambhuja CTA Video",
    category: "video",
    cloudinaryUrl: "https://res.cloudinary.com/li8lgd5l/video/upload/maytri_ambhuja/videos/cta_video.mp4",
    publicId: "cta_video",
    resourceType: "video",
  },
  {
    key: "gallery001",
    title: "Grand Clubhouse Architecture",
    category: "image",
    cloudinaryUrl: "https://res.cloudinary.com/li8lgd5l/image/upload/v1788786512/maytri_ambhuja/gallery/gallery_001.jpg",
    publicId: "gallery_001",
    resourceType: "image",
  },
  {
    key: "gallery002",
    title: "Resort Style Temperature-Controlled Infinity Pool",
    category: "image",
    cloudinaryUrl: "https://res.cloudinary.com/li8lgd5l/image/upload/v1788786514/maytri_ambhuja/gallery/gallery_002.jpg",
    publicId: "gallery_002",
    resourceType: "image",
  },
  {
    key: "gallery003",
    title: "Holistic Wellness Spa & Steam Pavilion",
    category: "image",
    cloudinaryUrl: "https://res.cloudinary.com/li8lgd5l/image/upload/v1788786516/maytri_ambhuja/gallery/gallery_003.jpg",
    publicId: "gallery_003",
    resourceType: "image",
  },
  {
    key: "gallery004",
    title: "500-Guest Double-Height Grand Celebration Banquet",
    category: "image",
    cloudinaryUrl: "https://res.cloudinary.com/li8lgd5l/image/upload/v1788786517/maytri_ambhuja/gallery/gallery_004.jpg",
    publicId: "gallery_004",
    resourceType: "image",
  },
  {
    key: "gallery005",
    title: "Indoor International Multi-Sport Arena",
    category: "image",
    cloudinaryUrl: "https://res.cloudinary.com/li8lgd5l/image/upload/v1788786519/maytri_ambhuja/gallery/gallery_005.jpg",
    publicId: "gallery_005",
    resourceType: "image",
  },
  {
    key: "gallery006",
    title: "Boutique Executive Air-Conditioned Guest Suites",
    category: "image",
    cloudinaryUrl: "https://res.cloudinary.com/li8lgd5l/image/upload/v1788786520/maytri_ambhuja/gallery/gallery_006.jpg",
    publicId: "gallery_006",
    resourceType: "image",
  },
  {
    key: "gallery007",
    title: "Children's Creative Activity Creche & Play Zone",
    category: "image",
    cloudinaryUrl: "https://res.cloudinary.com/li8lgd5l/image/upload/v1788786522/maytri_ambhuja/gallery/gallery_007.jpg",
    publicId: "gallery_007",
    resourceType: "image",
  },
  {
    key: "gallery008",
    title: "Private 4K Dolby Atmos Acoustic Preview Theatre",
    category: "image",
    cloudinaryUrl: "https://res.cloudinary.com/li8lgd5l/image/upload/v1788786523/maytri_ambhuja/gallery/gallery_008.jpg",
    publicId: "gallery_008",
    resourceType: "image",
  },
  {
    key: "gallery009",
    title: "State-of-the-Art Technogym Fitness Center",
    category: "image",
    cloudinaryUrl: "https://res.cloudinary.com/li8lgd5l/image/upload/v1788786525/maytri_ambhuja/gallery/gallery_009.jpg",
    publicId: "gallery_009",
    resourceType: "image",
  },
  {
    key: "gallery010",
    title: "Starlit Rooftop Sky Lounge & Alfresco Deck",
    category: "image",
    cloudinaryUrl: "https://res.cloudinary.com/li8lgd5l/image/upload/v1788786526/maytri_ambhuja/gallery/gallery_010.jpg",
    publicId: "gallery_010",
    resourceType: "image",
  },
];

export const autoSeedData = async () => {
  try {
    const mediaCount = await Media.countDocuments();
    if (mediaCount === 0) {
      console.log("🌱 Seeding initial media metadata for Cloudinary...");
      await Media.insertMany(INITIAL_MEDIA);
      console.log("✅ Cloudinary media metadata seeded successfully!");
    }
  } catch (error) {
    console.error("Auto-seed error:", error.message);
  }
};

// If run directly via `npm run seed`
if (process.argv[1] && process.argv[1].endsWith("seed.js")) {
  (async () => {
    const conn = await connectDB();
    if (conn) {
      await autoSeedData();
      console.log("🎉 Database seeding complete!");
      process.exit(0);
    } else {
      process.exit(1);
    }
  })();
}
