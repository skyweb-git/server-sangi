import express from "express";
import { getAllMedia, getMediaByKey, uploadMediaAsset, updateMedia, registerMediaAsset } from "../controllers/mediaController.js";

const router = express.Router();

router.get("/", getAllMedia);
router.post("/upload", uploadMediaAsset);
router.post("/register", registerMediaAsset);
router.get("/:key", getMediaByKey);
router.put("/:key", updateMedia);

export default router;
