// import { Schema, model, models } from "mongoose";
// import mongoose from "mongoose";
const mongoose = require("mongoose");

const MangaChaptersSchema = new mongoose.Schema(
  {
    chapterLinks: {
      type: [String],
    },
    mangaTitle: {
      type: String,
      required: true,
    },
    images: [
      {
        number: {
          type: String,
        },
        img: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("MangaChapters", MangaChaptersSchema);
