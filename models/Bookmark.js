import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const BookmarkSchema = new Schema(
  {
    nameOfBookmark: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bookmark = models.Bookmark || model("Bookmark", BookmarkSchema);

export default Bookmark;
