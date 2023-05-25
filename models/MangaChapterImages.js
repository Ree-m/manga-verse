const mongoose = require("mongoose");

const MangaChapterImagesSchema = new mongoose.Schema(
  {
    chapterImages: {
        type: [],
        required: true,
      },
      mangaTitle: {
        type: String,
        required: true,
      },
      // mangaId:{
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: "MangaChapters",
      //   required: true,
      // }

    
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("MangaChaptersImages", MangaChapterImagesSchema);


