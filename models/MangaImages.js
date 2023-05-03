import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const CommentSchema = new Schema(
  {
    
  },
  {
    timestamps: true,
  }
);

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
