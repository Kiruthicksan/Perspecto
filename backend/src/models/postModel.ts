import mongoose, { Document, Schema } from "mongoose";

export interface IPOST extends Document {
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  slug: string;
}

const postSchema = new Schema<IPOST>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// -----------------------  pre save hook for creating slug --------------------

postSchema.pre("save", function (next) {
  if (this.isModified("title") || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  next()
});

export const Post = mongoose.model("Post", postSchema);
