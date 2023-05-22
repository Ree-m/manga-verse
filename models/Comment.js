import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const CommentSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    commentText: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      // required: true,
    },

    dislikes: {
      type: Number,
      // required: true,
    },

    mangaId: {
      type: Number,
      required: true,
    },

    likesArr: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    dislikesArr: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
