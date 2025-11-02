import mongoose, { Document, Schema } from "mongoose";
import { Post, type IPOST } from "./postModel.js";

export interface Icomment extends Document {
  blog: IPOST;
  name: string;
  content: string;
  isApproved: boolean;
}

const commentSchema = new Schema<Icomment>({
  blog: { type: mongoose.Types.ObjectId, ref: Post, required: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
});

const Comment = mongoose.model("comment", commentSchema);


export default Comment
