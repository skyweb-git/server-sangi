import { Content } from '../models/Content.js';

const DEFAULT_KEY = 'website_config_v1';

// GET /api/content
export const getContent = async (req, res) => {
  try {
    let content = await Content.findOne({ key: DEFAULT_KEY }).lean();
    if (!content) {
      content = await Content.create({ key: DEFAULT_KEY });
      content = content.toObject();
    }
    // Remove Mongoose internal fields before sending
    const { _id, __v, createdAt, updatedAt, ...cleanContent } = content;
    res.json({ success: true, data: cleanContent });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch website content', error: error.message });
  }
};

// PUT /api/content
export const updateContent = async (req, res) => {
  try {
    const updates = req.body;
    // Use replaceOne so nested arrays (projectsSection.items, amenitiesSection.items) are
    // fully replaced — avoids issues with $set not deeply merging sub-document arrays.
    const content = await Content.findOneAndUpdate(
      { key: DEFAULT_KEY },
      { $set: { key: DEFAULT_KEY, ...updates } },
      { new: true, upsert: true, strict: false }
    ).lean();

    const { _id, __v, createdAt, updatedAt, ...cleanContent } = content;
    res.json({ success: true, message: 'Website content updated successfully', data: cleanContent });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update website content', error: error.message });
  }
};

