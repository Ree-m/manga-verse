// import { Schema, model, models } from "mongoose";
// import mongoose from "mongoose";
const mongoose = require("mongoose");

const MangaChaptersSchema = new mongoose.Schema(
  {
    chapterLinks: {
        type: [String],
        required: true,
      },
      mangaTitle: {
        type: String,
        required: true,
      },

    
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("MangaChapters", MangaChaptersSchema);

// const MangaChapters = models.MangaChapters || model("MangaChapters", MangaChaptersSchema);

// export default MangaChapters;
