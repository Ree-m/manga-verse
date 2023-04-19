import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    commentIn: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
