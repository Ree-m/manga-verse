import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const CommentSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentText: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    mangaId: {
      type: Number,
      required: true,
    },
    replies: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        commentText: {
          type: String,
          required: true,
        },
        likes: {
          type: Number,
          required: true,
        },
        mangaId: {
          type: Number,
          required: true,
        },
        parentCommentId: {
          type: String,
          required: true,
        },
      },
      { timestamps: true },
    ],
  },
  {
    timestamps: true,
  }
);

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
